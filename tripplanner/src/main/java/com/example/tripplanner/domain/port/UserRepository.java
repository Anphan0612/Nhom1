package com.example.tripplanner.domain.port;

import com.example.tripplanner.domain.model.User;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository {
    Optional<User> findById(UUID id);
    boolean existsById(UUID id);
    User save(User user);
}
