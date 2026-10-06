package com.bff.exception;

import com.bff.dto.APIResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

/**
 * Global Exception Handler for all REST controllers
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<APIResponse<?>> handleResourceNotFoundException(ResourceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(APIResponse.error(ex.getMessage(), 404));
    }

    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<APIResponse<?>> handleDuplicateResourceException(DuplicateResourceException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(APIResponse.error(ex.getMessage(), 409));
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<APIResponse<?>> handleUnauthorizedException(UnauthorizedException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(APIResponse.error(ex.getMessage(), 401));
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<APIResponse<?>> handleBadCredentialsException(BadCredentialsException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(APIResponse.error("Invalid email or password", 401));
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<APIResponse<?>> handleUsernameNotFoundException(UsernameNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(APIResponse.error(ex.getMessage(), 404));
    }

    @ExceptionHandler(CartException.class)
    public ResponseEntity<APIResponse<?>> handleCartException(CartException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(APIResponse.error(ex.getMessage(), 400));
    }

    @ExceptionHandler(OrderException.class)
    public ResponseEntity<APIResponse<?>> handleOrderException(OrderException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(APIResponse.error(ex.getMessage(), 400));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<APIResponse<?>> handleValidationException(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(APIResponse.error("Validation failed: " + errors, 400));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<APIResponse<?>> handleGlobalException(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(APIResponse.error("Internal server error: " + ex.getMessage(), 500));
    }
}
