package com.bff.controller;

import com.bff.dto.APIResponse;
import com.bff.dto.CategoryDTO;
import com.bff.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Category Controller
 */
@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    /**
     * Get all categories
     */
    @GetMapping
    public ResponseEntity<APIResponse<?>> getAllCategories() {
        List<CategoryDTO> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(APIResponse.ok(categories, "Categories retrieved successfully"));
    }

    /**
     * Get category by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<APIResponse<?>> getCategoryById(@PathVariable Long id) {
        CategoryDTO category = categoryService.getCategoryById(id);
        return ResponseEntity.ok(APIResponse.ok(category, "Category retrieved successfully"));
    }
}
