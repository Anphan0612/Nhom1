package com.example.tripplanner.infrastructure.config;

import com.example.tripplanner.domain.model.User;
import com.example.tripplanner.domain.port.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.util.UUID;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class DataSeeder {

    @Bean
    public CommandLineRunner initDatabase(UserRepository userRepository) {
        return args -> {
            if (userRepository.existsById(UUID.fromString("11111111-1111-1111-1111-111111111111"))) {
                return;
            }

            User testUser = User.builder()
                    .id(UUID.fromString("11111111-1111-1111-1111-111111111111"))
                    .name("Test User")
                    .email("test@example.com")
                    .createdAt(LocalDateTime.now())
                    .build();

            userRepository.save(testUser);
            log.info("=========================================================");
            log.info("✅ SEEDED TEST USER FOR API TESTING");
            log.info("User ID: 11111111-1111-1111-1111-111111111111");
            log.info("=========================================================");
        };
    }
}
