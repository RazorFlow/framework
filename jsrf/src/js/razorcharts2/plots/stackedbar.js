define(['razorcharts2/plots/rect', 'vendor/lodash'], function (Rect, _) {
    var SERIES_PADDING = 0.3;
    var StackedBar = function () {
        this.init ();
        this.registerTransformer ({key: 'render', transform: StackedBarTransformer});
        this.registerTransformer ({key: 'render', transform: TooltipTransformer});
        this.registerTransformer ({key: 'resize', transform: StackedBarTransformer});
        this.registerTransformer ({key: 'update', transform: StackedBarUpdateTransformer});
    };

    StackedBar.prototype = new Rect();
    StackedBar.prototype.constructor = StackedBar;

    function TooltipTransformer (self) {
        var series = self.options.series,
            rects = self.rects,
            labels = self.options.labels.reverse(),
            eventManager = self.options.eventManager;

        for(var i=0; i<series.length; i++) {
            var data = series[i].data;
            for(var j=0; j<data.length; j++) {
                var rect = rects[i][j];
                !function (obj) {
                    rect.hover (function (me) {
                        var clientRect = this.getBoundingClientRect ();
                        eventManager.trigger('tooltip', _.extend(obj, {
                            position: {
                                x: clientRect.left + clientRect.width,
                                y: clientRect.top + (clientRect.height / 2)
                            }
                        }));
                    });
                } ({
                    seriesIndex: i, 
                    labelIndex: j, 
                    value: series[i].data[j], 
                    label:  labels[j], 
                    seriesLabel: series[i].caption,
                    color: series[i].color
                });
            }
        }
    };

    function StackedBarTransformer (self) {
        console.log('StackedBarTransformer called!');
        var series = self.options.series,
            rects = self.rects,
            coreWidth = self.coreWidth,
            coreHeight = self.coreHeight,
            numSeries = series.length,
            seriesHeight = (coreHeight / self.options.series[0].data.length),
            seriesPadding = seriesHeight * SERIES_PADDING,
            columnHeight = (seriesHeight - seriesPadding) / numSeries,
            eventManager = self.options.eventManager;

        for(var i=0; i<series.length; i++) {
            var scale = series[i].scale;
            var data = series[i].data;
            for(var j=0; j<data.length; j++) {
                var rect = rects[i][j];
                var x = data[j] < 0 ? scale.calc(0) - Math.abs(scale.calc(data[j] + calcPrevData(series, i, j)) - scale.calc(0)) : scale.calc(calcPrevData(series, i, j));
                var y = (j * seriesHeight) + (seriesPadding / 2);
                var width = Math.abs(scale.calc(data[j]) - scale.calc(0));
                var height = seriesHeight - seriesPadding;

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

    function calcPrevData (series, i, j) {
        var dataArray = _.pluck(_.pluck(series, 'data'), j),
            data = dataArray[i],
            prevArray;

        if(data >= 0) {
            prevArray = _.filter(dataArray.slice(0, i), function(num) {
                return num >= 0;
            });
        } else {
            prevArray = _.filter(dataArray.slice(0, i), function(num) {
                return num < 0;
            });
        }

        return _.reduce(prevArray, function(memo, num) { return memo + num;}, 0);
    };

    function StackedBarUpdateTransformer (self) {
        console.log('StackedBarTransformer called!');
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
                var x = data[j] < 0 ? scale.calc(0) - Math.abs(scale.calc(data[j] + calcPrevData(series, i, j)) - scale.calc(0)) : scale.calc(calcPrevData(series, i, j));
                var y = (j * seriesHeight) + (seriesPadding / 2);
                var width = Math.abs(scale.calc(data[j]) - scale.calc(0));
                var height = seriesHeight - seriesPadding;

                rect.animate ({
                    x: x,
                    y: y,
                    width: width,
                    height: height
                });
            }
        }
    };
    return StackedBar;
});