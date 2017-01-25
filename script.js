// var moveIt = document.getElementsByClassName("moveit")[0]

// moveIt.addEventListener("click", function(){
//   moveIt.style.background = "red";
// });

// var moveIt = document.getElementsByClassName("moveit")
// var currentColor = 1;

// // window.addEventListener("scroll", changeColor);
// moveIt.addEventListener("click", changeColor);

// function changeColor(){
//   if (currentColor == 1){
//     moveIt.style.background = "yellow";
//     moveIt.style.transform = "translate(300px, 100px)";
//     currentColor = 2;
//   }
//   else if (currentColor == 2){
//     moveIt.style.background = "green";
//     moveIt.style.transform = "translate(400px, 200px)";
//     currentColor = 3;
//   }
//   else if (currentColor == 3){
//     moveIt.style.background = "red";
//     moveIt.style.transform = "translate(0, 0)";
//     currentColor = 1;
//   };
// };

window.addEventListener("scroll", scrollTrans);

function Color(id, name, word){
    this.id = id;
	this.name = name;
	this.word = word;
 // this.checkCode = function(){
 // if(expir isBeforeOrEqualTo todaysDate){
 // return true
 // }
	};

var red = new Color('1','red', 'Are');
var orange = new Color('2', 'orange', 'you');
var yellow = new Color('3','yellow', 'diggin');
var green = new Color('4', 'green', 'this');
var blue = new Color('5', 'blue', 'whole');
var indigo = new Color('6', 'indigo', 'javascript');
var purple = new Color('7', 'purple', 'nonesense?');
var black = new Color('8', 'black', 'Is');
var grey = new Color('9', 'grey', 'it');
var pink = new Color('10', 'pink', 'fun?');

var colors = [red, orange, yellow, green, blue, indigo, purple, black, grey, pink];
// var colors = [red, orange, yellow, green, blue, indigo];
// var colors = [red, orange, yellow];

var mainDiv = document.createElement("div")
mainDiv.className = "iliketo";
document.body.appendChild(mainDiv);
var iLikeTo = document.getElementsByClassName("iliketo");
var width = 10000;
var widthStr = width.toString() + "px";
iLikeTo[0].style.width = widthStr;
var colorNum = colors.length;
var partsNum = colorNum * 4;
var parts = width/partsNum
// var height = parts * 4;
// var heightStr = height.toString() + "px";
var partsStr = parts.toString() + "px";
var elementsSides = parts * 2;
var elementsSidesStr = elementsSides.toString() + "px";
iLikeTo[0].style.border = "solid black 10px";
// iLikeTo[0].style.height = heightStr;
iLikeTo[0].style.height = "300px";
var stop = 0;

function scrollTrans(){
	if (stop < colors.length){
  		for (i=0; i<colors.length; i++){
  			var newMove = document.createElement("div");
			newMove.className = "moveit"
			newMove.style.display = "inline-block";
			var sizeStr = elementsSides.toString() + "px";
			// newMove.style.height = elementsSidesStr;
			newMove.style.height = "200px";
			newMove.style.width = elementsSidesStr;
			newMove.style.margin = "50px " + partsStr;
			newMove.style.background = colors[i].name;
			newMove.innerHTML = colors[i].word;
			newMove.style.fontSize = "40px";
			newMove.color = 'white';
   			iLikeTo[0].appendChild(newMove);
   			stop+=1;
   		};
	};
}





//    $(function() {
//     $(window).scroll( function(){
    
       
//         $('.fadeIn').each( function(i){
            
//             var bottom_of_object = $(this).position().top + $(this).outerHeight();
//             var bottom_of_window = $(window).scrollTop() + $(window).height();
            
           
//             bottom_of_window = bottom_of_window + 200;  
          
//             if( bottom_of_window > bottom_of_object ){
                
//                 $(this).animate({'opacity':'1'},4000);
                    
//             }
//         }); 
    
//     });
// });