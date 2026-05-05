package com.example.tripplanner.application.dto;

import com.example.tripplanner.domain.model.TripStatus;
import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class TripResponse {
    private UUID id;
    private UUID userId;
    private String title;
    private String destination;
    private LocalDate startDate;
    private LocalDate endDate;
    private BigDecimal budget;
    private TripStatus status;
    private LocalDateTime createdAt;
    private java.math.BigDecimal totalCost;
    private java.util.List<RecommendationResponse> recommendations;
}
