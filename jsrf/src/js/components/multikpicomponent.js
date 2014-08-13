define(['components/component', 'prop/properties', 'renderers/kpitablerenderer'], function(Component, Properties, KPITableRenderer) {
  /**
   * MultiKPI Class containing functions shared across KPI Table and KPI Group.
   *
   * **This is an abstract class. You cannot create instances of this.**
   * @class  MultiKPIComponent
   */
    function MultiKPIComponent() {
        Component.apply(this, Array.prototype.slice.call(arguments));
        var self = this,
            base = {},
            Public,
            raw = self._raw,
            Protected,
            pro = self.pro,
            _bp = {},
            captionColors = {},
            valueColors = {};

        Public = {
            /**
             * Adds an individual KPI
             * @method addKPI
             * @param {String} id                           A unique id for the KPI
             * @param {ComponentKPIProperties} options      Set of options for configuring this KPI
             */
            addKPI: function(id, options) {
                pro.pb.addItemToList('kpis', id, options);
            },

           /**
             * Updates an existing KPI
             * @method updateKPI
             * @param {String} id                          The unique id for the individual KPI
             * @param {ComponentKPIProperties} opts         Set of options for configuring this KPI
             */
            updateKPI: function(id, options) {
                pro.pb.setObjectAtPath('kpis['+id+']', options);   
            },

           /**
             * Deletes an existing KPI
             * @method deleteKPI
             * @param {String} id           The unique id for the individual KPI
             */
            deleteKPI: function(id) {
                var list = pro.pb.getObjectAtPath('kpis');
                list[id] = undefined;
                delete list[id];
                pro.pb.emptyList('kpis');
                pro.pb.setObjectAtPath('kpis', list);
            },

           /**
             * Sets a caption color for a KPI
             * @method setKPICaptionColor
             * @param {String} id            The unique id for the individual KPI
             * @param {String} color         Color for the caption
             */
            setKPICaptionColor: function(id, color) {
                pro.pb.setValue('kpis[' + id + '].captioncolor', color);
            },

           /**
             * Sets a value color for a KPI
             * @method setKPIValueColor
             * @param {String} id           The unique id for the individual KPI
             * @param {String} opts         Color for the value text
             */
            setKPIValueColor: function(id, color) {
                pro.pb.setValue('kpis[' + id + '].valuecolor', color);   
            },

            setValueIcon: function(id, iconID, props) {
                pro.pb.setValue('kpis[' + id + '].icon', iconID);
                pro.pb.setValue('kpis[' + id + '].iconprops', JSON.stringify(props || {}));
            }
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
                        regexp: true,
                        path: 'kpis\\[([a-z]+)\\]',
                        callback: function(newValue, oldValue, result) {
                            if(newValue && newValue.value) {
                                pro.renderer.updateValue(result[1], newValue.value);
                            } else {
                                pro.redraw();
                            }
                        }
                    }
                ]);
            }
        };

        var construct = function() {
            pro.pb = new Properties.ComponentProperties();
        };

        raw._registerClassName("MultiKPIComponent");
        raw._registerPublic(base, Public);
        raw._registerProtected(_bp, Protected);

        construct();
    }

    return MultiKPIComponent;
});