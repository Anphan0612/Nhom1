package com.example.tripplanner.application.mapper;

import com.example.tripplanner.application.dto.AiLogDetailResponse;
import com.example.tripplanner.application.dto.AiLogSummaryResponse;
import com.example.tripplanner.domain.model.AiLog;

public final class AiLogMapper {

    private AiLogMapper() {}

    public static AiLogSummaryResponse toSummary(AiLog log) {
        return AiLogSummaryResponse.builder()
                .id(log.getId())
                .tripId(log.getTripId())
                .model(log.getModel())
                .status(log.getStatus() != null ? log.getStatus().name() : null)
                .totalTokens(log.getTotalTokens())
                .executionTime(log.getExecutionTime())
                .retryCount(log.getRetryCount())
                .createdAt(log.getCreatedAt())
                .build();
    }

    public static AiLogDetailResponse toDetail(AiLog log) {
        return AiLogDetailResponse.builder()
                .id(log.getId())
                .tripId(log.getTripId())
                .userInput(log.getUserInput())
                .prompt(log.getPrompt())
                .response(log.getResponse())
                .model(log.getModel())
                .promptTokens(log.getPromptTokens())
                .completionTokens(log.getCompletionTokens())
                .totalTokens(log.getTotalTokens())
                .status(log.getStatus() != null ? log.getStatus().name() : null)
                .retryCount(log.getRetryCount())
                .errorMessage(log.getErrorMessage())
                .validationType(log.getValidationType() != null ? log.getValidationType().name() : null)
                .executionTime(log.getExecutionTime())
                .promptVersion(log.getPromptVersion())
                .createdAt(log.getCreatedAt())
                .build();
    }
}

