/************************************************
 *	Midi-interface 				(MODEL)			*
 ***********************************************/


var Midi = function(){
	
	this.defaultMap = {
		"volLeft" : {0 : 152, 1: 96},
		"lowRight" : {0 : 152, 1: 95}
	}
};





Midi.prototype.initMidi = function(){

	if(this.observer ===  null){
		new Error("Define Observer in Midi");
		return;
	}

	if(navigator.requestMIDIAccess)	{	
  		navigator.requestMIDIAccess().then(	
  			this.midiSuccess,
  			this.midiFailure
  		);	
  	}else{
  		this.midiFailure();
  	}	
}





Midi.prototype.midiSuccess = function(midi){
	var inputs = midi.inputs;

	for(var input of inputs.values()){		
		input.open();
		input.addEventListener('midimessage', MainController.receivedMidi , false);
	}	
}	

Midi.prototype.midiFailure = function(){
	new Error("Midi failure. Does your browser support Midi Interfaces?");
}





















