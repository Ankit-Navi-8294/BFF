package com.bff.dto;

import lombok.*;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartDTO {
    private Long id;
    private Long userId;
    private Set<CartItemDTO> items;
    private Double subtotal;
    private Integer totalItems;
}
