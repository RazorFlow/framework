define(['vendor/lodash', 'razorcharts2/plots/plot'], function (_, Plot) {

    var Line = function () {
        init (this);
    };

    Line.prototype = new Plot;
    Line.prototype.constructor = Line;

    function init (self) {
        self.init ();
        self.registerTransformer ({key: 'render', transform: LineTransformer});
        self.registerTransformer ({key: 'resize', transform: LineTransformer});
        self.registerTransformer ({key: 'update', transform: LineUpdateTransformer});
    }

    Line.prototype.createPlots = function () {
        var paper = this.paper;
        var series = this.options.series;
        var eventManager = this.options.eventManager;

        for(var i=0; i<series.length; i++) {
            var seriesContainer = paper.g ();
            seriesContainer.attr ('id', 'rc-series-' + series[i].seriesIndex);
        
            this.seriesContainers[i] = seriesContainer;

            var path = paper.path ();
            path.attr ('fill', 'none');
            path.attr ('stroke', series[i].color);
            path.attr ('stroke-width', 2);
            seriesContainer.append (path);
            var circles = [];
            var eventCircles = [];
            for(var j=0; j<series[i].data.length; j++) {
                var circle = paper.circle (0,0,4);
                var eventCircle = paper.circle (0,0,10);
                eventCircle.attr ({
                    opacity: 0
                });
                if(this.options.plotItemHoverPointer) {
                    circle.attr ('cursor', 'pointer');
                    eventCircle.attr ('cursor', 'pointer');
                }
                !function (obj) {
                    eventCircle.click(function (me) {
                        eventManager.trigger ('plotItemActivate',obj);
                        eventManager.trigger ('plotItemClick',obj);
                    });

                    eventCircle.hover (function (me) {
                        var clientRect = this.getBoundingClientRect ();
                        eventManager.trigger('tooltip', _.extend(obj, {
                            position: {
                                x: clientRect.left + clientRect.width / 2,
                                y: clientRect.top
                            }
                        }));
                    });
                    eventCircle.mouseout (function (me) {
                        eventManager.trigger('tooltip.mouseout');
                    });
                } ({
                    seriesIndex: series[i].seriesIndex, 
                    labelIndex: j, 
                    value: series[i].data[j], 
                    label: this.options.labels[j], 
                    seriesLabel: series[i].caption,
                    color: series[i].color
                });
                circle.attr({
                    stroke : series[i].color,
                    fill : "#FFF",
                    "stroke-width" : 2
                });
                circles.push (circle);
                eventCircles.push (eventCircle);
                seriesContainer.append (circle);
                seriesContainer.append (eventCircle);
            }
            this.plots[i] = {
                path: path,
                circles: circles,
                eventCircles: eventCircles
            };
            this.core.append (seriesContainer);
        }
    };

    function LineTransformer (self) {
        var series = self.options.series,
            coreWidth = self.coreWidth,
            coreHeight = self.coreHeight,
            plots = self.plots,
            seriesWidth = (coreWidth / series[0].data.length);

        for(var i = 0; i< series.length; i++) {
            var scale = series[i].scale;
            var path = plots[i].path;
            var circles = plots[i].circles;
            var eventCircles = plots[i].eventCircles;
            path.startPath ().moveTo (seriesWidth / 2, coreHeight - scale.calc(series[i].data[0]));
            var d = series[i].data[0];
            circles[0].attr ({
               cx: d === undefined || d === null ? -10000 : seriesWidth / 2,
               cy: coreHeight - scale.calc(series[i].data[0])
            });
            eventCircles[0].attr ({
               cx: d === undefined || d === null ? -10000 : seriesWidth / 2,
               cy: coreHeight - scale.calc(series[i].data[0])
            });
            for(var j=1; j<series[i].data.length; j++) {
                var d = series[i].data[j];
                var d_ = series[i].data[j-1];

                if(d === undefined || d === null || d.toString() === 'NaN') {
                    if(j+1 < series[i].data.length) {
                        path.moveTo (seriesWidth / 2 + seriesWidth * (j+1), coreHeight - scale.calc(series[i].data[j+1]));    
                    }
                } else {
                    path.lineTo (seriesWidth / 2 + seriesWidth * j, coreHeight - scale.calc(series[i].data[j]));    
                }
                
                if(d !== undefined && d !== null && d.toString() !== 'NaN') {
                    circles[j].attr ({
                       cx: seriesWidth / 2 + seriesWidth * j,
                       cy: coreHeight - scale.calc(series[i].data[j]),
                       opacity: 1
                    });
                    eventCircles[j].attr ({
                       cx: seriesWidth / 2 + seriesWidth * j,
                       cy: coreHeight - scale.calc(series[i].data[j]),
                    });
                } else {
                    circles[j].attr ({
                       cx: -10000
                    });
                    eventCircles[j].attr ({
                       cx: -10000
                    });
                }
            }
            path.endPath ();
        }
    };

    function LineUpdateTransformer (self) {
         var series = self.options.series,
            coreWidth = self.coreWidth,
            coreHeight = self.coreHeight,
            plots = self.plots,
            seriesWidth = (coreWidth / series[0].data.length);

        for(var i = 0; i< series.length; i++) {
            var scale = series[i].scale;
            var path = plots[i].path;
            var circles = plots[i].circles;
            var eventCircles = plots[i].eventCircles;
            path.startPath ().moveTo (seriesWidth / 2, coreHeight - scale.calc(series[i].data[0]));
            var d = series[i].data[0];
            circles[0].animate ({
               cx: d === undefined || d === null ? -10000 : seriesWidth / 2,
               cy: coreHeight - scale.calc(series[i].data[0])
            });
            eventCircles[0].animate ({
               cx: d === undefined || d === null ? -10000 : seriesWidth / 2,
               cy: coreHeight - scale.calc(series[i].data[0])
            });
            for(var j=1; j<series[i].data.length; j++) {

                var d = series[i].data[j];
                var d_ = series[i].data[j-1];
                if(d === undefined || d === null || d.toString() === 'NaN') {
                    path.moveTo (seriesWidth / 2 + seriesWidth * j, coreHeight - scale.calc(series[i].data[j]));
                } else {
                    path.lineTo (seriesWidth / 2 + seriesWidth * j, coreHeight - scale.calc(series[i].data[j]));    
                }
                
                if(d !== undefined && d !== null && d_.toString() !== 'NaN') {
                    circles[j].animate ({
                       cx: seriesWidth / 2 + seriesWidth * j,
                       cy: coreHeight - scale.calc(series[i].data[j]),
                       opacity: 1
                    });
                    eventCircles[j].animate ({
                       cx: seriesWidth / 2 + seriesWidth * j,
                       cy: coreHeight - scale.calc(series[i].data[j]),
                    });
                } else {
                    circles[j].animate ({
                       cx: -1000
                    });
                    eventCircles[j].animate ({
                       cx: -1000
                    });
                }
            }
            path.animatePath ();
        }
    };

    return Line;
});