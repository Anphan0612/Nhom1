package com.example.tripplanner.application.dto;

import lombok.Data;

@Data
public class AiServiceEntityResponse {
    private String destination;
    private Integer duration_days;
    private Integer budget;
    private String vibe;
    private String time;
    private String group_type;
    private Integer travelers;
    private String start_date;
    private String end_date;
}
