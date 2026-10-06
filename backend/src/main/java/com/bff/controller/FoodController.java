package com.bff.controller;

import com.bff.dto.APIResponse;
import com.bff.dto.FoodDTO;
import com.bff.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Food Controller
 * Handles food search, retrieval, and filtering
 */
@RestController
@RequestMapping("/api/foods")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class FoodController {

    @Autowired
    private FoodService foodService;

    /**
     * Get all foods with pagination
     */
    @GetMapping
    public ResponseEntity<APIResponse<?>> getAllFoods(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<FoodDTO> foods = foodService.getAllFoods(pageable);
        return ResponseEntity.ok(APIResponse.ok(foods, "Foods retrieved successfully"));
    }

    /**
     * Get food by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<APIResponse<?>> getFoodById(@PathVariable Long id) {
        FoodDTO food = foodService.getFoodById(id);
        return ResponseEntity.ok(APIResponse.ok(food, "Food retrieved successfully"));
    }

    /**
     * Get top 10 foods
     */
    @GetMapping("/top/rated")
    public ResponseEntity<APIResponse<?>> getTopFoods() {
        List<FoodDTO> foods = foodService.getTop10Foods();
        return ResponseEntity.ok(APIResponse.ok(foods, "Top foods retrieved successfully"));
    }

    /**
     * Get foods by category
     */
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<APIResponse<?>> getFoodsByCategory(
            @PathVariable Long categoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<FoodDTO> foods = foodService.getFoodsByCategory(categoryId, pageable);
        return ResponseEntity.ok(APIResponse.ok(foods, "Foods by category retrieved successfully"));
    }

    /**
     * Get foods by region
     */
    @GetMapping("/region/{regionId}")
    public ResponseEntity<APIResponse<?>> getFoodsByRegion(
            @PathVariable Long regionId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<FoodDTO> foods = foodService.getFoodsByRegion(regionId, pageable);
        return ResponseEntity.ok(APIResponse.ok(foods, "Foods by region retrieved successfully"));
    }

    /**
     * Get foods by cuisine
     */
    @GetMapping("/cuisine/{cuisineId}")
    public ResponseEntity<APIResponse<?>> getFoodsByCuisine(
            @PathVariable Long cuisineId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<FoodDTO> foods = foodService.getFoodsByCuisine(cuisineId, pageable);
        return ResponseEntity.ok(APIResponse.ok(foods, "Foods by cuisine retrieved successfully"));
    }

    /**
     * Get vegetarian foods
     */
    @GetMapping("/vegetarian")
    public ResponseEntity<APIResponse<?>> getVegetarianFoods(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<FoodDTO> foods = foodService.getVegetarianFoods(pageable);
        return ResponseEntity.ok(APIResponse.ok(foods, "Vegetarian foods retrieved successfully"));
    }

    /**
     * Search and filter foods
     */
    @GetMapping("/search")
    public ResponseEntity<APIResponse<?>> searchFoods(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) Long regionId,
            @RequestParam(required = false) Long cuisineId,
            @RequestParam(required = false) Boolean vegetarian,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) Integer spiceLevel,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<FoodDTO> foods = foodService.searchAndFilter(
                name, categoryId, regionId, cuisineId, vegetarian,
                minPrice, maxPrice, spiceLevel, pageable);
        return ResponseEntity.ok(APIResponse.ok(foods, "Foods searched successfully"));
    }
}
