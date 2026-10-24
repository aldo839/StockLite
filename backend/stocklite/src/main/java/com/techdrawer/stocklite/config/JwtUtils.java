package com.techdrawer.stocklite.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.function.Function;

@Component
public class JwtUtils {

    @Value("${app.jwt-secret-key}")
    private String SECRET;

    private SecretKey getSignKey() {
        byte[] keyBytes = Decoders.BASE64URL.decode(SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(UserDetails userDetails){

        return Jwts.builder()
                .subject(userDetails.getUsername())
                .issuedAt(Date.from(Instant.now()))
                .expiration(Date.from(Instant.now().plus(15, ChronoUnit.MINUTES)))
                .signWith(getSingKey())
                .compact();
    }

    private SecretKey getSingKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // Extract username
    public String extractUsername(String token){

        return extractClaims(token, Claims::getSubject);
    }

    // Extract expiration date
    private Date extractExpiration(String token){

        return extractClaims(token, Claims::getExpiration);
    }

    // Extract Claims
    private <T> T extractClaims(String token, Function<Claims, T> claimsResolver) {

        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // Extract All Claims
    private Claims extractAllClaims(String token) {

        return Jwts.parser()
                .verifyWith(getSingKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    // Expiration verification
    private Boolean isExpired(String token){

        return extractExpiration(token).before(Date.from(Instant.now()));
    }

    // Validity verification
    public Boolean isValid(String token, UserDetails userDetails){

        String username = userDetails.getUsername();

        return (username.equals(extractUsername(token)) && !isExpired(token));
    }

}
