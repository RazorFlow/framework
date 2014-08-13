define([], function() {
    var FPS = 1000 / 30;
    var tick = window.requestAnimationFrame || setTimeout;
    // TODO: Support timing functions like, ease-in, ease-out etc
    var Timer = function(cb, time, fcb) {
      var startTime = Date.now(),
          endTime = startTime + time,
          d = 0;
      
      var animationFunc = function() {
        cb(d);
        d = Date.now() - startTime;
        if(d > time) { cb(time); if(fcb) { fcb(); } return; }
        tick(animationFunc, FPS);
      };

      animationFunc();
    };

    return Timer;
});