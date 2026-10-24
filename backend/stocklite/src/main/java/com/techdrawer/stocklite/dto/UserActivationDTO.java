package com.techdrawer.stocklite.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class UserActivationDTO {

    @NotBlank(message = "Validation code is require")
    @Size(min = 6, max = 6, message = "Validation code must have 6 characters")
    private String code;

}
