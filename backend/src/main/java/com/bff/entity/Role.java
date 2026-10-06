package com.bff.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * Role entity for role-based authorization
 */
@Entity
@Table(name = "roles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    @Enumerated(EnumType.STRING)
    private RoleEnum name;

    @Column(columnDefinition = "TEXT")
    private String description;

    public enum RoleEnum {
        USER("User Role"),
        ADMIN("Admin Role");

        private final String description;

        RoleEnum(String description) {
            this.description = description;
        }
    }
}
