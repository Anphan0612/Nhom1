package com.example.tripplanner.application.dto.ai;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class AiServiceEntityResponse {
    private String destination;
    @JsonProperty("duration_days")
    private Integer durationDays;
    private Integer budget;
    private String vibe;
    private String time;
    @JsonProperty("group_type")
    private String groupType;
    private Integer travelers;
    private String origin;
    @JsonProperty("start_date")
    private String startDate;
    @JsonProperty("end_date")
    private String endDate;
}

