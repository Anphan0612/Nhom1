package com.example.tripplanner.application.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Data
public class TripRequest {

    @NotNull(message = "userId is required")
    private UUID userId;

    @NotBlank(message = "title is required")
    @Size(min = 3, max = 200)
    private String title;

    @NotBlank(message = "destination is required")
    @Size(min = 2, max = 300)
    private String destination;

    @NotNull(message = "startDate is required")
    private LocalDate startDate;

    @NotNull(message = "endDate is required")
    private LocalDate endDate;

    @DecimalMin(value = "0.0", inclusive = true)
    private BigDecimal budget;
}
