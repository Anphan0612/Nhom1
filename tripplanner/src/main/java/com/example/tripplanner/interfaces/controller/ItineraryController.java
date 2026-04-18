package com.example.tripplanner.interfaces.controller;

import com.example.tripplanner.application.dto.ItineraryResponse;
import com.example.tripplanner.application.dto.ItineraryUpdateRequest;
import com.example.tripplanner.application.usecase.GetItinerariesUseCase;
import com.example.tripplanner.application.usecase.UpdateItineraryUseCase;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/trips")
@RequiredArgsConstructor
public class ItineraryController {

    private final GetItinerariesUseCase getItinerariesUseCase;
    private final UpdateItineraryUseCase updateItineraryUseCase;

    @GetMapping("/{tripId}/itineraries")
    public ResponseEntity<List<ItineraryResponse>> getItineraries(@PathVariable UUID tripId) {
        return ResponseEntity.ok(getItinerariesUseCase.execute(tripId));
    }

    @PutMapping("/{tripId}/itineraries/{itineraryId}")
    public ResponseEntity<ItineraryResponse> updateItinerary(@PathVariable UUID tripId,
                                                              @PathVariable UUID itineraryId,
                                                              @Valid @RequestBody ItineraryUpdateRequest request) {
        return ResponseEntity.ok(updateItineraryUseCase.execute(itineraryId, request));
    }
}
