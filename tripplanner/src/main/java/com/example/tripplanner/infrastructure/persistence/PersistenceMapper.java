package com.example.tripplanner.infrastructure.persistence;

import com.example.tripplanner.domain.model.*;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.stream.Collectors;

@Component
public class PersistenceMapper {

    // User mapping
    public UserEntity toEntity(User domain) {
        if (domain == null) return null;
        return UserEntity.builder()
                .id(domain.getId())
                .email(domain.getEmail())
                .password(domain.getPassword())
                .name(domain.getName())
                .role(domain.getRole())
                .createdAt(domain.getCreatedAt())
                .build();
    }

    public User toDomain(UserEntity entity) {
        if (entity == null) return null;
        return User.builder()
                .id(entity.getId())
                .email(entity.getEmail())
                .password(entity.getPassword())
                .name(entity.getName())
                .role(entity.getRole())
                .createdAt(entity.getCreatedAt())
                .build();
    }

    // Trip mapping
    public TripEntity toEntity(Trip domain) {
        if (domain == null) return null;
        TripEntity entity = TripEntity.builder()
                .id(domain.getId())
                .user(toEntity(domain.getUser()))
                .title(domain.getTitle())
                .destination(domain.getDestination())
                .startDate(domain.getStartDate())
                .endDate(domain.getEndDate())
                .budget(domain.getBudget())
                .status(domain.getStatus())
                .createdAt(domain.getCreatedAt())
                .build();
        
        if (domain.getItineraries() != null) {
            entity.setItineraries(domain.getItineraries().stream()
                    .map(it -> toEntity(it, entity))
                    .collect(Collectors.toList()));
        }
        return entity;
    }

    public Trip toDomain(TripEntity entity) {
        if (entity == null) return null;
        Trip domain = Trip.builder()
                .id(entity.getId())
                .user(toDomain(entity.getUser()))
                .title(entity.getTitle())
                .destination(entity.getDestination())
                .startDate(entity.getStartDate())
                .endDate(entity.getEndDate())
                .budget(entity.getBudget())
                .status(entity.getStatus())
                .createdAt(entity.getCreatedAt())
                .build();

        if (entity.getItineraries() != null) {
            domain.setItineraries(entity.getItineraries().stream()
                    .map(this::toDomain)
                    .collect(Collectors.toList()));
        }
        return domain;
    }

    // Itinerary mapping
    public ItineraryEntity toEntity(Itinerary domain) {
        if (domain == null) return null;
        return toEntity(domain, toEntity(domain.getTrip()));
    }

    public ItineraryEntity toEntity(Itinerary domain, TripEntity tripEntity) {
        if (domain == null) return null;
        ItineraryEntity entity = ItineraryEntity.builder()
                .id(domain.getId())
                .trip(tripEntity)
                .dayNumber(domain.getDayNumber())
                .date(domain.getDate())
                .summary(domain.getSummary())
                .createdAt(domain.getCreatedAt())
                .build();
        
        if (domain.getActivities() != null) {
            entity.setActivities(domain.getActivities().stream()
                    .map(act -> toEntity(act, entity))
                    .collect(Collectors.toList()));
        }
        return entity;
    }

    public Itinerary toDomain(ItineraryEntity entity) {
        if (entity == null) return null;
        Itinerary domain = Itinerary.builder()
                .id(entity.getId())
                .dayNumber(entity.getDayNumber())
                .date(entity.getDate())
                .summary(entity.getSummary())
                .createdAt(entity.getCreatedAt())
                .build();

        if (entity.getActivities() != null) {
            domain.setActivities(entity.getActivities().stream()
                    .map(this::toDomain)
                    .collect(Collectors.toList()));
        }
        return domain;
    }

    // Activity mapping
    public ActivityEntity toEntity(Activity domain) {
        if (domain == null) return null;
        return toEntity(domain, toEntity(domain.getItinerary()));
    }

