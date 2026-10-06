package com.bff.controller;

import com.bff.dto.APIResponse;
import com.bff.dto.ReviewDTO;
import com.bff.dto.CreateReviewRequest;
import com.bff.service.ReviewService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * Review Controller
 * Handles food reviews and ratings
 */
@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    /**
     * Create review for food
     */
    @PostMapping("/foods/{foodId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<APIResponse<?>> createReview(
            @PathVariable Long foodId,
            @Valid @RequestBody CreateReviewRequest request) {
        ReviewDTO review = reviewService.createReview(foodId, request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(APIResponse.created(review, "Review created successfully"));
    }

    /**
     * Get reviews for food
     */
    @GetMapping("/foods/{foodId}")
    public ResponseEntity<APIResponse<?>> getReviewsForFood(
            @PathVariable Long foodId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ReviewDTO> reviews = reviewService.getReviewsForFood(foodId, pageable);
        return ResponseEntity.ok(APIResponse.ok(reviews, "Reviews retrieved successfully"));
    }

    /**
     * Get user's reviews
     */
    @GetMapping("/my-reviews")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<APIResponse<?>> getUserReviews(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ReviewDTO> reviews = reviewService.getUserReviews(pageable);
        return ResponseEntity.ok(APIResponse.ok(reviews, "User reviews retrieved successfully"));
    }
}
