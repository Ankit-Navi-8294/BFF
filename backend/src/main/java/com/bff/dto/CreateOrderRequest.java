package com.bff.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateOrderRequest {
    
    @NotBlank(message = "Delivery address is required")
    private String deliveryAddress;
    
    @NotBlank(message = "Phone number is required")
    private String phoneNumber;
    
    private String specialInstructions;
}
