package com.quotecraft.controller;

import com.quotecraft.dto.auth.AuthResponse;
import com.quotecraft.dto.auth.GoogleAuthRequest;
import com.quotecraft.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }


    @PostMapping("/google")
    public AuthResponse googleLogin(@Valid @RequestBody GoogleAuthRequest googleAuthRequest){
        return authService.authenticateWithGoogle(googleAuthRequest);
    }
}
