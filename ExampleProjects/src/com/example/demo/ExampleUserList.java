package com.example.demo;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

import com.example.domain.User;

public class ExampleUserList {
	public static void main(String[] args) {

		String id;
		String firstName;
		String lastName;

		List<User> list = new ArrayList<User>();

		Scanner sc = new Scanner(System.in);
		String YesNo;
		do{
			System.out.println("Enter a Id:");
			id = sc.next();

			System.out.println("Enter a firstName: ");
			firstName = sc.next();

			System.out.println("Enter a lastName: ");
			lastName = sc.next();

			list.add(new User(id, firstName, lastName));
			System.out.print("Add Another User (Y/N): ");
			YesNo = sc.next();
		}while(!YesNo.equalsIgnoreCase("N"));
			
		System.out.println("Print the first User:");
		System.out.println("User = " + list);
		System.out.println("User = " + list.get(0).getId());
		System.out.println("User = " + list.get(0).getFirstName());
		System.out.println("User = " + list.get(0).getLastName());
		System.out.println(" ");
		
		// looping through the UserObject and list
		System.out.println("Print the all User(s) = ");
		for (User u : list) {
			System.out.println(u.getId() + u.getFirstName() + " " + u.getLastName());
		}
	}
}
