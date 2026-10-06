package com.bff.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItemDTO {
    private Long id;
    private FoodDTO food;
    private Integer quantity;
    private Double price;
    private Double total;
}
