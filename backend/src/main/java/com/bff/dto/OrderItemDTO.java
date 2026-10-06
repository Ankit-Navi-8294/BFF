package com.bff.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItemDTO {
    private Long id;
    private FoodDTO food;
    private Integer quantity;
    private Double price;
    private Double total;
}
