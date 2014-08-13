define([
  "generated/templates",
  "utils/browserutils", 
  "kendo/kendo.slider"
], function (JST, BrowserUtils, kSlider) {

  var NumberSlider = function(_options) {

    var self = this,
        options = _options,
        $slider = options.slider,
        range = options.range ? true : false,
        minValue = null,
        maxValue = null,
        value = null,
        largeStep = options.largeStep ? options.largeStep : 15,
        smallStep = options.smallStep ? options.smallStep : 1,
        tooltipID = options.tooltipID ? options.tooltipID : null,
        changeCallback;

    self.render = function() {
      if(options.range) {
        renderRangeSlider();
      }
      else {
        renderNormalSlider();
      }
    };

    self.setRangeValues = function(values) {
      minValue = values[0];
      maxValue = values[1];
    };

    self.getRangeValues = function() {
      return $slider.data('kendoRangeSlider').values();
    };

    self.setValue = function(val) {
      value = val;
    };

    self.change = function(callback) {
      changeCallback = callback;
    };

    var renderRangeSlider = function() {
      $slider.kendoRangeSlider({
        min: minValue,
        max: maxValue,
        largeStep: largeStep,
        smallStep: smallStep,
        tickPlacement: "none",
        tooltip: {
          persistDisplay: true,
          tooltipID: tooltipID
        },
        change: function() {
          changeCallback();
        }
      }).data('kendoRangeSlider');
      $slider.data('kendoRangeSlider').value(value);
    };

    var renderNormalSlider = function() {

    };
    
  };

  return NumberSlider;

});
