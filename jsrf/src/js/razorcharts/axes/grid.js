define(['razorcharts/utils/graphutils', 'razorcharts/utils/pathgen', 'razorcharts/scales/scale', 'vendor/lodash'], function(graphUtils, PathGen, Scale, _) {
    var Grid = function() {
        var self = this,    
            options = null,
            paper = null,
            core = null,
            width = null,
            height = null,
            yGridLines = [],
            xGridLines = [],
            oldYScale = null,
            oldXScale = null,
            gridContainer = null,
            oldYTicks = null,
            oldXTicks = null;

        self.config = function(_options) {
            options = _options;
        };

        self.updateConfig = function(_options) {
            options = _.extend(options, _options);
        };

        self.renderTo = function(_paper, _core, w, h) {
            paper = _paper;
            core = _core;
            width = w;
            height = h;
            cacheScales();
            draw(true, false);
        };

        self.resizeTo = function(w, h) {
            width = w;
            height = h;
            cacheScales();
            draw(false, false);
        };
        
        self.update = function(w, h) {
            width = w;
            height = h;
            draw(true, true, true);
        };

        var draw = function(create, animate, update) {
            var yScale = null,
                yTicks = null,
                yAxis = null,
                xScale = null,
                xTics = null,
                xAxis = null,
                i, pathGen, newpath, tick, gridLine, scale,
                path = '';

            if(options.type.indexOf('y') !== -1) {
                yScale = options.yScale,
                yTicks = options.yAxis.ticks(),
                yAxis = options.yAxis;
            }
            if(options.type.indexOf('x') !== -1) {
                xScale = options.xScale,
                xTicks = options.xAxis.ticks(),
                xAxis = options.xAxis;
            }

            var oldYLines = null;
            if(create) {
                gridContainer = paper.group('rc-grid', core);
                gridContainer.node.setAttribute('class', 'rc-grid');
            }
            if(update) {
                if(options.type.indexOf('y') !== -1) {

                    oldYLines = _.clone(yGridLines);
                    for(i=-1; ++i<oldYLines.length;) {
                        pathGen = new PathGen();
                        newpath = pathGen.moveTo(0, height - yScale.calc(oldYTicks[i])).lineTo(width, height - yScale.calc(oldYTicks[i])).path();
                        oldYLines[i].animate({
                            path: newpath,
                            opacity: 0
                        }, 500);
                    }

                    setTimeout(function() {
                        for(i=-1; ++i<oldYLines.length;) {
                            oldYLines[i].remove();
                            oldYLines[i] = null;
                        }
                        oldYLines = [];
                    }, 500);
                }
                
                if(options.type.indexOf('x') !== -1) {
                    oldXLines = _.clone(xGridLines);
                    for(i=-1; ++i<oldXLines.length;) {
                        pathGen = new PathGen();
                        newpath = pathGen.moveTo(xScale.calc(oldXTicks[i]), 0).lineTo(xScale.calc(oldXTicks[i]), height).path();
                        oldXLines[i].animate({
                            path: newpath,
                            opacity: 0
                        }, 500);
                    }

                    setTimeout(function() {
                        for(i=-1; ++i<oldXLines.length;) {
                            oldXLines[i].remove();
                            oldXLines[i] = null;
                        }
                        oldXLines = [];
                    }, 500);
                }
            }
            if(options.type.indexOf('y') !== -1) {
                for(i=-1; ++i<yTicks.length;) {
                    tick = yTicks[i];
                    gridLine = null;
                    pathGen = new PathGen();
                    scale = null;
                    
                    scale = update ? oldYScale : yScale;
                    path = pathGen.moveTo(0, height - scale.calc(tick)).lineTo(width, height - scale.calc(tick)).path();
                    if(create) {
                        gridLine = yGridLines[i] = paper.path(path, gridContainer);
                        gridLine.node.setAttribute('class', 'rc-grid-line ' + (tick === 0 ? 'rc-grid-line-base' : ''));
                        gridLine.attr({
                            opacity: 0
                        });
                    } else {
                        gridLine = yGridLines[i];
                    }
                    if(update) {
                        pathGen.clear();
                        path =  pathGen.moveTo(0, height - yScale.calc(tick)).lineTo(width, height - yScale.calc(tick)).path();
                    }
                    
                    gridLine.animate({
                        path: path,
                        opacity: 1
                    }, animate ? 500: 0);
                }
            }
            if(options.type.indexOf('x') !== -1) {
                for(i=-1; ++i<xTicks.length;) {
                    tick = xTicks[i];
                    gridLine = null;
                    pathGen = new PathGen();
                    scale = null;
                    scale = update ? oldXScale : xScale;
                    path = pathGen.moveTo(scale.calc(tick), 0).lineTo(scale.calc(tick), height).path();
                    if(create) {

                        gridLine = xGridLines[i] = paper.path(path, gridContainer);
                        gridLine.node.setAttribute('class', 'rc-grid-line ' + (tick === 0 ? 'rc-grid-line-base' : ''));
                        gridLine.attr({
                            opacity: 0
                        });
                    } else {
                        gridLine = xGridLines[i];
                    }
                    if(update) {
                        pathGen.clear();
                        path =  pathGen.moveTo(xScale.calc(tick), 0).lineTo(xScale.calc(tick), height).path();
                    }
                    
                    gridLine.animate({
                        path: path,
                        opacity: 1
                    }, animate ? 500: 0);
                }
            }

            gridContainer.toBack();

            cacheScales();
        };

        var cacheScales = function() {
             var yScale = options.yScale,
                xScale = options.xScale,
                xAxis = options.xAxis,
                yAxis = options.yAxis;
            if(options.type.indexOf('y') !== -1) {
                oldYScale = new Scale.linear();
                oldYScale.domain(yScale.domain());
                oldYScale.range(yScale.range());
                oldYTicks = yAxis.ticks();
            }
            if(options.type.indexOf('x') !== -1) {
                oldXScale = new Scale.linear();
                oldXScale.domain(xScale.domain());
                oldXScale.range(xScale.range());
                oldXTicks = xAxis.ticks();
            }
        };
    };

    return Grid;
});