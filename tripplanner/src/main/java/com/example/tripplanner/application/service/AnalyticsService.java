package com.example.tripplanner.application.service;

import com.example.tripplanner.application.dto.RetryStatsDto;
import com.example.tripplanner.domain.model.AiLogStatus;
import com.example.tripplanner.domain.port.AiLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final AiLogRepository aiLogRepository;

    public double getSuccessRate() {
        long total = aiLogRepository.countTotal();
        if (total == 0) return 0.0;
        long successCount = aiLogRepository.countByStatus(AiLogStatus.SUCCESS);
        return (double) successCount / total * 100.0;
    }


    public double getAverageTokenUsage() {
        Double avgTokens = aiLogRepository.getAverageTotalTokens();
        return avgTokens != null ? avgTokens : 0.0;
    }

    public RetryStatsDto getRetryStats() {
        long totalRequests = aiLogRepository.countTotal();
        long retriedRequests = aiLogRepository.countByRetryCountGreaterThan(0);
        Double avgRetryCount = aiLogRepository.getAverageRetryCount();
        
        return RetryStatsDto.builder()
                .totalRequests(totalRequests)
                .retriedRequests(retriedRequests)
                .avgRetryCount(avgRetryCount != null ? avgRetryCount : 0.0)
                .build();
    }

    public Map<String, Double> getValidationErrorDistribution() {
        Map<String, Long> errorCounts = aiLogRepository.getValidationErrorCounts();
        long totalErrors = errorCounts.values().stream().mapToLong(Long::longValue).sum();

        Map<String, Double> distribution = new HashMap<>();
        if (totalErrors == 0) {
            distribution.put("FORMAT", 0.0);
            distribution.put("SCHEMA", 0.0);
            distribution.put("BUSINESS", 0.0);
            return distribution;
        }

        for (Map.Entry<String, Long> entry : errorCounts.entrySet()) {
            double percentage = (double) entry.getValue() / totalErrors * 100.0;
            distribution.put(entry.getKey(), Math.round(percentage * 100.0) / 100.0);
        }
        
        // Ensure all types are present even if 0
        distribution.putIfAbsent("FORMAT", 0.0);
        distribution.putIfAbsent("SCHEMA", 0.0);
        distribution.putIfAbsent("BUSINESS", 0.0);

        return distribution;
    }
}
