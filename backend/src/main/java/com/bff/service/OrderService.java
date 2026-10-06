package com.bff.service;

import com.bff.dto.OrderDTO;
import com.bff.dto.OrderItemDTO;
import com.bff.entity.*;
import com.bff.exception.OrderException;
import com.bff.exception.ResourceNotFoundException;
import com.bff.repository.CartRepository;
import com.bff.repository.OrderRepository;
import com.bff.repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

/**
 * Order Service for order management
 */
@Service
@Transactional
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartService cartService;

    @Autowired
    private AuthService authService;

    /**
     * Create order from cart
     */
    public OrderDTO createOrder(String deliveryAddress, String phoneNumber, String specialInstructions) {
        User user = authService.getCurrentUser();
        
        // Get user's cart
        Cart cart = getCartFromUser(user);
        
        if (cart.getItems().isEmpty()) {
            throw new OrderException("Cart is empty");
        }

        // Calculate totals
        double subtotal = cart.getSubtotal();
        double tax = subtotal * 0.05; // 5% tax
        double deliveryFee = 50.0;
        double total = subtotal + tax + deliveryFee;

        // Create order
        Order order = Order.builder()
                .user(user)
                .status(Order.OrderStatus.PLACED)
                .subtotal(subtotal)
                .tax(tax)
                .deliveryFee(deliveryFee)
                .total(total)
                .deliveryAddress(deliveryAddress)
                .phoneNumber(phoneNumber)
                .specialInstructions(specialInstructions)
                .build();

        order = orderRepository.save(order);

        // Create order items from cart items
        for (CartItem cartItem : cart.getItems()) {
            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .food(cartItem.getFood())
                    .quantity(cartItem.getQuantity())
                    .price(cartItem.getPrice())
                    .build();
            orderItemRepository.save(orderItem);
        }

        // Clear cart
        cartService.clearCart();

        return mapOrderToDTO(orderRepository.findById(order.getId()).orElseThrow());
    }

    /**
     * Get user's orders
     */
    public Page<OrderDTO> getUserOrders(Pageable pageable) {
        User user = authService.getCurrentUser();
        return orderRepository.findByUserId(user.getId(), pageable)
                .map(this::mapOrderToDTO);
    }

    /**
     * Get order by ID
     */
    public OrderDTO getOrderById(Long orderId) {
        User user = authService.getCurrentUser();
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        if (!order.getUser().getId().equals(user.getId())) {
            throw new OrderException("Order does not belong to you");
        }

        return mapOrderToDTO(order);
    }

    /**
     * Update order status
     */
    public OrderDTO updateOrderStatus(Long orderId, Order.OrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        order.setStatus(status);
        return mapOrderToDTO(orderRepository.save(order));
    }

    /**
     * Get cart from user
     */
    private Cart getCartFromUser(User user) {
        return cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new OrderException("Cart not found for user"));
    }

    /**
     * Map Order entity to OrderDTO
     */
    private OrderDTO mapOrderToDTO(Order order) {
        return OrderDTO.builder()
                .id(order.getId())
                .userId(order.getUser().getId())
                .status(order.getStatus().toString())
                .subtotal(order.getSubtotal())
                .tax(order.getTax())
                .deliveryFee(order.getDeliveryFee())
                .total(order.getTotal())
                .deliveryAddress(order.getDeliveryAddress())
                .phoneNumber(order.getPhoneNumber())
                .specialInstructions(order.getSpecialInstructions())
                .items(order.getItems().stream()
                        .map(this::mapOrderItemToDTO)
                        .collect(Collectors.toSet()))
                .createdAt(order.getCreatedAt().toString())
                .updatedAt(order.getUpdatedAt().toString())
                .build();
    }

    /**
     * Map OrderItem entity to OrderItemDTO
     */
    private OrderItemDTO mapOrderItemToDTO(OrderItem orderItem) {
        return OrderItemDTO.builder()
                .id(orderItem.getId())
                .food(mapFoodToDTO(orderItem.getFood()))
                .quantity(orderItem.getQuantity())
                .price(orderItem.getPrice())
                .total(orderItem.getTotal())
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
                .build();
    }
}
