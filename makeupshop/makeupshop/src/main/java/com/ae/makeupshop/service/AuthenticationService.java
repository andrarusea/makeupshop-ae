package com.ae.makeupshop.service;

import com.ae.makeupshop.config.security.JwtService;
import com.ae.makeupshop.controller.AuthenticationRequest;
import com.ae.makeupshop.model.*;
import com.ae.makeupshop.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        var user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .build();

        ShoppingCart shoppingCart = new ShoppingCart();
        user.setShoppingCart(shoppingCart);

        User createdUser = userRepository.save(user);

         var jwtToken = jwtService.generateJwtToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .email(createdUser.getUsername())
                .firstname(createdUser.getFirstname())
                .lastname(createdUser.getLastname())
                .userId(createdUser.getId())
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow();

        var jwtToken = jwtService.generateJwtToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .email(user.getUsername())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .userId(user.getId())
                .build();
    }
}
