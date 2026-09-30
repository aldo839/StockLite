package com.techdrawer.stocklite.service;

import com.techdrawer.stocklite.dto.ProductResponseDTO;
import com.techdrawer.stocklite.model.Product;
import org.springframework.stereotype.Service;

@Service
public class ProductMapperService {

    public ProductResponseDTO mapToResponseDTO(Product product){

        return new ProductResponseDTO(
                
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getQuantity(),
                product.getCategory(),
                product.getCreationDate(),
                product.getModificationDate()
                
        );
    }
}
