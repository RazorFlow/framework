define(["generated/templates", 'renderers/componentrenderer', 'graphics/minikpi', 'utils/numberformatter', "utils/evalexpression", 'vendor/lodash'],
function(JST, ComponentRenderer, MiniKPI, NumberFormatter, evalExpression, _) {
    function KPIGroupRenderer() {
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
            numKPIs = null;

        Public = {
            dispose: function() {

            },
            setConfig: function(config) {
                conditionalParam = config.conditionalParam;
            },
            updateValue: function(id, value) {
                var numberFormatter = new NumberFormatter(),
                    kpi = self.props.kpis[id];
                    
                numberFormatter.setConfig(_.extend(kpi, {
                    dataType: 'number'
                }));
                kpiobjs[id].updateValue(numberFormatter.formatValue(value));
            },
            renderCore: function() {
                var componentWidth = self.props.core.location.w,
                    numPossibleKPIs = componentWidth / 2,
                    kpis = self.props.kpis,
                    numKPIsNeeded = _.keys(kpis).length;
                    numKPIs = numPossibleKPIs > numKPIsNeeded ? numKPIsNeeded : numPossibleKPIs;
                
                self.$core.empty();
                self.$core.append(JST.kpigroup({
                    numKPIs: numKPIs,
                    keys: _.keys(kpis)
                }));

                for(var key in kpis) {
                    if(kpis.hasOwnProperty(key)) {
                        var kpi = kpis[key],
                            valueColor = kpi.valuecolor,
                            numberFormatter = new NumberFormatter();
                        numberFormatter.setConfig(_.extend(kpi, {
                            dataType: 'number'
                        }));
                        if(conditionalParam.expression && evalExpression(conditionalParam.expression, kpi.value)) {
                            valueColor = conditionalParam.valueColor;
                        }
                        kpiContainers[key] = self.$core.find('.rfMiniKPIContainer#' + key);
                        kpiobjs[key] = new MiniKPI();
                        kpiobjs[key].config({
                            caption: kpi.caption,
                            value: numberFormatter.formatValue(kpi.value),
                            captionColor: kpi.captioncolor,
                            valueColor: valueColor,
                            icon: kpi.icon,
                            iconProps: JSON.parse(kpi.iconprops),
                            captionFontScale: 0.4,
                            valueFontScale: 0.72
                        });
                        kpiobjs[key].render(kpiContainers[key]);
                    }
                }
            },
            resizeCore: function(w, h) {
                var kpis = self.props.kpis,
                    componentWidth = self.props.core.location.w,
                    numKPIsNeeded = _.keys(self.props.kpis).length,
                    numPossibleKPIs = componentWidth / 2,
                    numKPIs = numKPIsNeeded > numPossibleKPIs ? numPossibleKPIs : numKPIsNeeded;
                var kpiW = Math.floor(w / numPossibleKPIs) - 4,
                    cW = Math.floor(w / numKPIs),
                    kpiH = h;
                for(var key in kpis) {
                    if(kpis.hasOwnProperty(key)) {
                        kpiobjs[key].resize(kpiW, kpiH);
                        kpiContainers[key].css({
                            width: cW,
                            height: kpiH
                        });
                    }
                }
            }
        };

        raw._registerClassName("KPIGroupRenderer");
        raw._registerPublic(base, Public);
        raw._registerProtected(_bp, Protected);
    }
    
    return KPIGroupRenderer;
});