define([
  "renderers/componentrenderer",
  "graphics/rfkpi",
  "utils/numberformatter",
  "utils/evalexpression"
], function (ComponentRenderer, RFKPI, NumberFormatter, evalExpression) {
  function KPIRenderer() {
    ComponentRenderer.call(this);

    var self = this,
        base = {},
        Public,
        raw = self._raw,
        Protected,
        pro = self.pro,
        _bp = {};

    var kpi,
        mode,
        spark,
        sparkContainer,
        sparkLabels,
        sparkValues,
        limits,
        gaugeFlag,
        valueTextColor,
        conditionalParam = {};

    Public = {
      dispose: function () {
        base.dispose();
      },
      setConfig: function (cfg) {
        sparkLabels = cfg.labels;
        sparkValues = cfg.values;
        limits = cfg.limits;
        gaugeFlag = !!cfg.gaugeFlag;
        conditionalParam = cfg.conditionalParam;
      },
      renderCore: function () {
        var dimension = self.getDimensionProperties(),
            config;
        if (dimension.portrait) {
          mode = 'portrait';
        } else {
          mode = 'landscape';
        }
        if (self.db === null) {
          mode = 'landscape';
        } else {
          if(self.db.pro.media.mediaSelect({"sm+xs":true}, false)) {
            mode = 'mobile';
          }
        }

        valueTextColor = self.props.kpi.display.valueTextColor;

        if(conditionalParam.expression) {
          if(evalExpression(conditionalParam.expression, self.props.kpi.display.value)) {
            valueTextColor = conditionalParam.valueColor;
          }
        }
        
        kpi = new RFKPI();
        config = {
          valueString: applyNumberFormatting(self.props.kpi.display.value),
          value: self.props.kpi.display.value,
          numberFormatProps: self.props.kpi.display,
          captionString: self.props.core.caption,
          dimensions: self.props.core.dimensions,
          mode: mode,
          sparkValues: sparkValues,
          sparkLabels: sparkLabels,
          limits: limits,
          icon: self.props.kpi.display.icon,
          iconProps: JSON.parse(self.props.kpi.display.iconprops),
          valueTextColor: valueTextColor
        };
        if (self.props.kpi.display.sparkFlag) {
          config.sparkFlag = true;
        } else if (self.props.kpi.display.gaugeFlag) {
          config.gaugeFlag = true;
        }
        kpi.configure(config);
        kpi.renderTo(self.$core);
        self.$core.click(function () {
          self.pro.trigger("click", {
            a:"hello",
            b:"world"
          });
        });
      },
      resizeCore: function (width, height) {
        if(kpi) {
          kpi.resizeTo(width, height);
        }
      },
      updateValue: function(newValue, oldValue) {
        kpi.updateValue(newValue, oldValue);
      }
    };

    Protected = {

    };

    var applyNumberFormatting  = function(val) {
      var numberFormatter = new NumberFormatter();
      numberFormatter.setConfig(self.props.kpi.display);
      return numberFormatter.formatValue(val);
    };

    raw._registerClassName("KPIRenderer");
    raw._registerPublic(base, Public);
    raw._registerProtected(_bp, Protected);
  }

  return KPIRenderer;
});
