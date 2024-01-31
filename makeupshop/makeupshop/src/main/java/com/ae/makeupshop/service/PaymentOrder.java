package com.ae.makeupshop.service;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class PaymentOrder {
    private String message;
    private String id;
    private String redirectUrl;

    public PaymentOrder(String message) {
        this.message = message;
    }
}
