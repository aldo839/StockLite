package com.techdrawer.stocklite.service;

import com.techdrawer.stocklite.dto.CategoryResponseDTO;
import com.techdrawer.stocklite.model.Category;
import org.springframework.stereotype.Service;

@Service
public class CategoryMapperService {

    public CategoryResponseDTO mapToResponseDTO(Category category){

        return new CategoryResponseDTO(

                category.getId(),
                category.getName()

        );
    }

}
