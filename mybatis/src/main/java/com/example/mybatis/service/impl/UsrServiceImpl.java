package com.example.mybatis.service.impl;

import com.example.mybatis.dto.request.UsrRequest;
import com.example.mybatis.dto.response.UsrResponse;
import com.example.mybatis.mapper.UsrMapper;
import com.example.mybatis.model.Usr;
import com.example.mybatis.service.UsrService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UsrServiceImpl implements UsrService {
    private final UsrMapper usrMapper;

    @Override
    public int create(UsrRequest req) {
        usrMapper.insert(req);
        return 1;
    }

    @Override
    public List<UsrResponse> getAll() {
        return usrMapper.findAll();
    }

    @Override
    public int update(UsrRequest req) {
        return usrMapper.update(req);
    }

}