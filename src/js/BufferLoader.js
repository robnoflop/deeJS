function BufferLoader(context) {
  this.context = context;
  this.bufferList = new Array();
  this.bufferList[0] = null;
  this.bufferList[1] = null;

  //not thread save
  this.callback = null;
  this.index = null;

  this.reader = new FileReader();
  this.reader.onloadend = this.loadend;
  this.reader.loader = this;
}

BufferLoader.prototype.load = function(index, file, callback) {
  this.index = index;
  this.callback = callback;
  this.reader.readAsArrayBuffer(file);
}

BufferLoader.prototype.loadend = function(e) {
   if (!this.error) {
    this.loader.context.decodeAudioData(this.result, function(buffer) {
      MainController.engin.bufferLoader.bufferList[MainController.engin.bufferLoader.index] = buffer;
      MainController.engin.bufferLoader.callback();
    });
  } else {
    //error
  }
}