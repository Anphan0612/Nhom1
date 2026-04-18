package com.example.tripplanner.application.dto;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Data
@Builder
public class ItineraryResponse {
    private UUID id;
    private UUID tripId;
    private Integer dayNumber;
    private LocalDate date;
    private String summary;
    private List<ActivityResponse> activities;
}
