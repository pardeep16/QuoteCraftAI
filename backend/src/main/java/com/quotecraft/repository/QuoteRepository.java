package com.quotecraft.repository;

import com.quotecraft.entity.Quote;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface QuoteRepository extends JpaRepository<Quote,Long> {
    Page<Quote> findByUserIdAndToneContainingIgnoreCaseAndTopicContainingIgnoreCase(
            Long userId,
            String tone,
            String topic,
            Pageable pageable
    );

    Optional<Quote> findByIdAndUserId(Long id, Long userId);
}
