package com.bff.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * Cuisine entity representing food cuisines
 */
@Entity
@Table(name = "cuisines")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cuisine extends BaseEntity {

    @Column(nullable = false, unique = true, length = 100)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 500)
    private String imageUrl;

    @Column(length = 50)
    private String code; // VEG, NON_VEG, VEGAN, GLUTEN_FREE, etc.
}
