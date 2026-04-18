package com.example.tripplanner.application.dto;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ItineraryUpdateRequest {

    @Size(max = 2000)
    private String summary;
}
