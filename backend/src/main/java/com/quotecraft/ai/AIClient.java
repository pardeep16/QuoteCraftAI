package com.quotecraft.ai;

public interface AIClient {

    String generateQuote(String topic,String tone, int length);
    String generateImage(String imagePrompt, String style);
}
