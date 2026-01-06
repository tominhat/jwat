package com.example.mybatis.service;


import com.example.mybatis.dto.request.RegisterRequest;
import com.example.mybatis.dto.request.UsrRequest;
import com.example.mybatis.dto.response.UsrResponse;
import com.example.mybatis.model.Usr;

import java.util.List;

public interface UsrService {
    int create(Usr req);
    List<UsrResponse> getAll();
    int update(UsrRequest req);
    Usr getUserByEmail(String email);
}
