package com.ae.makeupshop.service;

import com.ae.makeupshop.exception.ResourceNotFoundException;
import com.ae.makeupshop.model.Category;
import com.ae.makeupshop.model.Product;
import com.ae.makeupshop.model.dto.ProductDto;
import com.ae.makeupshop.repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));

    }

    public Product addProduct(ProductDto productDto) {
        Product product = productRepository.save(new Product(productDto.getName(), productDto.getPrice(), productDto.getPicture(), productDto.getSize(), productDto.getStock(), productDto.getCategory(), productDto.getUnit(), productDto.getBrand()));

        return product;
    }

    public Product updateProduct(Long id, Product product) {
        getProductById(id);
        product.setId(id);
        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        getProductById(id);
        productRepository.deleteById(id);
    }

    public List<Product> getProductsByCategory(Category category) {
        return productRepository.findByCategory(category);
    }
}
