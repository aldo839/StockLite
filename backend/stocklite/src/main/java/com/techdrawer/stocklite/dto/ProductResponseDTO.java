package com.techdrawer.stocklite.dto;

import com.techdrawer.stocklite.model.Category;
import com.techdrawer.stocklite.model.ProductStatus;

import java.time.LocalDateTime;

public record ProductResponseDTO(

        Long id,
        String name,
        String description,
        Double price,
        Integer quantity,
        ProductStatus status,
        Category category,
        LocalDateTime creationDate,
        LocalDateTime modificationDate

) {
}
