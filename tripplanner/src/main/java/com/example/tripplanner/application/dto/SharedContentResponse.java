package com.example.tripplanner.application.dto;

import com.example.tripplanner.domain.model.ShareStatus;
import com.example.tripplanner.domain.model.ShareType;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class SharedContentResponse {
    private UUID id;
    private UserResponse user;
    private ShareType type;
    private UUID refId;
    private String content; // JSON string
    private Double rating;
    private Integer totalVotes;
    private ShareStatus status;
    private LocalDateTime createdAt;
    
    // Additional fields like enriched activity data or trip data can be added here
    private Object referenceData; // Can hold ActivityResponse or TripResponse
}
