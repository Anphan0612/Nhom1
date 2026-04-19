package com.example.tripplanner.application.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ParseTripRequest {

    @NotBlank(message = "description is required")
    private String description;
}
