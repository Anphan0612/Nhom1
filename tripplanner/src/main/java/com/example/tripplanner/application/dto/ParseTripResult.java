package com.example.tripplanner.application.dto;

import lombok.Builder;
import lombok.Data;
import java.util.List;

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
}
