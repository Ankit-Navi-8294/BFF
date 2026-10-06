package com.bff.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class APIResponse<T> {
    private boolean success;
    private String message;
    private T data;
    private int statusCode;

    public static <T> APIResponse<T> ok(T data, String message) {
        return APIResponse.<T>builder()
                .success(true)
                .message(message)
                .data(data)
                .statusCode(200)
                .build();
    }

    public static <T> APIResponse<T> created(T data, String message) {
        return APIResponse.<T>builder()
                .success(true)
                .message(message)
                .data(data)
                .statusCode(201)
                .build();
    }

    public static <T> APIResponse<T> error(String message, int statusCode) {
        return APIResponse.<T>builder()
                .success(false)
                .message(message)
                .statusCode(statusCode)
                .build();
    }
}
