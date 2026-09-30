package com.techdrawer.stocklite.controller;

import com.techdrawer.stocklite.dto.ProductRegistrationDTO;
import com.techdrawer.stocklite.dto.ProductResponseDTO;
import com.techdrawer.stocklite.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ap/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping("/")
    public ResponseEntity<List<ProductResponseDTO>> getProducts(){

        return new ResponseEntity<>(productService.getProducts(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> getProductById(@PathVariable Long id){

        return new ResponseEntity<>(productService.getProductById(id), HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<ProductResponseDTO> createProduct(@Valid @RequestBody ProductRegistrationDTO dto){

        return new ResponseEntity<>(productService.createProduct(dto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> updateProduct(@Valid @PathVariable Long id, @RequestBody ProductRegistrationDTO dto){

        return new ResponseEntity<>(productService.updateProduct(id, dto), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id){

        productService.deleteProduct(id);

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
