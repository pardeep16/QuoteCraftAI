package com.quotecraft.util;

public class BuildPrompt {

    public static String buildQuotePrompt(String topic, String tone, int length) {

        return  "You produce concise, original motivational quotes.\n\n" +
                "Generate one original quote about topic '%s' in a %s tone, around %d characters."
                        .formatted(topic, tone, length);
    }

     public static String buildImagePrompt(String imagePrompt, String style) {
        return String.format("Generate an image based on the following prompt: '%s' in the style of '%s'.", imagePrompt, style);
    }
}
