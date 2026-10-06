package com.bff.service;

import com.bff.dto.FavoriteDTO;
import com.bff.entity.Favorite;
import com.bff.entity.Food;
import com.bff.entity.User;
import com.bff.exception.ResourceNotFoundException;
import com.bff.repository.FavoriteRepository;
import com.bff.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Favorite Service for managing user favorite foods
 */
@Service
@Transactional
public class FavoriteService {

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private AuthService authService;

    /**
     * Add food to favorites
     */
    public FavoriteDTO addToFavorites(Long foodId) {
        User user = authService.getCurrentUser();
        Food food = foodRepository.findById(foodId)
                .orElseThrow(() -> new ResourceNotFoundException("Food not found"));

        Favorite favorite = favoriteRepository.findByUserIdAndFoodId(user.getId(), foodId)
                .orElse(null);

        if (favorite != null) {
            favorite.setIsFavorited(true);
        } else {
            favorite = Favorite.builder()
                    .user(user)
                    .food(food)
                    .isFavorited(true)
                    .build();
        }

        favorite = favoriteRepository.save(favorite);
        return mapToDTO(favorite);
    }

    /**
     * Remove food from favorites
     */
    public void removeFromFavorites(Long foodId) {
        User user = authService.getCurrentUser();
        Favorite favorite = favoriteRepository.findByUserIdAndFoodId(user.getId(), foodId)
                .orElseThrow(() -> new ResourceNotFoundException("Favorite not found"));
        favorite.setIsFavorited(false);
        favoriteRepository.save(favorite);
    }

    /**
     * Get user's favorites
     */
    public Page<FavoriteDTO> getUserFavorites(Pageable pageable) {
        User user = authService.getCurrentUser();
        return favoriteRepository.findByUserIdAndIsFavoritedTrue(user.getId(), pageable)
                .map(this::mapToDTO);
    }


    /**
     * Check if food is in favorites
     */
    public boolean isFavorited(Long foodId) {
        User user = authService.getCurrentUser();
        return favoriteRepository.existsByUserIdAndFoodIdAndIsFavoritedTrue(user.getId(), foodId);
    }

    /**
     * Map Favorite entity to FavoriteDTO
     */
    private FavoriteDTO mapToDTO(Favorite favorite) {
        return FavoriteDTO.builder()
                .id(favorite.getId())
                .food(mapFoodToDTO(favorite.getFood()))
                .isFavorited(favorite.getIsFavorited())
                .build();
    }

    /**
     * Map Food entity to FoodDTO (simplified)
     */
    private com.bff.dto.FoodDTO mapFoodToDTO(Food food) {
        return com.bff.dto.FoodDTO.builder()
                .id(food.getId())
                .name(food.getName())
                .imageUrl(food.getImageUrl())
                .price(food.getPrice())
                .rating(food.getRating())
                .vegetarian(food.getVegetarian())
                .spiceLevel(food.getSpiceLevel())
                .build();
    }
}
