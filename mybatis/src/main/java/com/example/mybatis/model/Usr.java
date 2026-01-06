package com.example.mybatis.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Usr {
    private Integer usrId;
    private String usrNm;
    private String usrEmail;
    private String usrStatus;
    private String pwd;
    private String delFlg;

    public Usr(String usrNm, String usrEmail) {
        this.usrNm = usrNm;
        this.usrEmail = usrEmail;
    }
}

