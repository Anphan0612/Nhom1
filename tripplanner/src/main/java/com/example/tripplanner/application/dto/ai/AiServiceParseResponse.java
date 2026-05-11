package com.example.tripplanner.application.dto.ai;


import lombok.Data;

@Data
public class AiServiceParseResponse {
    private String intent;
    private AiServiceEntityResponse entities;
    private Double confidence;
    private String source;
}

