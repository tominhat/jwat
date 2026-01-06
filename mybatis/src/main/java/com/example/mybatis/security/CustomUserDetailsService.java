package com.example.mybatis.security;

import com.example.mybatis.mapper.UsrMapper;
import com.example.mybatis.model.Usr;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CustomUserDetailsService implements UserDetailsService {
    private final UsrMapper usrMapper;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Usr usr = usrMapper.findByEmail(email);
        if (usr == null) {
            throw new UsernameNotFoundException("User not found: " + email);
        }
        return User.builder()
                .username(usr.getUsrEmail())
                .password(usr.getPwd())
                .authorities(Collections.emptyList())
                .build();
    }
}
