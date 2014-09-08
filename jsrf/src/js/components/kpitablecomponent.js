define(['components/multikpicomponent', 'prop/properties', 'renderers/kpitablerenderer'], function(MultiKPIComponent, Properties, KPITableRenderer) {
  /**
   * Creates a KPI Table Component
   * @class KPITableComponent
   * @augments {MultiKPIComponent}
   */
    function KPITableComponent() {
        MultiKPIComponent.apply(this, Array.prototype.slice.call(arguments));
        var self = this,
            base = {},
            Public,
            raw = self._raw,
            Protected,
            pro = self.pro,
            _bp = {};

        Public = {

        };

        Protected = {
             init: function () {
                _bp.init();
            },
            createRenderer: function () {
                pro.renderer = new KPITableRenderer();
                pro.renderer.setConfig({
                });
                pro.onRendererCreate();
            },
            addListeners: function () {
                _bp.addListeners();
            }
        };

        var construct = function() {

        };

        raw._registerClassName("KPITableComponent");
        raw._registerPublic(base, Public);
        raw._registerProtected(_bp, Protected);

        construct();
    }

    return KPITableComponent;
});