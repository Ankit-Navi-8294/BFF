package com.bff.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegionDTO {
    private Long id;
    private String name;
    private String description;
    private String imageUrl;
    private String code;
    private String cuisineCharacteristics;
}
