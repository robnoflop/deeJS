/************************************************
 *	Config 									     *
 ***********************************************/

/** 
 * Set the Width of the canvas
 */
var canvasWidth = 1530;


/** 
 * Set the Height of the canvas
 */
var canvasHeight = canvasWidth/2;


/**
 * Set ID name of the canvas to draw on
 */
 var canvasName = 'canvas';




/**
 *	Set prim color of UI elements
 */
 var canvasPrimColor = '#5FD7FF';



 /**
  *	Set sec color of UI elements
  */
 var canvasSecColor ='#ADADAD';




/**
 * Color of the BPM display
 */
var canvasBPMColor = '#f3a536';



/**
 *	Color of the songtitle
 */
var canvasSongTitleColor = '#d8d9d9';




/**
 *	Color of VU active
 */
var canvasVUActive = '#ff3451';




/**
 * Color of VU inactive
 */
var canvasVUInactive = '#3e161b';













/************************************************
 *	View 									     *
 ***********************************************/

var View = function(){
	// Holds the delegate of the controller
	this.delegate;

	// Drawing context
	this.drawContext;

	// container for UI ELements
	this.DJUIRootElement;


	// container of images
	this.ImageContainer = [];

};


// sets the delegate
View.prototype.setDelegate = function(_delegate){
	this.delegate = _delegate;
};


// inits the view
View.prototype.initView = function(){
		// check if delegate was set
		if(typeof delegate != 'undefined'){
			new Error("Delegate of View was not set! Use setDelegate()");
			return;
		}

		// get the canvas object and make it the size of config 
		var canvas = document.getElementById(canvasName) || null;
		if(canvas  && canvas.getContext('2d')){

			// save in object
			this.drawContext = canvas.getContext('2d');

			// adjust size
			canvas.width = canvasWidth;
			canvas.height = canvasHeight;

			// find all images to use
			this.initImages();

			// add components
			this.addComponents();


			// calling drawing method
			this.drawView();

			
			// call view loaded successfully
			this.delegate.onloadView();


		} else {
			this.delegate.errorLoadingView(
				new Error('Cannot get canvas object. Canvas object must have id "'
					+canvasName+'"'
				)
			);
		}
};


// looks up all images from the html file in container 
// ImagePreloader
View.prototype.initImages = function(){

	// get children from image preloader div
	var images = document.getElementById("ImagePreloader").children;

	// empty image container
	this.ImageContainer = [];

	// fill new image
	for(var i = 0 ; i < images.length; i++){		
		this.ImageContainer[images[i].id] = images[i];
	}
}

