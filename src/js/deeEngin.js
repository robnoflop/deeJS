
function deeEngin(delegate) {
  this.delegate = delegate;
  // Fix up prefixing
  var AudioContext = window.AudioContext || window.webkitAudioContext;
  this.context = new AudioContext();
  this.source1 = this.context.createBufferSource();
  this.source2 = this.context.createBufferSource();

  this.leftPlaying = false;
  this.rightPlaying = false;

  this.volLeft = this.context.createGain();
  this.volLeft.gain.value = 0.5;
  this.volRight = this.context.createGain();
  this.volRight.gain.value = 0.5;
  this.crossfadeGain1 = this.context.createGain();
  this.crossfadeGain2 = this.context.createGain();
  this.crossfade(0.5);
  this.volTot = this.context.createGain();
  this.volTot.gain.value = 0.5;

  this.lowLeft = this.context.createBiquadFilter();
  this.lowLeft.type = 'lowshelf';
  this.lowLeft.gain.value = 0;
  this.highLeft = this.context.createBiquadFilter();
  this.highLeft.gain.value = 0;
  this.highLeft.type = 'highshelf';
  this.midLeft = this.context.createBiquadFilter();
  this.midLeft.gain.value = 0;

  this.lowRight = this.context.createBiquadFilter();
  this.lowRight.gain.value = 0;
  this.lowRight.type = 'lowshelf';
  this.highRight = this.context.createBiquadFilter();
  this.highRight.gain.value = 0;
  this.highRight.type = 'highshelf';
  this.midRight = this.context.createBiquadFilter();
  this.midRight.value = 0;
  
  this.delay = this.context.createDelay();
  this.delay.delayTime.value = 0;

  this.lowLeft.frequency.value = 60;
  this.lowLeft.frequency.value = 600;
  this.highLeft.frequency.value = 4000;

  this.lowRight.frequency.value = 60;
  this.lowRight.frequency.value = 600;
  this.highRight.frequency.value = 4000;

  this.bufferLoader = new BufferLoader(
    this.context
  );

  this.vis1 = new SampleVisualizer(this.context, delegate, "VULeft");
  this.vis2 = new SampleVisualizer(this.context, delegate, "VURight");

  this.bpmCounter = new BPMCounter(); 

  this.BPMLeft = 0;
  this.BPMRight = 0;
  this.BPMLeftOriginal = 0;
  this.BPMRightOriginal = 0;

  this.source1StartOffset = 0;
  this.source2StartOffset = 0;

  this.connectAudioNodes();
}

deeEngin.prototype.connectAudioNodes = function() {
  this.source1.connect(this.volLeft);
  this.source2.connect(this.volRight);

  this.volLeft.connect(this.crossfadeGain1);
  this.volRight.connect(this.crossfadeGain2);

  this.crossfadeGain1.connect(this.lowLeft);
  this.crossfadeGain1.connect(this.highLeft);
  this.crossfadeGain1.connect(this.midLeft);

  this.crossfadeGain2.connect(this.lowRight);
  this.crossfadeGain2.connect(this.highRight);
  this.crossfadeGain2.connect(this.midRight);

  this.lowLeft.connect(this.delay);
  this.midLeft.connect(this.delay);
  this.highLeft.connect(this.delay);

  this.lowRight.connect(this.delay);
  this.midRight.connect(this.delay);
  this.highRight.connect(this.delay);

  this.lowLeft.connect(this.vis1.analyser);
  this.midLeft.connect(this.vis1.analyser);
  this.highLeft.connect(this.vis1.analyser);

  this.lowRight.connect(this.vis2.analyser);
  this.midRight.connect(this.vis2.analyser);
  this.highRight.connect(this.vis2.analyser);

  this.delay.connect(this.volTot);

  this.vis1.analyser.connect(this.volTot);
  this.vis2.analyser.connect(this.volTot);

  this.volTot.connect(this.context.destination);

  this.vis1.drawPeeks();
  this.vis2.drawPeeks();
}

deeEngin.prototype.startStopLeft = function(){
  if(this.leftPlaying) {
    this.source1.stop(0);
    this.source1StartOffset += this.context.currentTime - this.source1StartTime;
  } else {
    this.source1StartTime = this.context.currentTime;
    this.source1 = this.context.createBufferSource();
    this.source1.connect(this.volLeft);
    this.source1.buffer = this.bufferLoader.bufferList[0];
    this.source1.start(0, this.source1StartOffset % this.source1.buffer.duration);
  }
  this.leftPlaying = !this.leftPlaying;
};

