package com.itb.inf2am.divulgai;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.itb.inf2am.divulgai")
public class ADC {

	public static void main(String[] args) {
		SpringApplication.run(ADC.class, args);
	}

}
