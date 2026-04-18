package com.example.tripplanner.domain.port;

import com.example.tripplanner.domain.model.Activity;

import java.util.Optional;
import java.util.UUID;

public interface ActivityRepository {
    Activity save(Activity activity);
    Optional<Activity> findById(UUID id);
    void deleteById(UUID id);
    boolean existsById(UUID id);
}
