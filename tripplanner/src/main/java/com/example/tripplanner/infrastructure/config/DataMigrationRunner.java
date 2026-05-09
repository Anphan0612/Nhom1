package com.example.tripplanner.infrastructure.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.annotation.Order;

@Component
@RequiredArgsConstructor
@Slf4j
@Order(1)
public class DataMigrationRunner implements CommandLineRunner {

    private final JdbcTemplate jdbcTemplate;

    @Override
    public void run(String... args) throws Exception {
        log.info("Running DataMigrationRunner to fix NULL versions, column lengths, and ensure tables...");
        
        // 1. Expand shared_contents.type column
        try {
            jdbcTemplate.execute("ALTER TABLE shared_contents MODIFY COLUMN type VARCHAR(50)");
            log.info("Successfully expanded shared_contents.type column to VARCHAR(50)");
        } catch (Exception e) {
            log.warn("Could not alter shared_contents.type (maybe it's already correct): {}", e.getMessage());
        }

        // 2. Fix NULL versions in explore_items
        int updated = jdbcTemplate.update("UPDATE explore_items SET version = 0 WHERE version IS NULL");
        log.info("Fixed {} explore_items records with NULL version.", updated);

        // 3. Ensure shared_content_images table exists for @ElementCollection
        try {
            jdbcTemplate.execute(
                "CREATE TABLE IF NOT EXISTS shared_content_images (" +
                "  shared_content_id CHAR(36) NOT NULL, " +
                "  image_url VARCHAR(1024), " +
                "  FOREIGN KEY (shared_content_id) REFERENCES shared_contents(id) ON DELETE CASCADE" +
                ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4"
            );
            log.info("Ensured shared_content_images table exists.");
        } catch (Exception e) {
            log.warn("Could not create shared_content_images table (may already exist or Hibernate will handle it): {}", e.getMessage());
        }

        // 4. Force Cleanup as requested
        log.info("Performing forced database cleanup...");
        try {
            jdbcTemplate.execute("DELETE FROM shared_content_images");
            jdbcTemplate.execute("DELETE FROM shared_contents");
            log.info("Deleted all shared content and image records.");
        } catch (Exception e) {
            log.warn("Cleanup DELETE failed: {}", e.getMessage());
        }

        try {
            // Updating activities and trips counters (if columns exist)
            jdbcTemplate.update("UPDATE activities SET total_votes = 0, rating = 0, total_rating_sum = 0 WHERE 1=1");
            log.info("Reset activities counters.");
        } catch (Exception e) {
            log.warn("Could not update activities counters (columns may not exist): {}", e.getMessage());
        }

        try {
            jdbcTemplate.update("UPDATE trips SET total_votes = 0, rating = 0, total_rating_sum = 0 WHERE 1=1");
            log.info("Reset trips counters.");
        } catch (Exception e) {
            log.warn("Could not update trips counters (columns may not exist): {}", e.getMessage());
        }

        try {
            // Also reset explore_items as it's common in this project
            jdbcTemplate.update("UPDATE explore_items SET average_rating = 0, review_count = 0 WHERE 1=1");
            log.info("Reset explore_items counters.");
        } catch (Exception e) {
            log.warn("Could not update explore_items counters: {}", e.getMessage());
        }
    }
}
