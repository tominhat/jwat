package com.example.mybatis.controller;

import com.example.mybatis.dto.request.LoginRequest;
import com.example.mybatis.dto.request.RegisterRequest;
import com.example.mybatis.dto.request.UsrRequest;
import com.example.mybatis.dto.response.ApiResponse;
import com.example.mybatis.dto.response.UsrResponse;
import com.example.mybatis.service.AuthService;
import com.example.mybatis.service.UsrService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/auth")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        return ApiResponse.ok(authService.login(req));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        return ApiResponse.ok(authService.register(req));
    }

}
