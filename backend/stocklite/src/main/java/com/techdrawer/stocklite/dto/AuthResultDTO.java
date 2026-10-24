package com.techdrawer.stocklite.dto;

import org.springframework.http.ResponseCookie;

public record AuthResultDTO(

        UserLoginResponseDTO responseDTO,
        ResponseCookie cookie

) {
}
