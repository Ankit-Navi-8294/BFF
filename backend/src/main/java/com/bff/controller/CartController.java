package com.bff.controller;

import com.bff.dto.APIResponse;
import com.bff.dto.CartDTO;
import com.bff.dto.AddToCartRequest;
import com.bff.service.CartService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * Cart Controller
 * Handles shopping cart operations
 */
@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
@PreAuthorize("isAuthenticated()")
public class CartController {

    @Autowired
    private CartService cartService;

    /**
     * Get user's cart
     */
    @GetMapping
    public ResponseEntity<APIResponse<?>> getCart() {
        CartDTO cart = cartService.getUserCart();
        return ResponseEntity.ok(APIResponse.ok(cart, "Cart retrieved successfully"));
    }

    /**
     * Add item to cart
     */
    @PostMapping("/items")
    public ResponseEntity<APIResponse<?>> addToCart(@Valid @RequestBody AddToCartRequest request) {
        CartDTO cart = cartService.addToCart(request.getFoodId(), request.getQuantity());
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(APIResponse.created(cart, "Item added to cart"));
    }

    /**
     * Update cart item quantity
     */
    @PutMapping("/items/{cartItemId}")
    public ResponseEntity<APIResponse<?>> updateCartItem(
            @PathVariable Long cartItemId,
            @RequestParam Integer quantity) {
        CartDTO cart = cartService.updateCartItemQuantity(cartItemId, quantity);
        return ResponseEntity.ok(APIResponse.ok(cart, "Cart item updated"));
    }

    /**
     * Remove item from cart
     */
    @DeleteMapping("/items/{cartItemId}")
    public ResponseEntity<APIResponse<?>> removeFromCart(@PathVariable Long cartItemId) {
        CartDTO cart = cartService.removeFromCart(cartItemId);
        return ResponseEntity.ok(APIResponse.ok(cart, "Item removed from cart"));
    }

    /**
     * Clear cart
     */
    @DeleteMapping
    public ResponseEntity<APIResponse<?>> clearCart() {
        cartService.clearCart();
        return ResponseEntity.ok(APIResponse.ok(null, "Cart cleared"));
    }
}
