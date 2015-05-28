
/**
  Nach dem Beispiel von Joe Sullivan (http://tech.beatport.com/2014/web-audio/beat-detection-using-web-audio/) implementiert.
*/
function BPMCounter() {

}

/**
  Count the BPM for geiven source. 
*/
BPMCounter.prototype.count = function(source, threshold){
  var peaks = this.getPeaksAtThreshold(source, threshold);
  var intervals = this.countIntervalsBetweenNearbyPeaks(peaks);
  var tempo = this.groupNeighborsByTempo(intervals);
  var maxIndex = 0;
  var maxCount = 0;
  tempo.forEach(function(t, index) {
    if(t.count > maxCount) {
      maxCount = t.count;
      maxIndex = index;
    }
  });
  return tempo[maxIndex].tempo;
};

// Function to identify peaks
BPMCounter.prototype.getPeaksAtThreshold = function(data, threshold) {
  var peaksArray = [];
  var length = data.length;
  for(var i = 0; i < length;) {
    var help = data[i];
    if (data[i] > threshold) {
      peaksArray.push(i);
      // Skip forward ~ 1/4s to get past this peak.
      i += 10000;
    }
    i++;
  }
  return peaksArray;
}

// Function used to return a histogram of peak intervals
BPMCounter.prototype.countIntervalsBetweenNearbyPeaks = function(peaks) {
  var intervalCounts = [];
  peaks.forEach(function(peak, index) {
    for(var i = 0; i < 10; i++) {
      var interval = peaks[index + i] - peak;

      var foundInterval = intervalCounts.some(function(intervalCount) {
        if (intervalCount.interval === interval) {
          return intervalCount.count++;
        }
      });

      if (!foundInterval) {
        intervalCounts.push({
          interval: interval,
          count: 1
        });
      }
    }
  });
  return intervalCounts;
}

// Function used to return a histogram of tempo candidates.
BPMCounter.prototype.groupNeighborsByTempo = function(intervalCounts) {
  var tempoCounts = []
  intervalCounts.forEach(function(intervalCount, i) {
    // Convert an interval to tempo
    if (intervalCount.interval != 0) {
      var theoreticalTempo = 60 / (intervalCount.interval / 44100 );

      // Adjust the tempo to fit within the 90-180 BPM range
      while (theoreticalTempo < 90) theoreticalTempo *= 2;
      while (theoreticalTempo > 180) theoreticalTempo /= 2;

      var foundTempo = tempoCounts.some(function(tempoCount) {
        if (tempoCount.tempo === theoreticalTempo)
          return tempoCount.count += intervalCount.count;
      });

      if (!foundTempo) {
        tempoCounts.push({
          tempo: theoreticalTempo,
          count: intervalCount.count
        });
      }
    }
  });
  return tempoCounts;
}
