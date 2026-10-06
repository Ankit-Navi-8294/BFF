package com.bff.controller;

import com.bff.dto.APIResponse;
import com.bff.dto.FavoriteDTO;
import com.bff.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * Favorite Controller
 * Handles favorite food operations
 */
@RestController
@RequestMapping("/api/favorites")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
@PreAuthorize("isAuthenticated()")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    /**
     * Add food to favorites
     */
    @PostMapping("/{foodId}")
    public ResponseEntity<APIResponse<?>> addToFavorites(@PathVariable Long foodId) {
        FavoriteDTO favorite = favoriteService.addToFavorites(foodId);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(APIResponse.created(favorite, "Added to favorites"));
    }

    /**
     * Remove food from favorites
     */
    @DeleteMapping("/{foodId}")
    public ResponseEntity<APIResponse<?>> removeFromFavorites(@PathVariable Long foodId) {
        favoriteService.removeFromFavorites(foodId);
        return ResponseEntity.ok(APIResponse.ok(null, "Removed from favorites"));
    }

    /**
     * Get user's favorites
     */
    @GetMapping
    public ResponseEntity<APIResponse<?>> getUserFavorites(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<FavoriteDTO> favorites = favoriteService.getUserFavorites(pageable);
        return ResponseEntity.ok(APIResponse.ok(favorites, "Favorites retrieved successfully"));
    }

    /**
     * Check if food is in favorites
     */
    @GetMapping("/{foodId}/is-favorited")
    public ResponseEntity<APIResponse<?>> isFavorited(@PathVariable Long foodId) {
        boolean isFavorited = favoriteService.isFavorited(foodId);
        return ResponseEntity.ok(APIResponse.ok(isFavorited, "Favorite status retrieved"));
    }
}
