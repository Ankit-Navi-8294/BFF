package com.bff.service;

import com.bff.dto.ReviewDTO;
import com.bff.dto.CreateReviewRequest;
import com.bff.entity.Review;
import com.bff.entity.Food;
import com.bff.entity.User;
import com.bff.exception.ResourceNotFoundException;
import com.bff.repository.ReviewRepository;
import com.bff.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Review Service for food reviews and ratings
 */
@Service
@Transactional
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private AuthService authService;

    /**
     * Create review for food
     */
    public ReviewDTO createReview(Long foodId, CreateReviewRequest request) {
        User user = authService.getCurrentUser();
        Food food = foodRepository.findById(foodId)
                .orElseThrow(() -> new ResourceNotFoundException("Food not found"));

        Review review = Review.builder()
                .user(user)
                .food(food)
                .rating(request.getRating())
                .comment(request.getComment())
                .helpful(false)
                .helpfulCount(0L)
                .build();

        review = reviewRepository.save(review);
        updateFoodRating(food);

        return mapToDTO(review);
    }

    /**
     * Get reviews for food
     */
    public Page<ReviewDTO> getReviewsForFood(Long foodId, Pageable pageable) {
        foodRepository.findById(foodId)
                .orElseThrow(() -> new ResourceNotFoundException("Food not found"));
        return reviewRepository.findByFoodId(foodId, pageable)
                .map(this::mapToDTO);
    }

    /**
     * Get user's reviews
     */
    public Page<ReviewDTO> getUserReviews(Pageable pageable) {
        User user = authService.getCurrentUser();
        return reviewRepository.findByUserId(user.getId(), pageable)
                .map(this::mapToDTO);
    }

    /**
     * Update food rating based on reviews
     */
    private void updateFoodRating(Food food) {
        Page<Review> reviews = reviewRepository.findByFoodId(food.getId(), Pageable.ofSize(Integer.MAX_VALUE));
        if (!reviews.isEmpty()) {
            double avgRating = reviews.getContent().stream()
                    .mapToDouble(Review::getRating)
                    .average()
                    .orElse(0.0);
            food.setRating(avgRating);
            food.setRatingCount((long) reviews.getContent().size());
            foodRepository.save(food);
        }
    }

    /**
     * Map Review entity to ReviewDTO
     */
    private ReviewDTO mapToDTO(Review review) {
        return ReviewDTO.builder()
                .id(review.getId())
                .userId(review.getUser().getId())
                .userName(review.getUser().getFullName())
                .foodId(review.getFood().getId())
                .rating(review.getRating())
                .comment(review.getComment())
                .helpful(review.getHelpful())
                .helpfulCount(review.getHelpfulCount())
                .createdAt(review.getCreatedAt().toString())
                .build();
    }
}
