window.onload = function() {

	//the first four sections set all events to be passive.
	//found https://github.com/zzarcon/default-passive-events
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
	function Job(id, name, word, titleMarginTop, titleMarginBottom, description){
    	this.id = id;
		this.name = name;
		this.word = word;
		this.titleMarginTop = titleMarginTop;
		this.titleMarginBottom = titleMarginBottom;
		this.description = [];
		// this.addDescription = function(*args){
		// 	description.push(args)
		// }
		;
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
	var red = new Job('1','red', 'An Awesome Job', 0, fifthHeight);
	// red.addDescription("At this job I used ", "skill", " and also totally knew how to ", "skill")
	red.description = ["At this job I used ", "adobe(skill)", " to ", "work in groups(skill)", ". I knew I could do it. This ", "positive attitude(skill)", " really helped in this partidular field."];
	var orange = new Job('2', 'orange', 'Not As Awesome of A Job', fifthHeightNeg, viewportHeight);
	orange.description = ["This job was in ", "customer service(skill)", ". I learned a lot about ", "problem solving(skill)", " and ", "patience(skill)", "."];
	var yellow = new Job('3','yellow', 'This Job Was Difficult', fifthHeightNeg, viewportHeight);
	yellow.description = ["At this job I used ", "adobe(skill)", " to ", "work in groups(skill)", ". I knew I could do it. This ", "positive attitude(skill)", " really helped in this partidular field."];
	var green = new Job('4', 'green', 'I am Proud of this Job', fifthHeightNeg, viewportHeight);
	green.description = ["At this job I used ", "adobe(skill)", " to ", "work in groups(skill)", ". I knew I could do it. This ", "positive attitude(skill)", " really helped in this partidular field."];
	var blue = new Job('5', 'blue', 'Company Name', fifthHeightNeg, viewportHeight);
	blue.description = ["At this job I used ", "adobe(skill)", " to ", "work in groups(skill)", ". I knew I could do it. This ", "positive attitude(skill)", " really helped in this partidular field."];
	var indigo = new Job('6', 'indigo', 'Schooling', fifthHeightNeg, viewportHeight);
	indigo.description = ["At this job I used ", "adobe(skill)", " to ", "work in groups(skill)", ". I knew I could do it. This ", "positive attitude(skill)", " really helped in this partidular field."];
	var purple = new Job('7', 'purple', 'Great Company', fifthHeightNeg, viewportHeight);
	purple.description = ["At this job I used ", "adobe(skill)", " to ", "work in groups(skill)", ". I knew I could do it. This ", "positive attitude(skill)", " really helped in this partidular field."];
	var black = new Job('8', 'black', 'So-so Company', fifthHeightNeg, viewportHeight);
	black.description = ["At this job I used ", "adobe(skill)", " to ", "work in groups(skill)", ". I knew I could do it. This ", "positive attitude(skill)", " really helped in this partidular field."];
	var grey = new Job('9', 'grey', 'Atlanta Job', fifthHeightNeg, viewportHeight);
	grey.description = ["At this job I used ", "adobe(skill)", " to ", "work in groups(skill)", ". I knew I could do it. This ", "positive attitude(skill)", " really helped in this partidular field."];
	var pink = new Job('10', 'pink', 'Last Job', fifthHeightNeg, viewportHeight);
	pink.description = ["At this job I used ", "adobe(skill)", " to ", "work in groups(skill)", ". I knew I could do it. This ", "positive attitude(skill)", " really helped in this partidular field."];

console.log(orange);
console.log(orange.description);
console.log(orange.description[0]);
console.log(orange.description[1]);

	//set array of job variables to be looped through later. 
	var jobs = [red, orange, yellow, green, blue, indigo, purple, black, grey, pink];

	//set jobs.length as jobsLength integer, to store as cached integer and to avoid having to scroll through object to get this integer.
	var jobsLength = jobs.length;

	//set variables for job cards based on width of bar-container div so that cards will always be spaced porportionately.
	var storyboardWidth = viewportWidth*jobsLength;
	var width = storyboardWidth;
	var totalColumns = jobsLength * 12;
	var columnPx = width/totalColumns
	var twoColumns = columnPx * 2;
	var fourColumns = columnPx * 4;
	var eightColumns = columnPx * 8;
	var twelveColumns = columnPx * 12;


	//call makeJobCards.
	makeJobCards();

	//call changeViewportWidth, passing in jobsLength as integer.
	changeViewportWidth();

	//add event listener so when window changes, viewportWidth variable also changes, passing in jobsLength as integer.
	window.addEventListener("resize", changeViewportWidth);

	window.addEventListener("mousewheel", sideScroll);

	//change viewportWidth variable to current viewport width and set elements widths accordingly, passing in jobsLength as integer.
	function changeViewportWidth(){
		//reset variables according to new viewport width
		viewportWidth = document.documentElement.clientWidth;
		viewportHeight = document.documentElement.clientHeight;
		fifthHeight = viewportHeight * .2;
		fifthHeightNeg = viewportHeight * -.2;
		thirdWidth = viewportWidth * (1/3);
		twoThirdWidth = viewportWidth * (2/3);
		jobsLength = jobs.length;
		storyboardWidth = viewportWidth*jobsLength;
		width = storyboardWidth;
		totalColumns = jobsLength * 12;
		columnPx = width/totalColumns
		twoColumns = columnPx * 2;
		fourColumns = columnPx * 4;
		eightColumns = columnPx * 8;
		twelveColumns = columnPx * 12;
		//reset size of all the things according to new variables
		bodyContainer.style.width = storyboardWidth.toString() + "px";
		storyboardContainer.style.width = storyboardWidth.toString() + "px";
		for (var i=0; i<jobsLength; i++){
			document.getElementsByClassName("job-cell")[i].style.width = viewportWidth.toString() + "px";
			document.getElementsByClassName("job")[i].style.width = fourColumns.toString() + "px";
			var currentJob = document.getElementsByClassName("job")[i];
			currentJob.style.width = fourColumns.toString() + "px";
			currentJob.style.marginLeft = fourColumns.toString() + "px";
			currentJob.style.marginRight = fourColumns.toString() + "px";
			// if(document.getElementsByClassName("job-description-content-skills"))
			// var currentDescriptionContentSkills = document.getElementsByClassName("job-descripiton-content-skills")[i].style;
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
		if (stop <= jobsLength){
	  		for (var i=0; i<jobsLength; i++){
	  			var jobObject = jobs[i];
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
				// currentJob.style.background = jobObject.name;
	   			currentJobCell.appendChild(currentJob);
	   			var currentJobContent = document.createElement("div");
	   			currentJobContent.className = "job-content";
	   			currentJob.appendChild(currentJobContent);
	   			var currentJobTitle = document.createElement("div");
	   			currentJobTitle.className = "job-content-title";
	   			currentJobTitle.innerHTML = jobObject.word;
	   			currentJobTitle.style.height = fifthHeight.toString() + "px";
	   			currentJobContent.appendChild(currentJobTitle);
	   			var currentJobDescription = document.createElement("div");
	   			currentJobDescription.className = "job-description-container";
	   			currentJob.appendChild(currentJobDescription);
	   			var currentJobDescriptionContent = document.createElement("div");
	   			currentJobDescriptionContent.className = "job-description-content";
	   			currentJobDescriptionContent.style.fontSize = "28px";
	   			currentJobDescription.appendChild(currentJobDescriptionContent);
	   			// var currentJobDescriptionContentSkills = document.createElement("div");
	   			// currentJobDescriptionContentSkills.className = "job-description-content-skills";
	   			// currentJobDescriptionContentSkills.fontSize = "28px";
	   			// currentJobDescriptionContentSkills.style.background = "white";
	   			// currentJobDescriptionContent.appendChild(currentJobDescriptionContentSkills);
	   			var descriptionArray = jobObject.description;
	   			var descriptionLength = jobObject.description.length;
	   			for(var x=0; x<descriptionLength; x++){
	   				switch(true){
	   					case(x%2 ==0):
	   						currentJobDescriptionContent.insertAdjacentHTML("beforeend", descriptionArray[x]);
	   					break;
	   					case(x%2!=0):
	   						var newSpan= document.createElement("span");
	   						newSpan.className= "beforeSkill" + " " + jobObject.name;
	   						newSpan.innerHTML = descriptionArray[x];
	   						currentJobDescriptionContent.appendChild(newSpan);
	   					break;
	   				}
	   			}
	   			stop+=1;
	   		};
	   		var firstCard = document.getElementsByClassName("job-content-title")[0].style;
	   		firstCard.marginTop = "0px";
	   		firstCard.marginBottom = fifthHeight.toString() + "px";
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

	function scrollForward(){
		for(var i=0; i<jobsLength; i++){		
			switch (true) {
				case(window.scrollX > (((i-1)*viewportWidth) + twoThirdWidth) && window.scrollX <= (i*viewportWidth)):
					var element = document.getElementsByClassName("job-content-title")[i].style;
					var currentJob = jobs[i];
					while(currentJob.titleMarginTop <= .1){
						element.marginTop = currentJob.titleMarginTop.toString() + "px";
						element.transition = "all .5s";
						currentJob.titleMarginTop += .1;
						// console.log(i + " down");
					};
					while(currentJob.titleMarginBottom >= fifthHeight){
						element.marginBottom = currentJob.titleMarginBottom.toString() + "px";
						currentJob.titleMarginBottom -= .5;
					};
				break;
				case(window.scrollX > ((i-1)*viewportWidth) && window.scrollX<(((i-1)*viewportWidth)+thirdWidth)):
					var element = document.getElementsByClassName("job")[i-1].style;
					var currentJob = jobs[i-1];
					var currentDescriptionArray = currentJob.description;
					var currentDescriptionArrayLength = currentDescriptionArray.length;
					var jobDescriptionContentSkills = document.createElement("div");
					var jobDescriptionContentSkillsStyle = jobDescriptionContentSkills.style;
					document.body.appendChild(jobDescriptionContentSkills);
					jobDescriptionContentSkills.className = "job-description-content-skills";	
					jobDescriptionContentSkills.transition = "all 1s";
					var skills = document.getElementsByClassName("beforeSkill");
					var skillsLength = skills.length;
					for(var x=0; x < currentDescriptionArrayLength; x++){
						switch(true){
	   						case(x%2 ==0):
	   							var newSpan = document.createElement("span");
	   							newSpan.className = "hidden" + " " + currentJob.name;
	   							newSpan.innerHTML = currentDescriptionArray[x];
	   							jobDescriptionContentSkills.appendChild(newSpan);
	   						break;
	   						case(x%2!=0):
	   							var newSpan= document.createElement("span");
	   							// newSpan.className= "afterSkill" + " " + currentJob.name;
	   							newSpan.className = "afterSkill";
	   							newSpan.innerHTML = currentDescriptionArray[x];
	   							jobDescriptionContentSkills.appendChild(newSpan);
	   						break;
	   					}
					}
					// element.background = "white";
				break;
				case(window.scrollX > ((i*viewportWidth) + thirdWidth) && window.scrollX < ((i*viewportWidth) + twoThirdWidth)):
					var element = document.getElementsByClassName("job-content-title")[i].style;
					var currentJob = jobs[i];
					var currentJobName = jobs[i].name;
					while(currentJob.titleMarginTop > fifthHeightNeg){
						element.marginTop = currentJob.titleMarginTop.toString() + "px";
						element.transition = "all .5s"
;						currentJob.titleMarginTop -= 1;
						// console.log(i + " up");
					};
					while(currentJob.titleMarginBottom < viewportHeight){
						element.marginBottom = currentJob.titleMarginBottom.toString() + "px";
						currentJob.titleMarginBottom += 1;
					}
					var afterSkills = document.getElementsByClassName("afterSkill");
					var afterSkillsLength = afterSkills.length;
					for(var x = 0; x < afterSkillsLength; x++){
						switch(true){
							case(afterSkills[x].className == "afterSkill"):
								afterSkills[x].className += " " + "color";
								// afterSkills[x].transition = "all 2s"
								console.log(afterSkills[x].style.opacity);
								afterSkills[x].style.opacity = "0.0";
								// afterSkills[x].color = "blue";
								console.log(afterSkills[x]);
							break;
						}
					}
					// 	switch(true){
					// 		case(afterSkills[x].className == "afterSkill" + " " + currentJobName):
					// 			afterSkills[x].style.display = "none";
					// 			console.log(afterSkills[x].className);
					// 			console.log(currentJobName);
					// 		break;
					// 	}
					// }
					// var
					// var currentDescriptionArray = currentJob.description;
					// var currentDescriptionArrayLength = currentDescriptionArray.length;
					// // var jobDescriptionContentSkills = document.createElement("div");
					// // var jobDescriptionContentSkillsStyle = jobDescriptionContentSkills.style;
					// // document.body.appendChild(jobDescriptionContentSkills);
					// // jobDescriptionContentSkills.className = "job-description-content-skills";	
					// // jobDescriptionContentSkills.transition = "all 1s";
					// // var skills = document.getElementsByClassName("beforeSkill");
					// // var skillsLength = skills.length;
					// for(var x=0; x < currentDescriptionArrayLength; x++){
					// 	switch(true){
	   	// 					// case(x%2 ==0):
	   	// 					// 	var newSpan = document.createElement("span");
	   	// 					// 	newSpan.className = "hidden" + " " + currentJob.name;
	   	// 					// 	newSpan.innerHTML = currentDescriptionArray[x];
	   	// 					// 	jobDescriptionContentSkills.appendChild(newSpan);
	   	// 					// break;
	   	// 					case(x%2!=0):
	   	// 						// var newSpan= document.createElement("span");
	   	// 						// newSpan.className= "afterSkill" + " " + currentJob.name;
	   	// 						// newSpan.innerHTML = currentDescriptionArray[x];
	   	// 						// jobDescriptionContentSkills.appendChild(newSpan);
	   	// 					break;
	   	// 				}
					// }


				break;
				case(window.scrollX > (((i-1)*viewportWidth) + thirdWidth) && window.scrollX < (((i-1)*viewportWidth) + twoThirdWidth)):
					var element = document.getElementsByClassName("job-cell")[i-1].style;
					// element.background = "pink";
				break;
			}
		}	 
	};

	
	function scrollBackward(){
		for(var i=0; i<jobsLength; i++){
			switch (true) {
				case(window.scrollX < ((i*viewportWidth) + thirdWidth) && window.scrollX >= (i*viewportWidth)):
					var element = document.getElementsByClassName("job-content-title")[i].style;
					var currentJob = jobs[i];
					while(currentJob.titleMarginTop < 0){
						element.marginTop = currentJob.titleMarginTop.toString() + "px";
						element.transition = "all .5s"
						currentJob.titleMarginTop += 1;
						// console.log(i + " down b");
					};
					while(currentJob.titleMarginBottom > fifthHeight){
						element.marginBottom = currentJob.titleMarginBottom.toString() + "px";
						currentJob.titleMarginBottom -= 1;
					}
				break;
				case(window.scrollX < (i*viewportWidth) && window.scrollX > (((i-1)*viewportWidth)+twoThirdWidth)):
					var element = document.getElementsByClassName("job")[i-1].style;
					// element.background = jobs[i-1].name;
				break;
				case(window.scrollX < (((i-1)*viewportWidth)+ twoThirdWidth) && window.scrollX > (((i-1)*viewportWidth) + thirdWidth)):
					var element = document.getElementsByClassName("job-content-title")[i].style;
					var currentJob = jobs[i];
					while(currentJob.titleMarginTop > fifthHeightNeg){
						element.marginTop = currentJob.titleMarginTop.toString() + "px";
						element.transition = "all .5s"
						currentJob.titleMarginTop -= 1;
						// console.log(i + " up b");
					};
					while(currentJob.titleMarginBottom < viewportHeight){
						element.marginBottom = currentJob.titleMarginBottom.toString() + "px";
						currentJob.titleMarginBottom += 1;
					}
				break;
				case(window.scrollX > (i*viewportWidth) && window.scrollX < ((i*viewportWidth) + twoThirdWidth)):
					var element = document.getElementsByClassName("job-cell")[i].style;
					// element.background = "white";
				break;
			}
		}
	};
	    	
};
