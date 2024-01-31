package com.ae.makeupshop.controller;

import com.ae.makeupshop.model.ShoppingCart;
import com.ae.makeupshop.model.dto.QuantityDto;
import com.ae.makeupshop.service.ShoppingCartService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/me")
@AllArgsConstructor
public class ShoppingCartController {

    private final ShoppingCartService shoppingCartService;

    @GetMapping("/{userId}/cart")
    public ResponseEntity<ShoppingCart> getShoppingCart(@PathVariable Long userId) {
        return ResponseEntity.ok(shoppingCartService.getShoppingCart(userId));
    }

    @PostMapping("/{userId}/cart")
    public ResponseEntity<ShoppingCart> addItemToShoppingCart(@PathVariable Long userId, @RequestBody AddCartItemRequestDto addCartItemRequest) {
        return ResponseEntity.ok(shoppingCartService.addItemToCart(userId, addCartItemRequest));
    }

    @PutMapping("/{userId}/cart/{cartItemId}")
    public ResponseEntity<ShoppingCart> editQuantity(@PathVariable Long userId, @PathVariable Long cartItemId, @RequestBody QuantityDto quantityDto) {
        return ResponseEntity.ok(shoppingCartService.editQuantity(userId, cartItemId, quantityDto));
    }

    @DeleteMapping("/{userId}/cart/{cartItemId}")
    public ResponseEntity<ShoppingCart> removeItemFromShoppingCart(@PathVariable Long userId, @PathVariable Long cartItemId) {
        return ResponseEntity.ok(shoppingCartService.removeItemFromCart(userId, cartItemId));
    }
}
