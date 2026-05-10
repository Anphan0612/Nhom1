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
            log.warn("Could not create shared_content_images table: {}", e.getMessage());
        }

        // 4. Make shared_content_id nullable in user_votes
        try {
            jdbcTemplate.execute("ALTER TABLE user_votes MODIFY COLUMN shared_content_id CHAR(36) NULL");
            log.info("Successfully made user_votes.shared_content_id nullable.");
        } catch (Exception e) {
            log.warn("Could not modify user_votes.shared_content_id: {}", e.getMessage());
        }

        // 5. Ensure explore_item_id column exists in user_votes
        try {
            // Use a safer way to add column if not exists for MySQL
            jdbcTemplate.execute("ALTER TABLE user_votes ADD COLUMN IF NOT EXISTS explore_item_id CHAR(36) NULL");
            log.info("Ensured user_votes.explore_item_id column exists.");
        } catch (Exception e) {
            log.warn("Could not add user_votes.explore_item_id (it might already exist): {}", e.getMessage());
        }
    }
}
