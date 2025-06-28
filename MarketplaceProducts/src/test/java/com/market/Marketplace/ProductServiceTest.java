package com.market.Marketplace;

import com.market.Marketplace.Models.Product;
import com.market.Marketplace.Repository.ProductRepository;
import com.market.Marketplace.Service.ProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testAllProducts() {
        // Arrange
        Product product1 = new Product(1, "Product A", "Description A", "Image A", 100.0, Arrays.asList("Category1", "Category2"));
        Product product2 = new Product(2, "Product B", "Description B", "Image B", 200.0, Arrays.asList("Category3", "Category4"));
        when(productRepository.findAll()).thenReturn(Arrays.asList(product1, product2));

        // Act
        List<Product> products = productService.allProducts();

        // Assert
        assertEquals(2, products.size());
        assertEquals("Product A", products.get(0).getProductName());
        assertEquals(Arrays.asList("Category1", "Category2"), products.get(0).getProductCategory());
        verify(productRepository, times(1)).findAll();
    }

    @Test
    public void testSingleProduct() {
        // Arrange
        Product product = new Product(1, "Product A", "Description A", "Image A", 100.0, Arrays.asList("Category1", "Category2"));
        when(productRepository.findProductByProductId(1)).thenReturn(Optional.of(product));

        // Act
        Optional<Product> result = productService.singleProduct(1);

        // Assert
        assertTrue(result.isPresent());
        assertEquals("Product A", result.get().getProductName());
        assertEquals(Arrays.asList("Category1", "Category2"), result.get().getProductCategory());
        verify(productRepository, times(1)).findProductByProductId(1);
    }

    @Test
    public void testCreateProduct() {
        // Arrange
        Product product = new Product(1, "Product A", "Description A", "Image A", 100.0, Arrays.asList("Category1", "Category2"));
        when(productRepository.save(product)).thenReturn(product);

        // Act
        Product result = productService.createProduct(product);

        // Assert
        assertNotNull(result);
        assertEquals("Product A", result.getProductName());
        assertEquals(Arrays.asList("Category1", "Category2"), result.getProductCategory());
        verify(productRepository, times(1)).save(product);
    }

    @Test
    public void testDeleteProduct() {
        // Arrange
        Product product = new Product(1, "Product A", "Description A", "Image A", 100.0, Arrays.asList("Category1"));
        when(productRepository.findProductByProductId(1)).thenReturn(Optional.of(product));
        doNothing().when(productRepository).delete(product);

        // Act
        Product result = productService.deleteProduct(1);

        // Assert
        assertNotNull(result);
        assertEquals("Product A", result.getProductName());
        assertEquals(Arrays.asList("Category1"), result.getProductCategory());
        verify(productRepository, times(1)).findProductByProductId(1);
        verify(productRepository, times(1)).delete(product);
    }

    @Test
    public void testEditProduct() {
        // Arrange
        Product existingProduct = new Product(1, "Old Name", "Old Description", "Old Image", 100.0, Arrays.asList("Category1"));
        Product updatedProduct = new Product(1, "New Name", "New Description", "New Image", 200.0, Arrays.asList("Category1", "Category2"));
        when(productRepository.findProductByProductId(1)).thenReturn(Optional.of(existingProduct));
        when(productRepository.save(existingProduct)).thenReturn(updatedProduct);

        // Act
        Product result = productService.editProduct(updatedProduct);

        // Assert
        assertNotNull(result);
        assertEquals("New Name", result.getProductName());
        assertEquals(Arrays.asList("Category1", "Category2"), result.getProductCategory());
        verify(productRepository, times(1)).findProductByProductId(1);
        verify(productRepository, times(1)).save(existingProduct);
    }
}
