package com.bff.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * Category entity representing food categories
 */
@Entity
@Table(name = "categories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Category extends BaseEntity {

    @Column(nullable = false, unique = true, length = 100)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 500)
    private String imageUrl;

    @Column(length = 50)
    private String emoji;

    @Column(length = 50)
    private String code; // MAIN_COURSE, APPETIZER, DESSERT, BEVERAGE, STREET_FOOD, etc.
}
