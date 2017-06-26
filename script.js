

function warnonAlert() {
    //alert("This isn't working yet");
    console.log("this isn't working right");
    
    
}

function addNavbar() {
    
document.getElementById('nav').innerHTML =
'<nav class="navbar navbar-default" >' +
    '<div class="container-fluid">' +
        '<div class="navbar-header">' +
        '<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#collapsedNav">' +
        '<span class="sr-only">Toggle navigation</span>' +    
        '<span class="icon-bar"></span>' +
        '<span class="icon-bar"></span>' +
         '<span class="icon-bar"></span>' +   
        '</button>' +
        '<a href="#" class="navbar-brand"><img src="photos/favicon.ico" style="height:100%; width: auto;" alt="Kelleyblackmore.github.io"/></a>' +
        '<p class="navbar-text"><strong>Kris=Dev</strong></p>' +
        '</div>' +
        '<div class="collapse navbar-collapse" id="collapseNav">' +
            '<ul class="nav navbar-nav">' +
            '<li class="active"><a href="#">Home</a></li>' +
            '<li><a href="aboutme.html">About Me</a></li>' +
            '<li><a  href="blog.html">Blog</a></li>' +
            '<li><a  href="projects.html">Projects</a></li>' +
            '<li><a  href="learntocode.html">Learn to code</a></li>' +
            '<li><a  href="projects.html">Projects</a></li>' +
            '</ul>' +    
            '<form class="navbar-form navbar-right" role="search">' +
            '<div class="form-group">' +
                '<input type="text" class="form-control" placeholder="Search">' +
            '</div>' +
            '</form>' +
            '<ul class="nav navbar-nav navbar-right">' +
            '<li><a href="">Contact me</a></li>' +
            '</ul>' +
        '</div>' +
    '</div>' +
    '</nav>';


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


    function init(){
    
    addNavbar();
    addFooter();
  //  getFiles();
}

