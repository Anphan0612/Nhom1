package com.example.tripplanner.interfaces.controller;

import com.example.tripplanner.application.dto.RetryStatsDto;
import com.example.tripplanner.application.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping("/success-rate")
    public ResponseEntity<Double> getSuccessRate() {
        return ResponseEntity.ok(analyticsService.getSuccessRate());
    }

    @GetMapping("/token-usage")
    public ResponseEntity<Double> getAverageTokenUsage() {
        return ResponseEntity.ok(analyticsService.getAverageTokenUsage());
    }

    @GetMapping("/retry-stats")
    public ResponseEntity<RetryStatsDto> getRetryStats() {
        return ResponseEntity.ok(analyticsService.getRetryStats());
    }

    @GetMapping("/error-distribution")
    public ResponseEntity<Map<String, Double>> getValidationErrorDistribution() {
        return ResponseEntity.ok(analyticsService.getValidationErrorDistribution());
    }
}
