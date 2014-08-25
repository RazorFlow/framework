define([
  "components/component",
  "renderers/kpirenderer",
  "prop/properties",
  'vendor/lodash'
], function (Component, KPIRenderer, Properties, _) {
  /**
   * This is the base class for all the kpi components
   * @class KPIComponentCore
   * @augments {Component}
   * @access private
   */
  function KPIComponentCore() {
    Component.apply(this, Array.prototype.slice.call(arguments));

    var self = this,
        base = {},
        Public,
        raw = self._raw,
        Protected,
        pro = self.pro,
        _bp = {};


    Public = {
      /**
       * Sets a numeric value to the KPI which is displayed on the dashboard.
       * @method setValue
       * @param  {Number} numberValue  The value to be displayed
       * @param  {KPIDisplayProperties} opts options to configure the display
       */
      setValue: function (numberValue, opts) {
        opts = opts || {};
        var _opts = _.extend(pro.pb.getObjectAtPath('kpi.display'), opts);
        _opts.value = numberValue;
        pro.pb.setObjectAtPath("kpi.display", _opts);
      },

      valueConditionalFormat: function (formatRule, appliedStyle) {
        pro.conditionalParam = {
          "expression" : formatRule,
          "valueColor" : appliedStyle
        }
      }
    };

    Protected = {
      overriddenDimensions: {
        'sm': {
          w: 12,
          h: 3
        },
        'xs': {
          w: 12,
          h: 4
        },
        'md': {
          w: 3,
          h: 3
        },
        'lg': {
          w: 3,
          h: 3
        }
      },
      conditionalParam: {}
    };

    /**
     * This is the actual constructor of the object
     */
    var construct = function () {
      pro.pb = new Properties.KPIComponentProperties();
    };

    raw._registerClassName("KPIComponent");
    raw._registerPublic(base, Public);
    raw._registerProtected(_bp, Protected);

    construct();
  }

  return KPIComponentCore;
});
