package com.techdrawer.stocklite.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class UserLoginDTO {

    @NotBlank(message = "Email is require")
    @Email(message = "Email must been valid")
    private String email;

    @NotBlank(message = "Password is require")
    private String password;

}
