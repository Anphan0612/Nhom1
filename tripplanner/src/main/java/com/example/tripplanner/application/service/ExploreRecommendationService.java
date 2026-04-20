package com.example.tripplanner.application.service;

import com.example.tripplanner.domain.model.ExploreItem;
import com.example.tripplanner.domain.model.Trip;
import com.example.tripplanner.domain.port.ExploreRepository;
import com.example.tripplanner.domain.port.TripRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExploreRecommendationService {

    private final ExploreRepository exploreRepository;
    private final TripRepository tripRepository;

    public List<ExploreItem> getRecommendations(UUID userId) {
        List<Trip> pastTrips = tripRepository.findByUserId(userId);
        
        if (pastTrips.isEmpty()) {
            return exploreRepository.findTrending();
        }

        // Logic: Extract common destinations and styles from past trips
        Set<String> pastDestinations = pastTrips.stream()
                .map(Trip::getDestination)
                .map(String::toLowerCase)
                .collect(Collectors.toSet());

        // Since we don't have explicit styles in Trip model yet (they are in preferences string),
        // we'll recommend based on destinations or just return trending + some variety.
        // For this mock implementation, we'll try to find ExploreItems that match past destinations
        // or have high popularity.
        
        List<ExploreItem> allItems = exploreRepository.findTrending(); // Start with trending
        
        // Simple scoring based on destination match
        return allItems.stream()
                .sorted((a, b) -> {
                    boolean matchA = pastDestinations.contains(a.getDestination().toLowerCase());
                    boolean matchB = pastDestinations.contains(b.getDestination().toLowerCase());
                    if (matchA && !matchB) return -1;
                    if (!matchA && matchB) return 1;
                    return b.getPopularityScore().compareTo(a.getPopularityScore());
                })
                .limit(5)
                .collect(Collectors.toList());
    }
}
