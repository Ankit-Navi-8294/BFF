package com.bff.service;

import com.bff.dto.FoodDTO;
import com.bff.entity.Food;
import com.bff.exception.ResourceNotFoundException;
import com.bff.repository.CategoryRepository;
import com.bff.repository.CuisineRepository;
import com.bff.repository.FoodRepository;
import com.bff.repository.RegionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Food Service for food management and retrieval
 */
@Service
@Transactional(readOnly = true)
public class FoodService {

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private RegionRepository regionRepository;

    @Autowired
    private CuisineRepository cuisineRepository;

    /**
     * Get all foods with pagination
     */
    public Page<FoodDTO> getAllFoods(Pageable pageable) {
        return foodRepository.findByAvailableTrue(pageable)
                .map(this::mapFoodToDTO);
    }

    /**
     * Get food by ID
     */
    public FoodDTO getFoodById(Long id) {
        Food food = foodRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Food not found with id: " + id));
        return mapFoodToDTO(food);
    }

    /**
     * Get foods by category
     */
    public Page<FoodDTO> getFoodsByCategory(Long categoryId, Pageable pageable) {
        categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        return foodRepository.findByCategoryId(categoryId, pageable)
                .map(this::mapFoodToDTO);
    }

    /**
     * Get foods by region
     */
    public Page<FoodDTO> getFoodsByRegion(Long regionId, Pageable pageable) {
        regionRepository.findById(regionId)
                .orElseThrow(() -> new ResourceNotFoundException("Region not found"));
        return foodRepository.findByRegionId(regionId, pageable)
                .map(this::mapFoodToDTO);
    }

    /**
     * Get foods by cuisine
     */
    public Page<FoodDTO> getFoodsByCuisine(Long cuisineId, Pageable pageable) {
        cuisineRepository.findById(cuisineId)
                .orElseThrow(() -> new ResourceNotFoundException("Cuisine not found"));
        return foodRepository.findByCuisineId(cuisineId, pageable)
                .map(this::mapFoodToDTO);
    }

    /**
     * Get vegetarian foods
     */
    public Page<FoodDTO> getVegetarianFoods(Pageable pageable) {
        return foodRepository.findByVegetarianTrue(pageable)
                .map(this::mapFoodToDTO);
    }

    /**
     * Get top rated foods
     */
    public Page<FoodDTO> getTopRatedFoods(Pageable pageable) {
        return foodRepository.findTopRatedFoods(pageable)
                .map(this::mapFoodToDTO);
    }

    /**
     * Search and filter foods
     */
    public Page<FoodDTO> searchAndFilter(String name, Long categoryId, Long regionId,
                                         Long cuisineId, Boolean vegetarian, Double minPrice,
                                         Double maxPrice, Integer spiceLevel, Pageable pageable) {
        return foodRepository.searchAndFilter(name, categoryId, regionId, cuisineId,
                vegetarian, minPrice, maxPrice, spiceLevel, pageable)
                .map(this::mapFoodToDTO);
    }

    /**
     * Get top 10 foods
     */
    public List<FoodDTO> getTop10Foods() {
        return foodRepository.findTop10ByAvailableTrueOrderByRatingDesc()
                .stream()
                .map(this::mapFoodToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Map Food entity to FoodDTO
     */
    private FoodDTO mapFoodToDTO(Food food) {
        return FoodDTO.builder()
                .id(food.getId())
                .name(food.getName())
                .description(food.getDescription())
                .story(food.getStory())
                .price(food.getPrice())
                .imageUrl(food.getImageUrl())
                .vegetarian(food.getVegetarian())
                .spiceLevel(food.getSpiceLevel())
                .preparationTime(food.getPreparationTime())
                .calories(food.getCalories())
                .rating(food.getRating())
                .ratingCount(food.getRatingCount())
                .available(food.getAvailable())
                .ingredients(food.getIngredients())
                .categoryId(food.getCategory().getId())
                .categoryName(food.getCategory().getName())
                .regionId(food.getRegion().getId())
                .regionName(food.getRegion().getName())
                .cuisineId(food.getCuisine().getId())
                .cuisineName(food.getCuisine().getName())
                .build();
    }
}
