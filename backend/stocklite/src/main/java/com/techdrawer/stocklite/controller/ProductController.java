package com.techdrawer.stocklite.controller;

import com.techdrawer.stocklite.dto.*;
import com.techdrawer.stocklite.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")
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
    public ResponseEntity<ProductResponseDTO> updateProduct(@PathVariable Long id, @Valid @RequestBody ProductUpdateDTO dto){

        return new ResponseEntity<>(productService.updateProduct(id, dto), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id){

        productService.deleteProduct(id);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // Add an existing product to the stock (Up quantity)
    @PostMapping("/add")
    public ResponseEntity<ProductResponseDTO> addProduct(@Valid @RequestBody AddProductDTO dto){

        return new ResponseEntity<>(productService.addProduct(dto), HttpStatus.OK);
    }

    // Remove an existing product from stock (down quantity)
    @PostMapping("/remove")
    public ResponseEntity<ProductResponseDTO> removeProduct(@Valid @RequestBody RemoveProductDTO dto){

        return new ResponseEntity<>(productService.removeProduct(dto), HttpStatus.OK);
    }

}
