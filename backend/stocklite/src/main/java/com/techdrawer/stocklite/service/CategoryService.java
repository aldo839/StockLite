package com.techdrawer.stocklite.service;

import com.techdrawer.stocklite.dto.CategoryRegistrationDTO;
import com.techdrawer.stocklite.dto.CategoryResponseDTO;
import com.techdrawer.stocklite.model.Category;
import com.techdrawer.stocklite.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapperService categoryMapperService;

    public List<CategoryResponseDTO> getCategories(){

        return categoryRepository.findAll().stream()
                .map(categoryMapperService::mapToResponseDTO)
                .toList();
    }

    public CategoryResponseDTO getCategoryById(Long id){

        return categoryRepository.findById(id)
                .map(categoryMapperService::mapToResponseDTO)
                .orElseThrow(() -> new RuntimeException("Category not found"));
    }

    public CategoryResponseDTO createCategory(CategoryRegistrationDTO dto){

        if (categoryRepository.existsByName(dto.getName())){
            throw new RuntimeException("Category already exist with the name : " + dto.getName());
        }

        Category category = new Category();

        category.setName(dto.getName());

        Category createdCategory = categoryRepository.save(category);

        return categoryMapperService.mapToResponseDTO(createdCategory);
    }

    public CategoryResponseDTO updateCategory(Long id, CategoryRegistrationDTO dto){

        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        if (dto.getName() != null && !dto.getName().isBlank()){
            category.setName(dto.getName());
        }

        Category updatedCategory = categoryRepository.save(category);

        return categoryMapperService.mapToResponseDTO(updatedCategory);
    }

    public void deleteCategory(Long id){

        categoryRepository.deleteById(id);
    }

}
