package com.example.tripplanner.application.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ModerationStatsResponse {
    private long pendingCount;
    private long approvedCount;
    private long rejectedCount;
}
