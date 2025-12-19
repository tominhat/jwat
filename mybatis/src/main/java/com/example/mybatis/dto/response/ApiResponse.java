package com.example.mybatis.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApiResponse<T> {
    private int status;
    private String message;
    private T data;
    private Long timestamp;

    public static ResponseEntity<ApiResponse<Void>> unauthorizedResponse() {
        ApiResponse<Void> unauthorized = ApiResponse.<Void>builder()
                .status(HttpStatus.UNAUTHORIZED.value())
                .message("You did not log in!")
                .timestamp(System.currentTimeMillis())
                .build();
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(unauthorized);
    }

    public static <T> ResponseEntity<ApiResponse<T>> ok(T data) {
        ApiResponse<T> res = ApiResponse.<T>builder()
                .status(HttpStatus.OK.value())
                .data(data)
                .timestamp(System.currentTimeMillis())
                .build();
        return ResponseEntity.ok(res);
    }

    public static ResponseEntity<ApiResponse<Void>> success(String message) {
        ApiResponse<Void> res = ApiResponse.<Void>builder()
                .status(HttpStatus.OK.value())
                .message(message != null ? message : "Operation successful")
                .timestamp(System.currentTimeMillis())
                .build();
        return ResponseEntity.ok(res);
    }

    public static ResponseEntity<ApiResponse<Void>> fail(String message) {
        ApiResponse<Void> res = ApiResponse.<Void>builder()
                .status(HttpStatus.BAD_REQUEST.value())
                .message(message != null ? message : "Operation failed")
                .timestamp(System.currentTimeMillis())
                .build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
    }

    public static ResponseEntity<ApiResponse<Void>> notFound(String message) {
        ApiResponse<Void> res = ApiResponse.<Void>builder()
                .status(HttpStatus.NOT_FOUND.value())
                .message(message != null ? message : "Resource not found")
                .timestamp(System.currentTimeMillis())
                .build();
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
    }

}

