package com.example.tripplanner.domain.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "itineraries", 
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"trip_id", "day_number"})
    },
    indexes = {
        @Index(name = "idx_itinerary_trip_id", columnList = "trip_id")
    }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Itinerary {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(columnDefinition = "CHAR(36)")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id", nullable = false)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Trip trip;

    @Column(name = "day_number", nullable = false)
    private Integer dayNumber;

    private LocalDate date;

    @Column(columnDefinition = "TEXT")
    private String summary;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "itinerary", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("activityOrder ASC")
    @Builder.Default
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<Activity> activities = new ArrayList<>();
}
