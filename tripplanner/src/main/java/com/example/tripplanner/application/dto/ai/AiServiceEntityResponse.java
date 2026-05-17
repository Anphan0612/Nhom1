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
    @JsonProperty("destination_is_suggested")
    private boolean destinationIsSuggested;
}

// @JsonPropery dùng để map dữ liệu từ Python sang Java
// ví dụ: @JsonProperty("destination_is_suggested") -> destinationIsSuggested
// @JsonPropery(value = "destination_is_suggested")