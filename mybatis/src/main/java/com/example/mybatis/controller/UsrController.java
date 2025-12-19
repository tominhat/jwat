package com.example.mybatis.controller;

import com.example.mybatis.dto.request.UsrRequest;
import com.example.mybatis.dto.response.ApiResponse;
import com.example.mybatis.dto.response.UsrResponse;
import com.example.mybatis.service.UsrService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/user")
public class UsrController {
    private final UsrService usrService;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody UsrRequest req) {
        usrService.create(req);
        return ApiResponse.ok("insert lvl success");
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        List<UsrResponse> res = usrService.getAll();
        return ApiResponse.ok(res);
    }

    @PutMapping
    public ResponseEntity<?> update(@RequestBody UsrRequest req) {
        int re = usrService.update(req);
        if(re>0) return ApiResponse.success("update success");
        else return ApiResponse.fail("update fail");
    }
}
