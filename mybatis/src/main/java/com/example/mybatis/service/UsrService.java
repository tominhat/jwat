package com.example.mybatis.service;


import com.example.mybatis.dto.request.UsrRequest;
import com.example.mybatis.dto.response.UsrResponse;

import java.util.List;

public interface UsrService {
    int create(UsrRequest req);
    List<UsrResponse> getAll();
    int update(UsrRequest req);
}