//adds UI elements to the canvas
View.prototype.addComponents = function(){

	// helper functions
	function getX(percent){
		return Math.floor((percent*canvasWidth)/100);
	}

	function getY(percent){
		return Math.floor((percent*canvasHeight)/100);
	}


	// init DJUIObjects
	var background = new DJUIElement(0,0, canvasWidth, canvasHeight);
	background.backgroundPrim 	=  this.ImageContainer["IMG_bg"];

	// deck bg A
	// start x = 5% 	width = 35%
	// start y = 20%	height = 22%
	var deckABg = new DJUIElement(getX(5),getY(20),getX(35),getY(22));
	deckABg.backgroundPrim  	=	this.ImageContainer["IMG_deckBg"];


	// deck bg A
	// start x = 60% 	width = 35%
	// start y = 20%	height = 22%
	var deckBBg = new DJUIElement(getX(100-40),getY(20), getX(35), getY(22));
	deckBBg.backgroundPrim 		=	this.ImageContainer["IMG_deckBg"];



	// text in boxes
	var titleTextLeft = new DJUIElementText(getX(4), getY(10), getX(100), getY(10));
	titleTextLeft.textSize  = getX(1.2);
	titleTextLeft.textColor = canvasSongTitleColor;
	titleTextLeft.textContent = "Paint it Black"; 
	deckABg.addChild(titleTextLeft);


	var artistTextLeft = new DJUIElementText(getX(4), getY(25), getX(100), getY(10));
	artistTextLeft.textSize  = getX(1);
	artistTextLeft.textColor = canvasSecColor;
	artistTextLeft.textContent = "The Rolling stones"; 
	deckABg.addChild(artistTextLeft);


	var timeDisplayLeft = new DJUIElementText(getX(4), getY(63), getX(100), getY(10));
	timeDisplayLeft.textSize  = getX(0.7);
	timeDisplayLeft.textColor = canvasSecColor;
	timeDisplayLeft.textContent = "0:35 / 2:33"; 
	deckABg.addChild(timeDisplayLeft);


	var bpmDisplayLeft = new DJUIElementText(getX(85.3), getY(10), getX(100), getY(10));
	bpmDisplayLeft.textSize  = getX(1);
	bpmDisplayLeft.textColor = canvasBPMColor;
	bpmDisplayLeft.textContent = "120 BPM"; 
	deckABg.addChild(bpmDisplayLeft);



	// text in boxes right
	var titleTextRight = new DJUIElementText(getX(4), getY(10), getX(100), getY(10));
	titleTextRight.textSize  = getX(1.2);
	titleTextRight.textColor = canvasSongTitleColor;
	titleTextRight.textContent = "Paint it Black"; 
	deckBBg.addChild(titleTextRight);


	var artistTextRight = new DJUIElementText(getX(4), getY(25), getX(100), getY(10));
	artistTextRight.textSize  = getX(1);
	artistTextRight.textColor = canvasSecColor;
	artistTextRight.textContent = "The Rolling stones"; 
	deckBBg.addChild(artistTextRight);


	var timeDisplayRight = new DJUIElementText(getX(4), getY(63), getX(100), getY(10));
	timeDisplayRight.textSize  = getX(0.7);
	timeDisplayRight.textColor = canvasSecColor;
	timeDisplayRight.textContent = "0:35 / 2:33"; 
	deckBBg.addChild(timeDisplayRight);


	var bpmDisplayRight = new DJUIElementText(getX(85.3), getY(10), getX(100), getY(10));
	bpmDisplayRight.textSize  = getX(1);
	bpmDisplayRight.textColor = canvasBPMColor;
	bpmDisplayRight.textContent = "120 BPM"; 
	deckBBg.addChild(bpmDisplayRight);



	var syncLeft = new DJUIElementButton(getX(100-12),getY(25), getX(9), getY(12), false);
	syncLeft.backgroundPrim 	= 	this.ImageContainer["IMG_sync_e"];
	syncLeft.backgroundSec 		= 	this.ImageContainer["IMG_sync_d"];


	var syncRight = new DJUIElementButton(getX(100-12),getY(25), getX(9), getY(12), true);
	syncRight.backgroundPrim 	= 	this.ImageContainer["IMG_sync_e"];
	syncRight.backgroundSec 	= 	this.ImageContainer["IMG_sync_d"];


	var playLeft = new DJUIElementButton(getX(5.5), getY(17), getX(3), getY(2.5), false);
	playLeft.backgroundPrim		=	this.ImageContainer["IMG_play_e"];
	playLeft.backgroundSec		= 	this.ImageContainer["IMG_play_d"];


	var playRight = new DJUIElementButton(getX(55+5.5), getY(17), getX(3), getY(2.5), true);
	playRight.backgroundPrim	=	this.ImageContainer["IMG_play_e"];
	playRight.backgroundSec		= 	this.ImageContainer["IMG_play_d"];


	var stopLeft = new DJUIElementButton(getX(9), getY(17), getX(3), getY(2.5), true);
	stopLeft.backgroundPrim		=	this.ImageContainer["IMG_stop_e"];
	stopLeft.backgroundSec		= 	this.ImageContainer["IMG_stop_d"];


	var stopRight = new DJUIElementButton(getX(55+9), getY(17), getX(3), getY(2.5), false);
	stopRight.backgroundPrim	=	this.ImageContainer["IMG_stop_e"];
	stopRight.backgroundSec		= 	this.ImageContainer["IMG_stop_d"];


	var timelineLeft = new DJUIElementTimeLine(getX(4), getY(100-25), getX(92), getY(10));
	var timelineRight = new DJUIElementTimeLine(getX(4), getY(100-25), getX(92), getY(10));


	// knobs left

	var knobLeftLow = new DJUIElementKnobN(getX(5), getY(50), getX(6), getY(12));
	knobLeftLow.backgroundPrim 	= 	this.ImageContainer["IMG_knob"];
	var knobLeftLowLabel = new DJUIElement(getX(14), getY(95), getX(69), getY(23));
	knobLeftLowLabel.backgroundPrim	= this.ImageContainer["IMG_lbl_low"];
	knobLeftLow.addChild(knobLeftLowLabel);


	var knobLeftMid = new DJUIElementKnobN(getX(12), getY(50), getX(6), getY(12));
	knobLeftMid.backgroundPrim 	= 	this.ImageContainer["IMG_knob"];
	var knobLeftMidLabel = new DJUIElement(getX(14), getY(95), getX(69), getY(23));
	knobLeftMidLabel.backgroundPrim	= this.ImageContainer["IMG_lbl_mid"];
	knobLeftMid.addChild(knobLeftMidLabel);


	var knobLeftHigh = new DJUIElementKnobN(getX(19), getY(50), getX(6), getY(12));
	knobLeftHigh.backgroundPrim 	= 	this.ImageContainer["IMG_knob"];
	var knobLeftHighLabel = new DJUIElement(getX(14), getY(95), getX(69), getY(23));
	knobLeftHighLabel.backgroundPrim	= this.ImageContainer["IMG_lbl_high"];
	knobLeftHigh.addChild(knobLeftHighLabel);


	var knobLeftSpeed = new DJUIElementKnobN(getX(27), getY(50), getX(6), getY(12));
	knobLeftSpeed.backgroundPrim 	= 	this.ImageContainer["IMG_knob"];
	var knobLeftSpeedLabel = new DJUIElement(getX(14), getY(95), getX(69), getY(23));
	knobLeftSpeedLabel.backgroundPrim	= this.ImageContainer["IMG_lbl_speed"];
	knobLeftSpeed.addChild(knobLeftSpeedLabel);


	var knobLeftVol = new DJUIElementKnobV(getX(34), getY(50), getX(6), getY(12));
	knobLeftVol.backgroundPrim 	= 	this.ImageContainer["IMG_knob"];
	var knobLeftVolLabel = new DJUIElement(getX(14), getY(95), getX(69), getY(23));
	knobLeftVolLabel.backgroundPrim	= this.ImageContainer["IMG_lbl_vol"];
	knobLeftVol.addChild(knobLeftVolLabel);



	// right knobs

	var knobRightLow = new DJUIElementKnobN(getX(100-40), getY(50), getX(6), getY(12));
	knobRightLow.backgroundPrim 	= 	this.ImageContainer["IMG_knob"];
	var knobRightLowLabel = new DJUIElement(getX(14), getY(95), getX(69), getY(23));
	knobRightLowLabel.backgroundPrim	= this.ImageContainer["IMG_lbl_low"];
	knobRightLow.addChild(knobRightLowLabel);


	var knobRightMid = new DJUIElementKnobN(getX(100-40+7), getY(50), getX(6), getY(12));
	knobRightMid.backgroundPrim 	= 	this.ImageContainer["IMG_knob"];
	var knobRightMidLabel = new DJUIElement(getX(14), getY(95), getX(69), getY(23));
	knobRightMidLabel.backgroundPrim	= this.ImageContainer["IMG_lbl_mid"];
	knobRightMid.addChild(knobRightMidLabel);


	var knobRightHigh = new DJUIElementKnobN(getX(100-40+14), getY(50), getX(6), getY(12));
	knobRightHigh.backgroundPrim 	= 	this.ImageContainer["IMG_knob"];
	var knobRightHighLabel = new DJUIElement(getX(14), getY(95), getX(69), getY(23));
	knobRightHighLabel.backgroundPrim	= this.ImageContainer["IMG_lbl_high"];
	knobRightHigh.addChild(knobRightHighLabel);


	var knobRightSpeed = new DJUIElementKnobN(getX(100-40+22), getY(50), getX(6), getY(12));
	knobRightSpeed.backgroundPrim 	= 	this.ImageContainer["IMG_knob"];
	var knobRightSpeedLabel = new DJUIElement(getX(14), getY(95), getX(69), getY(23));
	knobRightSpeedLabel.backgroundPrim	= this.ImageContainer["IMG_lbl_speed"];
	knobRightSpeed.addChild(knobRightSpeedLabel);


	var knobRightVol = new DJUIElementKnobV(getX(100-40+29), getY(50), getX(6), getY(12));
	knobRightVol.backgroundPrim 	= 	this.ImageContainer["IMG_knob"];
	var knobRightVolLabel = new DJUIElement(getX(14), getY(95), getX(69), getY(23));
	knobRightVolLabel.backgroundPrim	= this.ImageContainer["IMG_lbl_vol"];
	knobRightVol.addChild(knobRightVolLabel);


	// crossfade
	var crossfadeBG = new DJUIElementCFade(getX(44.5), getY(55), getX(11), getY(2));
	crossfadeBG.backgroundPrim 		= 	this.ImageContainer["IMG_cf_bg"];
	crossfadeBG.backgroundSec		= 	this.ImageContainer["IMG_cf_btn"];
	var crossfadeLabel = new DJUIElement(getX(18), getY(330), getX(64), getY(140));
	crossfadeLabel.backgroundPrim 	= 	this.ImageContainer["IMG_lbl_cf"];
	crossfadeBG.addChild(crossfadeLabel);


	// VU meter
	var VULeft	= new DJUIElementVUMeter(getX(49.2),getY(82),getX(0.6),getY(9.5));
	var VURight = new DJUIElementVUMeter(getX(50.2),getY(82),getX(0.6),getY(9.5));


	// delay
	var knobDelay = new DJUIElementKnobV(getX(42), getY(77.5), getX(6), getY(12));
	knobDelay.backgroundPrim 	= 	this.ImageContainer["IMG_knob"];	
	var knobDelayLabel = new DJUIElement(getX(14), getY(95), getX(69), getY(23));
	knobDelayLabel.backgroundPrim	= this.ImageContainer["IMG_lbl_delay"];
	knobDelay.addChild(knobDelayLabel);


	// vol total
	var knobTotVol = new DJUIElementKnobV(getX(52), getY(77.5), getX(6), getY(12));
	knobTotVol.backgroundPrim 	= 	this.ImageContainer["IMG_knob"];	
	var knobTotVolLabel = new DJUIElement(getX(14), getY(95), getX(69), getY(23));
	knobTotVolLabel.backgroundPrim	= this.ImageContainer["IMG_lbl_delay"];
	knobTotVol.addChild(knobTotVolLabel);



	// learn popover
	var popover = new DJUIElementPopover(0,0, canvasWidth, canvasHeight);
	var popoverText = new DJUIElementText(getX(35), getY(50), getX(30), getY(20));
	popoverText.textContent ="Move Controler Element to assign";
	popoverText.textSize = getX(2);
	popoverText.textColor = canvasSecColor;
	popover.addChild(popoverText);

	// create a rendering hierarchy
	deckABg.addChild(syncLeft);
	deckABg.addChild(timelineLeft);

	deckBBg.addChild(syncRight);
	deckBBg.addChild(timelineRight);

	background.addChild(knobTotVol);
	background.addChild(knobDelay);
	background.addChild(VULeft);
	background.addChild(VURight);
	background.addChild(crossfadeBG);
	background.addChild(knobLeftLow);
	background.addChild(knobLeftMid);
	background.addChild(knobLeftHigh);
	background.addChild(knobLeftSpeed);
	background.addChild(knobLeftVol);
	background.addChild(knobRightLow);
	background.addChild(knobRightMid);
	background.addChild(knobRightHigh);
	background.addChild(knobRightSpeed);
	background.addChild(knobRightVol);
	background.addChild(stopLeft);
	background.addChild(stopRight);
	background.addChild(playLeft);
	background.addChild(playRight);
	background.addChild(deckABg);
	background.addChild(deckBBg);
	background.addChild(popover);


	// add to root element
	this.DJUIRootElement = background;
}





