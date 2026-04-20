package com.quotecraft.repository;

import com.quotecraft.entity.Favorite;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite,Long> {

    Optional<Favorite> findByUserIdAndQuoteId(Long userId, Long quoteId);

    boolean existsByUserIdAndQuoteId(Long userId, Long quoteId);

    List<Favorite> findByUserIdAndQuoteIdIn(Long userId, Collection<Long> quoteIds);

    Page<Favorite> findByUserId(Long userId, Pageable pageable);
}
