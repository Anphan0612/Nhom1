package com.example.tripplanner.application.usecase;

import com.example.tripplanner.application.dto.ShareContentRequest;
import com.example.tripplanner.application.dto.SharedContentResponse;
import com.example.tripplanner.application.mapper.TripMapper;
import com.example.tripplanner.domain.model.*;
import com.example.tripplanner.domain.port.ActivityRepository;
import com.example.tripplanner.domain.port.SharedContentRepository;
import com.example.tripplanner.domain.port.TripRepository;
import com.example.tripplanner.domain.port.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ShareContentUseCase {

    private final SharedContentRepository sharedContentRepository;
    private final UserRepository userRepository;
    private final ActivityRepository activityRepository;
    private final TripRepository tripRepository;

    @Transactional
    public SharedContentResponse execute(UUID userId, ShareContentRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (request.getType() == ShareType.ACTIVITY) {
            Activity activity = activityRepository.findById(request.getRefId())
                    .orElseThrow(() -> new RuntimeException("Activity not found"));
        } else if (request.getType() == ShareType.TRIP) {
            Trip trip = tripRepository.findById(request.getRefId())
                    .orElseThrow(() -> new RuntimeException("Trip not found"));
            if (!trip.getUser().getId().equals(userId)) {
                throw new RuntimeException("Trip does not belong to user");
            }
        }

        SharedContent content = SharedContent.builder()
                .user(user)
                .type(request.getType())
                .refId(request.getRefId())
                .content(request.getContent())
                .rating(request.getRating())
                .totalVotes(0)
                .status(ShareStatus.PUBLISHED)
                .build();

        SharedContent saved = sharedContentRepository.save(content);

        return SharedContentResponse.builder()
                .id(saved.getId())
                .user(TripMapper.toUserResponse(saved.getUser()))
                .type(saved.getType())
                .refId(saved.getRefId())
                .content(saved.getContent())
                .rating(saved.getRating())
                .totalVotes(saved.getTotalVotes())
                .status(saved.getStatus())
                .createdAt(saved.getCreatedAt())
                .build();
    }
}
