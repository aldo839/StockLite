package com.techdrawer.stocklite.service;

import com.techdrawer.stocklite.config.JwtUtils;
import com.techdrawer.stocklite.dto.*;
import com.techdrawer.stocklite.model.RefreshToken;
import com.techdrawer.stocklite.model.Role;
import com.techdrawer.stocklite.model.User;
import com.techdrawer.stocklite.model.Validation;
import com.techdrawer.stocklite.repository.RefreshTokenRepository;
import com.techdrawer.stocklite.repository.UserRepository;
import com.techdrawer.stocklite.repository.ValidationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final UserMapperService userMapperService;
    private final PasswordEncoder passwordEncoder;
    private final ValidationService validationService;
    private final ValidationRepository validationRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final RefreshTokenService refreshTokenService;
    private final RefreshTokenRepository refreshTokenRepository;

    public UserResponseDTO registerUser(UserRegistrationDTO dto) {

        User user = new User();

        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setPhone(dto.getPhone());
        user.setRole(Role.ROLE_SELLER);

        User savedUser = userRepository.save(user);

        validationService.register(user);

        return userMapperService.mapToResponseDTO(savedUser);
    }

    public UserResponseDTO activateUser(UserActivationDTO dto) {

        Validation validation = validationRepository.findByCode(dto.getCode())
                .orElseThrow(() -> new RuntimeException("Code not found"));

        if (validation.getExpiration().isAfter(Instant.now())){

            User user = validation.getUser();

            user.setIsActivated(true);
            userRepository.save(user);

            validationRepository.delete(validation);

        } else {
            throw new RuntimeException("Code is expired");
        }

        return userMapperService.mapToResponseDTO(validation.getUser());
    }

    public AuthResultDTO loginUser(UserLoginDTO dto) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword()));

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        assert userDetails != null;
        String accessToken = jwtUtils.generateToken(userDetails);

        User loggedUser = userRepository.findByEmail(userDetails.getUsername());

        UserResponseDTO user = userMapperService.mapToResponseDTO(loggedUser);

        RefreshToken refreshTokenEntity = refreshTokenService.createRefreshToken(loggedUser.getId());

        ResponseCookie refreshTokenCookie = ResponseCookie.from("refreshToken", refreshTokenEntity.getToken())
                .httpOnly(true)
                .secure(false)
                .path("/api/auth")
                .maxAge(60 * 60)
                .sameSite("Strict")
                .build();

        UserLoginResponseDTO responseDTO = new UserLoginResponseDTO(accessToken, user);

        return new AuthResultDTO(responseDTO, refreshTokenCookie);
    }

    public void logoutUser(String token){

        RefreshToken refreshToken = refreshTokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid refreshToke"));

        if (refreshToken.getExpiration().isBefore(Instant.now())) {
            throw new RuntimeException("Token is expired, please Login");
        }

        Long userId = refreshToken.getUser().getId();

        refreshTokenRepository.deleteByUserId(userId);
    }

}
