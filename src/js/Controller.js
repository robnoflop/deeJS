
/** ENTRY POINT OF THE APP **/

window.onload = function(){
	MainController = new Controller();
}

/****************************/
















/************************************************
 *	CONTROLLER 									*
 ***********************************************/


var Controller = function(){

	// wire view
	this.view = new View();
	this.view.setDelegate(this);
	this.view.initView();	

	// wire midi interface
	this.midi = new Midi();	
	this.midi.initMidi();
	

	this.midiLearnState = {
		learning: false,
		obj: null
	};
};


/* event methods called by view */

// Called when view loading is completed
Controller.prototype.onloadView = function(){
	console.log("View did load successfully");
	var popover = document.getElementById("popoverLoading");
	
	// check for popover element
	if(popover === undefined){
		new Error("Controller: Couldn't find popoverLoading div");
		return;
	}

	popover.style.display = "none";

}


// called when a UIElement of type Button was clicked
Controller.prototype.btnClicked = function(obj){
	console.log("Button clicked: "+obj.UIName);
	obj.active = !obj.active;
}


// called when timeline curser was moved
Controller.prototype.timelineCurserMoved = function(obj){
	console.log("curser of "+obj.UIName+" was moved to pos "+ obj.getValue());
}



Controller.prototype.crossfadeCurserMoved = function(obj){
	console.log("curser of "+obj.UIName+" was moved to pos "+ obj.getValue());
}


Controller.prototype.knobValueChanged = function(obj){
	console.log("Value of "+obj.UIName+" has changed to "+ obj.getValue());
}

// called when user dragged an audio file on a deck
Controller.prototype.startLoadingAudio = function(filename){
	this.view.getUIElement("popoverText").textContent = "Loading track "+filename;
	this.view.getUIElement("popover").visible = true;
	this.view.drawView();
}



// Called when an audio path has been changed
Controller.prototype.audioSourceChanged = function(deck, src, filename){
	console.log(src);
	this.view.getUIElement("popover").visible = false;
	this.view.drawView();
}


// called when clicked on a layover
Controller.prototype.clickOnPopover = function(){
	this.view.getUIElement("popover").visible = false;
	this.view.drawView();
}


Controller.prototype.midiLearn = function(obj){
	this.view.getUIElement("popoverText").textContent = "Learn mode for "+ obj.UIName;
	this.view.getUIElement("popover").visible = true;
	this.view.drawView();

	this.midiLearnState.learning = true;
	this.midiLearnState.obj = obj;


}


///////
///////
/////// TODO by jens
///////
///////
///////

Controller.prototype.receivedMidi = function(midi){

	var midiObj = MainController.midi;

	// if in learn mode than 
	if(MainController.midiLearnState.learning){
		MainController.midiLearnState.learning = false;
		MainController.view.getUIElement("popover").visible = false;
		MainController.view.drawView();

		var object = MainController.midiLearnState.obj;
		midiObj.defaultMap[object.UIName] = {
			0: midi.data[0], 
			1: midi.data[1] 
		};

		//console.log(MainController.midi.defaultMap);

	// when not in learning mode. apply values to view and controller	
	}else{

		var UIElem= null;

		// look up midi message and find UI element that is assigned
		for(midiDest in midiObj.defaultMap){
			if(midiObj.defaultMap[midiDest][0] === midi.data[0] &&
			   midiObj.defaultMap[midiDest][1] === midi.data[1]){
				UIElem = MainController.view.getUIElement(midiDest);
				break;
			}
		}

		// if this controller isnt assigned break here
		if(UIElem === null) return;


		//UIElem.setValue(midi.data[2]/127.0);

		console.log(midiObj.defaultMap);

		if(UIElem.UIType == "knobneutral")
			UIElem.setValue(midi.data[2]/127.0*2.0-1.0);


		MainController.view.drawView();
	}	
}


// Error
Controller.prototype.receivedError = function(error){
	// received any error
	var popover = document.getElementById("popoverLoading");
	var popoverText = document.getElementById("popoverLoadingText");
	
	// check for popover element
	if(popover === undefined || popoverText === undefined){
		new Error("Controller: Couldn't find popover or popoverText div");
		return;
	}

	this.view.getUIElement("popoverText").textContent = error.getMessage() || "Undefined Error";
	this.view.getUIElement("popover").visible = true;
	this.view.drawView();

}



// Called when there was an error loading the view
Controller.prototype.errorLoadingView = function(error){
	console.log("View didn't load successfully");
	var popover = document.getElementById("popoverLoadingText");
	
	// check for popover element
	if(popover === undefined){
		new Error("Controller: Couldn't find popoverLoading div");
		return;
	}

	popover.innerHTML = error.getMessage();
};



















/************************************************
 *	ERROR 									*
 ***********************************************/

/**
*	Prints error message when instanciated 
*   and hold information to pass around
*/

var Error = function(msg){
	this.message = msg;
	console.log(msg);	
};

Error.prototype.getMessage = function(){
	return this.message;
};