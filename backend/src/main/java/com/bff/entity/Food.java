package com.bff.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

/**
 * Food entity representing Indian dishes
 */
@Entity
@Table(name = "foods", indexes = {
        @Index(name = "idx_category", columnList = "category_id"),
        @Index(name = "idx_region", columnList = "region_id"),
        @Index(name = "idx_cuisine", columnList = "cuisine_id"),
        @Index(name = "idx_vegetarian", columnList = "vegetarian"),
        @Index(name = "idx_spice_level", columnList = "spice_level")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Food extends BaseEntity {

    @Column(nullable = false, length = 200)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String story; // The story behind this dish

    @Column(nullable = false)
    private Double price;

    @Column(length = 500)
    private String imageUrl;

    @Column(nullable = false)
    private Boolean vegetarian = false;

    @Column(nullable = false)
    private Integer spiceLevel = 1; // 1-5

    @Column(nullable = false)
    private Integer preparationTime = 30; // in minutes

    @Column(nullable = false)
    private Integer calories = 0;

    @Column(nullable = false)
    private Double rating = 0.0;

    @Column(nullable = false)
    private Long ratingCount = 0L;

    @Column(nullable = false)
    private Boolean available = true;

    @Column(columnDefinition = "TEXT")
    private String ingredients; // JSON or comma-separated

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "region_id", nullable = false)
    private Region region;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cuisine_id", nullable = false)
    private Cuisine cuisine;

    @OneToMany(mappedBy = "food", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Review> reviews = new HashSet<>();

    @OneToMany(mappedBy = "food", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Favorite> favorites = new HashSet<>();

    @OneToMany(mappedBy = "food", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<CartItem> cartItems = new HashSet<>();
}
