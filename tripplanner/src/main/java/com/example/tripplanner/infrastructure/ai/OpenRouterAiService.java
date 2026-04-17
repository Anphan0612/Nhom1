package com.example.tripplanner.infrastructure.ai;

import com.example.tripplanner.domain.port.AiServicePort;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class OpenRouterAiService implements AiServicePort {

    private final WebClient webClient;

    @Value("${9router.api.key}")
    private String apiKey;

    @Override
    public Map<String, Object> callAi(String prompt) {
        Map<String, Object> requestBody = Map.of(
            "model", "openrouter/nvidia/nemotron-3-super-120b-a12b:free",
            "messages", List.of(
                Map.of("role", "user", "content", prompt)
            ),
            "stream", false
        );

        return webClient.post()
            .uri("http://localhost:20128/v1/chat/completions")
            .header("Authorization", "Bearer " + apiKey)
            .header("HTTP-Referer", "http://localhost:8081")
            .header("X-Title", "TripPlanner")
            .header("Content-Type", "application/json")
            .header("Accept", "application/json")
            .bodyValue(requestBody)
            .retrieve()
            .bodyToMono(Map.class)
            .block();
    }
}
