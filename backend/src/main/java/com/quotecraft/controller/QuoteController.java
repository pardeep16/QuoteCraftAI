package com.quotecraft.controller;

import com.quotecraft.dto.GenerateImageQuoteRequest;
import com.quotecraft.dto.GenerateQuoteRequest;
import com.quotecraft.dto.QuoteResponse;
import com.quotecraft.service.QuoteService;
import com.quotecraft.util.SecurityUtils;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/quotes")
public class QuoteController {

    private final QuoteService quoteService;

    public QuoteController(QuoteService quoteService) {
        this.quoteService = quoteService;
    }

    @PostMapping("/generate")
    @ResponseStatus(HttpStatus.CREATED)
    public QuoteResponse generate(@Valid @RequestBody GenerateQuoteRequest generateQuoteRequest){

        Long userId = SecurityUtils.requireCurrentUserId();
        return quoteService.generateQuote(userId, generateQuoteRequest);
    }

    @PostMapping("/image-generate")
    @ResponseStatus(HttpStatus.CREATED)
    public QuoteResponse generateImage(@Valid @RequestBody GenerateImageQuoteRequest generateImageQuoteRequest){
        Long userId = SecurityUtils.requireCurrentUserId();

        return quoteService.generateImageQuote(userId, generateImageQuoteRequest);
    }
}
