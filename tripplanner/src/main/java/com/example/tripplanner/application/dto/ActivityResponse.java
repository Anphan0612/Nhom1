package com.example.tripplanner.application.dto;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalTime;
import java.util.UUID;

@Data
@Builder
public class ActivityResponse {
    private UUID id;
    private UUID itineraryId;
    private String name;
    private String description;
    private String location;
    private LocalTime startTime;
    private LocalTime endTime;
    private BigDecimal cost;
    private Integer activityOrder;
}
