package com.example.tripplanner.domain.port;

import com.example.tripplanner.domain.model.Trip;

import java.util.Optional;
import java.util.UUID;

public interface TripRepository {
    Trip save(Trip trip);
    Optional<Trip> findById(UUID id);
    boolean existsById(UUID id);
}
