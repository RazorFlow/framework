define(['vendor/lodash', 'razorcharts2/plots/plot'], function (_, Plot) {

    var Area = function () {
        init (this);
    };

    Area.prototype = new Plot;
    Area.prototype.constructor = Area;

    function init (self) {
        self.init ();
        self.registerTransformer ({key: 'render', transform: AreaTransformer});
        self.registerTransformer ({key: 'resize', transform: AreaTransformer});
        self.registerTransformer ({key: 'update', transform: AreaUpdateTransformer});
    }

    Area.prototype.createPlots = function () {
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
            path.attr ('opacity', 0.5);
            var circles = [];
            for(var j=0; j<series[i].data.length; j++) {
                var circle = paper.circle (0,0,0);
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

    function AreaTransformer (self) {
        console.log ('Line Transformer called!');
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
            path.startPath ()
                .moveTo (seriesWidth / 2, coreHeight - scale.calc(0))
                .lineTo (seriesWidth / 2, coreHeight - scale.calc(series[i].data[0]));
            circles[0].attr ({
               cx: seriesWidth / 2,
               cy: coreHeight - scale.calc(series[i].data[0]),
               r: 4
            });
            for(var j=1; j<series[i].data.length; j++) {
                var d = series[i].data[j]
                path.lineTo (seriesWidth / 2 + seriesWidth * j, coreHeight - scale.calc(series[i].data[j]));
                circles[j].attr ({
                   cx: seriesWidth / 2 + seriesWidth * j,
                   cy: coreHeight - scale.calc(series[i].data[j]),
                   r: 4
                });
            }

            path.lineTo (seriesWidth / 2 + seriesWidth * (dataSize - 1), coreHeight - scale.calc(0));
            path.endPath ();
        }
    };

    function AreaUpdateTransformer (self) {
        console.log('LineUpdateTransformer called!');
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
            path.startPath ()
                .moveTo (seriesWidth / 2, coreHeight - scale.calc(0))
                .lineTo (seriesWidth / 2, coreHeight - scale.calc(series[i].data[0]));
            circles[0].animate ({
               cx: seriesWidth / 2,
               cy: coreHeight - scale.calc(series[i].data[0]),
               r: 4
            });
            for(var j=1; j<series[i].data.length; j++) {
                var d = series[i].data[j]
                path.lineTo (seriesWidth / 2 + seriesWidth * j, coreHeight - scale.calc(series[i].data[j]));
                circles[j].animate ({
                   cx: seriesWidth / 2 + seriesWidth * j,
                   cy: coreHeight - scale.calc(series[i].data[j]),
                   r: 4
                });
            }
            path.lineTo (seriesWidth / 2 + seriesWidth * (dataSize - 1), coreHeight - scale.calc(0));
            path.animatePath ();
        }
    };

    return Area;
});