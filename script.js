

function warnonAlert(){
    alert("This isn't working yet");
    console.log("this isn't working right");
    
    
}
function init(){
    
    addNavbar();
    addFooter();
    getFiles();
}
function addNavbar() {
    
document.getElementById('navbar').innerHTML =
   '<div>'+
 ' <ul >'+

    '<li><a href="index.html">Home</a></li>'+
    '<li><a href="blog.html" >Blog</a></li>'+
    '<li ><a href="projects.html" >Projects</a></li>'+
    '<li ><a href="games.html" >Games</a></li>'+
    '<li><a href="certificates.html" >Certificates</a></li>'+
    '<li ><a href="learntocode.html" >Learn to code</a></li>'+
    '<li><a href="tribute.html" >Tribute Page </a></li>'+
    '<li ><a href="contactme.html" >Contact me</a></li>'+
  '</ul>';
}

function addFooter(){
document.getElementById('footer').innerHTML=
    '<footer class="w3-container w3-padding-64 w3-center w3-opacity">'+
  '<div>'+
   '<a href="https://twitter.com/kelleydevmore" ><i ></i></a>'+
   '<a href="https://github.com/kelleyblackmore" ><i ></i></a>'+
   '<a href="https://www.linkedin.com/in/kris-kelley-974629ab" ><i ></i></a>'+
 '</div>'+
'</footer>';
    
    
}

function getFiles(){
    var inp = document.getElementById("get-files");
// Access and handle the files 

for (i = 0; i < inp.files.length; i++) {
    let file = inp.files[i];
   console.log(file);
}
function blogs(){
    
}

