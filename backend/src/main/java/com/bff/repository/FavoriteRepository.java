package com.bff.repository;

import com.bff.entity.Favorite;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    Optional<Favorite> findByUserIdAndFoodId(Long userId, Long foodId);
    Page<Favorite> findByUserIdAndIsFavoritedTrue(Long userId, Pageable pageable);
    boolean existsByUserIdAndFoodIdAndIsFavoritedTrue(Long userId, Long foodId);
}

