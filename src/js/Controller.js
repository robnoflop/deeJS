
/** ENTRY POINT OF THE APP **/

window.onload = function(){
	new Controller();
}

/****************************/
















/************************************************
 *	CONTROLLER 									*
 ***********************************************/


var Controller = function(){
	this.view = new View();
	this.view.setDelegate(this);
	this.view.initView();	
};


/* event methods called by view */

// Called when view loading is completed
Controller.prototype.onloadView = function(){
	console.log("View did load successfully");
}



// Called when an audio path has been changed
Controller.prototype.audioPathChanged = function(arg){
	if(arg === "A"){
		console.log("source of Deck A changed");
	}else if (arg==="B") {
		console.log("source of Deck B changed");
	}
}


// Called when there was an error loading the view
Controller.prototype.errorLoadingView = function(error){
	// do something with error-object
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