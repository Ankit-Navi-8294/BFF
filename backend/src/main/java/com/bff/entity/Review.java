package com.bff.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * Review entity for food reviews and ratings
 */
@Entity
@Table(name = "reviews", indexes = {
        @Index(name = "idx_review_user", columnList = "user_id"),
        @Index(name = "idx_review_food", columnList = "food_id")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "food_id", nullable = false)
    private Food food;

    @Column(nullable = false)
    private Integer rating; // 1-5

    @Column(columnDefinition = "TEXT")
    private String comment;

    @Column(nullable = false)
    private Boolean helpful = false;

    @Column(nullable = false)
    private Long helpfulCount = 0L;
}
