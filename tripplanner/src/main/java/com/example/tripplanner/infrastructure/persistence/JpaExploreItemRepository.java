package com.example.tripplanner.infrastructure.persistence;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public interface JpaExploreItemRepository extends JpaRepository<ExploreItemEntity, UUID> {

    @Query("SELECT DISTINCT e FROM ExploreItemEntity e LEFT JOIN e.tags t " +
           "WHERE (:destination IS NULL OR LOWER(e.destination) LIKE LOWER(CONCAT('%', :destination, '%'))) " +
           "AND (:minBudget IS NULL OR e.maxBudget >= :minBudget) " +
           "AND (:maxBudget IS NULL OR e.minBudget <= :maxBudget) " +
           "AND (:durationDays IS NULL OR e.durationDays = :durationDays) " +
           "AND (COALESCE(:tags, NULL) IS NULL OR t IN :tags)")
    Page<ExploreItemEntity> findWithFilters(
            @Param("destination") String destination,
            @Param("minBudget") BigDecimal minBudget,
            @Param("maxBudget") BigDecimal maxBudget,
            @Param("durationDays") Integer durationDays,
            @Param("tags") List<String> tags,
            Pageable pageable);

    List<ExploreItemEntity> findTop5ByOrderByPopularityScoreDesc();

    @Query("SELECT DISTINCT e FROM ExploreItemEntity e JOIN e.tags t WHERE t IN :tags")
    List<ExploreItemEntity> findByTagsIn(@Param("tags") List<String> tags);
}
