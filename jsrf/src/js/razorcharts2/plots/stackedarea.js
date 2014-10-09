define(['razorcharts2/plots/plot', 'vendor/lodash'], function (Plot, _) {
    var SERIES_PADDING = 0.3;
    var StackedArea = function () {
        this.init ();
        this.registerTransformer ({key: 'render', transform: StackedAreaTransformer});
        this.registerTransformer ({key: 'resize', transform: StackedAreaTransformer});
        this.registerTransformer ({key: 'update', transform: StackedAreaUpdateTransformer});
    };

    StackedArea.prototype = new Plot();
    StackedArea.prototype.constructor = StackedArea;

    StackedArea.prototype.createPlots = function () {
        console.log('Creating lines!');
        var paper = this.paper;
        var series = this.options.series;
        for(var i=0; i<series.length; i++) {
            var seriesContainer = paper.g ();
            seriesContainer.attr ('id', 'rc-series-' + series[i].seriesIndex);
        
            this.seriesContainers[i] = seriesContainer;

            var path = paper.path ();
            path.attr ('fill', series[i].color);
            path.attr ('stroke', series[i].color);
            path.attr ('stroke-width', 2);
            path.attr ('opacity', 0.8);
            var circles = [];
            for(var j=0; j<series[i].data.length; j++) {
                var circle = paper.circle (0,0,0);
                circle.attr({
                    "stroke" : "none",
                    "fill" : series[i].color
                });
                circles.push (circle);
                seriesContainer.append (circle);
            }
            this.plots[i] = {
                path: path,
                circles: circles
            };
            seriesContainer.append (path);
            this.core.append (seriesContainer);
        }
    };

    function StackedAreaTransformer (self) {
        console.log('StackedAreaTransformer called!');
         var series = self.options.series,
            coreWidth = self.coreWidth,
            coreHeight = self.coreHeight,
            plots = self.plots,
            dataSize = series[0].data.length,
            seriesWidth = (coreWidth / series[0].data.length);

        for(var i = 0; i< series.length; i++) {
            var scale = series[i].scale;
            var path = plots[i].path;
            var circles = plots[i].circles;
            var data = series[i].data;
            path.startPath ()
                .moveTo (seriesWidth / 2, coreHeight - scale.calc(calcPrevData(series, i, 0)))
                .lineTo (seriesWidth / 2, calcY(calcPrevData (series, i, 0), data[0], coreHeight, scale));
            circles[0].attr ({
               cx: seriesWidth / 2,
               cy: calcY(calcPrevData (series, i, 0), data[0], coreHeight, scale),
               r: 4
            });
            for(var j=1; j<series[i].data.length; j++) {
                var d = series[i].data[j]
                path.lineTo (seriesWidth / 2 + seriesWidth * j, calcY(calcPrevData (series, i, j), data[j], coreHeight, scale));
                circles[j].attr ({
                   cx: seriesWidth / 2 + seriesWidth * j,
                   cy: calcY(calcPrevData (series, i, j), data[j], coreHeight, scale),
                   r: 4
                });
            }
            path.lineTo (seriesWidth / 2 + seriesWidth * (dataSize - 1), coreHeight - scale.calc(0));
            for(j--;j>0;j--) {
                path.lineTo (seriesWidth / 2 + seriesWidth * j, coreHeight - scale.calc(calcPrevData (series, i, j)));
            }

            
            path.endPath ();
        }
    };

    function calcPrevData (series, i, j) {
        var dataArray = _.pluck(_.pluck(series, 'data'), j),
            data = dataArray[i],
            prevArray = dataArray.slice(0, i);

        return _.reduce(prevArray, function(memo, num) { return memo + num;}, 0);
    };

    function calcY (prevData, data, height, scale) {
        return height - scale.calc (data + prevData);
    };

    function StackedAreaUpdateTransformer (self) {
        console.log('StackedAreaTransformer called!');
        var series = self.options.series,
            coreWidth = self.coreWidth,
            coreHeight = self.coreHeight,
            plots = self.plots,
            dataSize = series[0].data.length,
            seriesWidth = (coreWidth / series[0].data.length);

        for(var i = 0; i< series.length; i++) {
            var scale = series[i].scale;
            var path = plots[i].path;
            var circles = plots[i].circles;
            var data = series[i].data;
            path.startPath ()
                .moveTo (seriesWidth / 2, coreHeight - scale.calc(calcPrevData(series, i, 0)))
                .lineTo (seriesWidth / 2, calcY(calcPrevData (series, i, 0), data[0], coreHeight, scale));
            circles[0].animate ({
               cx: seriesWidth / 2,
               cy: calcY(calcPrevData (series, i, 0), data[0], coreHeight, scale),
               r: 4
            });
            for(var j=1; j<series[i].data.length; j++) {
                var d = series[i].data[j]
                path.lineTo (seriesWidth / 2 + seriesWidth * j, calcY(calcPrevData (series, i, j), data[j], coreHeight, scale));
                circles[j].animate ({
                   cx: seriesWidth / 2 + seriesWidth * j,
                   cy: calcY(calcPrevData (series, i, j), data[j], coreHeight, scale),
                   r: 4
                });
            }
            path.lineTo (seriesWidth / 2 + seriesWidth * (dataSize - 1), coreHeight - scale.calc(0));
            for(j--;j>0;j--) {
                path.lineTo (seriesWidth / 2 + seriesWidth * j, coreHeight - scale.calc(calcPrevData (series, i, j)));
            }

            
            path.animatePath ();
        }
    };
    return StackedArea;
});