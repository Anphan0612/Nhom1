package com.example.tripplanner.application.usecase;

import com.example.tripplanner.application.dto.SharedContentResponse;
import com.example.tripplanner.application.mapper.SharedContentMapper;
import com.example.tripplanner.domain.model.ShareStatus;
import com.example.tripplanner.domain.model.SharedContent;
import com.example.tripplanner.domain.port.SharedContentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ModerateContentUseCase {

    private final SharedContentRepository sharedContentRepository;

    @Transactional
    public SharedContentResponse execute(UUID id, ShareStatus status) {
        SharedContent content = sharedContentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Content not found"));

        if (status == ShareStatus.REJECTED) {
            // If rejected, we can either keep it as rejected or just delete it.
            // User requested moderation, so let's set it to rejected or just delete.
            // For now, let's just delete if rejected to keep community clean.
            sharedContentRepository.deleteById(id);
            return null;
        }

        content.setStatus(status);
        SharedContent saved = sharedContentRepository.save(content);
        return SharedContentMapper.toResponse(saved);
    }
}
