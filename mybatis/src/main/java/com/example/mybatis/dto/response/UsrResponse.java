package com.example.mybatis.dto.response;

import lombok.Data;
import tools.jackson.core.ObjectReadContext;

@Data
public class UsrResponse extends BaseResponse {
    private Integer id;
    private String name;
    private String email;
    private String status;

}
