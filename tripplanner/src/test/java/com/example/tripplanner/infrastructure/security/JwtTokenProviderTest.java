package com.example.tripplanner.infrastructure.security;

import com.example.tripplanner.domain.model.Role;
import io.jsonwebtoken.MalformedJwtException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

class JwtTokenProviderTest {

    private JwtTokenProvider jwtTokenProvider;
    private final String SECRET = "very-long-secret-key-that-must-be-at-least-32-characters-long";
    private final long EXPIRATION = 86400000L; // 24 hours

    @BeforeEach
    void setUp() {
        jwtTokenProvider = new JwtTokenProvider();
        ReflectionTestUtils.setField(jwtTokenProvider, "jwtSecret", SECRET);
        ReflectionTestUtils.setField(jwtTokenProvider, "jwtExpiration", EXPIRATION);
    }

    @Test
    void generateToken_ShouldReturnValidToken() {
        // Arrange
        UUID userId = UUID.randomUUID();
        Role role = Role.USER;

        // Act
        String token = jwtTokenProvider.generateToken(userId, role);

        // Assert
        assertThat(token).isNotBlank();
        assertThat(jwtTokenProvider.validateToken(token)).isTrue();
        assertThat(jwtTokenProvider.getUserIdFromToken(token)).isEqualTo(userId);
        assertThat(jwtTokenProvider.getRoleFromToken(token)).isEqualTo(role.name());
    }

    @Test
    void validateToken_WithExpiredToken_ShouldReturnFalse() {
        // Arrange
        JwtTokenProvider expiredProvider = new JwtTokenProvider();
        ReflectionTestUtils.setField(expiredProvider, "jwtSecret", SECRET);
        ReflectionTestUtils.setField(expiredProvider, "jwtExpiration", -1000L); // Expired 1 second ago
        
        String expiredToken = expiredProvider.generateToken(UUID.randomUUID(), Role.USER);

        // Act & Assert
        assertThat(jwtTokenProvider.validateToken(expiredToken)).isFalse();
    }

    @Test
    void validateToken_WithInvalidToken_ShouldReturnFalse() {
        // Arrange
        String invalidToken = "invalid.token.string";

        // Act & Assert
        assertThat(jwtTokenProvider.validateToken(invalidToken)).isFalse();
    }
    
    @Test
    void getUserIdFromToken_WithInvalidToken_ShouldThrowException() {
        // Arrange
        String invalidToken = "invalid.token.string";

        // Act & Assert
        assertThrows(MalformedJwtException.class, () -> jwtTokenProvider.getUserIdFromToken(invalidToken));
    }
}
