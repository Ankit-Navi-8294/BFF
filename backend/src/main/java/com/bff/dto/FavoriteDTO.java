package com.bff.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FavoriteDTO {
    private Long id;
    private FoodDTO food;
    private Boolean isFavorited;
}
