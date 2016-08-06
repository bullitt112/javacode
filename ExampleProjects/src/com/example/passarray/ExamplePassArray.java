package com.example.passarray;

import java.util.ArrayList;
import java.util.List;

import com.example.domain.People;

public class ExamplePassArray {

	public static void main(String[] args){
		ArrayList<String> list = new ArrayList<>();
		// initializing list object of type People  
        ArrayList<People> peopleList = new ArrayList<>();  
        
		//Call a method and pass ArrayList as arguments 
		addUsers(list);
		
		for (String value : list){
			System.out.println(value);
		}
		
	//	addPeople(peopleList);
	}
	
//	private static ArrayList<People> addPeople(ArrayList<People> peopleList) {
////		List<People>  rs = new ArrayList<People> ();
//		
//		peopleList.add(new People("1", "John", "Lennon"));
////		rs.add(new People("2", "John2", "Lennon", "email@gmail"));
////		rs.add(new People("3", "John3", "Lennon", "email@gmail"));
//		
//		return rs;
//		
//	}

	public static void addUsers(ArrayList<String> list){
		list.add("Steve");
		list.add("John");
	}
}
