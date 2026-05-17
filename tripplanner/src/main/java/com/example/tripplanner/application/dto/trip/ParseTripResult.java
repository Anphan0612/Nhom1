package com.example.tripplanner.application.dto.trip;

import lombok.Builder;
import lombok.Data;
import java.util.List;

// output khi parse xong
@Data
@Builder
public class ParseTripResult {
    private String destination;
    private String origin;
    private String startDate;
    private String endDate;
    private Integer travelers;
    private String budgetTier;
    private List<String> travelStyles;
    private String rawSummary;
    private boolean destinationIsSuggested;
}

