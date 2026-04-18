package com.example.tripplanner.domain.model;

/**
 * Domain-level representation of an AI service response.
 * The domain knows nothing about OpenRouter, Gemini, or any specific vendor.
 * Infrastructure adapters are responsible for mapping vendor responses to this record.
 */
public record AiResponse(
        String content,
        int promptTokens,
        int completionTokens,
        String model
) {
    public int totalTokens() {
        return promptTokens + completionTokens;
    }
}
