package com.example.tripplanner.application.service;

import com.example.tripplanner.domain.model.NotificationPayload;
import com.example.tripplanner.domain.model.SharedContent;
import com.example.tripplanner.domain.model.UserVote;
import com.example.tripplanner.domain.model.ExploreItem;
import com.example.tripplanner.domain.port.ExploreRepository;
import com.example.tripplanner.domain.port.SharedContentRepository;
import com.example.tripplanner.domain.port.UserVoteRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class InteractionService {

    private final SimpMessagingTemplate messagingTemplate;
    private final SharedContentRepository sharedContentRepository;
    private final ExploreRepository exploreRepository;
    private final UserVoteRepository userVoteRepository;

    @Transactional
    public void processLike(UUID experienceId, UUID likerId) {
        // 1. Try to find as SharedContent (Community post)
        Optional<SharedContent> contentOpt = sharedContentRepository.findById(experienceId);
        if (contentOpt.isPresent()) {
            handleSharedContentLike(contentOpt.get(), likerId);
            return;
        }

        // 2. Try to find as ExploreItem (Pre-populated trip/destination)
        Optional<ExploreItem> exploreOpt = exploreRepository.findById(experienceId);
        if (exploreOpt.isPresent()) {
            handleExploreItemLike(exploreOpt.get(), likerId);
            return;
        }

        log.warn("Entity {} not found for liking in either SharedContent or ExploreItem", experienceId);
    }

    private void handleSharedContentLike(SharedContent content, UUID likerId) {
        UUID experienceId = content.getId();
        UUID ownerId = content.getUser().getId();

        Optional<UserVote> existingVote = userVoteRepository.findByUserIdAndSharedContentId(likerId, experienceId);
        boolean isLiking = existingVote.isEmpty();

        if (isLiking) {
            UserVote newVote = UserVote.builder()
                    .userId(likerId)
                    .sharedContentId(experienceId)
                    .stars(1)
                    .createdAt(LocalDateTime.now())
                    .build();
            userVoteRepository.save(newVote);
            log.info("[Interaction] User {} LIKED SharedContent {}", likerId, experienceId);
        } else {
            userVoteRepository.delete(existingVote.get());
            log.info("[Interaction] User {} UNLIKED SharedContent {}", likerId, experienceId);
        }

        userVoteRepository.flush();
        int exactLikeCount = userVoteRepository.countBySharedContentId(experienceId);
        
        content.setTotalVotes(exactLikeCount);
        sharedContentRepository.save(content);
        
        broadcastLikeUpdate(experienceId, exactLikeCount);

        if (isLiking && !likerId.equals(ownerId)) {
            sendLikeNotification(ownerId, experienceId, likerId);
        }
    }

    private void handleExploreItemLike(ExploreItem item, UUID likerId) {
        UUID exploreItemId = item.getId();

        Optional<UserVote> existingVote = userVoteRepository.findByUserIdAndExploreItemId(likerId, exploreItemId);
        boolean isLiking = existingVote.isEmpty();

        if (isLiking) {
            UserVote newVote = UserVote.builder()
                    .userId(likerId)
                    .exploreItemId(exploreItemId)
                    .stars(1)
                    .createdAt(LocalDateTime.now())
                    .build();
            userVoteRepository.save(newVote);
            log.info("[Interaction] User {} LIKED ExploreItem {}", likerId, exploreItemId);
        } else {
            userVoteRepository.delete(existingVote.get());
            log.info("[Interaction] User {} UNLIKED ExploreItem {}", likerId, exploreItemId);
        }

        userVoteRepository.flush();
        int exactLikeCount = userVoteRepository.countByExploreItemId(exploreItemId);
        
        item.setTotalVotes(exactLikeCount);
        exploreRepository.save(item);
        
        broadcastLikeUpdate(exploreItemId, exactLikeCount);
    }

    private void broadcastLikeUpdate(UUID id, int count) {
        String publicTopic = "/topic/experiences/" + id.toString();
        messagingTemplate.convertAndSend(publicTopic, Map.of("newLikeCount", count));
        log.info("[WebSocket] Broadcasted accurate count {} to topic {}", count, publicTopic);
    }

    private void sendLikeNotification(UUID ownerId, UUID experienceId, UUID likerId) {
        String privateQueue = "/queue/notifications"; 
        NotificationPayload notificationPayload = NotificationPayload.builder()
                .type("LIKE")
                .message("Someone liked your experience post!")
                .experienceId(experienceId)
                .timestamp(System.currentTimeMillis())
                .build();
        
        log.info("[WebSocket] Attempting to send private notification from {} to owner {}", likerId, ownerId);
        messagingTemplate.convertAndSendToUser(ownerId.toString(), privateQueue, notificationPayload);
        log.info("[WebSocket] Private notification SENT to owner {}", ownerId);
    }
}
