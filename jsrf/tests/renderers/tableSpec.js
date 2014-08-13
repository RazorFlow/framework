define([
    'renderers/tablerenderer', 
    'prop/properties', 
    'jquery', 
    'lodash',
    'templates'], function(TableRenderer, Properties, $, _, templates) {
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

    describe('TableRenderer test', function() {
        var ct = $('<div/>', {
            id: 'componentTarget'
        });
        $('body').append(ct);

        var TableProps = null,
            renderer = null;

        beforeEach(function() {
            TableProps = new Properties.TableComponentProperties();
            expect(TableProps).toBeDefined();

            TableProps.setValue('core.caption', 'Test Caption');

            renderer = new TableRenderer();

            for(var i=3; i--;) {
                TableProps.addItemToList('table.columns', 'col' + (3 - i), {columnName: 'Column ' + (3 - i)});
            }

            renderer.init({
                props: TableProps.getRootObject(),
                container: ct
            });
            renderer.renderContainer();
            renderer.renderCore();

            var arr = [];
            for(var i=-1; ++i<20;) {
                var obj = {};
                obj['col1'] = (i * 10) + 11;
                obj['col2'] = (i * 10) + 12;
                obj['col3'] = (i * 10) + 13;

                arr.push(obj);
            }
            renderer.setTableData(arr);
        });

        afterEach(function() {
            renderer.dispose();
        });
        
        it("should be there", function() {
            expect(TableRenderer).toBeDefined();
        });

        it("should be able to render caption", function() {
            renderer.init({
                props: TableProps.getRootObject(),
                container: ct
            });

            renderer.renderContainer();
            renderer.renderCore();

            var $caption = ct.find('.rfCaption');

            expect($caption.text().trim()).toBe('Test Caption');
        });

        it("should be able to create a table", function() {
            var $table = ct.find('table');

            expect($table).toBeDefined();
        });

        it("should have all the column headers", function() {
            var $ths = ct.find('table > thead > tr > th');

            expect($ths.length).toBe(3);
        });

        it("column headers should be proper", function() {
            var $ths = ct.find('table > thead > tr > th');
            $ths.each(function(idx) {
                expect($(this).text().trim()).toBe('Column ' + (idx+1));
            });
        });

        it("should have correct number of rows", function() {
            var $trs = ct.find('table > tbody > tr');
            expect($trs.length).toBe(20);
        });

        it("should have correct values in rows", function() {
            var $tds = ct.find('table > tbody > tr:first td');
            $tds.each(function(idx) {
                expect($(this).text().trim()).toBe('' + (11 + idx));
            });
        });
    });
});