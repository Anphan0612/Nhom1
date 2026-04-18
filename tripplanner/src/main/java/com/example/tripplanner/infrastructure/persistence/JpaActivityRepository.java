package com.example.tripplanner.infrastructure.persistence;

import com.example.tripplanner.domain.model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface JpaActivityRepository extends JpaRepository<Activity, UUID> {
}