//draws the view
View.prototype.drawView = function(){


	// recursivly draw all UI Elements
	function drawUIElement(view, element){	

		// if image is assigend draw it
		if(element.getBackground() !== undefined){
			view.drawContext.drawImage(
				element.getBackground(), 
				element.x, 
				element.y, 
				element.width, 
				element.height
			);
		}

		// special types of ui elements
		if(element.UIType == "timeline"){

			// draw entire line with sec color
			view.drawContext.fillStyle=canvasSecColor;
			view.drawContext.fillRect(
				element.x,
				element.y + 0.45 * element.height,
				element.width,
				element.height*0.1

			);			


			// draw current line with prim color
			view.drawContext.fillStyle=canvasPrimColor;
			view.drawContext.fillRect(
				element.x,
				element.y + 0.45 * element.height,
				element.width*element.getValue(),
				element.height*0.1

			);
			
			
			// draw selector
			view.drawContext.fillStyle=canvasPrimColor;
			view.drawContext.fillRect(
				element.x+ element.width*element.getValue(),
				element.y,
				element.width*0.005,
				element.height
			);
		}else if(element.UIType == "knobneutral"){

			var x = element.x + element.width/2;
			var y = element.y + element.height/2;
			var r = element.width/2*0.9;

			// draw arc depending on value
			var clockwise = element.getValue() < 0 ? false: true;
			view.drawContext.beginPath();
			view.drawContext.arc(
				x,
				y,
				r,	
				1.5*Math.PI,
				1.5*Math.PI+element.getValue()*0.8*Math.PI, 
				!clockwise									
			);
			view.drawContext.strokeStyle=canvasPrimColor;
			view.drawContext.lineWidth = 7;
			view.drawContext.stroke();


			// draw neutral pos mark
			view.drawContext.beginPath();
			view.drawContext.arc(
				x,
				y,
				r,	
				1.5*Math.PI-0.05,
				1.5*Math.PI+0.05								
			);
			view.drawContext.strokeStyle=canvasPrimColor;
			view.drawContext.lineWidth = 7;
			view.drawContext.stroke();

			// draw pointer in knob
			view.drawContext.beginPath();
			view.drawContext.arc(
				x,
				y,
				r*0.5,	
				1.5*Math.PI+element.getValue()*0.8*Math.PI-0.05,
				1.5*Math.PI+element.getValue()*0.8*Math.PI+0.05
				//!clockwise								
			);
			view.drawContext.strokeStyle=canvasPrimColor;
			view.drawContext.lineWidth = 7;
			view.drawContext.stroke();
		}else if(element.UIType == "knobvolume"){
			var x = element.x + element.width/2;
			var y = element.y + element.height/2;
			var r = element.width/2*0.9;

			view.drawContext.beginPath();
			view.drawContext.arc(
				x,
				y,
				r,	
				0.7*Math.PI,
				0.73*Math.PI+element.getValue()*1.55*Math.PI									
			);
			view.drawContext.strokeStyle=canvasPrimColor;
			view.drawContext.lineWidth = 7;
			view.drawContext.stroke();

			// draw pointer in knob
			view.drawContext.beginPath();
			view.drawContext.arc(
				x,
				y,
				r*0.5,	
				1.5*Math.PI+(element.getValue()*2-1)*0.8*Math.PI-0.05,
				1.5*Math.PI+(element.getValue()*2-1)*0.8*Math.PI+0.05
				//!clockwise								
			);
			view.drawContext.strokeStyle=canvasPrimColor;
			view.drawContext.lineWidth = 7;
			view.drawContext.stroke();
		}else if(element.UIType == "crossfade"){
			view.drawContext.drawImage(
				element.backgroundSec, 
				element.x + ((element.getValue()+1)/2) * element.width-element.height/2, 
				element.y, 
				element.height, 
				element.height
			);
			// draw zero pos
			view.drawContext.fillStyle=canvasPrimColor;
			view.drawContext.fillRect(
				element.x+ element.width/2-0.01*element.width,
				element.y+element.height*1.5,
				element.width*0.02,
				element.height/2
			);
		}else if(element.UIType == "VUMeter"){
			// draw entire vu with canvasVUInactive color
			view.drawContext.fillStyle=canvasVUInactive;
			view.drawContext.fillRect(
				element.x,
				element.y,
				element.width,
				element.height

			);

			// draw peek vu with canvasVUActive color
			view.drawContext.fillStyle=canvasVUActive;
			view.drawContext.fillRect(
				element.x,
				element.y + (element.height*(1-element.getValue())),
				element.width,
				element.height-  (element.height*(1-element.getValue()))

			);
		}else if(element.UIType == "text"){
			view.drawContext.fillStyle = element.textColor;
			view.drawContext.font=element.textSize+"px Arial";
			view.drawContext.fillText(element.textContent, element.x, element.y+element.textSize);
		}else if(element.UIType == "popover"){
			if (element.visible) {
				// darken BG
				view.drawContext.fillStyle ="rgba(0,0,0,0.8)";
				view.drawContext.fillRect(
					element.x, 
					element.y, 
					element.width, 
					element.height
				);
			}else{
				return;
			}
				
			
		}

		for(var i = 0 ; i < element.children.length ; i++){
			drawUIElement(view, element.children[i]);			
		}
	}
	drawUIElement(this, this.DJUIRootElement);

}






