package com.quotecraft.ai;

import com.quotecraft.config.AIProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AIClientConfig {

    @Bean
    public AIClient aiClient(AIProperties aiProperties,
                             GeminiAIClient geminiAIClient) {
        return geminiAIClient;
    }
}
