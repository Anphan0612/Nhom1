package com.example.tripplanner.interfaces.controller;

import com.example.tripplanner.application.dto.ParseTripRequest;
import com.example.tripplanner.application.dto.ParseTripResponse;
import com.example.tripplanner.application.usecase.ParseTripDescriptionUseCase;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/ai")
@RequiredArgsConstructor
public class AiAssistController {

    private final ParseTripDescriptionUseCase parseTripDescriptionUseCase;

    /**
     * Parse natural language trip description into structured form data.
     * Example body: { "description": "Tôi muốn đi Đà Lạt 3 ngày cuối tuần với 2 người" }
     */
    @PostMapping("/parse-trip")
    public ResponseEntity<ParseTripResponse> parseTrip(@Valid @RequestBody ParseTripRequest request) {
        return ResponseEntity.ok(parseTripDescriptionUseCase.execute(request));
    }
}
