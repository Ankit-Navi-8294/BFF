package com.bff.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewDTO {
    private Long id;
    private Long userId;
    private String userName;
    private Long foodId;
    private Integer rating;
    private String comment;
    private Boolean helpful;
    private Long helpfulCount;
    private String createdAt;
}
