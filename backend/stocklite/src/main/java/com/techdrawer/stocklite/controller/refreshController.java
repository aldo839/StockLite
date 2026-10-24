package com.techdrawer.stocklite.controller;

import com.techdrawer.stocklite.model.RefreshToken;
import com.techdrawer.stocklite.service.RefreshTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/refresh")
@RequiredArgsConstructor
public class refreshController {

    private final RefreshTokenService refreshTokenService;

    @PostMapping("/{id}")
    public ResponseEntity<RefreshToken> createRefreshToken(@PathVariable Long id) {

        return new ResponseEntity<>(refreshTokenService.createRefreshToken(id), HttpStatus.CREATED);
    }
}
