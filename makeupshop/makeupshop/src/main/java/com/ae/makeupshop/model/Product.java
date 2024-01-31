package com.ae.makeupshop.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Double price;
    private String picture;
    private String size;
    private Integer stock;
    private Category category;
    private UnitOfMeasure unit;
    private String brand;

    public Product(String name, Double price, String picture, String size, Integer stock, Category category, UnitOfMeasure unit, String brand) {
        this.name = name;
        this.price = price;
        this.picture = picture;
        this.size = size;
        this.stock = stock;
        this.category = category;
        this.unit = unit;
        this.brand = brand;
    }
}
