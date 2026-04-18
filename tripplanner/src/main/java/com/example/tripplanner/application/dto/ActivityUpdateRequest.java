package com.example.tripplanner.application.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalTime;

@Data
public class ActivityUpdateRequest {

    @Size(min = 2, max = 200)
    private String name;

    @Size(max = 2000)
    private String description;

    @Size(max = 500)
    private String location;

    private LocalTime startTime;
    private LocalTime endTime;

    @DecimalMin(value = "0.0", inclusive = true)
    private BigDecimal cost;

    @Min(1)
    private Integer activityOrder;
}
