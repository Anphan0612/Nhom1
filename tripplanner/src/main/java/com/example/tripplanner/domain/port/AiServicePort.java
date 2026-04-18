package com.example.tripplanner.domain.port;

import com.example.tripplanner.domain.model.AiResponse;

/**
 * Port for communicating with any AI language model provider.
 * Domain layer depends on this interface only — never on vendor SDKs.
 */
public interface AiServicePort {
    AiResponse callAi(String prompt);
}
