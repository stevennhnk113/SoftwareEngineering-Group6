package com.Group6;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class ScheduleMeApplication {

	public static void main(String[] args) {
		SpringApplication.run(ScheduleMeApplication.class, args);
	}

}
