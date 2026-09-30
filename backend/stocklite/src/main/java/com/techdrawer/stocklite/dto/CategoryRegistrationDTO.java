package com.techdrawer.stocklite.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class CategoryRegistrationDTO {

    @NotBlank(message = "Category name is require")
    @Size(max = 50, message = "Category name must contain less than 50 charaters")
    private String name;

}
