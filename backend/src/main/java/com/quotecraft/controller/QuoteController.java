package com.quotecraft.controller;

import com.quotecraft.dto.GenerateQuoteRequest;
import com.quotecraft.dto.QuoteResponse;
import com.quotecraft.util.SecurityUtils;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/quotes")
public class QuoteController {

    public QuoteController() {
    }

    @PostMapping("/generate")
    @ResponseStatus(HttpStatus.CREATED)
    public QuoteResponse generate(@Valid @RequestBody GenerateQuoteRequest generateQuoteRequest){

        Long userId = SecurityUtils.requireCurrentUserId();


    }
}
