package com.example.tripplanner.application.dto;

import com.example.tripplanner.domain.model.TripStatus;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Size;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class TripUpdateRequest {

    @Size(min = 3, max = 200)
    private String title;

    @Size(min = 2, max = 300)
    private String destination;

    private LocalDate startDate;
    private LocalDate endDate;

    @DecimalMin(value = "0.0", inclusive = true)
    private BigDecimal budget;

    private TripStatus status;
}
