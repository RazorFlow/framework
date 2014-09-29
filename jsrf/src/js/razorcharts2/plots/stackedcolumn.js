define(['razorcharts2/plots/rect', 'vendor/lodash'], function (Rect, _) {
    var SERIES_PADDING = 0.3;
    var StackedColumn = function () {
        this.init ();
        this.registerTransformer ({key: 'render', transform: StackedColumnTransformer});
        this.registerTransformer ({key: 'resize', transform: StackedColumnTransformer});
        this.registerTransformer ({key: 'update', transform: StackedColumnUpdateTransformer});
    };

    StackedColumn.prototype = new Rect();
    StackedColumn.prototype.constructor = StackedColumn;

    function StackedColumnTransformer (self) {
        console.log('StackedColumnTransformer called!');
        var series = self.options.series,
            seriesContainers = self.seriesContainers,
            rects = self.rects,
            numSeries = series.length,
            coreWidth = self.coreWidth,
            coreHeight = self.coreHeight,
            seriesWidth = (coreWidth / self.options.series[0].data.length),
            seriesPadding = seriesWidth * SERIES_PADDING,
            columnWidth = (seriesWidth - seriesPadding) / numSeries;
        
        for(var i = 0; i<series.length; i++) {
            var scale = series[i].scale;
            var data = series[i].data;
            for(var j = 0; j<data.length; j++) {
                var rect = rects[i][j];
                var x = (j * seriesWidth) + (seriesPadding / 2);
                var y = calcY(calcPrevData (series, i, j), data[j], coreHeight, scale);
                var width = seriesWidth - seriesPadding;
                var height = Math.abs(scale.calc(data[j]) - scale.calc(0));

                rect.attr({
                    x: x,
                    y: y,
                    width: width,
                    height: height
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

    function calcY (prevData, data, height, scale) {
        if(data > 0) {
            return height - scale.calc (data + prevData);
        } else {
            return height - scale.calc (0 + prevData);
        }
    };

    function StackedColumnUpdateTransformer (self) {
        console.log('StackedColumnTransformer called!');
        var series = self.options.series,
            seriesContainers = self.seriesContainers,
            rects = self.rects,
            numSeries = series.length,
            coreWidth = self.coreWidth,
            coreHeight = self.coreHeight,
            seriesWidth = (coreWidth / self.options.series[0].data.length),
            seriesPadding = seriesWidth * SERIES_PADDING,
            columnWidth = (seriesWidth - seriesPadding) / numSeries;
        
        for(var i = 0; i<series.length; i++) {
            var scale = series[i].scale;
            var data = series[i].data;
            for(var j = 0; j<data.length; j++) {
                var rect = rects[i][j];
                var x = (j * seriesWidth) + (seriesPadding / 2);
                var y = calcY (calcPrevData (series, i, j), data[j], coreHeight, scale);
                var width = seriesWidth - seriesPadding;
                var height = Math.abs(scale.calc(data[j]) - scale.calc(0));

                rect.animate({
                    x: x,
                    y: y,
                    width: width,
                    height: height
                });
            }
        }
    };
    return StackedColumn;
});