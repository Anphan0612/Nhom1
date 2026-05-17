package com.example.tripplanner.application.orchestrator;

import com.example.tripplanner.application.dto.trip.GenerateRequest;
import com.example.tripplanner.application.validator.ValidationResult;
import com.example.tripplanner.application.validator.AiResponseValidator;
import com.example.tripplanner.domain.model.AiLog;
import com.example.tripplanner.domain.model.AiResponse;
import com.example.tripplanner.domain.model.Trip;
import com.example.tripplanner.domain.port.AiLogRepository;
import com.example.tripplanner.domain.port.AiServicePort;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AIOrchestratorTest {

    @Mock
    private AiServicePort aiServicePort;

    @Mock
    private AiLogRepository aiLogRepository;

    @Mock
    private AiResponseValidator validator;

    @Mock
    private AiResponseParser parser;

    @InjectMocks
    private AIOrchestrator orchestrator;

    private Trip testTrip;
    private GenerateRequest generateRequest;

    @BeforeEach
    void setUp() {
        testTrip = Trip.builder()
                .id(UUID.randomUUID())
                .title("Test Trip")
                .destination("Da Nang")
                .startDate(LocalDate.now())
                .endDate(LocalDate.now().plusDays(3))
                .budget(new BigDecimal("10000000"))
                .build();

        generateRequest = new GenerateRequest();
    }

    @Test
    void orchestrate_HappyPath_ShouldSucceed() {
        // Arrange
        // We instantiate the AiResponse record directly instead of mocking
        AiResponse aiResponse = new AiResponse("valid_json", 100, 200, "gpt-4o");

        when(aiServicePort.callAi(anyString())).thenReturn(aiResponse);
        when(validator.validate(anyString())).thenReturn(ValidationResult.ok());
        
        AiLog savedLog = AiLog.builder().id(1L).build();
        when(aiLogRepository.save(any(AiLog.class))).thenReturn(savedLog);
        
        // Act
        Long logId = orchestrator.orchestrate(testTrip, generateRequest);

        // Assert
        assertThat(logId).isEqualTo(1L);
        verify(aiServicePort, times(1)).callAi(anyString());
        verify(validator, times(1)).validate("valid_json");
        verify(parser, times(1)).parseAndPopulate(eq(testTrip), eq("valid_json"));
        verify(aiLogRepository, times(1)).save(any(AiLog.class));
    }

    @Test
    void orchestrate_FallbackError_ShouldRetryAndSucceed() {
        // Arrange
        AiResponse badResponse = new AiResponse("bad_json", 10, 20, "gpt-4o");
        AiResponse goodResponse = new AiResponse("valid_json", 100, 200, "gpt-4o");
        
        when(aiServicePort.callAi(anyString()))
                .thenReturn(badResponse) // first attempt
                .thenReturn(goodResponse); // second attempt

        when(validator.validate("bad_json")).thenReturn(ValidationResult.fail("Invalid JSON"));
        when(validator.validate("valid_json")).thenReturn(ValidationResult.ok());

        AiLog savedLog = AiLog.builder().id(2L).build();
        when(aiLogRepository.save(any(AiLog.class))).thenReturn(savedLog);

        // Act
        Long logId = orchestrator.orchestrate(testTrip, generateRequest);

        // Assert
        assertThat(logId).isEqualTo(2L);
        verify(aiServicePort, times(2)).callAi(anyString()); // Retried once
        verify(parser, times(1)).parseAndPopulate(eq(testTrip), eq("valid_json"));
        verify(aiLogRepository, times(1)).save(any(AiLog.class));
    }

    @Test
    void orchestrate_MaxRetriesExceeded_ShouldThrowException() {
        // Arrange
        AiResponse badResponse = new AiResponse("bad_json", 10, 20, "gpt-4o");
        
        // Always fail
        when(aiServicePort.callAi(anyString())).thenReturn(badResponse);
        when(validator.validate(anyString())).thenReturn(ValidationResult.fail("Invalid JSON"));

        AiLog savedLog = AiLog.builder().id(3L).build();
        when(aiLogRepository.save(any(AiLog.class))).thenReturn(savedLog);

        // Act & Assert
        RuntimeException exception = assertThrows(RuntimeException.class, 
                () -> orchestrator.orchestrate(testTrip, generateRequest));
        
        assertThat(exception.getMessage()).contains("AI generation failed after");

        verify(aiServicePort, times(3)).callAi(anyString()); // Max retries
        verify(parser, never()).parseAndPopulate(any(), any());
        verify(aiLogRepository, times(1)).save(any(AiLog.class)); // Log should still be saved even if failed
    }
}
