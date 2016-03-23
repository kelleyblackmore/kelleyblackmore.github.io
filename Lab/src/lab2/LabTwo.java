package lab2;

public class LabTwo {
		//ATTRIBUTES
		// instance variables
		private String firstName;
		private String lastName;
		
		
		//CONSTRUCTOR
		//default constructor
		public LabTwo (){
			firstName = "";
			lastName = null;
		}
		
		//BEHAVIORS
		//setters
		public void setFirstName(String fName){
			firstName = fName;
			
		}
		
		public void setLastName(String lName){
			lastName = lName;
		
		}
		
		//getters
		public String getFirstName(){
			return firstName;
		}
		public String getLastName(){
			return lastName;
			
		}

		
		
}
