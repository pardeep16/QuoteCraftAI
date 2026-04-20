package com.quotecraft.dto;

import java.time.Instant;

public class QuoteResponse {

    private Long id;
    private String topic;
    private String tone;
    private Integer length;
    private String prompt;
    private String result;
    private Instant createdAt;
    private boolean favorite;
    private String language;
    private String quoteStyle;
    private String imageStyle;
    private String imageUrl;

    public QuoteResponse() {}

    public QuoteResponse(Long id, String topic, String tone, Integer length, String prompt, String result, Instant createdAt, boolean favorite, String language, String quoteStyle, String imageStyle, String imageUrl) {
        this.id = id;
        this.topic = topic;
        this.tone = tone;
        this.length = length;
        this.prompt = prompt;
        this.result = result;
        this.createdAt = createdAt;
        this.favorite = favorite;
        this.language = language;
        this.quoteStyle = quoteStyle;
        this.imageStyle = imageStyle;
        this.imageUrl = imageUrl;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getTone() {
        return tone;
    }

    public void setTone(String tone) {
        this.tone = tone;
    }

    public Integer getLength() {
        return length;
    }

    public void setLength(Integer length) {
        this.length = length;
    }

    public String getPrompt() {
        return prompt;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public boolean isFavorite() {
        return favorite;
    }

    public void setFavorite(boolean favorite) {
        this.favorite = favorite;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getQuoteStyle() {
        return quoteStyle;
    }

    public void setQuoteStyle(String quoteStyle) {
        this.quoteStyle = quoteStyle;
    }

    public String getImageStyle() {
        return imageStyle;
    }

    public void setImageStyle(String imageStyle) {
        this.imageStyle = imageStyle;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
