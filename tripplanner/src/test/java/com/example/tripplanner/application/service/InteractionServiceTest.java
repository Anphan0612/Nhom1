package com.example.tripplanner.application.service;

import com.example.tripplanner.domain.model.ExploreItem;
import com.example.tripplanner.domain.model.SharedContent;
import com.example.tripplanner.domain.model.User;
import com.example.tripplanner.domain.model.UserVote;
import com.example.tripplanner.domain.port.ExploreRepository;
import com.example.tripplanner.domain.port.SharedContentRepository;
import com.example.tripplanner.domain.port.UserVoteRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.util.Optional;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class InteractionServiceTest {

    @Mock
    private SimpMessagingTemplate messagingTemplate;

    @Mock
    private SharedContentRepository sharedContentRepository;

    @Mock
    private ExploreRepository exploreRepository;

    @Mock
    private UserVoteRepository userVoteRepository;

    @InjectMocks
    private InteractionService interactionService;

    private UUID experienceId;
    private UUID likerId;
    private UUID ownerId;
    private User owner;

    @BeforeEach
    void setUp() {
        experienceId = UUID.randomUUID();
        likerId = UUID.randomUUID();
        ownerId = UUID.randomUUID();
        owner = User.builder().id(ownerId).build();
    }

    @Test
    void processLike_WithNewLikeOnSharedContent_ShouldSaveVoteAndNotify() {
        // Arrange
        SharedContent content = SharedContent.builder()
                .id(experienceId)
                .user(owner)
                .build();
        
        when(sharedContentRepository.findById(experienceId)).thenReturn(Optional.of(content));
        when(userVoteRepository.findByUserIdAndSharedContentId(likerId, experienceId)).thenReturn(Optional.empty());
        when(userVoteRepository.countBySharedContentId(experienceId)).thenReturn(1);

        // Act
        interactionService.processLike(experienceId, likerId);

        // Assert
        verify(userVoteRepository).save(any(UserVote.class));
        verify(userVoteRepository, never()).delete(any());
        verify(sharedContentRepository).save(content);
        verify(messagingTemplate).convertAndSend(eq("/topic/experiences/" + experienceId), any(Object.class));
        verify(messagingTemplate).convertAndSendToUser(eq(ownerId.toString()), eq("/queue/notifications"), any(Object.class));
    }

    @Test
    void processLike_WithExistingLikeOnSharedContent_ShouldDeleteVote() {
        // Arrange
        SharedContent content = SharedContent.builder()
                .id(experienceId)
                .user(owner)
                .build();
        UserVote existingVote = UserVote.builder().build();

        when(sharedContentRepository.findById(experienceId)).thenReturn(Optional.of(content));
        when(userVoteRepository.findByUserIdAndSharedContentId(likerId, experienceId)).thenReturn(Optional.of(existingVote));
        when(userVoteRepository.countBySharedContentId(experienceId)).thenReturn(0);

        // Act
        interactionService.processLike(experienceId, likerId);

        // Assert
        verify(userVoteRepository, never()).save(any());
        verify(userVoteRepository).delete(existingVote);
        verify(sharedContentRepository).save(content);
        verify(messagingTemplate).convertAndSend(eq("/topic/experiences/" + experienceId), any(Object.class));
        verify(messagingTemplate, never()).convertAndSendToUser(anyString(), anyString(), any(Object.class));
    }

    @Test
    void processLike_WithExploreItem_ShouldProcessSuccessfully() {
        // Arrange
        ExploreItem exploreItem = ExploreItem.builder().id(experienceId).build();
        
        when(sharedContentRepository.findById(experienceId)).thenReturn(Optional.empty());
        when(exploreRepository.findById(experienceId)).thenReturn(Optional.of(exploreItem));
        when(userVoteRepository.findByUserIdAndExploreItemId(likerId, experienceId)).thenReturn(Optional.empty());
        when(userVoteRepository.countByExploreItemId(experienceId)).thenReturn(5);

        // Act
        interactionService.processLike(experienceId, likerId);

        // Assert
        verify(userVoteRepository).save(any(UserVote.class));
        verify(exploreRepository).save(exploreItem);
        verify(messagingTemplate).convertAndSend(eq("/topic/experiences/" + experienceId), any(Object.class));
        // ExploreItem likes don't send private notifications
        verify(messagingTemplate, never()).convertAndSendToUser(anyString(), anyString(), any(Object.class));
    }

    @Test
    void processLike_WithNotFoundEntity_ShouldDoNothing() {
        // Arrange
        when(sharedContentRepository.findById(experienceId)).thenReturn(Optional.empty());
        when(exploreRepository.findById(experienceId)).thenReturn(Optional.empty());

        // Act
        interactionService.processLike(experienceId, likerId);

        // Assert
        verify(userVoteRepository, never()).save(any());
        verify(userVoteRepository, never()).delete(any());
    }
}
