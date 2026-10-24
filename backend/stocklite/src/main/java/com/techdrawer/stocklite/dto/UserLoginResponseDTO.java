package com.techdrawer.stocklite.dto;

public record UserLoginResponseDTO(

        String token,
        UserResponseDTO user

) {
}
