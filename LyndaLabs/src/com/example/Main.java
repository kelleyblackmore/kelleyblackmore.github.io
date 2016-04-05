package com.example;



public class Main {
	static boolean bDef;
	
	public static void main(String[] args) {
		
		boolean b1 = true;
		boolean b2 = false;
		
		System.out.println("The value of b1 is: " + b1);
		System.out.println("The value of b2 is: " + b2);
		System.out.println("The value of bDef is: " + bDef);
		
		boolean b3 = !b1;
		System.out.println("The value of b3 is: " + b3);
		
		int i1 = 0;
		boolean b4 = (i1 != 0);
		System.out.println("The value of b4 is: " + b4);
		
		String sBoolean = "true";
		boolean parsed = Boolean.parseBoolean(sBoolean);
		System.out.println("Parsed: " + parsed);
		
		char c1 = '1';
		char c2 = '2';
		char c3 = '3';
		System.out.println("Char 1: " + c1);
		System.out.println("Char 2: " + c2);
		System.out.println("Char 3: " + c3);
		
		char dollarSign = '\u0024';
		System.out.println("Currency: " + dollarSign);
		
		char a1 = 'a';
		char a2 = 'b';
		char a3 = 'c';
		System.out.print(Character.toUpperCase(a1));
		System.out.print(Character.toUpperCase(a2));
		System.out.println(Character.toUpperCase(a3));
		
		String s1 = "This is a String!";
		System.out.println(s1);
		
		String s2 = new String("This is also a String");
		System.out.println(s2);

		String s3 = "Shirt size: ";
		String s4 = "M";
		String s5 = s3 + s4 + ", Qty: "+4;
		System.out.println(s5);
		
		char[] chars = {'H','e','l','l','o'};
		String s6 = new String(chars);
		System.out.println(s6);
		
		
		char[] chars2 = s6.toCharArray();
		for (char c : chars2){
			System.out.println(c);
		}
		
		
		String s11 = "This is a String!";
		
	
		
		
	}
}
