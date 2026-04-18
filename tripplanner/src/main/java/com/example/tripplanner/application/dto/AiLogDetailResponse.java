package com.example.tripplanner.application.dto;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
public class AiLogDetailResponse {
    private Long id;
    private String tripId;
    private String userInput;
    private String prompt;
    private String response;
    private String model;
    private Integer promptTokens;
    private Integer completionTokens;
    private Integer totalTokens;
    private String status;
    private Integer retryCount;
    private String errorMessage;
    private String validationType;
    private Long executionTime;
    private String promptVersion;
    private LocalDateTime createdAt;
}
