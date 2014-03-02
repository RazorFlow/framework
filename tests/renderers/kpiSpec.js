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
        it("Should work", function () {
            var rh = new RenderHelper();
            expect(rh.testItem()).toBe(1);
        })
    });
});