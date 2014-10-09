define(['razorcharts2/plots/rect', 'vendor/lodash'], function (Rect, _) {
    var SERIES_PADDING = 0.3;
    var Bar = function () {
        this.init ();
        this.registerTransformer ({key: 'render', transform: BarTransformer});
        this.registerTransformer ({key: 'render', transform: TooltipTransformer});
        this.registerTransformer ({key: 'resize', transform: BarTransformer});
        this.registerTransformer ({key: 'update', transform: BarUpdateTransformer});
    };

    Bar.prototype = new Rect();
    Bar.prototype.constructor = Bar;

    function TooltipTransformer (self) {
        var series = self.options.series,
            rects = self.rects,
            eventManager = self.options.eventManager;

        for(var i=0; i<series.length; i++) {
            var data = series[i].data;
            for(var j=0; j<data.length; j++) {
                !function (obj) {
                    var rect = rects[i][j];
                    rect.hover (function (me) {
                        var clientRect = this.getBoundingClientRect ();
                        eventManager.trigger('tooltip', _.extend(obj, {
                            position: {
                                x: clientRect.left + clientRect.width,
                                y: clientRect.top + clientRect.height / 2
                            }
                        }));
                    });
                } ({
                    seriesIndex: i, 
                    labelIndex: j, 
                    value: series[i].data[j], 
                    label: self.options.labels[j], 
                    seriesLabel: series[i].caption,
                    color: series[i].color
                });
            }
        }
    };

    function BarTransformer (self) {
        console.log('BarTransformer called!');
        var series = self.options.series,
            rects = self.rects,
            coreWidth = self.coreWidth,
            coreHeight = self.coreHeight,
            numSeries = series.length,
            seriesHeight = (coreHeight / self.options.series[0].data.length),
            seriesPadding = seriesHeight * SERIES_PADDING,
            columnHeight = (seriesHeight - seriesPadding) / numSeries;

        for(var i=0; i<series.length; i++) {
            var scale = series[i].scale;
            var data = series[i].data;
            for(var j=0; j<data.length; j++) {
                var rect = rects[i][j];
                var x = data[j] < 0 ? scale.calc(0) - Math.abs(scale.calc(data[j]) - scale.calc(0)) : scale.calc(0);
                var y = (j * seriesHeight) + (seriesPadding / 2) + (columnHeight * i);
                var width = Math.abs(scale.calc(data[j]) - scale.calc(0));
                var height = columnHeight;

                rect.attr ({
                    x: x,
                    y: y,
                    width: width,
                    height: height,
                    stroke: "none"
                });
            }
        }
    };

    function BarUpdateTransformer (self) {
        console.log('BarTransformer called!');
         var series = self.options.series,
            rects = self.rects,
            coreWidth = self.coreWidth,
            coreHeight = self.coreHeight,
            numSeries = series.length,
            seriesHeight = (coreHeight / self.options.series[0].data.length),
            seriesPadding = seriesHeight * SERIES_PADDING,
            columnHeight = (seriesHeight - seriesPadding) / numSeries;

        for(var i=0; i<series.length; i++) {
            var scale = series[i].scale;
            var data = series[i].data;
            for(var j=0; j<data.length; j++) {
                var rect = rects[i][j];
                var x = data[j] < 0 ? scale.calc(0) - Math.abs(scale.calc(data[j]) - scale.calc(0)) : scale.calc(0);
                var y = (j * seriesHeight) + (seriesPadding / 2) + (columnHeight * i);
                var width = Math.abs(scale.calc(data[j]) - scale.calc(0));
                var height = columnHeight;

                rect.animate ({
                    x: x,
                    y: y,
                    width: width,
                    height: height
                });
            }
        }
    };
    return Bar;
});