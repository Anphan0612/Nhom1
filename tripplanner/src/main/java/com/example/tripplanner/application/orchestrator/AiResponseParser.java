package com.example.tripplanner.application.orchestrator;

import com.example.tripplanner.domain.model.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class AiResponseParser {

    private final ObjectMapper objectMapper;

    /**
     * Parses the AI JSON response and populates the Trip object with itineraries,
     * activities, and recommendations.
     */
    public void parseAndPopulate(Trip trip, String jsonContent) {
        try {
            JsonNode root = objectMapper.readTree(jsonContent);

            // 1. Parse Recommendations (Hotels & Restaurants)
            if (root.has("recommendedHotels")) {
                parseRecommendations(trip, root.get("recommendedHotels"), RecommendationType.HOTEL);
            }
            if (root.has("recommendedRestaurants")) {
                parseRecommendations(trip, root.get("recommendedRestaurants"), RecommendationType.RESTAURANT);
            }

            // 2. Parse Activity Candidates (The Pool)
            if (root.has("candidates") && root.get("candidates").isArray()) {
                parseCandidates(trip, root.get("candidates"));
            }

            // 3. Parse Itineraries & Activities (For legacy or fallback)
            if (root.has("days") && root.get("days").isArray()) {
                JsonNode daysNode = root.get("days");
                LocalDate startDate = trip.getStartDate();

                for (int i = 0; i < daysNode.size(); i++) {
                    JsonNode dayNode = daysNode.get(i);
                    int dayNum = dayNode.has("dayNumber") ? dayNode.get("dayNumber").asInt() : (i + 1);

                    Itinerary itinerary = Itinerary.builder()
                            .id(UUID.randomUUID())
                            .trip(trip)
                            .dayNumber(dayNum)
                            .date(startDate.plusDays(dayNum - 1))
                            .summary(dayNode.has("summary") ? dayNode.get("summary").asText() : "Ngày " + dayNum)
                            .activities(new ArrayList<>())
                            .build();

                    if (dayNode.has("activities") && dayNode.get("activities").isArray()) {
                        parseActivities(itinerary, dayNode.get("activities"));
                    }

                    trip.getItineraries().add(itinerary);
                }
            }

        } catch (Exception e) {
            log.error("Failed to parse AI response: {}", e.getMessage(), e);
            throw new RuntimeException("AI response parsing failed", e);
        }
    }

    private void parseRecommendations(Trip trip, JsonNode listNode, RecommendationType type) {
        if (!listNode.isArray())
            return;
        for (JsonNode node : listNode) {
            Recommendation rec = Recommendation.builder()
                    .id(UUID.randomUUID())
                    .name(node.has("name") ? node.get("name").asText() : "Chưa rõ tên")
                    .type(type)
                    .description(node.has("description") ? node.get("description").asText() : "")
                    .location(node.has("location") ? node.get("location").asText() : "")
                    .priceLevel(node.has("priceLevel") ? node.get("priceLevel").asText() : "$$")
                    .build();
            trip.getRecommendations().add(rec);
        }
    }

    private void parseActivities(Itinerary itinerary, JsonNode activitiesNode) {
        for (int i = 0; i < activitiesNode.size(); i++) {
            JsonNode node = activitiesNode.get(i);
            Activity activity = Activity.builder()
                    .id(UUID.randomUUID())
                    .itinerary(itinerary)
                    .name(node.has("name") ? node.get("name").asText() : "Hoạt động")
                    .description(node.has("description") ? node.get("description").asText() : "")
                    .location(node.has("location") ? node.get("location").asText() : "")
                    .startTime(parseTime(node, "startTime", "09:00"))
                    .endTime(parseTime(node, "endTime", "10:30"))
                    .cost(node.has("cost") ? new BigDecimal(node.get("cost").asText()) : BigDecimal.ZERO)
                    .activityOrder(i + 1)
                    .build();
            itinerary.getActivities().add(activity);
        }
    }

    private LocalTime parseTime(JsonNode node, String field, String defaultValue) {
        String timeStr = node.has(field) ? node.get(field).asText() : defaultValue;
        try {
            // Handle HH:mm or HH:mm:ss
            if (timeStr.length() == 5)
                timeStr += ":00";
            return LocalTime.parse(timeStr);
        } catch (Exception e) {
            return LocalTime.parse(defaultValue + ":00");
        }
    }

    private void parseCandidates(Trip trip, JsonNode candidatesNode) {
        if (trip.getCandidates() == null)
            trip.setCandidates(new ArrayList<>());
        for (JsonNode node : candidatesNode) {
            ActivityCandidate can = ActivityCandidate.builder()
                    .id(UUID.randomUUID())
                    .name(node.has("name") ? node.get("name").asText() : "Địa điểm gợi ý")
                    .description(node.has("description") ? node.get("description").asText() : "")
                    .location(node.has("location") ? node.get("location").asText() : "")
                    .cost(node.has("cost") ? new BigDecimal(node.get("cost").asText()) : BigDecimal.ZERO)
                    .selected(false)
                    .build();
            trip.getCandidates().add(can);
        }
    }
}
