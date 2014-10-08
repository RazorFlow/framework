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
            columnWidth = (seriesWidth - seriesPadding) / numSeries,
            minValue = self.options.minValue || 0;
        
        for(var i = 0; i<series.length; i++) {
            var scale = series[i].scale;
            var data = series[i].data;
            for(var j = 0; j<data.length; j++) {
                var rect = rects[i][j];
                var x = (j * seriesWidth) + (seriesPadding / 2) + (columnWidth * i);
                var y = calcY(data[j], coreHeight, scale);
                var width = columnWidth;
                var height = data[j] > minValue ? Math.abs(scale.calc(data[j]) - scale.calc(minValue)) : 0;

                rect.attr({
                    x: x,
                    y: y,
                    width: width,
                    height: height
                });
            }
        }
    };

    function calcY (data, height, scale) {
        if(data > 0) {
            return height - scale.calc (data);    
        } else {
            return height - scale.calc (0);
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
            columnWidth = (seriesWidth - seriesPadding) / numSeries,
            minValue = self.options.minValue || 0;
        
        for(var i = 0; i<series.length; i++) {
            var scale = series[i].scale;
            var data = series[i].data;
            for(var j = 0; j<data.length; j++) {
                var rect = rects[i][j];
                var x = (j * seriesWidth) + (seriesPadding / 2) + (columnWidth * i);
                var y = calcY (data[j], coreHeight, scale);
                var width = columnWidth;
                var height = data[j] > minValue ? Math.abs(scale.calc(data[j]) - scale.calc(minValue)) : 0;

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