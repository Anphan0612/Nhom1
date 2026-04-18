package com.example.tripplanner.application.dto;

import com.example.tripplanner.domain.model.TripStatus;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
public class GenerateResponse {
    private UUID tripId;
    private TripStatus status;
    private Long aiLogId;
    private List<ItineraryResponse> itineraries;
    private LocalDateTime generatedAt;
}
