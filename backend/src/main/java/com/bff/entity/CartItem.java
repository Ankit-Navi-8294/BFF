package com.bff.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * CartItem entity representing individual items in a cart
 */
@Entity
@Table(name = "cart_items", indexes = {
        @Index(name = "idx_cart_item_cart", columnList = "cart_id"),
        @Index(name = "idx_cart_item_food", columnList = "food_id")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItem extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cart_id", nullable = false)
    private Cart cart;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "food_id", nullable = false)
    private Food food;

    @Column(nullable = false)
    private Integer quantity = 1;

    @Column(nullable = false)
    private Double price; // Price at time of adding

    public Double getTotal() {
        return price * quantity;
    }
}