deeEngin.prototype.startStopRight = function(){
   if(this.rightPlaying) {
    this.source2.stop(0);
    this.source2StartOffset += this.context.currentTime - this.source2StartTime;
  } else {
    this.source2StartTime = this.context.currentTime;
    this.source2 = this.context.createBufferSource();
    this.source2.connect(this.volRight);
    this.source2.buffer = this.bufferLoader.bufferList[1];
    this.source2.start(0, this.source2StartOffset % this.source2.buffer.duration);
  }
  this.rightPlaying = !this.rightPlaying;
};

deeEngin.prototype.setNodeValue = function(name, value) {
  switch(name){
    case "lowLeft":
      this.lowLeft.gain.value = value * 15;
      break;
    case "midLeft":
      this.midLeft.gain.value = value * 15;
      break;
    case "highLeft":
      this.highLeft.gain.value = value * 15;
      break;
    case "speedLeft":
      value = 300 * value;
      var newRate = value / this.BPMLeftOriginal;
      this.source1.playbackRate.value = newRate;
      this.BPMLeft = parseInt(this.BPMLeftOriginal * newRate);
      this.delegate.setBPM("bpmLeft", this.BPMLeft);
      break;
    case "volLeft":
      this.volLeft.gain.value = value;
      break;
    case "lowRight":
      this.lowRight.gain.value = value * 15;
      break;
    case "midRight":
      this.midRight.gain.value = value * 15;
      break;
    case "highRight":
      this.highRight.gain.value = value * 15;
      break;
    case "speedRight":
      value = 300 * value;
      var newRate = value / this.BPMRightOriginal;
      this.source2.playbackRate.value = newRate;
      this.BPMRight = parseInt(this.BPMRightOriginal * newRate);
      this.delegate.setBPM("bpmRight", this.BPMRight);
      break;
    case "volRight":
      this.volRight.gain.value = value;
      break;
    case "delay":
      this.delay.delayTime.value = value * 15;
      break;
    case "volTot":
      this.volTot.gain.value = value;
      break;
  }
};

deeEngin.prototype.crossfade = function(value){
  this.crossfadeGain1.gain.value = Math.cos(value * 0.5*Math.PI);
  this.crossfadeGain2.gain.value = Math.cos((1.0 - value) * 0.5*Math.PI);
};

deeEngin.prototype.loadAudio = function(deck, file, loadCallback){
  this.audioLoadCallback = loadCallback;
  if(deck == "deckA") {
    this.bufferLoader.load(0, file, this.leftLoaded);
  } else if (deck == "deckB") {
    this.bufferLoader.load(1, file, this.rightLoaded);
  }
};

deeEngin.prototype.leftLoaded = function(){
    MainController.engin.source1.buffer = this.bufferList[0];
    MainController.engin.BPMLeft = parseInt(MainController.engin.bpmCounter.count(MainController.engin.source1.buffer.getChannelData(0), 0.15));
    MainController.engin.BPMLeftOriginal = MainController.engin.BPMLeft;
    MainController.engin.audioLoadCallback();
};

deeEngin.prototype.rightLoaded = function(){
    MainController.engin.source2.buffer = this.bufferList[1];
    MainController.engin.BPMRight = parseInt(MainController.engin.bpmCounter.count(MainController.engin.source2.buffer.getChannelData(0), 0.15));
    MainController.engin.BPMRightOriginal = MainController.engin.BPMRight;
    MainController.engin.audioLoadCallback();
};


deeEngin.prototype.syncLeft = function(argument){
  source1.playbackRate.value = source1.playbackRate.value * BPMRight / BPMLeft;
  BPMLeft = parseInt(BPMRight);
};

deeEngin.prototype.syncRight = function(argument){
  source2.playbackRate.value = source2.playbackRate.value * BPMLeft / BPMRight;
  BPMRight = parseInt(BPMLeft);
};

// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
return  window.requestAnimationFrame       || 
  window.webkitRequestAnimationFrame || 
  window.mozRequestAnimationFrame    || 
  window.oRequestAnimationFrame      || 
  window.msRequestAnimationFrame     || 
  function( callback ){
  window.setTimeout(callback, 1500);
};
})();