package com.bff.service;

import com.bff.dto.CartDTO;
import com.bff.dto.CartItemDTO;
import com.bff.entity.Cart;
import com.bff.entity.CartItem;
import com.bff.entity.Food;
import com.bff.entity.User;
import com.bff.exception.CartException;
import com.bff.exception.ResourceNotFoundException;
import com.bff.repository.CartRepository;
import com.bff.repository.CartItemRepository;
import com.bff.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Cart Service for shopping cart operations
 */
@Service
@Transactional
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private AuthService authService;

    /**
     * Create cart for user
     */
    public Cart createCart(User user) {
        Cart cart = Cart.builder()
                .user(user)
                .build();
        return cartRepository.save(cart);
    }

    /**
     * Get user's cart
     */
    public CartDTO getUserCart() {
        User user = authService.getCurrentUser();
        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found"));
        return mapCartToDTO(cart);
    }

    /**
     * Add item to cart
     */
    public CartDTO addToCart(Long foodId, Integer quantity) {
        User user = authService.getCurrentUser();
        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new CartException("Cart not found"));

        Food food = foodRepository.findById(foodId)
                .orElseThrow(() -> new ResourceNotFoundException("Food not found"));

        if (!food.getAvailable()) {
            throw new CartException("Food is not available");
        }

        CartItem cartItem = cartItemRepository.findByCartIdAndFoodId(cart.getId(), foodId)
                .orElse(null);

        if (cartItem != null) {
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
        } else {
            cartItem = CartItem.builder()
                    .cart(cart)
                    .food(food)
                    .quantity(quantity)
                    .price(food.getPrice())
                    .build();
        }

        cartItemRepository.save(cartItem);
        cart = cartRepository.findById(cart.getId()).orElseThrow();
        return mapCartToDTO(cart);
    }

    /**
     * Update cart item quantity
     */
    public CartDTO updateCartItemQuantity(Long cartItemId, Integer quantity) {
        User user = authService.getCurrentUser();
        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new CartException("Cart not found"));

        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found"));

        if (!cartItem.getCart().getId().equals(cart.getId())) {
            throw new CartException("Cart item does not belong to your cart");
        }

        if (quantity <= 0) {
            cartItemRepository.delete(cartItem);
        } else {
            cartItem.setQuantity(quantity);
            cartItemRepository.save(cartItem);
        }

        cart = cartRepository.findById(cart.getId()).orElseThrow();
        return mapCartToDTO(cart);
    }

    /**
     * Remove item from cart
     */
    public CartDTO removeFromCart(Long cartItemId) {
        User user = authService.getCurrentUser();
        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new CartException("Cart not found"));

        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found"));

        if (!cartItem.getCart().getId().equals(cart.getId())) {
            throw new CartException("Cart item does not belong to your cart");
        }

        cartItemRepository.delete(cartItem);
        cart = cartRepository.findById(cart.getId()).orElseThrow();
        return mapCartToDTO(cart);
    }

    /**
     * Clear cart
     */
    public void clearCart() {
        User user = authService.getCurrentUser();
        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new CartException("Cart not found"));
        cartItemRepository.deleteByCartId(cart.getId());
    }

    /**
     * Map Cart entity to CartDTO
     */
    private CartDTO mapCartToDTO(Cart cart) {
        return CartDTO.builder()
                .id(cart.getId())
                .userId(cart.getUser().getId())
                .items(cart.getItems().stream()
                        .map(this::mapCartItemToDTO)
                        .collect(java.util.stream.Collectors.toSet()))
                .subtotal(cart.getSubtotal())
                .totalItems(cart.getTotalItems())
                .build();
    }

    /**
     * Map CartItem entity to CartItemDTO
     */
    private CartItemDTO mapCartItemToDTO(CartItem cartItem) {
        return CartItemDTO.builder()
                .id(cartItem.getId())
                .food(mapFoodToDTO(cartItem.getFood()))
                .quantity(cartItem.getQuantity())
                .price(cartItem.getPrice())
                .total(cartItem.getTotal())
                .build();
    }

    /**
     * Map Food entity to FoodDTO (simplified)
     */
    private com.bff.dto.FoodDTO mapFoodToDTO(Food food) {
        return com.bff.dto.FoodDTO.builder()
                .id(food.getId())
                .name(food.getName())
                .imageUrl(food.getImageUrl())
                .price(food.getPrice())
                .vegetarian(food.getVegetarian())
                .spiceLevel(food.getSpiceLevel())
                .preparationTime(food.getPreparationTime())
                .build();
    }
}
