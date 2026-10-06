package com.bff.dto;

import lombok.*;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDTO {
    private Long id;
    private Long userId;
    private String status;
    private Double subtotal;
    private Double tax;
    private Double deliveryFee;
    private Double total;
    private String deliveryAddress;
    private String phoneNumber;
    private String specialInstructions;
    private Set<OrderItemDTO> items;
    private String createdAt;
    private String updatedAt;
}
