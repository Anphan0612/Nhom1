package com.example.tripplanner.application.usecase;

import com.example.tripplanner.application.dto.SharedContentResponse;
import com.example.tripplanner.application.mapper.TripMapper;
import com.example.tripplanner.domain.model.ShareType;
import com.example.tripplanner.domain.model.SharedContent;
import com.example.tripplanner.domain.port.ActivityRepository;
import com.example.tripplanner.domain.port.SharedContentRepository;
import com.example.tripplanner.domain.port.TripRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GetTrendingContentUseCase {

    private final SharedContentRepository sharedContentRepository;
    private final ActivityRepository activityRepository;
    private final TripRepository tripRepository;

    @Transactional(readOnly = true)
    public List<SharedContentResponse> execute(ShareType type, int limit) {
        return sharedContentRepository.getTrending(type, limit).stream()
                .map(this::buildResponse)
                .collect(Collectors.toList());
    }

    private SharedContentResponse buildResponse(SharedContent content) {
        SharedContentResponse response = SharedContentResponse.builder()
                .id(content.getId())
                .user(TripMapper.toUserResponse(content.getUser()))
                .type(content.getType())
                .refId(content.getRefId())
                .content(content.getContent())
                .rating(content.getRating())
                .totalVotes(content.getTotalVotes())
                .status(content.getStatus())
                .createdAt(content.getCreatedAt())
                .build();

        // Enrich with reference data
        if (content.getType() == ShareType.ACTIVITY) {
            activityRepository.findById(content.getRefId()).ifPresent(act -> {
                response.setReferenceData(TripMapper.toActivityResponse(act));
            });
        } else if (content.getType() == ShareType.TRIP) {
            tripRepository.findById(content.getRefId()).ifPresent(trip -> {
                response.setReferenceData(TripMapper.toResponse(trip));
            });
        }

        return response;
    }
}
