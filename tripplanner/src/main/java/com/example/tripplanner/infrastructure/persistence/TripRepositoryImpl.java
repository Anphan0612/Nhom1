package com.example.tripplanner.infrastructure.persistence;

import com.example.tripplanner.domain.model.Trip;
import com.example.tripplanner.domain.port.TripRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class TripRepositoryImpl implements TripRepository {

    private final JpaTripRepository jpaRepository;

    @Override
    public Trip save(Trip trip) {
        return jpaRepository.save(trip);
    }

    @Override
    public Optional<Trip> findById(UUID id) {
        return jpaRepository.findById(id);
    }

    @Override
    public boolean existsById(UUID id) {
        return jpaRepository.existsById(id);
    }

    @Override
    public List<Trip> findByUserId(UUID userId) {
        return jpaRepository.findByUserId(userId);
    }
}
