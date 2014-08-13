define([
  'vendor/lodash'
], function (_) {
  var RFSparkline = function () {
    var self = this,
        config = {},
        $sparkContainer,
        $canvas,
        width = 0,
        height = 0,
        valueNode = {},
        ctx,
        showPoints,
        max,
        min,
        strokeColor = "#2C82C9",
        lineWidth = 0;

    self.width = function(_width) {
      if(_width) {
        width = _width;
        return;
      }

      return width;
    };

    self.height = function(_height) {
      if(_height) {
        height = _height;
        return;
      }

      return height;
    };

    self.configure = function (cfg) {
      config = cfg;
      showPoints = config.points ? true : false;
      lineWidth = config.lineWidth ? config.lineWidth : 0;
      strokeColor = config.strokeColor ? config.strokeColor : strokeColor;
      width = config.width ? config.width : width;
      height = config.height ? config.height : height;
      max = _.max(config.sparkValues);
      min = _.min(config.sparkValues);
      strokeColor = config.strokeColor;
    };

    self.renderTo = function (sparkContainer) {
      $sparkContainer = sparkContainer;
      startRender();
      $sparkContainer.html($canvas);
    };

    self.render = function() {
      $canvas = config.canvas[0];
      ctx = $canvas.getContext('2d');
      startRender();
    };

    var createCanvas = function() {
      $canvas = $("<canvas/>", {widtH: width, heighT: height, id: config.id});
      ctx = $canvas[0].getContext('2d');
    };

    var startRender = function() {
      createCanvas();
      var data = config.sparkValues,
          xWidth = width / data.length,
          x = xWidth / 2,
          y;


      ctx.beginPath();
      ctx.strokeStyle = strokeColor;
      ctx.fillStyle = strokeColor;
      ctx.lineWidth = lineWidth;

      for(var i=0; i<data.length; i++) {
        y = calculateY(data, i);
        ctx.lineTo(x, y);
        
        if(showPoints) {
          ctx.arc(x, y, 2.5, 0, 2 * Math.PI);
        }

        ctx.moveTo(x, y);

        x = x + xWidth;
      }

      ctx.stroke();

      if(showPoints) {
        ctx.fill();
      }
    };

    var calculateY = function(data, index) {
      var ratio = ( max - data[index] ) / ( max - min );

      // TODO: Hack implemented to fit the canvas points widthoout touching the container edges.
      if(ratio < 0.5) {
        return ratio * height + 5;
      }

      return ratio * height - 5;
    };
  };

  return RFSparkline;
});
