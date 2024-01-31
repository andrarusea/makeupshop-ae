package com.ae.makeupshop.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Order {

    private double price;
    private String currency;
    private String method;
    private String intent;
    private String description;

}
