//object constructor for jobs. 
function Job(id, name, word){
    this.id = id;
	this.name = name;
	this.word = word;
 // this.checkCode = function(){
 // if(expir isBeforeOrEqualTo todaysDate){
 // return true
 // }
	};

//set job variables.
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

//set array of job variables to be looped through later. 
var jobs = [red, orange, yellow, green, blue, indigo, purple, black, grey, pink];

//set variables for DOM elements for readability. 
var bodyContainer = document.getElementsByClassName("body-container")[0];
var barContainer = document.getElementsByClassName("bar-container")[0];

//set variables for job cards based on width of bar-container div so that cards will always be spaced porportionately.
var width = barContainer.clientWidth;
var partsNum = jobs.length * 4;
var parts = width/partsNum
var elementsSides = parts * 2;

//set varaible that is used in if statement in makeJobCards so that the for loop only runs as many times as there are jobs.
var stop = 0;

//call makeJobCards.
makeJobCards();

//this function makes cards for each of the jobs, with sizes based on width of bar-container div.
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

//the following three sections allow page to scroll right when the user scrolls up and left when the user scrolls down. 
//explanation at http://phrogz.net/js/wheeldelta.html.
//this function sets delta for mousewheel event on any browser. 
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
}

//this function plugs in information from the following section to the above section.
function listener(e) {
    normalize_mousewheel(e);
}

//this function takes the mousewheel event, sends it through the above section (which sends it through normalize_mousewheel), and then tells the body_container div to move right if delta is positive(scroll up) and left if delta is negative(scroll down).
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


// $(document).ready(function(){
//     $('.jumbotron').hide();
//     $('.jumbotron').fadeIn(5000);

//     $('.li').hover(function() {
//     	$(this).slideToggle(1000);

//     });


//     $(function() {
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

