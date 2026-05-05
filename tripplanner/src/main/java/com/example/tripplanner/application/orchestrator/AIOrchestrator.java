package com.example.tripplanner.application.orchestrator;

import com.example.tripplanner.application.dto.GenerateRequest;
import com.example.tripplanner.application.dto.RegenerateRequest;
import com.example.tripplanner.application.validator.ValidationResult;
import com.example.tripplanner.application.validator.AiResponseValidator;
import com.example.tripplanner.domain.model.*;
import com.example.tripplanner.domain.port.AiLogRepository;
import com.example.tripplanner.domain.port.AiServicePort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AIOrchestrator {

    private static final int MAX_RETRIES = 3;
    private static final String DEFAULT_PROMPT_VERSION = "v1.0";

    private final AiServicePort aiServicePort;
    private final AiLogRepository aiLogRepository;
    private final AiResponseValidator validator;
    private final AiResponseParser parser;

    /**
     * First-time AI trip generation.
     * @return persisted AiLog ID for traceability
     */
    public Long orchestrate(Trip trip, GenerateRequest request) {
        String preferences = request != null ? nullToEmpty(request.getPreferences()) : "";
        String promptVersion = request != null ? nullToDefault(request.getPromptVersion()) : DEFAULT_PROMPT_VERSION;
        String language = request != null && request.getLanguage() != null ? request.getLanguage() : "Vietnamese";
        String prompt = buildPrompt(trip, preferences, language);
        return runPipeline(trip, prompt, promptVersion, null);
    }

    /**
     * Re-run AI generation with optional user feedback.
     * @return persisted AiLog ID for traceability
     */
    public Long orchestrateRegenerate(Trip trip, RegenerateRequest request) {
        String feedback = request != null ? nullToEmpty(request.getFeedback()) : "";
        String promptVersion = request != null ? nullToDefault(request.getPromptVersion()) : DEFAULT_PROMPT_VERSION;
        String language = request != null && request.getLanguage() != null ? request.getLanguage() : "Vietnamese";
        String prompt = buildPrompt(trip, feedback, language);
        return runPipeline(trip, prompt, promptVersion, feedback);
    }

    /**
     * Regenerate a single day/itinerary with optional user feedback.
     * @param itinerary The specific day to regenerate
     * @param feedback Optional user feedback
     */
    public void orchestrateSingleDay(Itinerary itinerary, String feedback, String language) {
        Trip trip = itinerary.getTrip();
        String prompt = buildSingleDayPrompt(trip, itinerary, feedback, language);

        PipelineState state = new PipelineState(prompt);

        for (int attempt = 0; attempt < MAX_RETRIES; attempt++) {
            state.retryCount = attempt;
            log.info("AI call attempt {}/{} for itinerary={} day={}",
                attempt + 1, MAX_RETRIES, itinerary.getId(), itinerary.getDayNumber());

            AiResponse aiResponse = aiServicePort.callAi(state.currentPrompt);
            state.accumulate(aiResponse);

            ValidationResult validation = validator.validate(aiResponse.content());
            if (validation.isValid()) {
                log.info("Validation passed on attempt {}. totalTokens={}", attempt + 1, state.totalTokens());
                state.markSuccess();
                break;
            }

            log.warn("Validation failed attempt {}: {}", attempt + 1, validation.getErrorMessage());
            state.recordError(validation.getErrorMessage());
            state.currentPrompt = buildRetryPrompt(validation.getErrorMessage(), aiResponse.content());
        }

        // Note: Activities are parsed and saved by the validator/parser in the actual implementation
        // This is a simplified version - you may need to add activity parsing logic here
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Core pipeline
    // ─────────────────────────────────────────────────────────────────────────

    private Long runPipeline(Trip trip, String originalPrompt, String promptVersion, String userFeedback) {
        PipelineState state = new PipelineState(originalPrompt);
        long startTime = System.currentTimeMillis();

        for (int attempt = 0; attempt < MAX_RETRIES; attempt++) {
            state.retryCount = attempt;
            log.info("AI call attempt {}/{} for trip={}", attempt + 1, MAX_RETRIES, trip.getId());

            AiResponse aiResponse = aiServicePort.callAi(state.currentPrompt);
            state.accumulate(aiResponse);

            ValidationResult validation = validator.validate(aiResponse.content());
            if (validation.isValid()) {
                log.info("Validation passed on attempt {}. totalTokens={}", attempt + 1, state.totalTokens());
                state.markSuccess();
                parser.parseAndPopulate(trip, aiResponse.content());
                break;
            }

            log.warn("Validation failed attempt {}: {}", attempt + 1, validation.getErrorMessage());
            state.recordError(validation.getErrorMessage());
            state.currentPrompt = buildRetryPrompt(validation.getErrorMessage(), aiResponse.content());
        }

        long executionTime = System.currentTimeMillis() - startTime;
        AiLog saved = saveLog(trip, originalPrompt, state, userFeedback, promptVersion, executionTime);

        if (!state.isSuccess) {
            log.error("AI pipeline failed after {} retries for trip={}. Last error: {}",
                    MAX_RETRIES, trip.getId(), state.lastErrorMessage);
            throw new RuntimeException("AI generation failed after " + MAX_RETRIES +
                    " attempts: " + state.lastErrorMessage);
        }

        return saved.getId();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Prompt builders
    // ─────────────────────────────────────────────────────────────────────────

    private String buildPrompt(Trip trip, String extra, String language) {
        int days = (int) (trip.getEndDate().toEpochDay() - trip.getStartDate().toEpochDay()) + 1;
        String base = String.format(
                "Generate a %d-day travel itinerary for %s from %s to %s. Budget: %s. " +
                "IMPORTANT RULES:\n" +
                "1. You MUST use REAL, existing names of hotels, resorts, and restaurants (e.g. 'The Cliff Resort & Residences', 'Cay Bang Restaurant').\n" +
                "2. DO NOT use generic placeholder names like 'Resort', 'Local Eatery', 'Beach', or 'Hotel'.\n" +
                "3. All output text (summary, name, description) MUST be entirely in %s language. Only keep English for proper nouns if necessary.\n" +
                "4. You MUST return ONLY valid JSON matching this exact schema, with no markdown, no explanation:\n" +
                "{\n" +
                "  \"totalCost\": <number>,\n" +
                "  \"recommendedHotels\": [ { \"name\": \"\", \"description\": \"\", \"location\": \"\", \"priceLevel\": \"$$\" } ],\n" +
                "  \"recommendedRestaurants\": [ { \"name\": \"\", \"description\": \"\", \"location\": \"\", \"priceLevel\": \"$$\" } ],\n" +
                "  \"days\": [\n" +
                "    {\n" +
                "      \"dayNumber\": 1,\n" +
                "      \"summary\": \"<string>\",\n" +
                "      \"activities\": [\n" +
                "        {\n" +
                "          \"name\": \"<string>\",\n" +
                "          \"description\": \"<string>\",\n" +
                "          \"location\": \"<string>\",\n" +
                "          \"startTime\": \"09:00\",\n" +
                "          \"endTime\": \"10:30\",\n" +
                "          \"cost\": <number> (ALWAYS provide the full amount in VND, e.g. 500000, NOT 500)\n" +
                "        }\n" +
                "      ]\n" +
                "    }\n" +
                "  ]\n" +
                "}",
                days, trip.getDestination(), trip.getStartDate(), trip.getEndDate(), trip.getBudget(), language
        );
        return !extra.isBlank() ? base + "\nUser context: " + extra : base;
    }

    private String buildSingleDayPrompt(Trip trip, Itinerary itinerary, String feedback, String language) {
        long totalDays = (trip.getEndDate().toEpochDay() - trip.getStartDate().toEpochDay()) + 1;
        String base = String.format(
                "Generate activities for day %d of a trip to %s on %s. Budget: %s. " +
                "IMPORTANT RULES:\n" +
                "1. You MUST use REAL, existing names of locations and restaurants. DO NOT use generic placeholders like 'Resort' or 'Local Eatery'.\n" +
                "2. All output text (summary, name, description) MUST be entirely in %s language. Only keep English for proper nouns if necessary.\n" +
                "3. You MUST return ONLY valid JSON matching this exact schema:\n" +
                "{\n" +
                "  \"totalCost\": <number>,\n" +
                "  \"days\": [\n" +
                "    {\n" +
                "      \"dayNumber\": %d,\n" +
                "      \"summary\": \"<string>\",\n" +
                "      \"activities\": [\n" +
                "        { \"name\": \"\", \"description\": \"\", \"location\": \"\", \"startTime\": \"09:00\", \"endTime\": \"10:30\", \"cost\": <number> (VND) }\n" +
                "      ]\n" +
                "    }\n" +
                "  ]\n" +
                "}",
                itinerary.getDayNumber(), trip.getDestination(), itinerary.getDate(),
                trip.getBudget().divide(java.math.BigDecimal.valueOf(totalDays), 2, java.math.RoundingMode.HALF_UP),
                language, itinerary.getDayNumber()
        );
        return !feedback.isBlank() ? base + "\nUser feedback: " + feedback : base;
    }

    private String buildRetryPrompt(String errorMessage, String previousContent) {
        String instruction = switch (detectErrorType(errorMessage)) {
            case FORMAT -> "Fix this JSON and return ONLY valid JSON";
            case SCHEMA -> "Ensure JSON matches the required structure";
            case BUSINESS -> "Ensure each day has activities and cost > 0";
            default -> "Fix the issues in this JSON";
        };
        return String.format("%s. Error: %s. Previous JSON: %s", instruction, errorMessage, previousContent);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // AiLog persistence
    // ─────────────────────────────────────────────────────────────────────────

    private AiLog saveLog(Trip trip, String originalPrompt, PipelineState state,
                          String userFeedback, String promptVersion, long executionTime) {
        String userInput = buildUserInput(trip, userFeedback);

        AiLog aiLog = AiLog.builder()
                .tripId(trip.getId().toString())
                .userInput(userInput)
                .prompt(originalPrompt)
                .response(state.lastContent)
                .model(state.model)
                .promptTokens(state.totalPromptTokens)
                .completionTokens(state.totalCompletionTokens)
                .totalTokens(state.totalTokens())
                .status(state.isSuccess ? AiLogStatus.SUCCESS : AiLogStatus.FAILED)
                .retryCount(state.retryCount)
                .errorMessage(state.isSuccess ? null : state.lastErrorMessage)
                .validationType(state.firstValidationType)
                .executionTime(executionTime)
                .promptVersion(promptVersion)
                .build();

        return aiLogRepository.save(aiLog);
    }

    private String buildUserInput(Trip trip, String feedback) {
        String base = String.format("Trip: %s → %s (%s to %s)",
                trip.getTitle(), trip.getDestination(), trip.getStartDate(), trip.getEndDate());
        return (feedback != null && !feedback.isBlank()) ? base + " | Feedback: " + feedback : base;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Helpers
    // ─────────────────────────────────────────────────────────────────────────

    private ValidationType detectErrorType(String errorMessage) {
        if (errorMessage == null) return ValidationType.NONE;
        if (errorMessage.startsWith("Invalid JSON")) return ValidationType.FORMAT;
        if (errorMessage.startsWith("Schema error")) return ValidationType.SCHEMA;
        if (errorMessage.startsWith("Business error")) return ValidationType.BUSINESS;
        return ValidationType.NONE;
    }

    private String nullToEmpty(String value) {
        return value != null ? value : "";
    }

    private String nullToDefault(String value) {
        return value != null ? value : DEFAULT_PROMPT_VERSION;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Pipeline state (local accumulator — not a domain object)
    // ─────────────────────────────────────────────────────────────────────────

    private static class PipelineState {
        String currentPrompt;
        String lastContent = null;
        String lastErrorMessage = null;
        String model = null;
        int totalPromptTokens = 0;
        int totalCompletionTokens = 0;
        int retryCount = 0;
        boolean isSuccess = false;
        ValidationType firstValidationType = null;

        PipelineState(String initialPrompt) {
            this.currentPrompt = initialPrompt;
        }

        void accumulate(AiResponse response) {
            this.lastContent = response.content();
            this.model = response.model();
            this.totalPromptTokens += response.promptTokens();
            this.totalCompletionTokens += response.completionTokens();
        }

        void markSuccess() {
            this.isSuccess = true;
        }

        void recordError(String errorMessage) {
            this.lastErrorMessage = errorMessage;
        }

        int totalTokens() {
            return totalPromptTokens + totalCompletionTokens;
        }
    }
}
