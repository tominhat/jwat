package com.example.mybatis.service;


import com.example.mybatis.dto.request.LoginRequest;
import com.example.mybatis.dto.request.RegisterRequest;
import com.example.mybatis.dto.request.UsrRequest;
import com.example.mybatis.dto.response.LoginResponse;
import com.example.mybatis.dto.response.UsrResponse;

import java.util.List;

public interface AuthService {
    int register(RegisterRequest request);
    LoginResponse login(LoginRequest request);
}
