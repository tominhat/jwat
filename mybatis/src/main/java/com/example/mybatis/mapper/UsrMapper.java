package com.example.mybatis.mapper;

import com.example.mybatis.dto.request.UsrRequest;
import com.example.mybatis.dto.response.UsrResponse;
import com.example.mybatis.model.Usr;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UsrMapper {
    List<UsrResponse> findAll();
    int insert(UsrRequest usr);
    int update(UsrRequest usr);
}
