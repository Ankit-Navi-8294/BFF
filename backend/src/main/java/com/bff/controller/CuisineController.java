package com.bff.controller;

import com.bff.dto.APIResponse;
import com.bff.dto.CuisineDTO;
import com.bff.service.CuisineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Cuisine Controller
 */
@RestController
@RequestMapping("/api/cuisines")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class CuisineController {

    @Autowired
    private CuisineService cuisineService;

    /**
     * Get all cuisines
     */
    @GetMapping
    public ResponseEntity<APIResponse<?>> getAllCuisines() {
        List<CuisineDTO> cuisines = cuisineService.getAllCuisines();
        return ResponseEntity.ok(APIResponse.ok(cuisines, "Cuisines retrieved successfully"));
    }

    /**
     * Get cuisine by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<APIResponse<?>> getCuisineById(@PathVariable Long id) {
        CuisineDTO cuisine = cuisineService.getCuisineById(id);
        return ResponseEntity.ok(APIResponse.ok(cuisine, "Cuisine retrieved successfully"));
    }
}
