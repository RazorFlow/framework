define([
  "components/kpicomponentcore",
  "renderers/kpirenderer",
  "prop/properties",
  'vendor/lodash'
], function (KPIComponentCore, KPIRenderer, Properties, _) {
  /**
   * Creates a kpi component
   * @class KPIComponent
   * @augments {KPIComponentCore}
   */
  function KPIComponent() {
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
       * sets the values to be displayed by the spark
       * @method setSparkValues
       * @param  {Array} labels  Array of labels as strings
       * @param  {Array} values  The values used by the spark
       */
      setSparkValues: function (labels, values) {
        pro.pb.setValue('kpi.display.sparkFlag', true);
        self.ds.addColumn('sparkValue', values);
        self.ds.addColumn('sparkLabel', labels);
      },

      setValueIcon: function(id, props) {
        pro.pb.setValue('kpi.display.icon', id);
        pro.pb.setValue('kpi.display.iconprops', JSON.stringify(props || {}));
      }
    };

    Protected = {
      init: function () {
        _bp.init();
      },
      createRenderer: function () {
        var raw = self.ds.getRawData(),
            labels = _.pluck(raw, 'sparkLabel'),
            values = _.pluck(raw, 'sparkValue');

        pro.renderer = new KPIRenderer();
        pro.renderer.setConfig({
          labels: labels,
          values: values
        });
        pro.renderer.pro.bind("click", function (params) {
          pro.handleComponentEvent ("click", params);
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
      // var construct = function () {
      //     pro.pb = new Properties.KPIComponentProperties();
      // };

    raw._registerClassName("KPIComponent");
    raw._registerPublic(base, Public);
    raw._registerProtected(_bp, Protected);

    // construct();
  }

  return KPIComponent;
});
