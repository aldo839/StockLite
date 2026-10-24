package com.techdrawer.stocklite.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class UserRegistrationDTO {

    @NotBlank(message = "Username is require")
    @Size(min = 4, max = 20)
    private String username;

    @NotBlank(message = "Email is require")
    @Email(message = "Email must be valid")
    private String email;

    @NotBlank(message = "Password is require")
    @Size(min = 8, message = "Password must contain minimum 8 characters")
    private String password;

    private String phone;

}
