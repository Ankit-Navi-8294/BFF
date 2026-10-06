package com.bff.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

/**
 * Order entity for order management
 */
@Entity
@Table(name = "orders", indexes = {
        @Index(name = "idx_order_user", columnList = "user_id"),
        @Index(name = "idx_order_status", columnList = "status"),
        @Index(name = "idx_order_date", columnList = "created_at")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private OrderStatus status = OrderStatus.PLACED;

    @Column(nullable = false)
    private Double subtotal;

    @Column(nullable = false)
    private Double tax = 0.0;

    @Column(nullable = false)
    private Double deliveryFee = 0.0;

    @Column(nullable = false)
    private Double total;

    @Column(columnDefinition = "TEXT")
    private String deliveryAddress;

    @Column(length = 20)
    private String phoneNumber;

    @Column(columnDefinition = "TEXT")
    private String specialInstructions;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private Set<OrderItem> items = new HashSet<>();

    public enum OrderStatus {
        PLACED,
        CONFIRMED,
        PREPARING,
        PACKED,
        OUT_FOR_DELIVERY,
        DELIVERED,
        CANCELLED
    }
}