// Is an basic ui element that holds useful information
var DJUIElement = function(x, y, width, height){
	this.x = x || 0;
	this.y = y || 0;
	this.width = width || 0;
	this.height = height || 0;
	this.children = [];
	this.backgroundPrim;
	this.UIType;
}

// adds the child and updates pos koordinates
DJUIElement.prototype.addChild = function(child){
	child.x = this.x + child.x*(this.width/canvasWidth);
	child.y = this.y + child.y*(this.height/canvasHeight);
	child.width = child.width*(this.width/canvasWidth);
	child.height = child.height*(this.height/canvasHeight);
	this.children.push(child);
}

// returns background
DJUIElement.prototype.getBackground = function(){
	return this.backgroundPrim;
}






/**
 * KNOB Neutral ELEMENT
 */


// Constructor of KNOB UI ELEMENT
function DJUIElementKnobN(x, y, width, height) {

  DJUIElement.call(this, x, y, width, height);

  this.UIType ="knobneutral";
  this.value = 0;
}

DJUIElementKnobN.prototype = Object.create(DJUIElement.prototype); 
DJUIElementKnobN.prototype.constructor = DJUIElementKnobN;


DJUIElementKnobN.prototype.setValue = function(value){
	this.value = min(max(-1,value),1);
}

DJUIElementKnobN.prototype.getValue = function(){
	if(this.value < -1 || this.value > 1)
		new Error('KNobN: Value not properly set (Range -1 .. 1 )');
	else
		return this.value;
}



