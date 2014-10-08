define([
  "utils/internallayoutmanager",
  "constants/kpilayoutconstants",
  "utils/numberformatter",
  "razorcharts2/core/rcmain",
  "utils/iconutils",
  "graphics/rfsparkline",
  'vendor/lodash'
], function (InternalLayoutManager, KPILayouts, NumberFormatter, RazorChart, iconUtils, RFSparkline, _) {
  var RFKPI = function () {
    var self = this,
        config = {},
        layoutManager = null,
        profiles = KPILayouts,
        $core,
        $sparkContainer,
        $gaugeContainer,
        spark,
        gauge,
        gaugeRendered = false;

    self.configure = function (cfg) {
      config = cfg;
    };

    self.renderTo = function (jqDiv) {
      var layoutObject = getLayoutObject(),
          layoutValues = {
            'rfKPIValue': config.valueString,
            'rfKPICaption': config.captionString
          }, sparkContainer,
          icon = config.icon,
          iconProps = config.iconProps;
      layoutManager = new InternalLayoutManager(layoutObject, layoutValues);
      layoutManager.manageElement(jqDiv);
      layoutManager.setValues();
      $core = jqDiv;
      if(icon) {
        $core.find('.rfKPIValue').prepend(iconUtils.getHTMLForIcon(icon, iconProps));  
      }
      $sparkContainer = jqDiv.find('.rfKPISpark');
      if (config.sparkFlag) {
        spark = new RFSparkline();
        spark.configure({
          sparkValues: config.sparkValues,
          width: $sparkContainer.outerWidth(),
          height: $sparkContainer.outerHeight(),
          strokeColor: '#2C82C9',
          points: true,
          lineWidth: 3
        });
        // spark.renderTo($sparkContainer);
      }
      if (config.gaugeFlag) {
        $gaugeContainer = jqDiv.find('.rfKPIGauge');
      }
      if (config.valueTextColor !== "auto") {
        $core.find('.rfKPIValue').css({
          "color" : config.valueTextColor
        });
      }
    };

    self.resizeTo = function(width, height){
      layoutManager.handleResize(width, height);
        if(spark){
          spark.width($sparkContainer.outerWidth());
          spark.height($sparkContainer.outerHeight());
          spark.renderTo($sparkContainer);
        }
        if(config.gaugeFlag){
          if(!gaugeRendered) {
            gauge = new RazorChart();
            gauge.config({
              type: 'gauge',
              min: config.limits.min,
              max: config.limits.max,
              value: config.value,
              format: function(item) {
                return applyNumberFormatting(config.numberFormatProps, item);
              }
            });
            gauge.renderTo($gaugeContainer[0], $gaugeContainer.width(), $gaugeContainer.height());
            gaugeRendered = true;
          } else {
            gauge.resizeTo($gaugeContainer.width(), $gaugeContainer.height());
          }
        }
    };

    self.updateValue = function(newValue, oldValue) {
      if(config.gaugeFlag) {
        // gauge.config({
        //   type: 'gauge',
        //   min: config.limits.min,
        //   max: config.limits.max,
        //   value: newValue.value,
        //   format: function(item) {
        //     return applyNumberFormatting(newValue, item);
        //   }
        // });
        gauge.updateSeries({value: newValue.value});
      } else {
        var $value = $core.find('.rfKPIValue');
        timer(function(d) {
          $value.css('opacity', 1 - (d / 250));
        }, function() {
          $value.text(applyNumberFormatting(newValue, newValue.value));
          timer(function(d) {
            $value.css('opacity', (d / 250));
          }, 250);
        }, 250);
      }
        
    };

    var timer = function(cb, fcb, time) {
      var startTime = Date.now(),
          endTime = startTime + time,
          d = 0;
      
      var animationFunc = function() {
        cb(d);
        d = Date.now() - startTime;
        if(d > time) { cb(time); fcb(); return; }
        requestAnimationFrame(animationFunc);
      };

      animationFunc();
    };

    var lerp = function(s, e, t) {
      return s+(e-s)*t;
    };

    var applyNumberFormatting  = function(obj, val) {
      var numberFormatter = new NumberFormatter();
      numberFormatter.setConfig(obj);
      return numberFormatter.formatValue(val);
    };

    var checkRequirements = function (items) {
      var checkFlag = true, i;
      if (items.has) {
        _.each(items.has, function (key) {
          if (!config.hasOwnProperty(key)) {
            checkFlag = false;
          }
        });
      }
      if (items.not) {
        _.each(items.not, function (key) {
          if (config.hasOwnProperty(key)) {
            checkFlag = false;
          }
        });
      }

      return checkFlag;
    };

    var getLayoutObject = function () {
      var profileName = '';
      if (checkRequirements({has: ['captionString', 'valueString'], not: ['gaugeFlag', 'sparkFlag']})) {
        profileName = 'basicKPI';
      }
      if (checkRequirements({has: ['captionString', 'valueString', 'gaugeFlag']})) {
        profileName = 'basicGauge';
      }
      if (checkRequirements({has: ['captionString', 'valueString', 'sparkFlag']})) {
        profileName = 'kpiWithSpark';
      }
      if (checkRequirements({has: ['captionString', 'valueString', 'c1', 'c2']})) {
        profileName = 'kpiWithChanges';
      }
      return profiles[profileName][config.mode];
    };
  };

  return RFKPI;
});
