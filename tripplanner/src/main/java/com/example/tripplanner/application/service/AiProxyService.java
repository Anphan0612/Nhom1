package com.example.tripplanner.application.service;

import com.example.tripplanner.application.dto.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Collections;
import java.util.List;

@Slf4j
@Service
public class AiProxyService {

    private final WebClient webClient;
    
    @Value("${ai-service.url:http://localhost:8000/api/v1}")
    private String aiServiceUrl;

    public AiProxyService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    public ParseTripResult parseTrip(ParseTripRequest request) {
        String url = aiServiceUrl + "/parse-query";
        
        AiServiceParseRequest pythonRequest = AiServiceParseRequest.builder()
                .text(request.getDescription())
                .build();

        log.info("Calling Python AI service at {}", url);
        
        AiServiceParseResponse pythonResponse = webClient.post()
                .uri(url)
                .bodyValue(pythonRequest)
                .retrieve()
                .bodyToMono(AiServiceParseResponse.class)
                .block();

        if (pythonResponse == null || pythonResponse.getEntities() == null) {
            log.warn("Null response from Python AI service");
            return ParseTripResult.builder().build(); // Empty result
        }

        AiServiceEntityResponse entities = pythonResponse.getEntities();

        // Null-safe mapping without extra NLP logic
        String destination = entities.getDestination();
        String budgetTier = mapBudgetTier(entities.getBudget());
        List<String> travelStyles = entities.getVibe() != null && !entities.getVibe().isBlank() 
                                    ? List.of(entities.getVibe()) 
                                    : Collections.emptyList();

        return ParseTripResult.builder()
                .destination(destination)
                .origin(entities.getOrigin())
                .travelers(entities.getTravelers())
                .budgetTier(budgetTier)
                .travelStyles(travelStyles)
                .rawSummary(request.getDescription())
                .startDate(entities.getStart_date())
                .endDate(entities.getEnd_date())
                .build();
    }

    private String mapBudgetTier(Integer budget) {
        if (budget == null) return null;
        if (budget <= 2000000) return "budget";
        if (budget <= 5000000) return "standard";
        return "luxury";
    }
}
