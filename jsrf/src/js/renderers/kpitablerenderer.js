define(["generated/templates", 'renderers/componentrenderer', "utils/numberformatter", 'utils/iconutils', "utils/evalexpression", 'vendor/lodash'],
    function(JST, ComponentRenderer, NumberFormatter, iconUtils, evalExpression, _) {
    function KPITableRenderer() {
        ComponentRenderer.call(this);
        var self = this,
            base = {},
            Public,
            raw = self._raw,
            Protected,
            pro = self.pro,
            _bp = {};

        var kpiobjs = {},
            kpiContainers = {},
            numKPIs = null,
            conditionalParam = {};

        Public = {
            dispose: function() {

            },
            setConfig: function(config) {
                conditionalParam = config.conditionalParam;
            },
            renderCore: function() {
                var kpis = self.props.kpis,
                    keys = _.keys(kpis),
                    tmp = [],
                    i,
                    key,
                    kpi,
                    numKPIs = keys.length;
                for(i=-1; ++i<numKPIs;) {
                    key = keys[i];
                    kpi = kpis[key];

                    var numberFormatter = new NumberFormatter();
                    kpi.dataType = 'number';
                    numberFormatter.setConfig(kpi);
                    tmp[i] = {
                        caption: kpi.caption,
                        value: numberFormatter.formatValue(kpi.value)
                    };
                }

                self.$core.empty();
                self.$core.append(JST.kpitable({
                    numKPIs: numKPIs,
                    keys: keys,
                    kpis: tmp
                }));

                for(i=-1; ++i<numKPIs;) {
                    key = keys[i];
                    kpi = kpis[key];

                    var $caption = self.$core.find('#' + key + ' > .rfKPICaption'),
                        $value = self.$core.find('#' + key + ' > .rfKPIValue'),
                        valueColor = kpi.valuecolor ? kpi.valuecolor : "auto";

                    if(kpi.captioncolor) {
                        $caption.css({
                            color: kpi.captioncolor
                        });
                    }
                    for(var j=0; j < conditionalParam.length; j++) {
                        if(evalExpression(conditionalParam[j].expression, kpi.value)) {
                            valueColor = conditionalParam[j].valueColor;
                        }
                    }
                    if(valueColor !== "auto") {
                        $value.css({
                            color: valueColor
                        });
                    }
                    if(kpi.icon) {
                        $value.prepend(iconUtils.getHTMLForIcon(kpi.icon, JSON.parse(kpi.iconprops)));
                    }
                }
            },
            resizeCore: function(w, h) {
                self.$core.find('table').width(w);
                // var kpiW = w,
                //     kpiH = h / numKPIs,
                //     unitWidth = kpiW / 2,
                //     xPadding = unitWidth * 0.1;
                //     fontSize = ((unitWidth/2 - xPadding) / 2);

                // // TODO: cache the dom nodes for performance
                // self.$core.find('td').each(function() {
                //     $(this).height(kpiH);
                // });

                // self.$core.find('.rfKPICaption').css({
                //     fontSize: fontSize * 0.4
                // });
                // self.$core.find('.rfKPIValue').css({
                //     fontSize: fontSize * 0.72
                // });
                // var kpiW = Math.floor(w / numKPIs) - 4,
                //     kpiH = h;
                // for(var key in kpis) {
                //     kpiobjs[key].resize(kpiW, kpiH);
                //     kpiContainers[key].css({
                //         width: kpiW,
                //         height: kpiH
                //     });
                // }
            },

            updateValue: function(id, value) {
                var $value = self.$core.find('#' + id + ' > .rfKPIValue'),
                    kpi = self.props.kpis[id],
                    numberFormatter = new NumberFormatter();
                kpi.dataType = 'number';
                numberFormatter.setConfig(kpi);
                $value.text(numberFormatter.formatValue(value));
                if(kpi.icon) {
                    $value.prepend(iconUtils.getHTMLForIcon(kpi.icon, JSON.parse(kpi.iconprops)));
                }
            }
        };

        raw._registerClassName("KPITableRenderer");
        raw._registerPublic(base, Public);
        raw._registerProtected(_bp, Protected);
    }
    
    return KPITableRenderer;
});