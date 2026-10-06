package com.bff.controller;

import com.bff.dto.*;
import com.bff.entity.User;
import com.bff.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Authentication Controller
 * Handles user registration, login, and token refresh
 */
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class AuthController {

    @Autowired
    private AuthService authService;

    /**
     * Register new user
     */
    @PostMapping("/register")
    public ResponseEntity<APIResponse<?>> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(APIResponse.created(response, "User registered successfully"));
    }

    /**
     * Login user
     */
    @PostMapping("/login")
    public ResponseEntity<APIResponse<?>> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(APIResponse.ok(response, "Login successful"));
    }

    /**
     * Refresh access token
     */
    @PostMapping("/refresh")
    public ResponseEntity<APIResponse<?>> refresh(@Valid @RequestBody RefreshTokenRequest request) {
        AuthResponse response = authService.refreshToken(request.getRefreshToken());
        return ResponseEntity.ok(APIResponse.ok(response, "Token refreshed successfully"));
    }

    /**
     * Logout user
     */
    @PostMapping("/logout")
    public ResponseEntity<APIResponse<?>> logout() {
        return ResponseEntity.ok(APIResponse.ok(null, "Logged out successfully"));
    }

    /**
     * Get current user profile
     */
    @GetMapping("/me")
    public ResponseEntity<APIResponse<?>> getCurrentUser() {
        User user = authService.getCurrentUser();
        UserDTO userDTO = UserDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .phoneNumber(user.getPhoneNumber())
                .profileImageUrl(user.getProfileImageUrl())
                .emailVerified(user.getEmailVerified())
                .createdAt(user.getCreatedAt().toString())
                .build();
        return ResponseEntity.ok(APIResponse.ok(userDTO, "Current user retrieved"));
    }
}

