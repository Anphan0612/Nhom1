package com.example.tripplanner.application.usecase;

import com.example.tripplanner.application.dto.GenerateResponse;
import com.example.tripplanner.application.dto.RegenerateRequest;
import com.example.tripplanner.application.mapper.TripMapper;
import com.example.tripplanner.application.orchestrator.AIOrchestrator;
import com.example.tripplanner.domain.model.Trip;
import com.example.tripplanner.domain.model.TripStatus;
import com.example.tripplanner.domain.port.ItineraryRepository;
import com.example.tripplanner.domain.port.TripRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RegenerateTripPlanUseCase {

    private final AIOrchestrator orchestrator;
    private final TripRepository tripRepository;
    private final ItineraryRepository itineraryRepository;

    @Transactional
    public GenerateResponse execute(UUID tripId, RegenerateRequest request) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new EntityNotFoundException("Trip not found: " + tripId));

        itineraryRepository.deleteByTripId(tripId);
        trip.getItineraries().clear();

        Long aiLogId = orchestrator.orchestrateRegenerate(trip, request);

        trip.setStatus(TripStatus.GENERATED);
        tripRepository.save(trip);

        return GenerateResponse.builder()
                .tripId(trip.getId())
                .status(TripStatus.GENERATED)
                .aiLogId(aiLogId)
                .itineraries(
                        trip.getItineraries().stream()
                                .map(TripMapper::toItineraryResponse)
                                .collect(Collectors.toList())
                )
                .generatedAt(LocalDateTime.now())
                .build();
    }
}
