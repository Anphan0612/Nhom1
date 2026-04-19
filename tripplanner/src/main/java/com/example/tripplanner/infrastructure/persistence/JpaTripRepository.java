package com.example.tripplanner.infrastructure.persistence;

import com.example.tripplanner.domain.model.Trip;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface JpaTripRepository extends JpaRepository<Trip, UUID> {
    List<Trip> findByUserId(UUID userId);
}
