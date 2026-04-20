package com.example.tripplanner.application.usecase;

import com.example.tripplanner.domain.model.ExploreItem;
import com.example.tripplanner.domain.port.ExploreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GetExploreItemsUseCase {

    private final ExploreRepository exploreRepository;

    public Page<ExploreItem> execute(String destination, BigDecimal minBudget, BigDecimal maxBudget, Integer durationDays, List<String> tags, Pageable pageable) {
        return exploreRepository.findAll(destination, minBudget, maxBudget, durationDays, tags, pageable);
    }
}
