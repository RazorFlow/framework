define([
  "components/kpicomponentcore",
  "renderers/kpirenderer",
  "prop/properties"
], function (KPIComponentCore, KPIRenderer, Properties) {
  /**
   * Creates a gauge component
   * @class GaugeComponent
   * @augments {KPIComponentCore}
   */
  function GaugeComponent() {
  
    KPIComponentCore.apply(this, Array.prototype.slice.call(arguments));

    var self = this,
        base = {},
        Public,
        raw = self._raw,
        Protected,
        pro = self.pro,
        _bp = {};


    Public = {
      /**
       * Sets the maximum and minimum values of the gauge.
       * @method setLimits
       * @param  {Number} min Lower bound of the gauge
       * @param  {Number} max Upper bound of the gauge
       */
      setLimits: function (min, max) {
        pro.pb.setValue('kpi.display.minimum', min);
        pro.pb.setValue('kpi.display.maximum', max);
      }
    };

    Protected = {
      init: function () {
        _bp.init();
      },
      createRenderer: function () {
        // var raw = self.ds.getRawData(),
        //     labels = _.pluck(raw, 'sparkLabel'),
        //     values = _.pluck(raw, 'sparkValue');

        pro.renderer = new KPIRenderer();
        pro.renderer.setConfig({
          gaugeFlag: true,
          limits: {
            min: pro.pb.getValue('kpi.display.minimum'),
            max: pro.pb.getValue('kpi.display.maximum')
          }
        });
        pro.onRendererCreate();
      },
      renderCore: function () {
        pro.renderer.renderCore();
      },
      resizeCore: function (width, height) {
        pro.renderer.resizeCore(width, height);
      },
      addListeners: function () {
        _bp.addListeners();
        pro.pushListeners([
          {
            path: 'kpi.display',
            callback: updateValue
          }
        ]);
      }
    };

    var updateValue = function(newValue, oldValue) {
      self.trigger("beforeComponentUpdate");
      pro.renderer.updateValue(newValue, oldValue);
      self.trigger("componentUpdate");
    };

    /**
     * This is the actual constructor of the object
     */
    var construct = function () {
      pro.pb = new Properties.KPIComponentProperties();
      pro.pb.setValue('kpi.display.gaugeFlag', true);
    };

    raw._registerClassName("GaugeComponent");
    raw._registerPublic(base, Public);
    raw._registerProtected(_bp, Protected);

    construct();
  }

  return GaugeComponent;
});
