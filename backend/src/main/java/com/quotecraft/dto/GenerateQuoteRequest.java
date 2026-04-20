package com.quotecraft.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class GenerateQuoteRequest {

    @NotBlank
    @Size(max = 100)
    private String topic;

    @NotBlank
    @Size(max = 50)
    private String tone;

    @Min(10)
    @Max(500)
    private int length;

    public GenerateQuoteRequest() {}

    public GenerateQuoteRequest(String topic, String tone, int length) {
        this.topic = topic;
        this.tone = tone;
        this.length = length;
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

    public int getLength() {
        return length;
    }

    public void setLength(int length) {
        this.length = length;
    }
}
