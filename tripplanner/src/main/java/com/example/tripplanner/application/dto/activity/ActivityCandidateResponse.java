package com.example.tripplanner.application.dto.activity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ActivityCandidateResponse {
    private UUID id;
    private String name;
    private String description;
    private String location;
    private BigDecimal cost;
    private boolean selected;
}

