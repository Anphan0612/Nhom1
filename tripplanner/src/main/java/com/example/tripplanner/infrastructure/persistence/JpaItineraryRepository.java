package com.example.tripplanner.infrastructure.persistence;

import com.example.tripplanner.domain.model.Itinerary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface JpaItineraryRepository extends JpaRepository<Itinerary, UUID> {

    List<Itinerary> findByTripIdOrderByDayNumberAsc(UUID tripId);

    @Modifying
    @Query("DELETE FROM Itinerary i WHERE i.trip.id = :tripId")
    void deleteByTripId(@Param("tripId") UUID tripId);
}
