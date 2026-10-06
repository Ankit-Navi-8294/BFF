package com.bff.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * RefreshToken entity for JWT refresh token management
 */
@Entity
@Table(name = "refresh_tokens")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RefreshToken extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, unique = true, columnDefinition = "TEXT")
    private String token;

    @Column(nullable = false)
    private Long expiryDate;

    @Column(nullable = false)
    private Boolean revoked = false;

    public boolean isExpired() {
        return System.currentTimeMillis() > expiryDate;
    }

    public boolean isValid() {
        return !revoked && !isExpired();
    }
}
