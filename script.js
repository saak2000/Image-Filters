var image=null;
var output=null;
 var canvas;

function upload(){
 canvas= document.getElementById("can1")
  var file= document.getElementById("input");
  image= new SimpleImage(file);
  image.drawTo(canvas);
  output=new SimpleImage(file);
  var filename=file.value;
  alert("You Chose " + filename);  
}


//GRAYSCALE IMAGE
function grayscale(){
 try{ 
  for (var pixel of image.values()){
    var g=pixel.getGreen()
    var r=pixel.getRed()
    var b=pixel.getBlue()
    var avg= (b+g+r)/3
    pixel.setGreen(avg);
    pixel.setRed(avg);
    pixel.setBlue(avg);
      }
  var imgcanvas=document.getElementById("can2");
  image.drawTo(imgcanvas);
  }
catch(err){
alert("Image is not loaded!!");
  }
}


//IMAGE WITH RED FILTER
function redhue(){
 try{ 
   for (var pixel of image.values()){
    var g=pixel.getGreen();
    var r=pixel.getRed();
    var b=pixel.getBlue();
    var avg= (b+g+r)/3;
    if (avg < 128) {
      pixel.setRed(2*avg);
      pixel.setGreen(0);
      pixel.setBlue(0);
    } else {
      pixel.setRed(255);
      pixel.setGreen(2*avg-255);
      pixel.setBlue(2*avg-255);
    } 
  }   var imgcanvas=document.getElementById("can2");
  image.drawTo(imgcanvas);
 }
catch(err){
alert("Image is not loaded!!");
 }
}


//IMAGE WITH RAINBOW FILTER
function rainbow(){
try{
  for (var pixel of image.values()){
    var y = pixel.getY();
    var h = image.getHeight();
    var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
    if (y < h/7){
    if (avg < 128) {
        pixel.setRed(2*avg);
        pixel.setGreen(0);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(2*avg-255);
        pixel.setBlue(2*avg-255);
      }
    }else if (y < 2*h/7){
      if (avg < 128) {
        pixel.setRed(2*avg);
        pixel.setGreen(0.8*avg);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(1.2*avg-51);
        pixel.setBlue(2*avg-255);
      }
    }else if (y < 3*h/7){
      if (avg < 128) {
        pixel.setRed(2*avg);
        pixel.setGreen(2*avg);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(255);
        pixel.setBlue(2*avg-255);
      }
    }else if (y < 4*h/7){
      if (avg < 128) {
        pixel.setRed(0);
        pixel.setGreen(2*avg);
        pixel.setBlue(0);
      } else {
        pixel.setRed(2*avg-255);
        pixel.setGreen(255);
        pixel.setBlue(2*avg-255);
      }
    }else if (y < 5*h/7){
      if (avg < 128) {
        pixel.setRed(0);
        pixel.setGreen(0);
        pixel.setBlue(2*avg);
      } else {
        pixel.setRed(2*avg-255);
        pixel.setGreen(2*avg-255);
        pixel.setBlue(255);
      }
    }else if (y < 6*h/7){
      if (avg < 128) {
        pixel.setRed(0.8*avg);
        pixel.setGreen(0);
        pixel.setBlue(2*avg);
      } else {
        pixel.setRed(1.2*avg-51);
        pixel.setGreen(2*avg-255);
        pixel.setBlue(255);
      }
    } else {
      if (avg < 128) {
        pixel.setRed(1.6*avg);
        pixel.setGreen(0);
        pixel.setBlue(1.6*avg);
      } else {
        pixel.setRed(0.4*avg+153);
        pixel.setGreen(2*avg-255);
        pixel.setBlue(0.4*avg+153);
      }
    } 
}
   var imgcanvas=document.getElementById("can2");
  image.drawTo(imgcanvas);
  }
  
catch(err){
  alert("Image is not loaded!!");
  }
}


//BLUR IMAGE
function blurf(){
  var can = document.getElementById("can2");
try{    
  for (var pixel of image.values()) {
    var wx = image.getWidth();
    var hy = image.getHeight();
    var rand = Math.random();
    var x = pixel.getX();
    var y = pixel.getY();
    var xx;
    var yy;    
    if (rand > 0.5 ) {
      var randx = Math.floor((rand * 10) + 1);
      var randy = Math.floor((rand * 10) + 1);      
      if (x+randx < wx/5){
        xx = x+randx;
      }
      else{
        xx = x-randx;
      }
      if(y+randy < hy/5){
        yy = y+randy;
      }
      else{
        yy = y-randy;
      }
      
      image.setPixel(x, y, image.getPixel(xx, yy));
    }
  }
  var imgcanvas = document.getElementById("can2");
  image.drawTo(imgcanvas);
}
catch(err){
  alert("image is not loaded!!")
}
}


//RESET IMAGE
function reset(){
try{  
  for (var pixel of image.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    image.setPixel(x, y, output.getPixel(x, y));
  }
  var imgcanvas = document.getElementById("can2");
  imgcanvas.className="ccon";
  imgcanvas.className="cbright";
  imgcanvas.className="cnega";
  imgcanvas.className="csat";
  imgcanvas.className="csha";
  image.drawTo(imgcanvas);
}
catch(err){
  alert("image is not loaded!!")
}
}  


//ANY COLOR FILTER
function doAnycolourscale(){
try{  
  var colors = document.getElementById("allcolors");
  var anycolor = colors.value;
  var r= anycolor.substr(1, 2);
  var g= anycolor.substr(3, 2);
  var b= anycolor.substr(5, 2); 
  var rr = parseInt(r, 16);
  var gg= parseInt(g, 16);
  var bb = parseInt(b, 16);
  for (pixel of image.values()){
  var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
     if (avg<128){
      pixel.setRed(rr/127.5*avg);
      pixel.setGreen(gg/127.5*avg);
      pixel.setBlue(bb/127.5*avg);
    }
    else{
      pixel.setRed((2 - rr/127.5)*avg + 2*rr -255);
      pixel.setGreen((2 - gg/127.5)*avg + 2*gg -255);
      pixel.setBlue((2 - bb/127.5)*avg + 2*bb - 255);
     }
  }
var imgcanvas = document.getElementById("can2");
 image.drawTo(imgcanvas);  
}
catch(err){
  alert("Image is not loaded!!");
}
}


//BRIGHTNESS FILTER
function bright(){
try{  
var imagecanvas=document.getElementById("can2");
  imagecanvas.className="bright";
 image.drawTo(imagecanvas); 
}
  catch(err){
alert("Image is not loaded!!");}
}


//CONTRAST IMAGE
function contrast(){
try{  
var imagecanvas=document.getElementById("can2");
  imagecanvas.className="con";
 image.drawTo(imagecanvas); 
}
  catch(err){
alert("Image is not loaded!!");}
}


//NEGATIVE FILTER
function negative(){
try{  
var imagecanvas=document.getElementById("can2");
  imagecanvas.className="nega";
 image.drawTo(imagecanvas) 
}
  catch(err){
alert("Image is not loaded!!");}
}


//SATURATION FILTER
function saturation(){
try{  
var imagecanvas=document.getElementById("can2");
  imagecanvas.className="sat";
 image.drawTo(imagecanvas) 
}
  catch(err){
alert("Image is not loaded!!");}
}


//SHADOW FILTER
function shadow(){
try{  
var imagecanvas=document.getElementById("can2");
  imagecanvas.className="sha";
 image.drawTo(imagecanvas); 
}
  catch(err){
alert("Image is not loaded!!");}
}


