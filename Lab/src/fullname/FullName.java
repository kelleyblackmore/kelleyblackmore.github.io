package fullname;

public class FullName {
	//ATTRIBUTES
			// instance variables
			private String firstName;
			private String lastName;
			private String fullName;
			
			
			//CONSTRUCTOR
			//default constructor
		{
				firstName = "";
				lastName = null;
				fullName = "";
				
			}
			
			//BEHAVIORS
			//setters
			public void setFirstName(String fName){
				firstName = fName;
				
			}
			
			public void setLastName(String lName){
				lastName = lName;
			
			}
			public void setFullName(String ffName){
				fullName = ffName;
			}
			
			
			//getters
			public String getFirstName(){
				return firstName;
			}
			public String getLastName(){
				return lastName;
				
			}
			public String setfullName(){
				return fullName;
				
			}
			//System.out.println(name.getFirstName()+" "+name.getLastName());
			
			
	}



