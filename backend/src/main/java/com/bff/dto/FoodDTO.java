package com.bff.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FoodDTO {
    private Long id;
    private String name;
    private String description;
    private String story;
    private Double price;
    private String imageUrl;
    private Boolean vegetarian;
    private Integer spiceLevel;
    private Integer preparationTime;
    private Integer calories;
    private Double rating;
    private Long ratingCount;
    private Boolean available;
    private String ingredients;
    
    private Long categoryId;
    private String categoryName;
    
    private Long regionId;
    private String regionName;
    
    private Long cuisineId;
    private String cuisineName;
}
