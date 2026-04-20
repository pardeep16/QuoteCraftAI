package com.quotecraft.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.quotecraft.dto.auth.AuthResponse;
import com.quotecraft.dto.auth.GoogleAuthRequest;
import com.quotecraft.entity.User;
import com.quotecraft.repository.UserRepository;
import com.quotecraft.security.JwtService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;

    @Value("${google.client.id}")
    private String googleClientId;

    public AuthService(UserRepository userRepository,JwtService jwtService){
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }


    public AuthResponse authenticateWithGoogle(GoogleAuthRequest authRequest){
        try{
            GoogleIdTokenVerifier googleIdTokenVerifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(),GsonFactory.getDefaultInstance())
                    .setAudience(Collections.singletonList(googleClientId))
                    .build();

            GoogleIdToken idToken = googleIdTokenVerifier.verify(authRequest.getIdToken());
            if(idToken!=null){
                GoogleIdToken.Payload payload = idToken.getPayload();
                String email = payload.getEmail().trim().toLowerCase();

                User user= userRepository.findByEmailIgnoreCase(email).orElseGet(()->{
                    User newUser = new User();
                    newUser.setEmail(email);
                    newUser.setPasswordHash(""); //Google user
                    return userRepository.save(newUser);
                });
                return new AuthResponse(jwtService.generateToken(user));
            }
            else{
                throw new BadCredentialsException("Invalid Google ID token");
            }


        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }



}
