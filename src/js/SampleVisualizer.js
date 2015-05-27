function SampleVisualizer(context, delegate, VUMeterName) {
  this.analyser = context.createAnalyser();
  this.analyser.minDecibels = -80;
  this.analyser.maxDecibels = 0;
  this.freqs = new Uint8Array(this.analyser.frequencyBinCount);
  this.delegate = delegate;
  this.VUMeterName = VUMeterName;
}

SampleVisualizer.prototype.drawPeeks = function() {
  // Get the frequency data from the currently playing music
  this.analyser.getByteFrequencyData(this.freqs);
  var currentPeek = Math.max.apply(null, this.freqs);
  var percent = currentPeek / 256;
  this.delegate.setVUMeterValue(this.VUMeterName, percent);
  requestAnimFrame(this.drawPeeks.bind(this));
}