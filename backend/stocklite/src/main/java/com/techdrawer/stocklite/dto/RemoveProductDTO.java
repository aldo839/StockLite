package com.techdrawer.stocklite.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;

@Getter
public class RemoveProductDTO {

    @NotNull(message = "Id is require")
    private Long productId;

    @NotNull(message = "Quantity is require")
    @Positive(message = "Quantity must be positive")
    private Integer quantity;

    private String notes;

}
