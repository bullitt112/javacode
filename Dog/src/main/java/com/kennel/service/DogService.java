package com.kennel.service;

import org.springframework.stereotype.Service;

import com.kennel.domain.Dog;
@Service
public class DogService {
	
		public static Dog getDog() {
			Dog dog = new Dog();
			dog.setBreed("Collie");
			dog.setGender("M");
			dog.setColor("white");
			dog.setAge(2);
			return dog;
		}

}
