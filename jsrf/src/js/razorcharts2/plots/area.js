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
        var eventManager = this.options.eventManager;
        for(var i=0; i<series.length; i++) {
            var seriesContainer = paper.g ();
            seriesContainer.attr ('id', 'rc-series-' + series[i].seriesIndex);
        
            this.seriesContainers[i] = seriesContainer;

            var path = paper.path ();
            path.attr ('fill', series[i].color);
            path.attr ('stroke', series[i].color);
            path.attr ('stroke-width', 2);
            path.attr ('opacity', 0.8);
            path.attr ('pointer-events', 'none');
            var circles = [];
            var eventCircles = [];
            for(var j=0; j<series[i].data.length; j++) {
                var circle = paper.circle (0,0,4);
                var eventCircle = paper.circle (0,0,10);
                circle.attr ({
                    stroke: "none",
                    fill: series[i].color
                });
                eventCircle.attr ({
                    opacity: 0
                });

                !function (obj) {
                    eventCircle.click(function (me) {
                        eventManager.trigger ('plotItemActivate',obj);
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
                    seriesIndex: i, 
                    labelIndex: j, 
                    value: series[i].data[j], 
                    label: this.options.labels[j], 
                    seriesLabel: series[i].caption,
                    color: series[i].color
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
            var eventCircles = plots[i].eventCircles;
            var d = series[i].data[0];

            path.startPath ()
                .moveTo (seriesWidth / 2, coreHeight - scale.calc(0));

            if(d === undefined || d === null || d.toString() === 'NaN') {
                path.moveTo (seriesWidth / 2 + seriesWidth / 2 * 2, coreHeight - scale.calc(0));
            } else {
                path.lineTo (seriesWidth / 2, coreHeight - scale.calc(series[i].data[0]));
            }
            if(d !== undefined && d !== null && d.toString() !== 'NaN') {
                circles[0].attr ({
                   cx: seriesWidth / 2,
                   cy: coreHeight - scale.calc(series[i].data[0])
                });
                eventCircles[0].attr ({
                   cx: seriesWidth / 2,
                   cy: coreHeight - scale.calc(series[i].data[0])
                });
            } else {
                circles[0].attr ({
                   cx: -10000,
                });
                eventCircles[0].attr ({
                   cx: -10000,
                });
            }
            
            for(var j=1; j<series[i].data.length; j++) {
                var d = series[i].data[j]
                var d_ = series[i].data[j-1];
                if(d === undefined || d === null || d.toString() === 'NaN') {
                    if(j-1 >= 0) {
                        path.lineTo (seriesWidth / 2 + seriesWidth * (j-1), coreHeight - scale.calc(0));    
                    }
                    if(j+1 < series[i].data.length) {
                        path.moveTo (seriesWidth / 2 + seriesWidth * (j+1), coreHeight - scale.calc(0));    
                        path.lineTo (seriesWidth / 2 + seriesWidth * (j+1), coreHeight - scale.calc(series[i].data[j+1]));    
                    }
                        
                } else {
                    path.lineTo (seriesWidth / 2 + seriesWidth * j, coreHeight - scale.calc(series[i].data[j]));
                }
                if(d !== undefined && d !== null && d.toString() !== 'NaN') {
                    circles[j].attr ({
                       cx: seriesWidth / 2 + seriesWidth * j,
                       cy: coreHeight - scale.calc(series[i].data[j])
                    });
                    eventCircles[j].attr ({
                       cx: seriesWidth / 2 + seriesWidth * j,
                       cy: coreHeight - scale.calc(series[i].data[j])
                    });
                } else {
                    circles[j].attr ({
                       cx: -10000,
                       
                    });
                    eventCircles[j].attr ({
                       cx: -10000,
                       
                    });
                }
                    
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
            var eventCircles = plots[i].eventCircles;
            var d = series[i].data[0];
            path.startPath ()
                .moveTo (seriesWidth / 2, coreHeight - scale.calc(0));
            if(d === undefined || d === null || d.toString() === 'NaN') {
                path.moveTo (seriesWidth / 2 * 2, coreHeight - scale.calc(0));
            } else {
                path.lineTo (seriesWidth / 2, coreHeight - scale.calc(series[i].data[0]));
            }
            if(d !== undefined && d !== null && d.toString() !== 'NaN') {
                circles[0].animate ({
                   cx: seriesWidth / 2,
                   cy: coreHeight - scale.calc(series[i].data[0])
                });
                eventCircles[0].animate ({
                   cx: seriesWidth / 2,
                   cy: coreHeight - scale.calc(series[i].data[0])
                });
            } else {
                circles[0].animate ({
                   cx: -10000,
                });
                eventCircles[0].animate ({
                   cx: -10000,
                });
            }
            for(var j=1; j<series[i].data.length; j++) {
                var d = series[i].data[j]
                var d_ = series[i].data[j-1];
                if(d === undefined || d === null || d.toString() === 'NaN') {
                    if(j-1 >= 0) {
                        path.lineTo (seriesWidth / 2 + seriesWidth * (j-1), coreHeight - scale.calc(0));    
                    }
                    if(j+1 < series[i].data.length) {
                        path.moveTo (seriesWidth / 2 + seriesWidth * (j+1), coreHeight - scale.calc(0));    
                        path.moveTo (seriesWidth / 2 + seriesWidth * (j+1), coreHeight - scale.calc(series[i].data[j+1]));    
                    }
                        
                } else {
                    path.lineTo (seriesWidth / 2 + seriesWidth * j, coreHeight - scale.calc(series[i].data[j]));
                }
                if(d !== undefined && d !== null && d.toString() !== 'NaN') {
                    circles[j].animate ({
                       cx: seriesWidth / 2 + seriesWidth * j,
                       cy: coreHeight - scale.calc(series[i].data[j])
                    });
                    eventCircles[j].animate ({
                       cx: seriesWidth / 2 + seriesWidth * j,
                       cy: coreHeight - scale.calc(series[i].data[j])
                    });
                } else {
                    circles[j].animate ({
                       cx: -10000,
                       
                    });
                    eventCircles[j].animate ({
                       cx: -10000,
                       
                    });
                }
            }
            path.lineTo (seriesWidth / 2 + seriesWidth * (dataSize - 1), coreHeight - scale.calc(0));
            path.animatePath ();
        }
    };

    return Area;
});