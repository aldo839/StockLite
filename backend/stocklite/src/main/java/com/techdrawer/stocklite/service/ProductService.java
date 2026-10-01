package com.techdrawer.stocklite.service;

import com.techdrawer.stocklite.dto.ManageProductDTO;
import com.techdrawer.stocklite.dto.ProductRegistrationDTO;
import com.techdrawer.stocklite.dto.ProductResponseDTO;
import com.techdrawer.stocklite.model.Product;
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

    public List<ProductResponseDTO> getProducts(){

        return productRepository.findAll().stream()
                .map(productMapperService::mapToResponseDTO)
                .toList();
    }

    public ProductResponseDTO getProductById(Long id){

        return productRepository.findById(id)
                .map(productMapperService::mapToResponseDTO)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public ProductResponseDTO createProduct(ProductRegistrationDTO dto){

        if (productRepository.existsByName(dto.getName())){
            throw new RuntimeException("Product already exist with this name");
        }

        Product product = new Product();

        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setQuantity(dto.getQuantity());
        product.setCategory(dto.getCategory());
        product.setCreationDate(LocalDateTime.now());

        Product createdProduct = productRepository.save(product);

        return productMapperService.mapToResponseDTO(createdProduct);
    }

    public ProductResponseDTO updateProduct(Long id, ProductRegistrationDTO dto){

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
        if (dto.getCategory() != null ){
            product.setCategory(dto.getCategory());
        }
        product.setModificationDate(LocalDateTime.now());

        Product updatedProduct = productRepository.save(product);

        return productMapperService.mapToResponseDTO(updatedProduct);
    }

    public void deleteProduct(Long id){

        productRepository.deleteById(id);
    }


    // Add product
    public ProductResponseDTO addProduct(ManageProductDTO dto){

        Product product = productRepository.findById(dto.getId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setQuantity(product.getQuantity() + dto.getQuantity());

        Product addedProduct = productRepository.save(product);

        return productMapperService.mapToResponseDTO(addedProduct);
    }

    // Remove Product
    public ProductResponseDTO removeProduct(ManageProductDTO dto){
        Product product = productRepository.findById(dto.getId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (product.getQuantity() < dto.getQuantity()){
            throw new RuntimeException("Quantity to remove is more than the stock");
        }
        product.setQuantity(product.getQuantity() - dto.getQuantity());

        Product removedProduct = productRepository.save(product);

        return productMapperService.mapToResponseDTO(removedProduct);
    }

}
