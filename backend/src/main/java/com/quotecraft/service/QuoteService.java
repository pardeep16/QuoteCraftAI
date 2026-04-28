package com.quotecraft.service;

import com.quotecraft.ai.AIClient;
import com.quotecraft.dto.GenerateImageQuoteRequest;
import com.quotecraft.dto.GenerateQuoteRequest;
import com.quotecraft.dto.QuoteResponse;
import com.quotecraft.entity.Quote;
import com.quotecraft.repository.QuoteRepository;
import org.springframework.stereotype.Service;

@Service
public class QuoteService {

    private final QuoteRepository quoteRepository;
    private final AIClient aiClient;

    public QuoteService(QuoteRepository quoteRepository,AIClient aiClient) {
        this.quoteRepository = quoteRepository;
        this.aiClient = aiClient;
    }

    public QuoteResponse generateQuote(Long userId, GenerateQuoteRequest request){

        String prompt = buildPrompt(request);
        //ai api
        String result = aiClient.generateQuote(request.getTopic(), request.getTone(), request.getLength());

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

    public QuoteResponse generateImageQuote(Long userId, GenerateImageQuoteRequest generateImageQuoteRequest){

        String quoteText = aiClient.generateQuote(generateImageQuoteRequest.getTheme(), generateImageQuoteRequest.getQuoteStyle(), 220);
        String imagePrompt = quoteText + " in " + generateImageQuoteRequest.getImageStyle() + " style";
        String imageBase64 = aiClient.generateImage(imagePrompt, generateImageQuoteRequest.getImageStyle());

        Quote quote= new Quote();
        quote.setUserId(userId);
        quote.setTopic(generateImageQuoteRequest.getTheme());
        quote.setTone(generateImageQuoteRequest.getQuoteStyle());
        quote.setLength(220);
        quote.setPrompt(imagePrompt);
        quote.setResult(quoteText);
        quote.setLanguage(generateImageQuoteRequest.getLanguage());
        quote.setQuoteStyle(generateImageQuoteRequest.getQuoteStyle());
        quote.setImageStyle(generateImageQuoteRequest.getImageStyle());

        Quote saved = quoteRepository.save(quote);
        saved.setImageUrl(imageBase64);
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
