package com.example.tripplanner.infrastructure.persistence;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "activity_candidates")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ActivityCandidateEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(columnDefinition = "CHAR(36)")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id", nullable = false)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private TripEntity trip;

    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String location;

    private BigDecimal cost;

    private boolean selected;
}
