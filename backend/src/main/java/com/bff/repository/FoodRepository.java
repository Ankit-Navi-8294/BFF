package com.bff.repository;

import com.bff.entity.Food;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {
    Optional<Food> findByName(String name);
    Page<Food> findByAvailableTrue(Pageable pageable);
    Page<Food> findByCategoryId(Long categoryId, Pageable pageable);
    Page<Food> findByRegionId(Long regionId, Pageable pageable);
    Page<Food> findByCuisineId(Long cuisineId, Pageable pageable);
    Page<Food> findByVegetarianTrue(Pageable pageable);
    
    @Query("SELECT f FROM Food f WHERE f.available = true ORDER BY f.rating DESC")
    Page<Food> findTopRatedFoods(Pageable pageable);
    
    @Query("SELECT f FROM Food f WHERE " +
           "f.available = true AND " +
           "(:name IS NULL OR LOWER(f.name) LIKE LOWER(CONCAT('%', :name, '%'))) AND " +
           "(:categoryId IS NULL OR f.category.id = :categoryId) AND " +
           "(:regionId IS NULL OR f.region.id = :regionId) AND " +
           "(:cuisineId IS NULL OR f.cuisine.id = :cuisineId) AND " +
           "(:vegetarian IS NULL OR f.vegetarian = :vegetarian) AND " +
           "(:minPrice IS NULL OR f.price >= :minPrice) AND " +
           "(:maxPrice IS NULL OR f.price <= :maxPrice) AND " +
           "(:spiceLevel IS NULL OR f.spiceLevel <= :spiceLevel)")
    Page<Food> searchAndFilter(
            @Param("name") String name,
            @Param("categoryId") Long categoryId,
            @Param("regionId") Long regionId,
            @Param("cuisineId") Long cuisineId,
            @Param("vegetarian") Boolean vegetarian,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            @Param("spiceLevel") Integer spiceLevel,
            Pageable pageable
    );
    
    List<Food> findTop10ByAvailableTrueOrderByRatingDesc();
}
