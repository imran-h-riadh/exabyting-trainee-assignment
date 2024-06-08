package com.exabyting.rms.Config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtTokenProvider {
    SecretKey secretKey = Keys.hmacShaKeyFor(JwtConstent.SECRET_KEY.getBytes(StandardCharsets.UTF_8));

    public  String generateToken(Authentication authentication){

        String jwt = Jwts.builder().setIssuer("RMS TEAM").setIssuedAt(
                        new Date()
                ).setExpiration(new Date(new Date().getTime()+86400000))
                .claim("email",authentication.getName()).signWith(secretKey)
                .claim("role", authentication.getAuthorities())
                .compact();

        return jwt;

    }

    public String getEmailFromToken(String jwt){
        jwt = jwt.substring(7);
        Claims claim = Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(jwt).getBody();

        return String.valueOf(claim.get("email"));
    }
}
