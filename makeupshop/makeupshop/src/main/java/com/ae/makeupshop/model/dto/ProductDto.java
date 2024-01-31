package com.ae.makeupshop.model.dto;

import com.ae.makeupshop.model.Category;
import com.ae.makeupshop.model.UnitOfMeasure;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
    private String name;
    private Double price;
    private String picture;
    private String size;
    private Integer stock;
    private Category category;
    private UnitOfMeasure unit;
    private String brand;
}
