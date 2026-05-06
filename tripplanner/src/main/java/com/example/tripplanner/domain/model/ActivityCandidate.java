package com.example.tripplanner.domain.model;

import lombok.*;
import java.math.BigDecimal;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ActivityCandidate {
    private UUID id;
    private String name;
    private String description;
    private String location;
    private BigDecimal cost;
    @Builder.Default
    private boolean selected = false;
}
