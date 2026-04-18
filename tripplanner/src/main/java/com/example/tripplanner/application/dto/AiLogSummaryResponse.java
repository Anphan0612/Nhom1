package com.example.tripplanner.application.dto;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
public class AiLogSummaryResponse {
    private Long id;
    private String tripId;
    private String model;
    private String status;
    private Integer totalTokens;
    private Long executionTime;
    private Integer retryCount;
    private LocalDateTime createdAt;
}
