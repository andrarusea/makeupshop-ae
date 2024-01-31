package com.ae.makeupshop.controller;

import com.ae.makeupshop.model.Order;
import com.ae.makeupshop.model.Product;
import com.ae.makeupshop.service.PaypalService;
import com.paypal.api.payments.Links;

import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/paypal")
@AllArgsConstructor
public class PaypalController {

    private final PaypalService service;

    public static final String SUCCESS_URL = "pay/success";
    public static final String CANCEL_URL = "pay/cancel";

    @PostMapping("/pay")
    public ResponseEntity<ReturnUrl> payment(@RequestParam("total") double total) {
        try {
            String approvalUrl = service.createPaymentAndGetApprovalUrl(total, "USD", "paypal", "sale", "Payment for products",
                    "http://localhost:9090/" + CANCEL_URL, "http://localhost:9090/" + SUCCESS_URL);
            return ResponseEntity.ok(new ReturnUrl(approvalUrl));
        } catch (PayPalRESTException e) {
            e.printStackTrace();
            return ResponseEntity.ok(new ReturnUrl());
        }
    }

    @GetMapping(value = CANCEL_URL)
    public boolean cancelPay() {
        return false;
    }

    @GetMapping(value = SUCCESS_URL)
    public boolean successPay(@RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String payerId) {
        try {
            Payment payment = service.executePayment(paymentId, payerId);
            System.out.println(payment.toJSON());
            return payment.getState().equals("approved");
        } catch (PayPalRESTException e) {
            System.out.println(e.getMessage());
            return false;
        }
    }
}
