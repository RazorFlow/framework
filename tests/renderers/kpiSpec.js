define([
    'renderers/kpirenderer', 
    'prop/properties', 
    'jquery', 
    'lodash',
    'templates',
    'testhelpers/renderhelper'], function(KPIRenderer, Properties, $, _, templates, RenderHelper) {
    window.rf = {
        globals: {
            media: 'md'
        }
    };

    /**
     * This is a temporary shim to load jquery and lodash here.
     * 
     * TODO: Load jquery/Zepto and lodash using requirejs in the main code
     */
    window.$ = $;
    window._ = _;

    describe('KPIRenderer test', function() {
        var rh = new RenderHelper();
        var renderer = new KPIRenderer();
        rh.setRenderer(renderer);
        it("Should work", function () {
            rh.render({
                kpi: {
                    display: {
                        value: 42
                    }
                },
                core: {
                    caption: "Hello there"
                }
            });
            rh.assert({
                [
                {
                    selector: ".rfKPIValue",
                    type: "text",
                    value: "42"
                },
                {
                    selector: ".rfKPICaption",
                    type: "text",
                    value: "Hello there"
                },
                ]
            })
        })
    });
});