    public ActivityEntity toEntity(Activity domain, ItineraryEntity itineraryEntity) {
        if (domain == null) return null;
        return ActivityEntity.builder()
                .id(domain.getId())
                .itinerary(itineraryEntity)
                .name(domain.getName())
                .description(domain.getDescription())
                .location(domain.getLocation())
                .startTime(domain.getStartTime())
                .endTime(domain.getEndTime())
                .cost(domain.getCost())
                .activityOrder(domain.getActivityOrder())
                .createdAt(domain.getCreatedAt())
                .build();
    }

    public Activity toDomain(ActivityEntity entity) {
        if (entity == null) return null;
        return Activity.builder()
                .id(entity.getId())
                .name(entity.getName())
                .description(entity.getDescription())
                .location(entity.getLocation())
                .startTime(entity.getStartTime())
                .endTime(entity.getEndTime())
                .cost(entity.getCost())
                .activityOrder(entity.getActivityOrder())
                .createdAt(entity.getCreatedAt())
                .build();
    }

    // AiLog mapping
    public AiLogEntity toEntity(AiLog domain) {
        if (domain == null) return null;
        return AiLogEntity.builder()
                .id(domain.getId())
                .tripId(domain.getTripId())
                .userInput(domain.getUserInput())
                .prompt(domain.getPrompt())
                .response(domain.getResponse())
                .model(domain.getModel())
                .promptTokens(domain.getPromptTokens())
                .completionTokens(domain.getCompletionTokens())
                .totalTokens(domain.getTotalTokens())
                .status(domain.getStatus())
                .retryCount(domain.getRetryCount())
                .errorMessage(domain.getErrorMessage())
                .validationType(domain.getValidationType())
                .executionTime(domain.getExecutionTime())
                .promptVersion(domain.getPromptVersion())
                .createdAt(domain.getCreatedAt())
                .build();
    }

    public AiLog toDomain(AiLogEntity entity) {
        if (entity == null) return null;
        return AiLog.builder()
                .id(entity.getId())
                .tripId(entity.getTripId())
                .userInput(entity.getUserInput())
                .prompt(entity.getPrompt())
                .response(entity.getResponse())
                .model(entity.getModel())
                .promptTokens(entity.getPromptTokens())
                .completionTokens(entity.getCompletionTokens())
                .totalTokens(entity.getTotalTokens())
                .status(entity.getStatus())
                .retryCount(entity.getRetryCount())
                .errorMessage(entity.getErrorMessage())
                .validationType(entity.getValidationType())
                .executionTime(entity.getExecutionTime())
                .promptVersion(entity.getPromptVersion())
                .createdAt(entity.getCreatedAt())
                .build();
    }
    // --- ExploreItem Mapping ---

    public ExploreItem toExploreItem(ExploreItemEntity entity) {
        if (entity == null) return null;
        return ExploreItem.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .destination(entity.getDestination())
                .type(entity.getType())
                .tags(new ArrayList<>(entity.getTags()))
                .minBudget(entity.getMinBudget())
                .maxBudget(entity.getMaxBudget())
                .durationDays(entity.getDurationDays())
                .thumbnailUrl(entity.getThumbnailUrl())
                .popularityScore(entity.getPopularityScore())
                .build();
    }

    public ExploreItemEntity toExploreItemEntity(ExploreItem domain) {
        if (domain == null) return null;
        return ExploreItemEntity.builder()
                .id(domain.getId())
                .title(domain.getTitle())
                .destination(domain.getDestination())
                .type(domain.getType())
                .tags(new ArrayList<>(domain.getTags()))
                .minBudget(domain.getMinBudget())
                .maxBudget(domain.getMaxBudget())
                .durationDays(domain.getDurationDays())
                .thumbnailUrl(domain.getThumbnailUrl())
                .popularityScore(domain.getPopularityScore())
                .build();
    }
}
