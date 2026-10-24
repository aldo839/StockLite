package com.techdrawer.stocklite.controller;

import com.techdrawer.stocklite.dto.*;
import com.techdrawer.stocklite.service.AuthService;
import com.techdrawer.stocklite.service.RefreshTokenService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final RefreshTokenService refreshTokenService;

    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> registerUser(@Valid @RequestBody UserRegistrationDTO dto) {

        return new ResponseEntity<>(authService.registerUser(dto), HttpStatus.CREATED);
    }

    @PostMapping("/activate")
    public ResponseEntity<UserResponseDTO> activateUser(@Valid @RequestBody UserActivationDTO dto) {

        return new ResponseEntity<>(authService.activateUser(dto), HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<UserLoginResponseDTO> loginUser(@Valid @RequestBody UserLoginDTO dto) {

        AuthResultDTO authResult = authService.loginUser(dto);

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, authResult.cookie().toString())
                .body(authResult.responseDTO());
    }

    @PostMapping("/logout")
    public ResponseEntity<UserLoginResponseDTO> logoutUser(String token) {

        authService.logoutUser(token);

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
