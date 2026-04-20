package com.quotecraft;

import com.quotecraft.config.CorsProperties;
import com.quotecraft.config.JwtProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({
		JwtProperties.class,
		CorsProperties.class
})
public class QuotecraftApisApplication {

	public static void main(String[] args) {
		SpringApplication.run(QuotecraftApisApplication.class, args);
	}

}
