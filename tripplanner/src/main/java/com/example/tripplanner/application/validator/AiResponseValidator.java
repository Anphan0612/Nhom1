package com.example.tripplanner.application.validator;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

/**
 * Validates the raw JSON content returned by the AI provider.
 * Runs three checks in order: format → schema → business rules.
 */
@Component
public class AiResponseValidator {

    private final ObjectMapper objectMapper = new ObjectMapper();

    public ValidationResult validate(String json) {
        ValidationResult formatCheck = checkFormat(json);
        if (!formatCheck.isValid()) return formatCheck;

        try {
            JsonNode root = objectMapper.readTree(json);
            ValidationResult schemaCheck = checkSchema(root);
            if (!schemaCheck.isValid()) return schemaCheck;
            return checkBusinessRules(root);
        } catch (Exception e) {
            return ValidationResult.fail("Invalid JSON parsing: " + e.getMessage());
        }
    }

    private ValidationResult checkFormat(String json) {
        if (json == null || json.isBlank()) {
            return ValidationResult.fail("Invalid JSON: content is null or empty");
        }
        try {
            objectMapper.readTree(json);
            return ValidationResult.ok();
        } catch (Exception e) {
            return ValidationResult.fail("Invalid JSON format: " + e.getMessage());
        }
    }

    private ValidationResult checkSchema(JsonNode root) {
        if (!root.has("days") || !root.get("days").isArray()) {
            return ValidationResult.fail("Schema error: 'days' array is missing");
        }
        for (JsonNode day : root.get("days")) {
            if (!day.has("activities") || !day.get("activities").isArray()) {
                return ValidationResult.fail("Schema error: 'activities' array is missing in one or more days");
            }
        }
        if (!root.has("totalCost")) {
            return ValidationResult.fail("Schema error: 'totalCost' is missing");
        }
        return ValidationResult.ok();
    }

    private ValidationResult checkBusinessRules(JsonNode root) {
        JsonNode days = root.get("days");
        if (days.isEmpty()) {
            return ValidationResult.fail("Business error: days array must not be empty");
        }
        for (JsonNode day : days) {
            if (day.get("activities").isEmpty()) {
                return ValidationResult.fail("Business error: each day must have at least 1 activity");
            }
        }
        JsonNode totalCost = root.get("totalCost");
        if (!totalCost.isNumber() || totalCost.asDouble() <= 0) {
            return ValidationResult.fail("Business error: totalCost must be > 0");
        }
        return ValidationResult.ok();
    }
}
