package com.bff.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * Address entity for delivery addresses
 */
@Entity
@Table(name = "addresses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Address extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 100)
    private String label; // Home, Work, etc.

    @Column(nullable = false, columnDefinition = "TEXT")
    private String addressLine;

    @Column(length = 50)
    private String city;

    @Column(length = 50)
    private String state;

    @Column(length = 10)
    private String zipCode;

    @Column(length = 20)
    private String phoneNumber;

    @Column(nullable = false)
    private Boolean isDefault = false;
}
