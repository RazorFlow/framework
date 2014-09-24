define(['razorcharts2/plots/rect', 'vendor/lodash'], function (Rect, _) {
    var SERIES_PADDING = 0.3;
    var Column = function () {
        this.init ();
        this.registerTransformer ({key: 'render', transform: ColumnTransformer});
        this.registerTransformer ({key: 'resize', transform: ColumnTransformer});
        this.registerTransformer ({key: 'update', transform: ColumnUpdateTransformer});
    };

    Column.prototype = new Rect();
    Column.prototype.constructor = Column;

    function ColumnTransformer (self) {
        console.log('ColumnTransformer called!');
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
                var x = (j * seriesWidth) + (seriesPadding / 2) + (columnWidth * i);
                var y = coreHeight - scale.calc(data[j]);
                var width = columnWidth;
                var height = scale.calc(data[j]);

                rect.attr({
                    x: x,
                    y: y,
                    width: width,
                    height: height
                });
            }
        }
    };

    function ColumnUpdateTransformer (self) {
        console.log('ColumnTransformer called!');
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
                var x = (j * seriesWidth) + (seriesPadding / 2) + (columnWidth * i);
                var y = coreHeight - scale.calc(data[j]);
                var width = columnWidth;
                var height = scale.calc(data[j]);

                rect.animate({
                    x: x,
                    y: y,
                    width: width,
                    height: height
                });
            }
        }
    };
    return Column;
});