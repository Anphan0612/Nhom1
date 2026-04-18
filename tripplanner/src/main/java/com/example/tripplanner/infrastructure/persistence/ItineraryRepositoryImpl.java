package com.example.tripplanner.infrastructure.persistence;

import com.example.tripplanner.domain.model.Itinerary;
import com.example.tripplanner.domain.port.ItineraryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class ItineraryRepositoryImpl implements ItineraryRepository {

    private final JpaItineraryRepository jpaRepository;

    @Override
    public Itinerary save(Itinerary itinerary) {
        return jpaRepository.save(itinerary);
    }

    @Override
    public Optional<Itinerary> findById(UUID id) {
        return jpaRepository.findById(id);
    }

    @Override
    public List<Itinerary> findByTripId(UUID tripId) {
        return jpaRepository.findByTripIdOrderByDayNumberAsc(tripId);
    }

    @Override
    @Transactional
    public void deleteByTripId(UUID tripId) {
        jpaRepository.deleteByTripId(tripId);
    }
}
