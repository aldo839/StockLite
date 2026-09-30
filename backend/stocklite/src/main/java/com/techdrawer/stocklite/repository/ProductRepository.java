package com.techdrawer.stocklite.repository;

import com.techdrawer.stocklite.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Boolean existsByName(String name);

}
