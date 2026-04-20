package com.example.tripplanner.infrastructure.persistence;

import com.example.tripplanner.domain.model.ExploreType;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ExploreDataSeeder implements CommandLineRunner {

    private final JpaExploreItemRepository repository;

    @Override
    public void run(String... args) {
        if (repository.count() > 0) return;

        List<ExploreItemEntity> items = Arrays.asList(
                ExploreItemEntity.builder()
                        .title("Chill 3 days in Da Lat")
                        .destination("Đà Lạt, Việt Nam")
                        .type(ExploreType.EXPERIENCE)
                        .tags(Arrays.asList("Chill", "Nature", "Thư giãn"))
                        .minBudget(new BigDecimal("1500000"))
                        .maxBudget(new BigDecimal("3000000"))
                        .durationDays(3)
                        .thumbnailUrl("/assets/explore/dalat_chill.png")
                        .popularityScore(9.5)
                        .build(),
                ExploreItemEntity.builder()
                        .title("Budget adventure in Da Lat")
                        .destination("Đà Lạt, Việt Nam")
                        .type(ExploreType.EXPERIENCE)
                        .tags(Arrays.asList("Adventure", "Nature", "Phiêu lưu"))
                        .minBudget(new BigDecimal("500000"))
                        .maxBudget(new BigDecimal("1200000"))
                        .durationDays(2)
                        .thumbnailUrl("/assets/explore/dalat_adventure.png")
                        .popularityScore(8.8)
                        .build(),
                ExploreItemEntity.builder()
                        .title("Luxury beach life in Phu Quoc")
                        .destination("Phú Quốc, Việt Nam")
                        .type(ExploreType.EXPERIENCE)
                        .tags(Arrays.asList("Luxury", "Beach", "Thư giãn"))
                        .minBudget(new BigDecimal("10000000"))
                        .maxBudget(new BigDecimal("20000000"))
                        .durationDays(4)
                        .thumbnailUrl("/assets/explore/phuquoc_luxury.png")
                        .popularityScore(9.8)
                        .build(),
                ExploreItemEntity.builder()
                        .title("Family fun in Phu Quoc")
                        .destination("Phú Quốc, Việt Nam")
                        .type(ExploreType.EXPERIENCE)
                        .tags(Arrays.asList("Family", "Beach", "Thư giãn"))
                        .minBudget(new BigDecimal("5000000"))
                        .maxBudget(new BigDecimal("10000000"))
                        .durationDays(3)
                        .thumbnailUrl("/assets/explore/phuquoc_family.png")
                        .popularityScore(9.2)
                        .build(),
                ExploreItemEntity.builder()
                        .title("Modern vibe Da Nang")
                        .destination("Đà Nẵng, Việt Nam")
                        .type(ExploreType.PLACE)
                        .tags(Arrays.asList("Modern", "Beach", "Văn hóa"))
                        .minBudget(new BigDecimal("2000000"))
                        .maxBudget(new BigDecimal("5000000"))
                        .durationDays(3)
                        .thumbnailUrl("/assets/explore/danang_modern.png")
                        .popularityScore(9.4)
                        .build(),
                ExploreItemEntity.builder()
                        .title("Ancient town Hoi An")
                        .destination("Hội An, Việt Nam")
                        .type(ExploreType.PLACE)
                        .tags(Arrays.asList("History", "Culture", "Văn hóa"))
                        .minBudget(new BigDecimal("500000"))
                        .maxBudget(new BigDecimal("1500000"))
                        .durationDays(1)
                        .thumbnailUrl("/assets/explore/hoian_ancient.png")
                        .popularityScore(9.7)
                        .build(),
                ExploreItemEntity.builder()
                        .title("Trekking Sa Pa")
                        .destination("Sa Pa, Việt Nam")
                        .type(ExploreType.EXPERIENCE)
                        .tags(Arrays.asList("Nature", "Adventure", "Phiêu lưu"))
                        .minBudget(new BigDecimal("1000000"))
                        .maxBudget(new BigDecimal("2500000"))
                        .durationDays(3)
                        .thumbnailUrl("/assets/explore/sapa_trekking.png")
                        .popularityScore(9.1)
                        .build(),
                ExploreItemEntity.builder()
                        .title("Luxury retreat Sa Pa")
                        .destination("Sa Pa, Việt Nam")
                        .type(ExploreType.EXPERIENCE)
                        .tags(Arrays.asList("Nature", "Relax", "Thư giãn"))
                        .minBudget(new BigDecimal("6000000"))
                        .maxBudget(new BigDecimal("12000000"))
                        .durationDays(2)
                        .thumbnailUrl("/assets/explore/sapa_luxury.png")
                        .popularityScore(8.9)
                        .build(),
                ExploreItemEntity.builder()
                        .title("Street food tour Ha Noi")
                        .destination("Hà Nội, Việt Nam")
                        .type(ExploreType.EXPERIENCE)
                        .tags(Arrays.asList("Food", "Culture", "Ẩm thực"))
                        .minBudget(new BigDecimal("300000"))
                        .maxBudget(new BigDecimal("800000"))
                        .durationDays(1)
                        .thumbnailUrl("/assets/explore/hanoi_food.png")
                        .popularityScore(9.6)
                        .build(),
                ExploreItemEntity.builder()
                        .title("Old Quarter walk Ha Noi")
                        .destination("Hà Nội, Việt Nam")
                        .type(ExploreType.PLACE)
                        .tags(Arrays.asList("Culture", "History", "Văn hóa"))
                        .minBudget(new BigDecimal("200000"))
                        .maxBudget(new BigDecimal("500000"))
                        .durationDays(1)
                        .thumbnailUrl("/assets/explore/hanoi_culture.png")
                        .popularityScore(9.0)
                        .build()
        );

        repository.saveAll(items);
    }
}
