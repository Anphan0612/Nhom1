package com.example.tripplanner.infrastructure.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface JpaItineraryRepository extends JpaRepository<ItineraryEntity, UUID> {

    List<ItineraryEntity> findByTripIdOrderByDayNumberAsc(UUID tripId);

    @Modifying
    @Query("DELETE FROM ActivityEntity a WHERE a.itinerary.trip.id = :tripId")
    void deleteActivitiesByTripId(@Param("tripId") UUID tripId);

    @Modifying
    @Query("DELETE FROM ItineraryEntity i WHERE i.trip.id = :tripId")
    void deleteByTripId(@Param("tripId") UUID tripId);
}
