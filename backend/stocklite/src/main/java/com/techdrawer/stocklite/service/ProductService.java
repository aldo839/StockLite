package com.techdrawer.stocklite.service;

import com.techdrawer.stocklite.dto.*;
import com.techdrawer.stocklite.model.ActivityType;
import com.techdrawer.stocklite.model.Category;
import com.techdrawer.stocklite.model.Product;
import com.techdrawer.stocklite.model.ProductStatus;
import com.techdrawer.stocklite.repository.CategoryRepository;
import com.techdrawer.stocklite.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductMapperService productMapperService;
    private final ActivityService activityService;
    private final CategoryRepository categoryRepository;

    private ProductStatus calculateStatus(Integer quantity){

        if (quantity == null || quantity <= 0){
            return ProductStatus.OUT_OF_STOCK;
        }
        if (quantity < 6) {
            return ProductStatus.LOW_STOCK;
        }
        return ProductStatus.IN_STOCK;
    }

    public List<ProductResponseDTO> getProducts(){

        activityService.record(
                ActivityType.GET_ALL_PRODUCT,
                "Consultation of the product list",
                LocalDateTime.now()
        );

        return productRepository.findAll().stream()
                .map(productMapperService::mapToResponseDTO)
                .toList();
    }

    public ProductResponseDTO getProductById(Long id){

        activityService.record(
                ActivityType.GET_ALL_PRODUCT,
                "Product ID : " + id,
                LocalDateTime.now()
        );

        return productRepository.findById(id)
                .map(productMapperService::mapToResponseDTO)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public ProductResponseDTO createProduct(ProductRegistrationDTO dto){

        if (productRepository.existsByName(dto.getName())){
            throw new RuntimeException("Product already exist with this name");
        }

        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Product product = new Product();

        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setQuantity(dto.getQuantity());
        product.setCategory(category);
        product.setStatus(calculateStatus(product.getQuantity()));
        product.setCreationDate(LocalDateTime.now());

        Product createdProduct = productRepository.save(product);

        activityService.record(
                ActivityType.CREATE_PRODUCT,
                "Creation of product with the name : " + product.getName(),
                LocalDateTime.now()
        );

        return productMapperService.mapToResponseDTO(createdProduct);
    }

    public ProductResponseDTO updateProduct(Long id, ProductUpdateDTO dto){

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (dto.getName() != null && !dto.getName().isBlank()){
            product.setName(dto.getName());
        }
        if (dto.getDescription() != null && !dto.getDescription().isBlank()){
            product.setDescription(dto.getDescription());
        }
        if (dto.getPrice() != null ){
            product.setPrice(dto.getPrice());
        }
        if (dto.getQuantity() != null ){
            product.setQuantity(dto.getQuantity());
        }
        product.setStatus(calculateStatus(product.getQuantity()));
        product.setModificationDate(LocalDateTime.now());

        Product updatedProduct = productRepository.save(product);

        activityService.record(
                ActivityType.UPDATE_PRODUCT,
                "Product name" + product.getName() +"'",
                LocalDateTime.now()
        );

        return productMapperService.mapToResponseDTO(updatedProduct);
    }

    public void deleteProduct(Long id){

        productRepository.deleteById(id);

        activityService.record(
                ActivityType.DELETE_PRODUCT,
                "Product ID : " + id,
                LocalDateTime.now()
        );
    }


    // Add product
    public ProductResponseDTO addProduct(AddProductDTO dto){

        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setQuantity(product.getQuantity() + dto.getQuantity());
        product.setStatus(calculateStatus(product.getQuantity()));
        product.setModificationDate(LocalDateTime.now());

        Product addedProduct = productRepository.save(product);

        activityService.record(
                ActivityType.ADD_PRODUCT,
                "Product name : " + product.getName() + "\n Quantity : " + dto.getQuantity() +
                        "\nSupplier : " + dto.getSupplier() + "\n Notes : " + dto.getNotes(),
                LocalDateTime.now()
        );

        return productMapperService.mapToResponseDTO(addedProduct);
    }

    // Remove Product
    public ProductResponseDTO removeProduct(RemoveProductDTO dto){
        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (product.getQuantity() < dto.getQuantity()){
            throw new RuntimeException("Quantity to remove is more than the stock");
        }
        product.setQuantity(product.getQuantity() - dto.getQuantity());
        product.setStatus(calculateStatus(product.getQuantity()));
        product.setModificationDate(LocalDateTime.now());

        Product removedProduct = productRepository.save(product);

        activityService.record(
                ActivityType.REMOVE_PRODUCT,
                "Product name : "+ product.getName() + "\nQuantity : " + dto.getQuantity() +
                        "\nNotes : " + dto.getNotes(),
                LocalDateTime.now()
        );

        return productMapperService.mapToResponseDTO(removedProduct);
    }

}
