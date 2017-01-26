function Job(id, name, word){
    this.id = id;
	this.name = name;
	this.word = word;
 // this.checkCode = function(){
 // if(expir isBeforeOrEqualTo todaysDate){
 // return true
 // }
	};

var red = new Job('1','red', 'Are');
var orange = new Job('2', 'orange', 'you');
var yellow = new Job('3','yellow', 'diggin');
var green = new Job('4', 'green', 'this');
var blue = new Job('5', 'blue', 'whole');
var indigo = new Job('6', 'indigo', 'javascript');
var purple = new Job('7', 'purple', 'nonesense?');
var black = new Job('8', 'black', 'Is');
var grey = new Job('9', 'grey', 'it');
var pink = new Job('10', 'pink', 'fun?');

var jobs = [red, orange, yellow, green, blue, indigo, purple, black, grey, pink];

var bodyContainer = document.getElementsByClassName("body-container")[0];
var barContainer = document.getElementsByClassName("bar-container")[0];

var width = barContainer.clientWidth;
var partsNum = jobs.length * 4;
var parts = width/partsNum
var elementsSides = parts * 2;

var stop = 0;

makeJobCards();

function makeJobCards(){
	if (stop <= jobs.length){
  		for (var i=0; i<jobs.length; i++){
  			var currentJob = document.createElement("div");
			currentJob.className = "moveit"
			currentJob.style.display = "inline-block";
			currentJob.style.height = "200px";
			currentJob.style.width = elementsSides.toString() + "px";
			currentJob.style.margin = "50px " + parts.toString() + "px";
			currentJob.style.background = jobs[i].name;
			currentJob.innerHTML = jobs[i].word;
			currentJob.style.fontSize = "40px";
			currentJob.color = 'white';
   			barContainer.appendChild(currentJob);
   			stop+=1;
   		};
	};
}


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

function listener(e) {
    normalize_mousewheel(e);
    // node.scrollTop -= 10 * e.delta;
}

if ('onmousewheel' in bodyContainer) {
    bodyContainer.onmousewheel = function(e) {
        e = e || window.event;
        listener(e);
        if (e.delta > 0){
      
        	window.scrollBy(-25, 0);
        }
        if (e.delta < 0){
     		window.scrollBy(25, 0);
        };
        console.log(e.delta);
    };
} else {
    bodyContainer.addEventListener('DOMMouseScroll', listener)
}




