package com.bff.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.MacAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

/**
 * JWT Service for token generation and validation
 */
@Service
public class JwtService {

    @Value("${app.jwt.secret}")
    private String jwtSecret;

    @Value("${app.jwt.expiration}")
    private Long jwtExpirationMs;

    @Value("${app.jwt.refresh-expiration}")
    private Long refreshTokenExpirationMs;

    /**
     * Generate JWT access token
     */
    public String generateAccessToken(UserDetails userDetails) {
        return buildToken(userDetails.getUsername(), jwtExpirationMs);
    }

    /**
     * Generate refresh token
     */
    public String generateRefreshToken(String email) {
        return buildToken(email, refreshTokenExpirationMs);
    }

    /**
     * Build JWT token
     */
    private String buildToken(String subject, Long expirationTime) {
        return Jwts.builder()
                .subject(subject)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(getSigningKey())
                .compact();
    }

    /**
     * Extract email/username from token
     */
    public String extractEmail(String token) {
        return extractAllClaims(token).getSubject();
    }

    /**
     * Check if token is valid
     */
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String email = extractEmail(token);
        return email.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    /**
     * Check if token is expired
     */
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    /**
     * Extract expiration date from token
     */
    private Date extractExpiration(String token) {
        return extractAllClaims(token).getExpiration();
    }

    /**
     * Extract all claims from token
     */
    private Claims extractAllClaims(String token) {
        try {
            return Jwts.parser()
                    .verifyWith((SecretKey) getSigningKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
        } catch (MalformedJwtException | ExpiredJwtException | UnsupportedJwtException | IllegalArgumentException e) {
            throw new JwtException("Invalid JWT token", e);
        }
    }

    /**
     * Get signing key
     */
    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    /**
     * Get token expiration time in milliseconds
     */
    public Long getTokenExpirationMs() {
        return jwtExpirationMs;
    }

    /**
     * Get refresh token expiration time in milliseconds
     */
    public Long getRefreshTokenExpirationMs() {
        return refreshTokenExpirationMs;
    }
}
