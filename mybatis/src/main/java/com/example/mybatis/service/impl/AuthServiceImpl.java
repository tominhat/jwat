package com.example.mybatis.service.impl;

import com.example.mybatis.dto.request.LoginRequest;
import com.example.mybatis.dto.request.RegisterRequest;
import com.example.mybatis.dto.request.UsrRequest;
import com.example.mybatis.dto.response.LoginResponse;
import com.example.mybatis.dto.response.UsrResponse;
import com.example.mybatis.mapper.UsrMapper;
import com.example.mybatis.model.Usr;
import com.example.mybatis.security.JwtService;
import com.example.mybatis.service.AuthService;
import com.example.mybatis.service.UsrService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthServiceImpl implements AuthService {
    private final UsrMapper usrMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UsrService usrService;

    @Override
    public int register(RegisterRequest request) {
        if (usrService.getUserByEmail(request.getEmail()) != null) {
            throw new RuntimeException("Email already exists");
        }
        Usr usr = new Usr();
        usr.setUsrEmail(request.getEmail());
        usr.setUsrNm(request.getUsername());
        usr.setPwd(passwordEncoder.encode(request.getPwd()));
        usr.setUsrStatus("ACTIVE");
        return usrService.create(usr);

    }

    @Override
    public LoginResponse login(LoginRequest request) {
        String token = jwtService.handleLogin(request.getEmail(), request.getPassword());
        if (token == null) {
            throw new RuntimeException("Invalid email or password");
        }
        LoginResponse response = new LoginResponse();
        response.setToken(token);
        return response;
    }
}