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

var mainDiv = document.createElement("div")
mainDiv.className = "iliketo";
document.getElementsByClassName("container")[0].appendChild(mainDiv);
var iLikeTo = document.getElementsByClassName("iliketo");
var iLikeToStyle = document.getElementsByClassName("iliketo")[0].style;
var width = 10000;
var partsNum = colors.length * 4;
var parts = width/partsNum
var elementsSides = parts * 2;
iLikeToStyle.border = "solid black 10px";
iLikeToStyle.height = "300px";
iLikeToStyle.width = width.toString() + "px";
// iLikeToStyle.position= "fixed";
iLikeToStyle.overflow = "hidden";

var stop = 0;

makeMoves();

function makeMoves(){
	if (stop < colors.length){
  		for (i=0; i<colors.length; i++){
  			var newMove = document.createElement("div");
			newMove.className = "moveit"
			newMove.style.display = "inline-block";
			newMove.style.height = "200px";
			newMove.style.width = elementsSides.toString() + "px";
			newMove.style.margin = "50px " + parts.toString() + "px";
			newMove.style.background = colors[i].name;
			// newMMove.style.transform = "translate(0, 400px)";
			newMove.innerHTML = colors[i].word;
			newMove.style.fontSize = "40px";
			// newMove.style.display = "relative";
			// newMove.style.display= "0, 0";
			newMove.color = 'white';
   			iLikeTo[0].appendChild(newMove);
   			stop+=1;
   		};
	};
}


// document.getElementsByClassName("container")[0].addEventListener("scroll", function(event){
// 	var target = event.target;
// 	if (target.className == "container"){
// 		var direction = target.scrollLeft() > target.data("scrollLeft") || 0 ? "down" : "up";
// 		target.data("scrollLeft", target.scrollLeft());
// 		console.log('scrolling', direction);
// 	}
// },
// true 
// );

document.getElementsByClassName("container")[0].addEventListener("mousewheel", function(event){
	var container = event.target;
	if(container.nodeName == "DIV"){
		var iLikeTo = document.getElementsByClassName("iliketo")[0]
		 var direction = container.scrollTop > (iLikeTo.scrollTop || 0) ? "down" : "up";
		// if(delta < 0){
		// document.getElementsByClassName("iliketo")[0].scrollBy(100, 0);
		window.scrollBy(20, 0);
	};
	// };
	
	console.log(container.nodeName);
});






// document.addEventListener(
//     'scroll',

// function (event) {
//     var $elm = $(event.target);
//     if ($elm.is('textarea')) { // or any other filtering condition
//         // do some stuff
//         var direction = $elm.scrollTop() > ($elm.data('scrollTop') || 0) ? "down" : "up";
//         $elm.data('scrollTop', $elm.scrollTop());
//         console.log('scrolling', direction);
//     }
// },
// true // Capture event
// );

// document.getElementsByClassName("container")[0].addEventListener("scroll", scrollTrans());
// window.addEventListener("wheel", scrollTrans);***
// function scrollWin() {
// 	scroll = document.getElementsByClassName("container")[0].scrollLeft;
//     window.scrollBy(100, 0);
// }



// function scrollTrans(){***
//     iLikeTo[0].style.transform = "translate(-50px, 0)";***
//     console.log('Log');***
    	// newMMove.style.transform = "translate(0, 400px)";
    // moveIt = document.getElementsByClassName("moveit")***
    // for(var i = 0; i < moveIt.length; i++)ś
    //    var left_of_object = moveIt[i].offsetRight + moveIt[i].offsetWidth
    //    var s
 	  //  moveIt[i].style.transform = "rotate(7deg)";
 	// };	
// }***




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