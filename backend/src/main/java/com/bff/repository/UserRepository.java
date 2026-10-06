package com.bff.repository;

import com.bff.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByOauthIdAndOauthProvider(String oauthId, String oauthProvider);
    boolean existsByEmail(String email);
}
