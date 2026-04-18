package com.example.tripplanner.domain.port;

import com.example.tripplanner.domain.model.AiLog;
import com.example.tripplanner.domain.model.AiLogStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Map;
import java.util.Optional;

public interface AiLogRepository {
    AiLog save(AiLog aiLog);

    Optional<AiLog> findById(Long id);

    Page<AiLog> findByTripId(String tripId, Pageable pageable);

    Page<AiLog> findByTripIdAndStatus(String tripId, AiLogStatus status, Pageable pageable);

    long countTotal();
    long countByStatus(AiLogStatus status);

    Double getAverageTotalTokens();
    long countByRetryCountGreaterThan(int retryCount);
    Double getAverageRetryCount();
    Map<String, Long> getValidationErrorCounts();
}