/**
 * KNOB Vol ELEMENT
 */


// Constructor of KNOB UI ELEMENT
function DJUIElementKnobV(x, y, width, height) {

  DJUIElement.call(this, x, y, width, height);

  this.UIType ="knobvolume";
  this.value = 0.5;
}

DJUIElementKnobV.prototype = Object.create(DJUIElement.prototype); 
DJUIElementKnobV.prototype.constructor = DJUIElementKnobV;


DJUIElementKnobV.prototype.setValue = function(value){
	this.value = min(max(0,value),1);
}

DJUIElementKnobV.prototype.getValue = function(){
	if(this.value < 0 || this.value > 1)
		new Error('KNobV: Value not properly set (Range 0 .. 1 )');
	else
		return this.value;
}







/**
 * Button ELEMENT
 */


// Constructor of Button UI ELEMENT
function DJUIElementButton(x, y, width, height, active) {

  DJUIElement.call(this, x, y, width, height);

  
  this.active = active || false;
  this.backgroundSec;
}

DJUIElementButton.prototype = Object.create(DJUIElement.prototype); 
DJUIElementButton.prototype.constructor = DJUIElementButton;


// returns background
DJUIElementButton.prototype.getBackground = function(){
	if(this.active){
		return this.backgroundPrim;
	}else{
		return this.backgroundSec;
	}
	
}





