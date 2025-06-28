package com.market.Marketplace.Service;

import com.market.Marketplace.Models.Product;
import com.market.Marketplace.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> allProducts() {
        return productRepository.findAll();
    }

    /*public Optional<Product> findProductByName(String moviename) {
        return productRepository.findProductByName(moviename);
    }*/

    public Optional<Product> singleProduct(int productId) {
        return productRepository.findProductByProductId(productId);
    }

    public Optional<List<Product>> similarNamedProducts(String productName) {
        return productRepository.findProductByProductName(productName);
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product deleteProduct(int productId) {
        Optional<Product> productOptional = productRepository.findProductByProductId(productId);
        if (productOptional.isPresent()) {
            productRepository.delete(productOptional.get());
            return productOptional.get();
        }
        return null;
    }

    public Product editProduct(Product product) {
        Optional<Product> productOptional = productRepository.findProductByProductId(product.getProductId());
        if (productOptional.isPresent()) {
            Product existingProduct = productOptional.get();
            existingProduct.setProductName(product.getProductName());
            existingProduct.setProductPrice(product.getProductPrice());
            existingProduct.setProductDescription(product.getProductDescription());
            existingProduct.setProductImage(product.getProductImage());
            existingProduct.setProductCategory(product.getProductCategory());
            return productRepository.save(existingProduct);
        }
        return null;
    }
}
