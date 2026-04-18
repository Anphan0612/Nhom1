package com.example.tripplanner.application.dto;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegenerateRequest {

    @Size(max = 1000)
    private String feedback;

    private String model;
    private String promptVersion;
}
