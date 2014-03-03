define([
    'renderers/kpirenderer', 
    'prop/properties', 
    'jquery', 
    'lodash',
    'templates'], function(KPIRenderer, Properties, $, _, templates) {
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
        var ct = $('<div/>', {
            id: 'componentTarget'
        });
        $('body').append(ct);
        
        it("should be there", function() {
            expect(KPIRenderer).toBeDefined();
        });

        it("should be able to render value and caption", function() {
            var KPIProps = new Properties.KPIComponentProperties();
            expect(KPIProps).toBeDefined();

            KPIProps.setValue('kpi.display.value', 45);
            KPIProps.setValue('core.caption', 'Test Caption');

            var renderer = new KPIRenderer();
            renderer.init({
                props: KPIProps.getRootObject(),
                container: ct
            });

            renderer.renderContainer();
            renderer.renderCore();

            var $caption = ct.find('.rfKPICaption');
            var $value = ct.find('.rfKPIValue');

            expect($caption.text()).toBe('Test Caption');
            expect($value.text()).toBe('45');
        });
    });
});