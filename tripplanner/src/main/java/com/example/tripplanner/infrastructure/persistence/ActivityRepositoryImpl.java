package com.example.tripplanner.infrastructure.persistence;

import com.example.tripplanner.domain.model.Activity;
import com.example.tripplanner.domain.port.ActivityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class ActivityRepositoryImpl implements ActivityRepository {

    private final JpaActivityRepository jpaRepository;

    @Override
    public Activity save(Activity activity) {
        return jpaRepository.save(activity);
    }

    @Override
    public Optional<Activity> findById(UUID id) {
        return jpaRepository.findById(id);
    }

    @Override
    public void deleteById(UUID id) {
        jpaRepository.deleteById(id);
    }

    @Override
    public boolean existsById(UUID id) {
        return jpaRepository.existsById(id);
    }
}
