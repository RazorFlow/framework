define(['components/multikpicomponent', 'prop/properties', 'renderers/kpigrouprenderer', 'renderers/kpitablerenderer'], function(MultiKPIComponent, Properties, KPIGroupRenderer, KPITableRenderer) {
  /**
   * Creates a KPI Group Component
   * @class KPIGroupComponent
   * @augments {MultiKPIComponent}
   */
    function KPIGroupComponent() {
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
                if(pro.getMediaHelper().mediaSelect({"sm+xs":true}, false) || pro.maximized) {
                    pro.renderer = new KPITableRenderer();
                } else {
                    pro.renderer = new KPIGroupRenderer();    
                }
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

        raw._registerClassName("KPIGroupComponent");
        raw._registerPublic(base, Public);
        raw._registerProtected(_bp, Protected);

        construct();
    }

    return KPIGroupComponent;
});