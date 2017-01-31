window.onload = function() {

	(function() {
  	var supportsPassive = eventListenerOptionsSupported();  

  	if (supportsPassive) {
    	var addEvent = EventTarget.prototype.addEventListener;
    	overwriteAddEvent(addEvent);
  	}

  	function overwriteAddEvent(superMethod) {
    var defaultOptions = {
      passive: true,
      capture: false
    };

    EventTarget.prototype.addEventListener = function(type, listener, options) {
      var usesListenerOptions = typeof options === 'object';
      var useCapture = usesListenerOptions ? options.capture : options;

      options = usesListenerOptions ? options : {};
      options.passive = options.passive !== undefined ? options.passive : defaultOptions.passive;
      options.capture = useCapture !== undefined ? useCapture : defaultOptions.capture;
      
      superMethod.call(this, type, listener, options);
    };
  }

  function eventListenerOptionsSupported() {
    var sopported = false;
    try {
      var opts = Object.defineProperty({}, 'passive', {
        get: function() {
          sopported = true;
        }
      });
      window.addEventListener("test", null, opts);
    } catch (e) {}

    return sopported;
  }
})();
 
 	//object constructor for jobs. 
	function Job(id, name, word, titleMarginTop){
    	this.id = id;
		this.name = name;
		this.word = word;
		this.titleMarginTop = titleMarginTop;
 	// this.checkCode = function(){
 	// if(expir isBeforeOrEqualTo todaysDate){
 	// return true
 	// }
	};

	//set variable for veiwport width.
	var viewportWidth = document.documentElement.clientWidth;
	var viewportHeight = document.documentElement.clientHeight;
	var fifthHeight = viewportHeight * .2;
	var fifthHeightNeg = viewportHeight * -.2;
	var thirdWidth = viewportWidth * (1/3);
	var twoThirdWidth = viewportWidth * (2/3);

	//set variables for DOM elements for readability. 
	var bodyContainer = document.getElementsByClassName("body-container")[0];
	var storyboardContainer = document.getElementsByClassName("storyboard-container")[0];

	//set job variables.
	var red = new Job('1','red', 'Are', fifthHeight);
	var orange = new Job('2', 'orange', 'you', fifthHeightNeg);
	var yellow = new Job('3','yellow', 'diggin', fifthHeightNeg);
	var green = new Job('4', 'green', 'this', fifthHeightNeg);
	var blue = new Job('5', 'blue', 'whole', fifthHeightNeg);
	var indigo = new Job('6', 'indigo', 'javascript', fifthHeightNeg);
	var purple = new Job('7', 'purple', 'nonesense?', fifthHeightNeg);
	var black = new Job('8', 'black', 'Is', fifthHeightNeg);
	var grey = new Job('9', 'grey', 'it', fifthHeightNeg);
	var pink = new Job('10', 'pink', 'fun?', fifthHeightNeg);

	//set array of job variables to be looped through later. 
	var jobs = [red, orange, yellow, green, blue, indigo, purple, black, grey, pink];


	//set variables for job cards based on width of bar-container div so that cards will always be spaced porportionately.
	var storyboardWidth = viewportWidth*jobs.length;
	var width = storyboardWidth;
	var totalColumns = jobs.length * 12;
	var columnPx = width/totalColumns
	var twoColumns = columnPx * 2;
	var fourColumns = columnPx * 4;
	var eightColumns = columnPx * 8;
	var twelveColumns = columnPx * 12;


	//call makeJobCards.
	makeJobCards();

	//call changeViewportWidth
	changeViewportWidth();

	//add event listener so when window changes, viewportWidth variable also changes.
	window.addEventListener("resize", changeViewportWidth);

	window.addEventListener("mousewheel", sideScroll);

	//change viewportWidth variable to current viewport width and set elements widths accordingly.
	function changeViewportWidth(){
		//reset variables according to new viewport width
		viewportWidth = document.documentElement.clientWidth;
		storyboardWidth = viewportWidth*jobs.length;
		width = storyboardWidth;
		totalColumns = jobs.length * 12;
		columnPx = width/totalColumns
		twoColumns = columnPx * 2;
		fourColumns = columnPx * 4;
		eightColumns = columnPx * 8;
		twelveColumns = columnPx * 12;
		//reset size of all the things according to new variables
		bodyContainer.style.width = storyboardWidth.toString() + "px";
		storyboardContainer.style.width = storyboardWidth.toString() + "px";
		for (var i=0; i<jobs.length; i++){
			document.getElementsByClassName("job-cell")[i].style.width = viewportWidth.toString() + "px";
			var currentJob = document.getElementsByClassName("job")[i];
			currentJob.style.width = fourColumns.toString() + "px";
			currentJob.style.marginLeft = fourColumns.toString() + "px";
			currentJob.style.marginRight = fourColumns.toString() + "px";
		};
		if(viewportWidth >= 490){
			sideScroll();
		}
		else if(viewportWidth < 490){
			mobileScroll();
		};
	};


	//this function makes cards for each of the jobs, with sizes based on width of storyboard div.
	function makeJobCards(){
		//set varaible that is used in if statement in makeJobCards so that the for loop only runs as many times as there are jobs.
		var stop = 0;
		if (stop <= jobs.length){
	  		for (var i=0; i<jobs.length; i++){
	  			var jobCell = document.createElement("div");
	  			jobCell.className = "job-cell";
	  			jobCell.style.width = viewportWidth.toString() + "px";
	  			storyboardContainer.appendChild(jobCell);
	  			var currentJobCell = document.getElementsByClassName("job-cell")[i];
	  			var currentJob = document.createElement("div");
				currentJob.className = "job";
				currentJob.style.width = fourColumns.toString() + "px";
				currentJob.style.marginLeft = fourColumns.toString() + "px";
				currentJob.style.marginRight = fourColumns.toString() + "px";
				currentJob.style.background = jobs[i].name;
	   			currentJobCell.appendChild(currentJob);
	   			var currentJobContent = document.createElement("div");
	   			currentJobContent.className = "job-content";
	   			currentJob.appendChild(currentJobContent);
	   			var currentJobTitle = document.createElement("div");
	   			currentJobTitle.className = "job-content-title";
	   			currentJobTitle.innerHTML = jobs[i].word;
	   			currentJobTitle.style.height = fifthHeight.toString() + "px";
	   			currentJobContent.appendChild(currentJobTitle);
	   			stop+=1;
	   		};
		};
	};

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

	//this function plugs in information from the following section and plugs it into the section above
	function listener(e) {
	    normalize_mousewheel(e);
	}

	//this function takes the mousewheel event, sends it through the above section (which sends it through normalize_mousewheel), and then tells the body_container div to move right if delta is positive(scroll up) and left if delta is negative(scroll down).
	function sideScroll(e){
		// var bodyContainer = document.getElementsByClassName("body-container")[0];
		// if ('onmousewheel' in bodyContainer) {
		//     bodyContainer.onmousewheel = function(e) {
		        e = e || window.event;
		        listener(e);
		        if (e.delta > 0){      
		        	window.scrollBy(-25, 0);
		        	scrollBackward();
		        }
		        if (e.delta < 0){
		     		window.scrollBy(25, 0);
		     		scrollForward();
				}
			// }
		// } else {
		//     bodyContainer.addEventListener('DOMMouseScroll', listener);
		// };
	};

	function mobileScroll(){
		document.getElementsByTagName("body")[0].style.overflowY = "auto"; 
		window.addEventListener("scroll", function(){
			document.getElementsByClassName("body-container")[0].translate(25, 0);
		});
	};
	// var thismargin = 0;
	// function scrollForward(){
	// 	console.log("pppp");
// 		switch (new Date().getDay()) {
//     case 0:
//         day = "Sunday";
//         break;
//     case 1:
//         day = "Monday";
//         break;
//     case 2:
//         day = "Tuesday";
//         break;
//     case 3:
//         day = "Wednesday";
//         break;
//     case 4:
//         day = "Thursday";
//         break;
//     case 5:
//         day = "Friday";
//         break;
//     case  6:
//         day = "Saturday";
// }
	// 	for(var i=1; i<jobs.length; i++){
	// 		//set job and element
	// 		var currentJob = jobs[i]
	// 		element = document.getElementsByClassName('job-content-title')[i];
 //    		//set widths that the element will move at
 //    		var widths = viewportWidth * (i-1);
 //    		console.log(widths);
 //    		var widthsAndAThird = widths + thirdWidth;
 //    		var currentWidths = (viewportWidth * i) -300;
 //    		var currentWidthsAndAThird = currentWidths + thirdWidth;
 //    		if(window.scrollX >= widthsAndAThird && window.scrollX <= widthsAndAThird){
 //    			while(currentJob.titleMarginTop >= -200){
 //    				element.style.marginTop = currentJob.titleMarginTop.toString() + "px";
 //    				currentJob.titleMarginTop -= 5;
 //    				console.log("its happening tow  " + currentJob.titleMarginTop.toString())
 //    			};
 //    		}
 //    		if(window.scrollX < currentWidths && window.scrollX < currentWidthsAndAThird){
 //    			while(currentJob.titleMarginTop < fifthHeight){
 //    				element.style.marginTop = currentJob.titleMarginTop.toString() + "px";
 //    				currentJob.titleMarginTop += 5;
 //    				// console.log("one");
 //    			};
 //    		};
	// 	};
	// };

	
	function scrollBackward(){
	};
	
	function scrollForward(){
		if(window.scrollX > thirdWidth && window.scrollX < twoThirdWidth){
			var element = document.getElementsByClassName("job-content-title")[0];
			var currentJob = jobs[0];
			while(currentJob.titleMarginTop < fifthHeight){
	    		element.style.marginTop = currentJob.titleMarginTop.toString() + "px";
	    		currentJob.titleMarginTop += .5;
	    		console.log("0");
	    	};
		}
		if(window.scrollX >twoThirdWidth && window.scrollX < (2*twoThirdWidth)){
			var element = document.getElementsByClassName("job-content-title")[1];
			var currentJob = jobs[1];
			while(currentJob.titleMarginTop < fifthHeight){
	    		element.style.marginTop = currentJob.titleMarginTop.toString() + "px";
	    		currentJob.titleMarginTop += .5;
	    		console.log("1");
	    	};	
		}
		if(window.scrollX >(2*twoThirdWidth) && window.scrollX < (3*twoThirdWidth)){
			var element = document.getElementsByClassName("job-content-title")[2];
			var currentJob = jobs[2];
			while(currentJob.titleMarginTop < fifthHeight){
	    		element.style.marginTop = currentJob.titleMarginTop.toString() + "px";
	    		currentJob.titleMarginTop += .5;
	    		console.log("2");
	    	};	
		}
		if(window.scrollX >(3*twoThirdWidth) && window.scrollX < (4*twoThirdWidth)){
			var element = document.getElementsByClassName("job-content-title")[3];
			var currentJob = jobs[3];
			while(currentJob.titleMarginTop < fifthHeight){
	    		element.style.marginTop = currentJob.titleMarginTop.toString() + "px";
	    		currentJob.titleMarginTop += .5;
	    		console.log("3");
	    	};	
		}
		if(window.scrollX >(4*twoThirdWidth) && window.scrollX < (5*twoThirdWidth)){
			var element = document.getElementsByClassName("job-content-title")[4];
			var currentJob = jobs[4];
			while(currentJob.titleMarginTop < fifthHeight){
	    		element.style.marginTop = currentJob.titleMarginTop.toString() + "px";
	    		currentJob.titleMarginTop += .5;
	    		console.log("4");
	    	};	
		}
		if(window.scrollX >(5*twoThirdWidth) && window.scrollX < (6*twoThirdWidth)){
			var element = document.getElementsByClassName("job-content-title")[5];
			var currentJob = jobs[5];
			while(currentJob.titleMarginTop < fifthHeight){
	    		element.style.marginTop = currentJob.titleMarginTop.toString() + "px";
	    		currentJob.titleMarginTop += .5;
	    		console.log("5");
	    	};	
		}
		if(window.scrollX >(6*twoThirdWidth) && window.scrollX < (7*twoThirdWidth)){
			var element = document.getElementsByClassName("job-content-title")[6];
			var currentJob = jobs[6];
			while(currentJob.titleMarginTop < fifthHeight){
	    		element.style.marginTop = currentJob.titleMarginTop.toString() + "px";
	    		currentJob.titleMarginTop += .5;
	    		console.log("6");
	    	};	
		}
		if(window.scrollX >(7*twoThirdWidth) && window.scrollX < (8*twoThirdWidth)){
			var element = document.getElementsByClassName("job-content-title")[7];
			var currentJob = jobs[7];
			while(currentJob.titleMarginTop < fifthHeight){
	    		element.style.marginTop = currentJob.titleMarginTop.toString() + "px";
	    		currentJob.titleMarginTop += .5;
	    		console.log("7");
	    	};	
		}
		if(window.scrollX >(8*twoThirdWidth) && window.scrollX < (9*twoThirdWidth)){
			var element = document.getElementsByClassName("job-content-title")[8];
			var currentJob = jobs[8];
			while(currentJob.titleMarginTop < fifthHeight){
	    		element.style.marginTop = currentJob.titleMarginTop.toString() + "px";
	    		currentJob.titleMarginTop += .5;
	    		console.log("8");
	    	};	
		}
		if(window.scrollX >(9*twoThirdWidth) && window.scrollX < (10*twoThirdWidth)){
			var element = document.getElementsByClassName("job-content-title")[9];
			var currentJob = jobs[9];
			while(currentJob.titleMarginTop < fifthHeight){
	    		element.style.marginTop = currentJob.titleMarginTop.toString() + "px";
	    		currentJob.titleMarginTop += .5;
	    		console.log("9");
	    	};	
		}
	};
};

var viewportWidth = document.documentElement.clientWidth;



