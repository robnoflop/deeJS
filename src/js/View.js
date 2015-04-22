/************************************************
 *	Config 									     *
 ***********************************************/

/** 
 * Set the Width of the canvas
 */
var canvasWidth = 1280;


/** 
 * Set the Height of the canvas
 */
var canvasHeight = canvasWidth/2;


/**
 * Set ID name of the canvas to draw on
 */
 var canvasName = 'canvas';

























/************************************************
 *	View 									     *
 ***********************************************/

var View = function(){
	// Holds the delegate of the controller
	this.delegate;

	// Drawing context
	this.drawContext;

	// container for UI ELements
	this.DJUIRootElement = [];

	// await onload events
	this.cntOnloadEvts = 0;

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


//adds UI elements to the canvas
View.prototype.addComponents = function(){

	// init DJUIOjects
	var background = new DJUIElement(0,0, canvasWidth, canvasHeight);
	background.addBackground('img/appimg/bg.png');

	var deckABg = new DJUIElement(0,0,100,100);
	deckABg.addBackground('img/appimg/deckBG.png');

	var deckBBg = new DJUIElement(100,0,100,100);
	deckABg.addBackground('img/appimg/deckBG.png');

	// create a rendering hierachy
	background.addChild(deckABg);
	background.addChild(deckBBg);


	// add to root element
	this.DJUIRootElement = deckABg;
}



//draws the view
View.prototype.drawView = function(){

	var context = this.drawContext;	


	// draw all UI Elements
	function drawUIElement(element){	

		var BGimg = new Image();
		BGimg.src = element.backgroundpath;

		BGimg.onload = function() {
			  context.drawImage(BGimg, element.x, element.y, element.width, element.height);
		};

		for(var i = 0 ; i < element.children.length ; i++){
			drawUIElement(element.children[i]);			
		}
	}

	drawUIElement(this.DJUIRootElement);


	//console.log(this.DJUIElements[0].children);


}






// Is an basic ui element that holds useful information
var DJUIElement = function(x, y, width, height){
	this.x = x || 0;
	this.y = y || 0;
	this.width = width || 0;
	this.height = height || 0;
	this.children = [];
	this.backgroundpath;
	this.backgroundpathSec;
}

DJUIElement.prototype.addChild = function(child){
	this.children.push(child);
}

DJUIElement.prototype.addBackground = function(path){
	this.backgroundpath = path;
}

DJUIElement.prototype.addSecBackground = function(path){
	this.backgroundpathSec = path;
}




/**
 * KNOB ELEMENT
 */


// Constructor of KNOB UI ELEMENT
function DJUIElementKnobN(x, y, width, height, value) {

  DJUIElement.call(this, x, y, width, height);

  // Initialize our Student-specific properties
  this.value = value || 0;
}

DJUIElementKnobN.prototype = Object.create(DJUIElement.prototype); 
DJUIElementKnobN.prototype.constructor = DJUIElementKnobN;


DJUIElementKnobN.prototype.setValue = function(value){
	this.value = min(max(0,value),1);
}

DJUIElementKnobN.prototype.getValue = function(){
	if(this.value < 0 || this.value > 1)
		new Error('Value not properly set');
	else
		return this.value;
}