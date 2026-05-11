package com.example.tripplanner.application.dto.explore;


import com.example.tripplanner.domain.model.RecommendationType;
import lombok.Builder;
import lombok.Data;
import java.util.UUID;

@Data
@Builder
public class RecommendationResponse {
    private UUID id;
    private String name;
    private RecommendationType type;
    private String description;
    private String location;
    private String priceLevel;
}

