package fullname;

import javax.swing.JOptionPane;



public class FullNameMain {

	public static void main(String[] args) {
		
		// create an instance of the LabTwo class (object)
				// JOptionPane.showInputDialog displays a GUI for input from user
				String fName = JOptionPane.showInputDialog("Enter first name");
				String lName = JOptionPane.showInputDialog("Enter last name");
				
				FullName name = new FullName();
				name.setFirstName(fName);
				name.setLastName(lName);
				
				System.out.println(name.getFirstName()+" "+name.getLastName());
				
				
				

	}

}
