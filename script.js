

function warnonAlert(){
    alert("This isn't working yet");
    console.log("this isn't working right");
    
    
}
function init(){
    
    addNavbar();
    addFooter();
}
function addNavbar() {
document.getElementById('navbar').innerHTML =
   '<div class="w3-top">'+
 ' <ul class="w3-navbar w3-blue w3-card-2 w3-left-align w3-large">'+
   ' <li class="w3-hide-medium w3-hide-large w3-opennav w3-right">'+
    '</li>'+
    '<li><a href="index.html" class="w3-padding-large w3-hover-white">Home</a></li>'+
    '<li class="w3-hide-small"><a href="blog.html" class="w3-padding-large w3-hover-white">Blog</a></li>'+
    '<li class="w3-hide-small"><a href="projects.html" class="w3-padding-large w3-hover-white">Projects</a></li>'+
    '<li class="w3-hide-small"><a href="games.html" class="w3-padding-large w3-hover-white">Games</a></li>'+
    '<li class="w3-hide-small"><a href="certificates.html" class="w3-padding-large w3-hover-white">Certificates</a></li>'+
   '<li class="w3-hide-small"><a href="professionaldevelopment.html" class="w3-padding-large w3-hover-white">Professional Development</a></li>'+
    '<li class="w3-hide-small"><a href="learntocode.html" class="w3-padding-large w3-hover-white">Learn to code</a></li>'+
    '<li class="w3-hide-small"><a href="tribute.html" class="w3-padding-large w3-hover-white">Tribute Page </a></li>'+
    '<li class="w3-hide-small"><a href="contactme.html" class="w3-padding-large w3-hover-white">Contact me</a></li>'+
  '</ul>';
}

function addFooter(){
document.getElementById('footer').innerHTML=
    '<footer class="w3-container w3-padding-64 w3-center w3-opacity">'+
  '<div>'+
   '<a href="https://twitter.com/kelleydevmore" class="w3-hover-text-light-blue"><i class="fa fa-twitter"></i></a>'+
   '<a href="https://github.com/kelleyblackmore" class="w3-hover-text-grey"><i class="fa fa-github"></i></a>'+
   '<a href="https://www.linkedin.com/in/kris-kelley-974629ab" class="w3-hover-text-indigo"><i class="fa fa-linkedin"></i></a>'+
 '</div>'+
'</footer>';
    
    
}