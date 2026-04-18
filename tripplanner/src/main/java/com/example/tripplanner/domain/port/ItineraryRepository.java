package com.example.tripplanner.domain.port;

import com.example.tripplanner.domain.model.Itinerary;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ItineraryRepository {
    Itinerary save(Itinerary itinerary);
    Optional<Itinerary> findById(UUID id);
    List<Itinerary> findByTripId(UUID tripId);
    void deleteByTripId(UUID tripId);
}
