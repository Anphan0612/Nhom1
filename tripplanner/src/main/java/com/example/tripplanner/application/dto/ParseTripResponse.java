package com.example.tripplanner.application.dto;

import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
public class ParseTripResponse {
    private String destination;     // vd. "Đà Lạt, Việt Nam"
    private String startDate;       // ISO "YYYY-MM-DD" hoặc null
    private String endDate;         // ISO "YYYY-MM-DD" hoặc null
    private Integer travelers;      // số người, mặc định 2
    private String budgetTier;      // "budget" | "standard" | "luxury"
    private List<String> travelStyles; // vd. ["Ẩm thực", "Thư giãn"]
    private String rawSummary;      // bản tóm tắt AI diễn giải
}