/**
 * Crossfade element
 */


// Constructor of Crossfade UI ELEMENT
function DJUIElementCFade(x, y, width, height) {

  DJUIElement.call(this, x, y, width, height);
  this.value = 0;
  this.backgroundSec;
  this.UIType ="crossfade";
}

DJUIElementCFade.prototype = Object.create(DJUIElement.prototype); 
DJUIElementCFade.prototype.constructor = DJUIElementCFade;


// returns background
DJUIElementCFade.prototype.getBackground = function(){
	return this.backgroundPrim;	
}

// returns the value -1..1
DJUIElementCFade.prototype.getValue = function(){
	if(this.value > 1 || this.value < -1)
		new Error("Value of crossfader not set with setValue() function");
	else
		return this.value;
	return 0;
}


// sets the value -1..1
DJUIElementCFade.prototype.setValue = function(val){
	this.value = min(-1,max(1,val));
}





/**
 * timeline ELEMENT
 */


// Constructor of Button UI ELEMENT
function DJUIElementTimeLine(x, y, width, height) {

  DJUIElement.call(this, x, y, width, height);

  
  this.value = 0.0;
  this.UIType ="timeline";
}

DJUIElementTimeLine.prototype = Object.create(DJUIElement.prototype); 
DJUIElementTimeLine.prototype.constructor = DJUIElementTimeLine;

