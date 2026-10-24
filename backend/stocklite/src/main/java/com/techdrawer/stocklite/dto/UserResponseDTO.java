package com.techdrawer.stocklite.dto;

import java.util.UUID;

public record UserResponseDTO(

        UUID publicId,
        String username,
        String email,
        String phone,
        Boolean isActivated,
        Boolean isValidated

) {
}
