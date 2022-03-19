package com.restaurant.api;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.core.SpringVersion;


import javax.annotation.PostConstruct;
import java.util.TimeZone;

@SpringBootApplication(exclude = HibernateJpaAutoConfiguration.class)
public class RestaurantApiApplication implements CommandLineRunner{
	
	public static void main(String[] args) {
		SpringApplication.run(RestaurantApiApplication.class, args);

	}

	@Override
	public void run(String... args) throws Exception {
	 	System.out.println("version: " + SpringVersion.getVersion());
	}

	@PostConstruct
	public void init(){
		TimeZone.setDefault(TimeZone.getTimeZone("America/Lima"));   // It will set UTC timezone
	}


}
