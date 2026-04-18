package com.example.tripplanner.application.dto;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class GenerateRequest {

    @Size(max = 1000)
    private String preferences;

    private String model;
    private String promptVersion;
}
