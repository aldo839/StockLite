package com.techdrawer.stocklite.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;

@Getter
public class ManageProductDTO {

    @NotNull(message = "Id is require")
    private Long id;

    @NotNull(message = "Quantity is require")
    @Positive(message = "Quantity must be positive")
    private Integer quantity;

}
