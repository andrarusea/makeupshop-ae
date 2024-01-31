package com.ae.makeupshop.service;

import com.ae.makeupshop.controller.AddCartItemRequestDto;
import com.ae.makeupshop.model.CartItem;
import com.ae.makeupshop.model.Product;
import com.ae.makeupshop.model.ShoppingCart;
import com.ae.makeupshop.model.User;
import com.ae.makeupshop.model.dto.QuantityDto;
import com.ae.makeupshop.repository.ProductRepository;
import com.ae.makeupshop.repository.ShoppingCartRepository;
import com.ae.makeupshop.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.mvc.condition.RequestConditionHolder;

import java.util.*;

@Service
@AllArgsConstructor
public class ShoppingCartService {
    private final ShoppingCartRepository shoppingCartRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;


    public ShoppingCart getShoppingCart(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(RuntimeException::new);
        return shoppingCartRepository.findByUserId(user.getId());
    }

    public ShoppingCart addItemToCart(Long userId, AddCartItemRequestDto addCartItemRequest) {
        User user = userRepository.findById(userId).orElseThrow(RuntimeException::new);
        Product product = productRepository.findById(addCartItemRequest.getProductId()).orElseThrow(RuntimeException::new);

        ShoppingCart shoppingCart = shoppingCartRepository.findByUserId(userId);

        CartItem cartItem = new CartItem();
        cartItem.setProduct(product);
        cartItem.setCart(shoppingCart);

        // check if item already exists in the cart
        Optional<CartItem> existingItem = shoppingCart.getCartItems().stream().filter(item -> item.getProduct().getId() == addCartItemRequest.getProductId()).findFirst();

        if(existingItem.isPresent()){
            cartItem.setQuantity(existingItem.get().getQuantity() + addCartItemRequest.getQuantity());
            shoppingCart.getCartItems().remove(existingItem.get());
        } else {
            cartItem.setQuantity(addCartItemRequest.getQuantity());
        }

        if(shoppingCart.getCartItems() == null){
            shoppingCart.setCartItems(new HashSet<>());
        }

        shoppingCart.getCartItems().add(cartItem);
        return shoppingCartRepository.save(shoppingCart);
    }

    public ShoppingCart editQuantity(Long id, Long cartItemId, QuantityDto quantityDto) {
        User user = userRepository.findById(id).orElseThrow(RuntimeException::new);

        ShoppingCart shoppingCart = shoppingCartRepository.findByUserId(id);

        if(shoppingCart != null){
            CartItem cartItem = shoppingCart.getCartItems().stream()
                    .filter(item -> item.getCartItemId().equals(cartItemId))
                    .findFirst()
                    .orElse(null);

            if (cartItem != null) {
                // Update the quantity of the cart item
                cartItem.setQuantity(quantityDto.getQuantity());

                // Save the updated shopping cart
                shoppingCart = shoppingCartRepository.save(shoppingCart);
            }
        }

        return shoppingCart;
    }

    public ShoppingCart removeItemFromCart(Long id, Long cartItemId) {
        ShoppingCart shoppingCart = shoppingCartRepository.findByUserId(id);

        if (shoppingCart != null) {
            // Find and remove the cart item by ID from the shopping cart
            shoppingCart.getCartItems().removeIf(item -> item.getCartItemId().equals(cartItemId));

            // Save the updated shopping cart
            shoppingCart = shoppingCartRepository.save(shoppingCart);
        }

        return shoppingCart;
    }
}