DJUIElementTimeLine.prototype.setValue = function(value){
	this.value = min(max(0,value),1);
}

DJUIElementTimeLine.prototype.getValue = function(){
	if(this.value < 0 || this.value > 1)
		new Error('Timeline: Value not properly set');
	else
		return this.value;
}




/**
 * VU ELEMENT
 */


// Constructor of Button UI ELEMENT
function DJUIElementVUMeter(x, y, width, height) {

  DJUIElement.call(this, x, y, width, height);

  
  this.value = 0.3;
  this.UIType ="VUMeter";
}

DJUIElementVUMeter.prototype = Object.create(DJUIElement.prototype); 
DJUIElementVUMeter.prototype.constructor = DJUIElementVUMeter;

DJUIElementVUMeter.prototype.setValue = function(value){
	this.value = min(max(0,value),1);
}

DJUIElementVUMeter.prototype.getValue = function(){
	if(this.value < 0 || this.value > 1)
		new Error('VUMeter: Value not properly set');
	else
		return this.value;
}




/**
 * Text ELEMENT
 */


// Constructor of Button UI ELEMENT
function DJUIElementText(x, y, width, height) {

  DJUIElement.call(this, x, y, width, height);

  this.textContent;
  this.textSize;
  this.textColor;
  this.UIType ="text";
}

DJUIElementText.prototype = Object.create(DJUIElement.prototype); 
DJUIElementText.prototype.constructor = DJUIElementText;



/**
 * Popover ELEMENT
 */


// Constructor of Button UI ELEMENT
function DJUIElementPopover(x, y, width, height) {

  DJUIElement.call(this, x, y, width, height);
  this.visible = false;
  this.UIType ="popover";
}

DJUIElementPopover.prototype = Object.create(DJUIElement.prototype); 
DJUIElementPopover.prototype.constructor = DJUIElementPopover;







