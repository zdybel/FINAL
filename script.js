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


// document.getElementsByClassName("container")[0].addEventListener("mousewheel", function(event){
// 	var container = event.target;
// 	if(container.nodeName == "DIV"){
// 		window.scrollBy(20, 0);
// 	};
// 	// };
	
// 	console.log(container.nodeName);
// });





function normalize_mousewheel(e) {
    var //o = e.originalEvent,
        o = e,
        d = o.detail, w = o.wheelDelta,
        n = 225, n1 = n-1;
    
    // Normalize delta
    d = d ? w && (f = w/d) ? d/f : -d/1.35 : w/120;
    // Quadratic scale if |d| > 1
    d = d < 1 ? d < -1 ? (-Math.pow(d, 2) - n1) / n : d : (Math.pow(d, 2) + n1) / n;
    // Delta *should* not be greater than 2...
    e.delta = Math.min(Math.max(d / 2, -1), 1);
    // console.log(e.delta);
}



/* Quick cross browser event attach - this is bad mmkay */
var node = document.getElementsByClassName('container')[0];

function listener(e) {
    normalize_mousewheel(e);
    // node.scrollTop -= 10 * e.delta;
}

if ('onmousewheel' in node) {
    node.onmousewheel = function(e) {
        e = e || window.event;
        listener(e);
        if (e.delta > 0){
      
        	window.scrollBy(-20, 0);
        }
        if (e.delta < 0){
     
        			window.scrollBy(20, 0);
        };
        console.log(e.delta);
    };
    console.log("onmousewheel in node");
} else {
    node.addEventListener('DOMMouseScroll', listener)
}




// var wheelDistance = function(evt){
//   if (!evt) evt = event;
//   var w=evt.wheelDelta, d=evt.detail;
//   if (d){
//     if (w) return w/d/40*d>0?1:-1; // Opera
//     else return -d/3;              // Firefox;         TODO: do not /3 for OS X
//   } else return w/120;             // IE/Safari/Chrome TODO: /3 for Chrome OS X
// };

// var wheelDirection = function(evt){
//   if (!evt) evt = event;
//   return (evt.detail<0) ? 1 : (evt.wheelDelta>0) ? 1 : -1;
//   console.log(evt.wheelDelta);
// };

// console.log("wheelDistance: " + wheelDistance);
// console.log("wheelDirection: " + wheelDirection);
