package com.bff.service;

import com.bff.dto.CuisineDTO;
import com.bff.entity.Cuisine;
import com.bff.repository.CuisineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Cuisine Service
 */
@Service
@Transactional(readOnly = true)
public class CuisineService {

    @Autowired
    private CuisineRepository cuisineRepository;

    public List<CuisineDTO> getAllCuisines() {
        return cuisineRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public CuisineDTO getCuisineById(Long id) {
        Cuisine cuisine = cuisineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cuisine not found"));
        return mapToDTO(cuisine);
    }

    private CuisineDTO mapToDTO(Cuisine cuisine) {
        return CuisineDTO.builder()
                .id(cuisine.getId())
                .name(cuisine.getName())
                .description(cuisine.getDescription())
                .imageUrl(cuisine.getImageUrl())
                .code(cuisine.getCode())
                .build();
    }
}
