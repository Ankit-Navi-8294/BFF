package com.bff.controller;

import com.bff.dto.APIResponse;
import com.bff.dto.RegionDTO;
import com.bff.service.RegionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Region Controller
 */
@RestController
@RequestMapping("/api/regions")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class RegionController {

    @Autowired
    private RegionService regionService;

    /**
     * Get all regions
     */
    @GetMapping
    public ResponseEntity<APIResponse<?>> getAllRegions() {
        List<RegionDTO> regions = regionService.getAllRegions();
        return ResponseEntity.ok(APIResponse.ok(regions, "Regions retrieved successfully"));
    }

    /**
     * Get region by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<APIResponse<?>> getRegionById(@PathVariable Long id) {
        RegionDTO region = regionService.getRegionById(id);
        return ResponseEntity.ok(APIResponse.ok(region, "Region retrieved successfully"));
    }
}
