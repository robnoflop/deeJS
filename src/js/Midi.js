/************************************************
 *	Midi-interface 				(MODEL)			*
 ***********************************************/


var Midi = function(){
	
	// default midi map for berhinder MM-1
	this.defaultMap = {
		"volLeft" : {0 : 176, 1: 48},
		"volRight" : {0 : 176, 1: 51},

		"lowLeft" : {0 : 176, 1: 6},
		"lowRight" : {0 : 176, 1: 9},

		"midLeft" : {0 : 176, 1: 10},
		"midRight" : {0 : 176, 1: 13},

		"highLeft" : {0 : 176, 1: 14},
		"highRight" : {0 : 176, 1: 17},

		"speedLeft" : {0 : 176, 1: 18},
		"speedRight" : {0 : 176, 1: 21},

		"syncLeft" : {0 : 144, 1: 16},
		"syncRight" : {0 : 144, 1: 17},

		"playLeft" : {0 : 144, 1: 19},
		"playRight" : {0 : 144, 1: 31},

		"stopLeft" : {0 : 144, 1: 20},
		"stopRight" : {0 : 144, 1: 32},


		"volTot" : {0 : 176, 1: 5},
		"delay" : {0 : 176, 1: 4},
		"crossfade" : {0: 176, 1: 64}
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





















