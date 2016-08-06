package com.example.demo;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class ExampleList {
	
	public static void main(String[] args){
		String team;
		String score;
		String player;
		
		Scanner sc=new Scanner(System.in);  

		System.out.println("Enter a team: ");
		team = sc.next();
		
		System.out.println("Enter a score: ");
		score = sc.next();
		
		System.out.println("Enter a player: ");
		player = sc.next();
		
		List<String> myTeam = new ArrayList<String>();
		myTeam.add(team);
		myTeam.add(score);
		myTeam.add(player);

		int sizeOfMyTeam = myTeam.size();
		
		System.out.println("Entry = " + myTeam + " and the size is = "+ sizeOfMyTeam);
		
		for(String next : myTeam){
			System.out.println("Print the myTeam contents: " + next);
		}
	}
}
