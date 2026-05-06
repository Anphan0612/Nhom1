package com.example.tripplanner.application.usecase;

import com.example.tripplanner.application.dto.SharedContentResponse;
import com.example.tripplanner.application.mapper.TripMapper;
import com.example.tripplanner.domain.model.SharedContent;
import com.example.tripplanner.domain.port.SharedContentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UpvoteContentUseCase {

    private final SharedContentRepository sharedContentRepository;

    @Transactional
    public SharedContentResponse execute(UUID contentId) {
        SharedContent content = sharedContentRepository.findById(contentId)
                .orElseThrow(() -> new RuntimeException("Shared content not found"));
        
        content.setTotalVotes(content.getTotalVotes() + 1);
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
