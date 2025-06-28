package com.market.Marketplace.Repository;

import com.market.Marketplace.Models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    Optional<List<Product>> findProductByProductName(String productName);

    Optional<Product> findProductByProductId(int productId);
}
