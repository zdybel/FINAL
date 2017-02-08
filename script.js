window.onload = function() {


	//the sets all events to be passive. found https://github.com/zzarcon/default-passive-events
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
	function Job(id, name, word, titleMarginTop, titleMarginBottom, description, brynneMoves){
    	this.id = id;
		this.name = name;
		this.word = word;
		this.titleMarginTop = titleMarginTop;
		this.titleMarginBottom = titleMarginBottom;
		this.brynneMoves = brynneMoves;
		this.description = [];
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
	red.brynneMoves = 1;
	red.description = ["At this job I used ", "adobe(skill)", " to ", "work in groups(skill)", ". I knew I could do it. This ", "positive attitude(skill)", " really helped in this partidular field."];
	var orange = new Job('2', 'orange', 'Not As Awesome of A Job', fifthHeightNeg, viewportHeight);
	orange.description = ["This job was in ", "customer service(skill)", ". I learned a lot about ", "problem solving(skill)", " and ", "patience(skill)", "."];
	var yellow = new Job('3','yellow', 'This Job Was Difficult', fifthHeightNeg, viewportHeight);
	yellow.description = ["This needs to be different then ", "other jobs(skill)", " so that I can ", "tell the difference between them(skill)", ". I really am tired today and want to ", "make an svg(skill)", "."];
	var green = new Job('4', 'green', 'I am Proud of this Job', fifthHeightNeg, viewportHeight);
	green.description = ["However I need to ", "keep going(skill)", ", because this project is very ", "important(skill)", " to me."];
	var blue = new Job('5', 'blue', 'Company Name', fifthHeightNeg, viewportHeight);
	blue.description = ["I really want it to ", "be as good(skill)", " as possible. So I am working hard to make sure that everything ", "runs smoothly(skill)", "."];
	var indigo = new Job('6', 'indigo', 'Schooling', fifthHeightNeg, viewportHeight);
	indigo.description = ["But it isn't easy because you have to pay attention to ", "detail(skill)", ". And to do that takes long hours of a lot of", "concentration(skill)", ", which will creep up and wear on you if you aren't careful."];
	var purple = new Job('7', 'purple', 'Great Company', fifthHeightNeg, viewportHeight);
	purple.description = ["This is why I am making sure to ", "get enough sleep(skill)", ", because without the proper amount of energy your brain doesn't ", "function at maximum capacity(skill)", "."];
	var black = new Job('8', 'black', 'So-so Company', fifthHeightNeg, viewportHeight);
	black.description = ["Also it is important to remember ", "to eat(skill)", ". I am immensely guilty of forgetting to do so when I am ", "in the zone(skill)", ". This is detrimental in the long run, I think.  Although it is really nice to work for hours on end and be able to get a lot of stuff done."];
	var grey = new Job('9', 'grey', 'Atlanta Job', fifthHeightNeg, viewportHeight);
	grey.description = ["At this point, I am really just ", "rambling(skill)", ".  If you are testing my project, please don't judge me for this nonsensical  ", "bibble babble(skill)", ". I am almost going crazy with this project and the concentration it is taking."];
	var pink = new Job('10', 'pink', 'Last Job', fifthHeightNeg, viewportHeight);
	pink.description = ["I am sure you have been in a situation where you have had to focus on a project for a long amount of time.  It ends up where it is like an  ", "obsession(skill)", ". Which has its positives and negatives.  When it goes well, it can mean you can  ", "get far in a project(skill)" + "."];
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
	var brynnePx = thirdWidth/7;
	var brynneMoves = jobs[0].brynneMoves;
	//call makeJobCards.
	makeJobCards();
	//call changeViewportWidth, passing in jobsLength as integer.
	changeViewportWidth();
	//add event listener so when window changes, viewportWidth variable also changes, passing in jobsLength as integer.
	window.addEventListener("resize", changeViewportWidth);
	//add event listener so "mousewheel" event will run sideScroll
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
		// var brynnePx = columnPx/7;
		var brynnePx = thirdWidth/6;
		var brynneMoves = jobs[0].brynneMoves;
		// var vpwDivideJobs = viewportWidth/jobsLength;
		// var brynneMargin = vpwDivideJobs/7;
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
		// window.scrollTo = (0, 0);
		// document.body.scrollLeft = 0;
		// document.getElementsByClassName("body-container")[0].scrollLeft = 0;
		// document.getElementsByClassName("storyboard-container")[0].scrollLeft = 0;
		// window.scrollY = 0;
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
	   			var descriptionArray = jobObject.description;
	   			var descriptionLength = jobObject.description.length;
	   			var jobDescriptionContentSkills = document.createElement("div");
	   			jobDescriptionContentSkills.className = "job-description-content-skills";
	   			document.body.appendChild(jobDescriptionContentSkills);
				for(var x=0; x<descriptionLength; x++){
	   				switch(true){
	   					case(x%2 ==0):
	   						currentJobDescriptionContent.insertAdjacentHTML("beforeend", descriptionArray[x]);
	   						var newSpan = document.createElement("span");
	   						newSpan.innerHTML = descriptionArray[x];
	   						newSpan.className = "hidden";
	   						jobDescriptionContentSkills.appendChild(newSpan);
	   					break;
	   					case(x%2!=0):
	   						var newSpan= document.createElement("span");
	   						newSpan.className= "beforeSkill" + " " + jobObject.name;
	   						newSpan.innerHTML = descriptionArray[x];
	   						currentJobDescriptionContent.appendChild(newSpan);
	   						newSpanAfter = document.createElement("span");
	   						newSpanAfter.className= "afterSkill" + " " + jobObject.name;
	   						newSpanAfter.innerHTML = descriptionArray[x];
	   						jobDescriptionContentSkills.appendChild(newSpanAfter);
	   					break;
	   				}
	   			}
	   			stop+=1;
	   		};
	   		var firstCard = document.getElementsByClassName("job-content-title")[0].style;
	   		firstCard.marginTop = "0px";
	   		firstCard.marginBottom = fifthHeight.toString() + "px";
		};
		window.scrollTo = (0, 0);
		document.body.scrollLeft = 0;
		document.getElementsByClassName("fixed")[0].scrollLEft = 0;
		document.getElementsByClassName("body-container")[0].scrollLeft = 0;
		document.getElementsByClassName("storyboard-container")[0].scrollLeft = 0;
		document.getElementsByClassName("job")[0].scrollLeft = 0;
		document.getElementsByClassName("job-cell")[0].scrollLeft = 0;
		document.getElementsByClassName("job-content")[0].scrollLeft = 0;
		document.getElementsByClassName("job-description-content")[0].scrollLeft = 0;
		// document.getElementsByClassName("job-")
	};

	//the following three sections allow page to scroll right when the user scrolls up and left when the user scrolls down. explanation at http://phrogz.net/js/wheeldelta.html.
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
		e = e || window.event; listener(e);
		if (e.delta > 0){      
		    window.scrollBy(-10, 0);
		    scrollBackward();
		}
		if (e.delta < 0){
		    window.scrollBy(10, 0);
		    scrollForward();
		}
	};
	function mobileScroll(){
		document.getElementsByTagName("body")[0].style.overflowY = "auto"; 
		window.addEventListener("scroll", function(){
			document.getElementsByClassName("body-container")[0].translate(25, 0);
		});
	};
	function scrollForward(){
		// var that = document.getElementsByClassName("job-cell")[0].marginRight();
		// console.log(that);
		for(var i=0; i<jobsLength; i++){		
			switch (true) {
				case(window.scrollX > (((i-1)*viewportWidth) + twoThirdWidth) && window.scrollX <= (i*viewportWidth)):
					var element = document.getElementsByClassName("job-content-title")[i].style;
					var currentJob = jobs[i];
					var currentJobName = currentJob.name;
					while(currentJob.titleMarginTop < 0){
						element.marginTop = currentJob.titleMarginTop.toString() + "px";
						element.transition = "all .5s";
						currentJob.titleMarginTop += .1;
						//console.log(i + "down");
					};
					while(currentJob.titleMarginBottom > fifthHeight){
						element.marginBottom = currentJob.titleMarginBottom.toString() + "px";
							currentJob.titleMarginBottom -= .5;
					}
					currentAfterSkills = document.getElementsByClassName("afterSkill" + " " + currentJobName);
					currentAfterSkillsLength = currentAfterSkills.length;
					for(var x=0; x < currentAfterSkillsLength; x++){
						currentAfterSkillsStyle= currentAfterSkills[x].style;
						currentAfterSkillsStyle.fontSize = "28px";
					}
					var brynne = document.getElementById("brynne");
					var brynneStyle = brynne.style;
					var brynneMargin = (((viewportWidth/jobsLength/6))/10)/2;
					for(var y=0; y<1; y++){
						brynne.src = "images/frontbigdown.svg";
						var currentBrynneMargin = (brynneMargin*brynneMoves);
						y+=1;
					}
				break;
				case(window.scrollX > ((i-1)*viewportWidth) && window.scrollX<(((i-1)*viewportWidth)+thirdWidth)):
					var jobDescriptionContentSkillStyle = document.getElementsByClassName("job-description-content-skills")[i-1].style;
					jobDescriptionContentSkillStyle.display = "flex";
					var previousJobName = jobs[i-1].name;
					var beforeSkills = document.getElementsByClassName("beforeSkill" + " " + previousJobName);
					var beforeSkillsLength = beforeSkills.length;
					for(var x=0; x< beforeSkillsLength; x++){
						beforeSkills[x].style.visibility = "hidden";
					}
					var brynne = document.getElementById("brynne");
					var brynneStyle = brynne.style;
					var brynneMargin = (((viewportWidth/jobsLength/6))/10)/2;
					switch(true){
						case(window.scrollX >= (((i-1)*viewportWidth) + brynnePx) && window.scrollX < (((i-1)*viewportWidth) + (2*brynnePx))):
							for(var y=0; y<1; y++){
								brynne.src = "images/rightsmallbackward.svg";
								var currentBrynneMargin = (brynneMargin*brynneMoves);
								brynneStyle.marginLeft = currentBrynneMargin.toString() + "px";
								brynneMoves += 1;
								y+=1;
							}
						break;
						case(window.scrollX >= ((i-1)*viewportWidth)+ (2*brynnePx)) && window.scrollX < (((i-1)*viewportWidth) + (3*brynnePx)):
							for(var y=0; y<1; y++){
								brynne.src = "images/rightsmallforward.svg";
								var currentBrynneMargin = (brynneMargin*brynneMoves);
								brynneStyle.marginLeft = currentBrynneMargin.toString() + "px"; 
								brynneMoves += 1;
								y+=1;
							}
						break;
						case(window.scrollX >= ((i-1)*viewportWidth)+(3*brynnePx)) && window.scrollX < (((i-1)*viewportWidth) + (4*brynnePx)):
							for(var y=0; y<1; y++){
								brynne.src = "images/rightsmallbackward.svg";
								var currentBrynneMargin = (brynneMargin*brynneMoves);
								brynneStyle.marginLeft = currentBrynneMargin.toString() + "px"; 
								brynneMoves += 1;
								y+=1;
							}
						break;
						case(window.scrollX >= ((i-1)*viewportWidth)+(4*brynnePx)) && window.scrollX < (((i-1)*viewportWidth) + (5*brynnePx)):
							for(var y=0; y<1; y++){
								brynne.src = "images/rightsmallforward.svg";
								var currentBrynneMargin = (brynneMargin*brynneMoves);
								brynneStyle.marginLeft = currentBrynneMargin.toString() + "px"; 
								brynneMoves += 1;
								y+=1;
							}
						break;
						case(window.scrollX >= ((i-1)*viewportWidth)+(5*brynnePx)) && window.scrollX < (((i-1)*viewportWidth) + (6*brynnePx)):
							for(var y=0; y<1; y++){
								brynne.src = "images/rightsmallbackward.svg";
								var currentBrynneMargin = (brynneMargin*brynneMoves);
								brynneStyle.marginLeft = currentBrynneMargin.toString() + "px"; 
								brynneMoves += 1;
								y+=1;
							}
						break;
						case(window.scrollX >= ((i-1)*viewportWidth)+(6*brynnePx)) && window.scrollX < (((i-1)*viewportWidth) + (7*brynnePx)):
							for(var y=0; y<1; y++){
								brynne.src = "images/rightsmallforward.svg";
								var currentBrynneMargin = (brynneMargin*brynneMoves);
								brynneStyle.marginLeft = currentBrynneMargin.toString() + "px"; 
								brynneMoves += 1;
								y+=1;
							}
						break;
					}
				break;
				case(window.scrollX > ((i*viewportWidth) + thirdWidth) && window.scrollX < ((i*viewportWidth) + twoThirdWidth)):
					var element = document.getElementsByClassName("job-content-title")[i].style;
					var currentJob = jobs[i];
					var currentJobName = jobs[i].name;
					switch(true){
						case(i>0):
							var previousJob = jobs[(i-1)];
						break;
						case(i==0):
							var previousJob = jobs[0];
						break;
					}
					var previousJobName = previousJob.name;
					while(currentJob.titleMarginTop > fifthHeightNeg){
						element.marginTop = currentJob.titleMarginTop.toString() + "px";
						element.transition = "all .5s";
						currentJob.titleMarginTop -= 1;
						// console.log(i + " up");
					};
					while(currentJob.titleMarginBottom < viewportHeight){
						element.marginBottom = currentJob.titleMarginBottom.toString() + "px";
						currentJob.titleMarginBottom += 1;
					}
					var currentJobDescriptionContentSkillsStyle = document.getElementsByClassName("job-description-content-skills")[i].style;
					currentJobDescriptionContentSkillsStyle.transition = "all 2s";
					currentJobDescriptionContentSkillsStyle.opacity = "0.0";
					currentAfterSkills = document.getElementsByClassName("afterSkill" + " " + currentJobName);
					currentAfterSkillsLength = currentAfterSkills.length;
					for(var x=0; x < currentAfterSkillsLength; x++){
						currentAfterSkillsStyle= currentAfterSkills[x].style;
						currentAfterSkillsStyle.transition = "all 2s";
						currentAfterSkillsStyle.fontSize = "32px";
					}
					var beforeSkills = document.getElementsByClassName("beforeSkill" + " " + currentJobName);
					var beforeSkillsLength = beforeSkills.length;
					for(var x=0; x<beforeSkillsLength;x++){
						beforeSkills[x].style.visibility = "visible";
					}
					var brynne = document.getElementById("brynne");
					var brynneStyle = brynne.style;
					var brynneMargin = (((viewportWidth/jobsLength/6))/10)/2;
					// var stop = 0;
					switch(true){
						case(window.scrollX >= (((i*viewportWidth)+thirdWidth) + brynnePx) && window.scrollX < (((i*viewportWidth)+thirdWidth) + (2*brynnePx))):
							for(var y=0; y<1; y++){
								brynne.src = "images/rightsmallbackward.svg";
								var currentBrynneMargin = (brynneMargin*brynneMoves);
								brynneStyle.marginLeft = currentBrynneMargin.toString() + "px";
								brynneMoves += 1;
								y+=1;
							}
						break;
						case(window.scrollX >= (((i*viewportWidth)+thirdWidth) + (2*brynnePx)) && window.scrollX < (((i*viewportWidth)+thirdWidth) + (3*brynnePx))):
							for(var y=0; y<1; y++){
								brynne.src = "images/rightsmallforward.svg";
								var currentBrynneMargin = (brynneMargin*brynneMoves);
								brynneStyle.marginLeft = currentBrynneMargin.toString() + "px"; 
								brynneMoves += 1;
								y+=1;
							}
						break;
						case(window.scrollX >= (((i*viewportWidth)+thirdWidth) + (3*brynnePx)) && window.scrollX < ((((i-1)*viewportWidth)+thirdWidth) + (4*brynnePx))):
							for(var y=0; y<1; y++){
								brynne.src = "images/rightsmallbackward.svg";
								var currentBrynneMargin = (brynneMargin*brynneMoves);
								brynneStyle.marginLeft = currentBrynneMargin.toString() + "px"; 
								brynneMoves += 1;
								y+=1;
							}
						break;
						case(window.scrollX >= (((i*viewportWidth)+thirdWidth) + (4*brynnePx)) && window.scrollX < (((i*viewportWidth)+thirdWidth) + (5*brynnePx))):
							for(var y=0; y<1; y++){
								brynne.src = "images/rightsmallforward.svg";
								var currentBrynneMargin = (brynneMargin*brynneMoves);
								brynneStyle.marginLeft = currentBrynneMargin.toString() + "px"; 
								brynneMoves += 1;
								y+=1;
							}
						break;
						case(window.scrollX >= (((i*viewportWidth)+thirdWidth) + (5*brynnePx)) && window.scrollX < (((i*viewportWidth)+thirdWidth) + (6*brynnePx))):
							for(var y=0; y<1; y++){
								brynne.src = "images/rightsmallbackward.svg";
								var currentBrynneMargin = (brynneMargin*brynneMoves);
								brynneStyle.marginLeft = currentBrynneMargin.toString() + "px"; 
								brynneMoves += 1;
								y+=1;
							}
						break;
						case(window.scrollX >= (((i*viewportWidth)+thirdWidth) + (6*brynnePx)) && window.scrollX < (((i*viewportWidth)+thirdWidth) + (7*brynnePx))):
							for(var y=0; y<1; y++){
								brynne.src = "images/rightsmallforward.svg";
								var currentBrynneMargin = (brynneMargin*brynneMoves);
								brynneStyle.marginLeft = currentBrynneMargin.toString() + "px"; 
								// brynneMoves += 1;
								y+=1;
							}
						break;
					}
				break;
				case(window.scrollX > (((i-1)*viewportWidth) + thirdWidth) && window.scrollX < (((i-1)*viewportWidth) + twoThirdWidth)):
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
					// var brynne = document.getElementById("brynne");
					// var brynneStyle = brynne.style;
					// var brynneMargin = (((viewportWidth/jobsLength/6))/9)/2;
					// for(var y=0; y<1; y++){
					// 	brynne.src = "images/frontbigdown.svg";
					// 	var currentBrynneMargin = (brynneMargin*brynneMoves);
					// 	y+=1;
					// }
					//HERE
					var brynne = document.getElementById("brynne");
					var brynneStyle = brynne.style;
					var brynneMargin = (((viewportWidth/jobsLength/6))/9)/2;
					switch(true){
						case(window.scrollX <= ((i*viewportWidth) + (7*brynnePx)) && window.scrollX > ((i*viewportWidth) + (6*brynnePx))):
							for(var y=0; y<1; y++){
								// brynneMoves-=1;
								brynne.src = "images/leftsmallbackward.svg";
								var currentBrynneMargin = (brynneMargin*brynneMoves);
								brynneStyle.marginLeft = currentBrynneMargin.toString() + "px";
								brynneMoves -= 1;
								y+=1;
								console.log("one");
							}
						break;
						case(window.scrollX <= ((i*viewportWidth) + (6*brynnePx)) && window.scrollX > ((i*viewportWidth) + (5*brynnePx))):
								for(var y=0; y<1; y++){
								// brynneMoves -= 1;
								brynne.src = "images/leftsmallforward.svg";
								var currentBrynneMargin = (brynneMargin*brynneMoves);
								brynneStyle.marginLeft = currentBrynneMargin.toString() + "px"; 
								brynneMoves -= 1;
								y+=1;
								console.log("two");
							}
						break;
						case(window.scrollX <= ((i*viewportWidth) + (5*brynnePx)) && window.scrollX > ((i*viewportWidth) + (4*brynnePx))):
							for(var y=0; y<1; y++){
								// brynneMoves -= 1;
								brynne.src = "images/leftsmallbackward.svg";
								var currentBrynneMargin = (brynneMargin*brynneMoves);
								brynneStyle.marginLeft = currentBrynneMargin.toString() + "px";
								brynneMoves -= 1; 
								y+=1;
								console.log("three");
							}
						break;
						case(window.scrollX <= ((i*viewportWidth) + (4*brynnePx)) && window.scrollX > ((i*viewportWidth) + (3*brynnePx))):
							for(var y=0; y<1; y++){
								// brynneMoves -= 1;
								brynne.src = "images/leftsmallforward.svg";
								var currentBrynneMargin = (brynneMargin*brynneMoves);
								brynneMoves -= 1;
								y+=1;
								console.log("four");
							}
						break;
						case(window.scrollX <= ((i*viewportWidth) + (3*brynnePx)) && window.scrollX > ((i*viewportWidth) + (2*brynnePx))):
							for(var y=0; y<1; y++){
								// brynneMoves -= 1;
								brynne.src = "images/leftsmallbackward.svg";
								var currentBrynneMargin = (brynneMargin*brynneMoves);
								brynneStyle.marginLeft = currentBrynneMargin.toString() + "px"; 
								brynneMoves -= 1;
								y+=1;
								console.log("five");
							}
						break;
						case(window.scrollX <= ((i*viewportWidth) + (2*brynnePx)) && window.scrollX > ((i*viewportWidth) + brynnePx)):
							for(var y=0; y<1; y++){
								// brynneMoves -= 1;
								brynne.src = "images/leftsmallforward.svg";
								var currentBrynneMargin = (brynneMargin*brynneMoves);
								brynneStyle.marginLeft = currentBrynneMargin.toString() + "px"; 
								// brynneMoves -= 1;
								y+=1;
								console.log("six");
							}
						break;
					}
				break;
				case(window.scrollX < (i*viewportWidth) && window.scrollX > (((i-1)*viewportWidth)+twoThirdWidth)):
					var element = document.getElementsByClassName("job")[i-1].style;
					var previousJob = jobs[i-1];
					previousJobName = previousJob.name;
					// element.background = previousJobName;
					var previousSkills = document.getElementsByClassName("beforeSkill" + " " + previousJobName);
					previousSkillsLength = previousSkills.length;
					for(var x=0; x<previousSkillsLength; x++){
						previousSkills[x].classList.remove = "color";
						previousSkills[x].style.opacity = "1.0";
					}
					var currentJob = jobs[i];
					var currentJobName = currentJob.name;
					var currentJobDescriptionContentSkillsStyle = document.getElementsByClassName("job-description-content-skills")[i].style;
					currentJobDescriptionContentSkillsStyle.display = "none";
					currentJobDescriptionContentSkillsStyle.transition = "all .5s";
					currentJobDescriptionContentSkillsStyle.opacity = "1.0";
					currentJobDescriptionContentSkillsStyle.fontsize = "28px";
					var beforeSkills = document.getElementsByClassName("beforeSkill" + " " + currentJobName);
					var beforeSkillsLength = beforeSkills.length;
					for(var x=0; x<beforeSkillsLength;x++){
						beforeSkills[x].style.visibility = "visible";
					}
					var brynne = document.getElementById("brynne");
					var brynneStyle = brynne.style;
					var brynneMargin = (((viewportWidth/jobsLength/6))/9)/2;
					for(var y=0; y<1; y++){
						brynne.src = "images/frontbigdown.svg";
						var currentBrynneMargin = (brynneMargin*brynneMoves);
						y+=1;
					}
					//stand
					// var brynne = document.getElementById("brynne");
					// var brynneStyle = brynne.style;
					// var brynneMargin = (((viewportWidth/jobsLength/6))/9)/2;
					// switch(true){
					// 	case(window.scrollX <= (((i*viewportWidth)-thirdWidth) + (7*brynnePx)) && window.scrollX > (((i*viewportWidth)-thirdWidth) + (6*brynnePx))):
					// 		for(var y=0; y<1; y++){
					// 			brynneMoves-=1;
					// 			brynne.src = "images/leftsmallbackward.svg";
					// 			var currentBrynneMargin = (brynneMargin*brynneMoves);
					// 			brynneStyle.marginLeft = currentBrynneMargin.toString() + "px";
					// 			y+=1;
					// 		}
					// 	break;
					// 	case(window.scrollX <= (((i*viewportWidth)-thirdWidth) + (6*brynnePx)) && window.scrollX > (((i*viewportWidth)-thirdWidth) + (5*brynnePx))):
					// 			for(var y=0; y<1; y++){
					// 			brynneMoves -= 1;
					// 			brynne.src = "images/leftsmallforward.svg";
					// 			var currentBrynneMargin = (brynneMargin*brynneMoves);
					// 			brynneStyle.marginLeft = currentBrynneMargin.toString() + "px"; 
					// 			y+=1;
					// 		}
					// 	break;
					// 	case(window.scrollX <= (((i*viewportWidth)-thirdWidth) + (5*brynnePx)) && window.scrollX > ((((i)*viewportWidth)-thirdWidth) + (4*brynnePx))):
					// 		for(var y=0; y<1; y++){
					// 			brynneMoves -= 1;
					// 			brynne.src = "images/leftsmallbackward.svg";
					// 			var currentBrynneMargin = (brynneMargin*brynneMoves);
					// 			brynneStyle.marginLeft = currentBrynneMargin.toString() + "px"; 
					// 			y+=1;
					// 		}
					// 	break;
					// 	case(window.scrollX <= (((i*viewportWidth)-thirdWidth) + (4*brynnePx)) && window.scrollX > (((i*viewportWidth)-thirdWidth) + (3*brynnePx))):
					// 		for(var y=0; y<1; y++){
					// 			brynneMoves -= 1;
					// 			brynne.src = "images/leftsmallforward.svg";
					// 			var currentBrynneMargin = (brynneMargin*brynneMoves);
					// 			y+=1;
					// 		}
					// 	break;
					// 	case(window.scrollX <= (((i*viewportWidth)-thirdWidth) + (3*brynnePx)) && window.scrollX > (((i*viewportWidth)-thirdWidth) + (2*brynnePx))):
					// 		for(var y=0; y<1; y++){
					// 			brynneMoves -= 1;
					// 			brynne.src = "images/leftsmallbackward.svg";
					// 			var currentBrynneMargin = (brynneMargin*brynneMoves);
					// 			brynneStyle.marginLeft = currentBrynneMargin.toString() + "px"; 
					// 			y+=1;
					// 		}
					// 	break;
					// 	case(window.scrollX <= (((i*viewportWidth)-thirdWidth) + (2*brynnePx)) && window.scrollX > (((i*viewportWidth)-thirdWidth) + brynnePx)):
					// 		for(var y=0; y<1; y++){
					// 			brynneMoves -= 1;
					// 			brynne.src = "images/leftsmallforward.svg";
					// 			var currentBrynneMargin = (brynneMargin*brynneMoves);
					// 			brynneStyle.marginLeft = currentBrynneMargin.toString() + "px"; 
					// 			y+=1;
					// 		}
					// 	break;
					// }
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
					//walk
					var brynne = document.getElementById("brynne");
					var brynneStyle = brynne.style;
					var brynneMargin = (((viewportWidth/jobsLength/6))/9)/2;
					switch(true){
						case(window.scrollX <= ((((i-1)*viewportWidth)+thirdWidth) + (7*brynnePx)) && window.scrollX > ((((i-1)*viewportWidth)+thirdWidth) + (6*brynnePx))):
							for(var y=0; y<1; y++){
								brynneMoves-=1;
								brynne.src = "images/leftsmallbackward.svg";
								var currentBrynneMargin = (brynneMargin*brynneMoves);
								brynneStyle.marginLeft = currentBrynneMargin.toString() + "px";
								y+=1;
								console.log("ome");
							}
						break;
						case(window.scrollX <= ((((i-1)*viewportWidth)+thirdWidth) + (6*brynnePx)) && window.scrollX > ((((i-1)*viewportWidth)+thirdWidth) + (5*brynnePx))):
							for(var y=0; y<1; y++){
								brynneMoves -= 1;
								brynne.src = "images/leftsmallforward.svg";
								var currentBrynneMargin = (brynneMargin*brynneMoves);
								brynneStyle.marginLeft = currentBrynneMargin.toString() + "px"; 
								y+=1;
								console.log("two");
							}
						break;
						case(window.scrollX <= ((((i-1)*viewportWidth)+thirdWidth) + (5*brynnePx)) && window.scrollX > ((((i-1)*viewportWidth)+thirdWidth) + (4*brynnePx))):
							for(var y=0; y<1; y++){
								brynneMoves -= 1;
								brynne.src = "images/leftsmallbackward.svg";
								var currentBrynneMargin = (brynneMargin*brynneMoves);
								brynneStyle.marginLeft = currentBrynneMargin.toString() + "px"; 
								y+=1;
								console.log("three");
							}
						break;
						case(window.scrollX <= ((((i-1)*viewportWidth)+thirdWidth) + (4*brynnePx)) && window.scrollX > ((((i-1)*viewportWidth)+thirdWidth) + (3*brynnePx))):
							for(var y=0; y<1; y++){
								brynneMoves -= 1;
								brynne.src = "images/leftsmallforward.svg";
								var currentBrynneMargin = (brynneMargin*brynneMoves);
								y+=1;
								console.log("four");
							}
						break;
						case(window.scrollX <= ((((i-1)*viewportWidth)+thirdWidth) + (3*brynnePx)) && window.scrollX > ((((i-1)*viewportWidth)+thirdWidth) + (2*brynnePx))):
							for(var y=0; y<1; y++){
								brynneMoves -= 1;
								brynne.src = "images/leftsmallbackward.svg";
								var currentBrynneMargin = (brynneMargin*brynneMoves);
								brynneStyle.marginLeft = currentBrynneMargin.toString() + "px"; 
								y+=1;
								console.log("five");
							}
						break;
						case(window.scrollX <= ((((i-1)*viewportWidth)+thirdWidth) + (2*brynnePx)) && window.scrollX > ((((i-1)*viewportWidth)+thirdWidth) + brynnePx)):
							for(var y=0; y<1; y++){
								brynneMoves -= 1;
								brynne.src = "images/leftsmallforward.svg";
								var currentBrynneMargin = (brynneMargin*brynneMoves);
								brynneStyle.marginLeft = currentBrynneMargin.toString() + "px"; 
								y+=1;
								console.log("six");
							}
						break;
					}
				break;
				case(window.scrollX > (i*viewportWidth) && window.scrollX < ((i*viewportWidth) + twoThirdWidth)):
				break;
			}
		}
	};
	    	
};
