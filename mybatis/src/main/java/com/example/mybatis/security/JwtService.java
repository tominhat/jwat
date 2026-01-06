package com.example.mybatis.security;

import com.example.mybatis.model.Usr;
import com.example.mybatis.service.UsrService;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
@RequiredArgsConstructor
//@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class JwtService {
    private final AuthenticationManager authenticationManager;
    private final UsrService usrService;

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long jwtExpiration;

    @Value("${jwt.issuer}")
    private String jwtIssuer;

    public String generateToken(Usr usr) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS256);
        JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                .subject(usr.getUsrId().toString())
                .claim("email", usr.getUsrEmail())
                .issuer(jwtIssuer)
                .issueTime(new Date())
                .expirationTime(new Date(System.currentTimeMillis() + jwtExpiration))
                .build();

        Payload payload = new Payload(claimsSet.toJSONObject());
        JWSObject jwsObject = new JWSObject(header, payload);
        try {
            jwsObject.sign(new MACSigner(secretKey.getBytes(StandardCharsets.UTF_8)));

            return jwsObject.serialize();
        } catch (JOSEException e) {
            throw new RuntimeException("Error signing JWT", e);
        }
    }

    public boolean isTokenValid(String token) {
        try {
            JWSVerifier verifier = new MACVerifier(secretKey.getBytes(StandardCharsets.UTF_8));
            SignedJWT signedJWT = SignedJWT.parse(token);
            Date expirationTime = signedJWT.getJWTClaimsSet().getExpirationTime();
            var verified = signedJWT.verify(verifier);
            return verified && expirationTime.after(new Date());
        } catch (Exception e) {
            return false;
        }

    }

    public String handleLogin(String email, String pwd) {
        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(email, pwd)
                );
        Usr usr = usrService.getUserByEmail(email);
        if (usr == null) {
            throw new RuntimeException("User not found with email: " + email);
        }
        return generateToken(usr);
    }

}