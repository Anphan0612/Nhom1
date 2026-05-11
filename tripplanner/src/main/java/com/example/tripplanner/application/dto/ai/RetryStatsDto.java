package com.example.tripplanner.application.dto.ai;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RetryStatsDto {
    private long totalRequests;
    private long retriedRequests;
    private double avgRetryCount;
}

