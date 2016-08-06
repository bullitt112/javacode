package com.example.demo;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

import com.example.domain.People;

public class ExamplePeopleList {

	public static void main(String[] args) {

		String id;
		String firstName;
		String lastName;
		People people = null;  

		// initializing list object of type People  
        List<People> list = new ArrayList<People>();  
		
		Scanner sc = new Scanner(System.in);
		String YesNo;
		
		do{
		System.out.println("Enter a Id: ");
		id = sc.next();

		System.out.println("Enter a firstName: ");
		firstName = sc.next();

		System.out.println("Enter a lastName: ");
		lastName = sc.next();
		
		people = new People();  
		people.setId(id);  
		people.setFirstName(firstName);  
		people.setLastName(lastName);  
  
        // adding user object into the list  
        list.add(people);  
        System.out.print("Add Another User (Y/N): ");
		YesNo = sc.next();
	}while(!YesNo.equalsIgnoreCase("N"));
		
		System.out.println("1st Person id = " + list.get(0).getId());
		System.out.println("1st Person LastName = " + list.get(0).getLastName());
		
		System.out.println("Last Person = " + people.getId());
		System.out.println("Last Person = " + people.getFirstName());
		System.out.println("Last Person = " + people.getLastName());
		System.out.println(" ");
		
		// looping through the PeopleObject and list  
        for (People u : list) {  
            System.out.println(u.getId() +" " + u.getFirstName() + " "+ u.getLastName());  
        }  
	}
}
