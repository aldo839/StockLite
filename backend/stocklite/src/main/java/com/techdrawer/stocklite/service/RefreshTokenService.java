package com.techdrawer.stocklite.service;

import com.techdrawer.stocklite.model.RefreshToken;
import com.techdrawer.stocklite.model.User;
import com.techdrawer.stocklite.repository.RefreshTokenRepository;
import com.techdrawer.stocklite.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;

    public RefreshToken createRefreshToken(Long userId){

        User user = userRepository.findById(userId)
                        .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        RefreshToken refreshToken = refreshTokenRepository.findByUserId(userId)
                        .orElse(new RefreshToken());

        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken.setExpiration(Instant.now().plus(1, ChronoUnit.HOURS));
        refreshToken.setUser(user);

        return refreshTokenRepository.save(refreshToken);
    }

}
