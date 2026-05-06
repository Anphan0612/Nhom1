package com.example.tripplanner.interfaces.controller;

import com.example.tripplanner.application.dto.ShareContentRequest;
import com.example.tripplanner.application.dto.SharedContentResponse;
import com.example.tripplanner.application.usecase.GetTrendingContentUseCase;
import com.example.tripplanner.application.usecase.ShareContentUseCase;
import com.example.tripplanner.application.usecase.UpvoteContentUseCase;
import com.example.tripplanner.domain.model.ShareType;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/community")
@RequiredArgsConstructor
public class CommunityController {

    private final ShareContentUseCase shareContentUseCase;
    private final UpvoteContentUseCase upvoteContentUseCase;
    private final GetTrendingContentUseCase getTrendingContentUseCase;

    @PostMapping("/share")
    public ResponseEntity<SharedContentResponse> shareContent(
            Principal principal,
            @RequestBody ShareContentRequest request) {
        if (principal == null) {
            return ResponseEntity.status(401).build();
        }
        UUID userId = UUID.fromString(principal.getName());
        return ResponseEntity.ok(shareContentUseCase.execute(userId, request));
    }

    @PostMapping("/{id}/vote")
    public ResponseEntity<SharedContentResponse> upvote(@PathVariable UUID id) {
        return ResponseEntity.ok(upvoteContentUseCase.execute(id));
    }

    @GetMapping("/trending")
    public ResponseEntity<List<SharedContentResponse>> getTrending(
            @RequestParam ShareType type,
            @RequestParam(defaultValue = "6") int limit) {
        return ResponseEntity.ok(getTrendingContentUseCase.execute(type, limit));
    }
}
