package com.example.tripplanner.domain.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "ai_logs", indexes = {
    @Index(name = "idx_ai_log_trip_id", columnList = "trip_id"),
    @Index(name = "idx_ai_log_status", columnList = "status")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AiLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "trip_id", length = 36)
    private String tripId;

    @Column(columnDefinition = "TEXT")
    private String userInput;

    @Column(columnDefinition = "TEXT")
    private String prompt;

    @Column(columnDefinition = "TEXT")
    private String response;

    private String model;
    private Integer promptTokens;
    private Integer completionTokens;
    private Integer totalTokens;

    @Enumerated(EnumType.STRING)
    @Column(length = 20, nullable = false)
    private AiLogStatus status;

    private Integer retryCount;

    @Column(columnDefinition = "TEXT")
    private String errorMessage;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ValidationType validationType;

    private Long executionTime;
    private String promptVersion;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (status == null) status = AiLogStatus.PENDING;
        if (retryCount == null) retryCount = 0;
    }
}
