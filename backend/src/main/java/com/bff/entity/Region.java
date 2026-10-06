package com.bff.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * Region entity representing Indian food regions
 */
@Entity
@Table(name = "regions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Region extends BaseEntity {

    @Column(nullable = false, unique = true, length = 100)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 500)
    private String imageUrl;

    @Column(length = 50)
    private String code; // NORTH, SOUTH, EAST, WEST, CENTRAL, NORTHEAST

    @Column(columnDefinition = "TEXT")
    private String cuisineCharacteristics;
}
