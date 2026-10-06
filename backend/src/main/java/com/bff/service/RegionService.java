package com.bff.service;

import com.bff.dto.RegionDTO;
import com.bff.entity.Region;
import com.bff.repository.RegionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Region Service
 */
@Service
@Transactional(readOnly = true)
public class RegionService {

    @Autowired
    private RegionRepository regionRepository;

    public List<RegionDTO> getAllRegions() {
        return regionRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public RegionDTO getRegionById(Long id) {
        Region region = regionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Region not found"));
        return mapToDTO(region);
    }

    private RegionDTO mapToDTO(Region region) {
        return RegionDTO.builder()
                .id(region.getId())
                .name(region.getName())
                .description(region.getDescription())
                .imageUrl(region.getImageUrl())
                .code(region.getCode())
                .cuisineCharacteristics(region.getCuisineCharacteristics())
                .build();
    }
}
