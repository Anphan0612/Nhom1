package com.example.tripplanner.application.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ContributorResponse {
    private UUID userId;
    private String name;
    private String email;
    private long contributionCount;
    private long totalImpact;
}
