package com.example.tripplanner.application.mapper;

import com.example.tripplanner.application.dto.ActivityResponse;
import com.example.tripplanner.application.dto.ItineraryResponse;
import com.example.tripplanner.application.dto.RecommendationResponse;
import com.example.tripplanner.application.dto.TripResponse;
import com.example.tripplanner.domain.model.Activity;
import com.example.tripplanner.domain.model.Itinerary;
import com.example.tripplanner.domain.model.Recommendation;
import com.example.tripplanner.domain.model.Trip;

import java.util.List;

public final class TripMapper {

    private TripMapper() {}

    public static TripResponse toResponse(Trip trip) {
        return TripResponse.builder()
                .id(trip.getId())
                .userId(trip.getUser().getId())
                .title(trip.getTitle())
                .destination(trip.getDestination())
                .startDate(trip.getStartDate())
                .endDate(trip.getEndDate())
                .budget(trip.getBudget())
                .status(trip.getStatus())
                .createdAt(trip.getCreatedAt())
                .totalCost(trip.getTotalCost())
                .recommendations(trip.getRecommendations().stream()
                        .map(TripMapper::toRecommendationResponse)
                        .toList())
                .build();
    }

    public static ItineraryResponse toItineraryResponse(Itinerary itinerary) {
        List<ActivityResponse> activities = itinerary.getActivities() != null 
                ? itinerary.getActivities().stream()
                    .map(TripMapper::toActivityResponse)
                    .toList()
                : List.of();

        return ItineraryResponse.builder()
                .id(itinerary.getId())
                .tripId(itinerary.getTrip() != null ? itinerary.getTrip().getId() : null)
                .dayNumber(itinerary.getDayNumber())
                .date(itinerary.getDate())
                .summary(itinerary.getSummary())
                .activities(activities)
                .build();
    }

    public static ActivityResponse toActivityResponse(Activity activity) {
        return ActivityResponse.builder()
                .id(activity.getId())
                .itineraryId(activity.getItinerary() != null ? activity.getItinerary().getId() : null)
                .name(activity.getName())
                .description(activity.getDescription())
                .location(activity.getLocation())
                .startTime(activity.getStartTime())
                .endTime(activity.getEndTime())
                .cost(activity.getCost())
                .activityOrder(activity.getActivityOrder())
                .build();
    }

    public static RecommendationResponse toRecommendationResponse(Recommendation recommendation) {
        return RecommendationResponse.builder()
                .id(recommendation.getId())
                .name(recommendation.getName())
                .type(recommendation.getType())
                .description(recommendation.getDescription())
                .location(recommendation.getLocation())
                .priceLevel(recommendation.getPriceLevel())
                .build();
    }
}
