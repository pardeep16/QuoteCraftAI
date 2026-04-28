package com.quotecraft.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class GenerateImageQuoteRequest {

    @NotBlank
//    @Pattern(regexp = "english|hindi", message = "language must be 'english' or 'hindi'")
    private String language;

    @NotBlank
//    @Pattern(regexp = "motivational|spiritual|funny|professional", message = "quoteStyle must be motivational | spiritual | funny | professional")
    private String quoteStyle;

    @NotBlank
//    @Pattern(regexp = "plain|realistic|cartoon|cinematic", message = "imageStyle must be plain | realistic | cartoon | cinematic")
    private String imageStyle;

    @Size(max = 100)
    private String theme;

    public GenerateImageQuoteRequest() {}

    public GenerateImageQuoteRequest(String language, String quoteStyle, String imageStyle, String theme) {
        this.language = language;
        this.quoteStyle = quoteStyle;
        this.imageStyle = imageStyle;
        this.theme = theme;
    }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }
    public String getQuoteStyle() { return quoteStyle; }
    public void setQuoteStyle(String quoteStyle) { this.quoteStyle = quoteStyle; }
    public String getImageStyle() { return imageStyle; }
    public void setImageStyle(String imageStyle) { this.imageStyle = imageStyle; }
    public String getTheme() { return theme; }
    public void setTheme(String theme) { this.theme = theme; }
}
