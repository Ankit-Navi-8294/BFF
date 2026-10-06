package com.bff.controller;

import com.bff.dto.APIResponse;
import com.bff.dto.OrderDTO;
import com.bff.dto.CreateOrderRequest;
import com.bff.entity.Order;
import com.bff.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * Order Controller
 * Handles order management
 */
@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
@PreAuthorize("isAuthenticated()")
public class OrderController {

    @Autowired
    private OrderService orderService;

    /**
     * Create new order
     */
    @PostMapping
    public ResponseEntity<APIResponse<?>> createOrder(@Valid @RequestBody CreateOrderRequest request) {
        OrderDTO order = orderService.createOrder(
                request.getDeliveryAddress(),
                request.getPhoneNumber(),
                request.getSpecialInstructions()
        );
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(APIResponse.created(order, "Order created successfully"));
    }

    /**
     * Get user's orders
     */
    @GetMapping
    public ResponseEntity<APIResponse<?>> getUserOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<OrderDTO> orders = orderService.getUserOrders(pageable);
        return ResponseEntity.ok(APIResponse.ok(orders, "Orders retrieved successfully"));
    }

    /**
     * Get order by ID
     */
    @GetMapping("/{orderId}")
    public ResponseEntity<APIResponse<?>> getOrderById(@PathVariable Long orderId) {
        OrderDTO order = orderService.getOrderById(orderId);
        return ResponseEntity.ok(APIResponse.ok(order, "Order retrieved successfully"));
    }

    /**
     * Update order status (Admin only)
     */
    @PutMapping("/{orderId}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<APIResponse<?>> updateOrderStatus(
            @PathVariable Long orderId,
            @RequestParam String status) {
        Order.OrderStatus orderStatus = Order.OrderStatus.valueOf(status);
        OrderDTO order = orderService.updateOrderStatus(orderId, orderStatus);
        return ResponseEntity.ok(APIResponse.ok(order, "Order status updated"));
    }
}
