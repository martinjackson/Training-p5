
function EngineStats() {
  this.minFps = 100;
  this.maxFps = 0;

  this.current = function() {
    const cur = frameRate()
    if (cur < 1)
       return '--';

    if (cur < this.minFps)
       this.minFps = cur;

    if (cur > this.maxFps)
       this.maxFps = cur;

    return 'fps: ' + cur.toFixed(1) + ' [ '+
           this.minFps.toFixed(0) + ', '+
           this.maxFps.toFixed(0) + ']';
  }

}