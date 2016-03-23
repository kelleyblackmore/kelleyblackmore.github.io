package lab2;

import java.util.Scanner;

import javax.swing.JOptionPane;

public class LabTwoMain {

	public static void main(String[] args) {
		// create an instance of the LabTwo class (object)
		// JOptionPane.showInputDialog displays a GUI for input from user
		String fName = JOptionPane.showInputDialog("Enter first name");
		String lName = JOptionPane.showInputDialog("Enter last name");
		
		LabTwo name = new LabTwo();
		name.setFirstName(fName);
		name.setLastName(lName);
		System.out.println(name.getFirstName());
		System.out.println(name.getLastName());
		
		
		
		//Scanner uses the console to ask for input
		Scanner input = new Scanner(System.in);
		System.out.print("Enter the first name: ");
		fName = input.nextLine();
		System.out.print("Enter the last name: ");
		lName = input.nextLine();
		input.close();
		
		LabTwo kris = new LabTwo();
		kris.setFirstName(fName);
		kris.setLastName(lName);
		System.out.println(kris.getFirstName());
		System.out.println(kris.getLastName());
		
	}

}
