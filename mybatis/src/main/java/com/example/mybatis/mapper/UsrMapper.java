package com.example.mybatis.mapper;

import com.example.mybatis.dto.request.RegisterRequest;
import com.example.mybatis.dto.request.UsrRequest;
import com.example.mybatis.dto.response.UsrResponse;
import com.example.mybatis.model.Usr;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface UsrMapper {
    List<UsrResponse> findAll();
    int insert(Usr usr);
    int update(UsrRequest usr);
    Usr findByEmail(@Param("email") String userEmail);
}
