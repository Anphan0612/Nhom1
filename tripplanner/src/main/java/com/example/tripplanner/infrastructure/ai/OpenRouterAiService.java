package com.example.tripplanner.infrastructure.ai;

import com.example.tripplanner.domain.model.AiResponse;
import com.example.tripplanner.domain.port.AiServicePort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class OpenRouterAiService implements AiServicePort {

    private final WebClient webClient;

    @Value("${router9.api.key}")
    private String apiKey;

    @Value("${router9.api.url:http://localhost:20128/v1/chat/completions}")
    private String apiUrl;

    @Value("${router9.api.model:openrouter/nvidia/nemotron-3-super-120b-a12b:free}")
    private String defaultModel;

    @Override
    public AiResponse callAi(String prompt) {
        Map<String, Object> requestBody = Map.of(
                "model", defaultModel,
                "messages", List.of(Map.of("role", "user", "content", prompt)),
                "stream", false
        );

        try {
            OpenRouterResponse raw = webClient.post()
                    .uri(apiUrl)
                    .header("Authorization", "Bearer " + apiKey)
                    .header("HTTP-Referer", "http://localhost:8081")
                    .header("X-Title", "TripPlanner")
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(OpenRouterResponse.class)
                    .block();

            if (raw == null || raw.choices() == null || raw.choices().isEmpty()) {
                throw new AiServiceException("Empty response from AI provider");
            }

            return new AiResponse(
                    raw.choices().get(0).message().content(),
                    raw.usage() != null ? raw.usage().prompt_tokens() : 0,
                    raw.usage() != null ? raw.usage().completion_tokens() : 0,
                    raw.model() != null ? raw.model() : defaultModel
            );

        } catch (WebClientResponseException ex) {
            log.error("AI provider HTTP error: status={}, body={}", ex.getStatusCode(), ex.getResponseBodyAsString());
            throw new AiServiceException("AI provider returned error: " + ex.getStatusCode(), ex);
        }
    }

    // ── Vendor-specific response shape (lives only in infrastructure) ─────────

    record OpenRouterResponse(List<Choice> choices, Usage usage, String model) {
        record Choice(Message message) {}
        record Message(String content) {}
        record Usage(int prompt_tokens, int completion_tokens) {}
    }
}
