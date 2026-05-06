package com.example.tripplanner.application.dto;

import com.example.tripplanner.domain.model.ShareType;
import lombok.Data;

import java.util.UUID;

@Data
public class ShareContentRequest {
    private ShareType type;
    private UUID refId; // Activity ID or Trip ID
    private String content; // JSON string with description, tips, etc.
    private Double rating;
}
