document.getElementById("foot01").innerHTML = "<p>&copy;  " + new Date().getFullYear() + " Kris Kelley. All rights reserved.</p>";

function warnonAlert(){
    alert("This isn't working yet");
    console.log("this isn't working right");
    
    
}
function addNavbar(){
    
    
    document.getElementById('navbar').innerHTML = 
/**Navbar */
'<div class="w3-top">'+
 ' <ul class="w3-navbar w3-blue w3-card-2 w3-left-align w3-large">'+
   ' <li class="w3-hide-medium w3-hide-large w3-opennav w3-right">'+
    '</li>'+
    '<li><a href="index.html" class="w3-padding-large w3-white">Home</a></li>'+
    '<li class="w3-hide-small"><a href="projects.html" class="w3-padding-large w3-hover-white">Projects</a></li>'+
   '<li class="w3-hide-small"><a href="blog.html" class="w3-padding-large w3-hover-white">Blog</a></li>'+
    '<li class="w3-hide-small"><a href="learntocode.html" class="w3-padding-large w3-hover-white">Learn to code</a></li>'+
    '<li class="w3-hide-small"><a href="contactme.html" class="w3-padding-large w3-hover-white">Contact me</a></li>'+
  '</ul>';
  
  }