package com.quotecraft.ai;

import com.google.genai.Client;
import com.google.genai.types.*;
import com.quotecraft.config.AIProperties;
import com.quotecraft.config.ImageAIProperties;
import com.quotecraft.util.BuildPrompt;
import org.checkerframework.checker.units.qual.A;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Component
public class GeminiAIClient implements AIClient{

    private final AIProperties aiProperties;
    private final ImageAIProperties imageAIProperties;

    public GeminiAIClient(AIProperties aiProperties,ImageAIProperties imageAIProperties) {
        this.aiProperties = aiProperties;
        this.imageAIProperties = imageAIProperties;
    }

    @Override
    public String generateQuote(String topic, String tone, int length) {

        if(aiProperties.getApiKey() == null || aiProperties.getApiKey().isEmpty()) {
            throw new IllegalStateException("AI API key is missing");
        }

        String prompt = BuildPrompt.buildQuotePrompt(topic, tone, length);

        try{
            Client client = Client.builder().apiKey(aiProperties.getApiKey()).build();

            //config
            GenerateContentConfig config = GenerateContentConfig.builder()
                    .temperature(0.8f)
                    .build();

            GenerateContentResponse response = client.models.generateContent(
                    aiProperties.getModel(),
                    prompt,
                    config
            );

            // Extract the generated text from the response
            String text = response.text();

            if(text == null || text.isBlank()){
                throw new RuntimeException("AI response is empty");
            }
            return text.trim();

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public String generateImage(String imagePrompt, String style) {
        if(aiProperties.getApiKey() == null || aiProperties.getApiKey().isEmpty()) {
            throw new IllegalStateException("AI API key is missing");
        }

        String prompt = imagePrompt;
        if(null == imagePrompt || imagePrompt.isBlank()){
            prompt = BuildPrompt.buildImagePrompt(imagePrompt, style);
        }

        try{
            Client client = Client.builder().apiKey(aiProperties.getApiKey()).build();
            GenerateImagesConfig config = GenerateImagesConfig.builder()
                    .numberOfImages(1)
                    .outputMimeType("image/jpeg")
                    .build();
            GenerateImagesResponse generateImagesResponse= client.models.generateImages(
                    imageAIProperties.getModel(),
                    prompt,
                    config
            );

            Optional<List<GeneratedImage>> list = generateImagesResponse.generatedImages();

            if(list.isEmpty()){
                throw new RuntimeException("No images generated");
            }
            Optional<Image> imageObj = list.get().get(0).image();
            Optional<byte[]> byteObj = imageObj.flatMap(Image::imageBytes);

            if(byteObj.isEmpty()){
                throw new RuntimeException("Generated image is empty");
            }

            return Base64.getEncoder().encodeToString(byteObj.get());

        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }
}
