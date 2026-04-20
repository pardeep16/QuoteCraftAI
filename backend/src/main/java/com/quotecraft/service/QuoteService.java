package com.quotecraft.service;

import com.quotecraft.dto.GenerateQuoteRequest;
import com.quotecraft.dto.QuoteResponse;
import com.quotecraft.entity.Quote;
import com.quotecraft.repository.QuoteRepository;

public class QuoteService {

    private final QuoteRepository quoteRepository;

    public QuoteService(QuoteRepository quoteRepository) {
        this.quoteRepository = quoteRepository;
    }

    public QuoteResponse generateQuote(Long userId, GenerateQuoteRequest request){

        String prompt = buildPrompt(request);
        //ai api
        String result = "";

        Quote quote= new Quote();
        quote.setUserId(userId);
        quote.setTopic(request.getTopic().trim());
        quote.setTone(request.getTone().trim());
        quote.setLength(request.getLength());
        quote.setPrompt(prompt);
        quote.setResult(result);

        Quote saved = quoteRepository.save(quote);
        return mapQuoteToDto(saved, false);
    }

    private QuoteResponse mapQuoteToDto(Quote quote,boolean favorite) {

        return new QuoteResponse(
                quote.getId(),
                quote.getTopic(),
                quote.getTone(),
                quote.getLength(),
                quote.getPrompt(),
                quote.getResult(),
                quote.getCreatedAt(),
                favorite,
                quote.getLanguage(),
                quote.getQuoteStyle(),
                quote.getImageStyle(),
                quote.getImageUrl()
        );
    }

    private String buildPrompt(GenerateQuoteRequest request) {
        return "Create a quote about '%s' in a %s tone, around %d characters."
                .formatted(request.getTopic().trim(), request.getTone().trim(), request.getLength());
    }
}
