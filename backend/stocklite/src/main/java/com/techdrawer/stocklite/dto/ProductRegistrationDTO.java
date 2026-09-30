package com.techdrawer.stocklite.dto;

import com.techdrawer.stocklite.model.Category;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class ProductRegistrationDTO {

    @NotBlank(message = "Name is require")
    @Size(min = 2, max = 50, message = "Product name must have between 2 and 50 characters")
    private String name;

    @Size(max = 200, message = "Product name must have less than 500 characters")
    private String description;

    @NotNull(message = "Price is require")
    private Double price;

    @NotNull(message = "Quantity is require")
    private Integer quantity;

    @NotNull(message = "Category is require")
    private Category category;

}
