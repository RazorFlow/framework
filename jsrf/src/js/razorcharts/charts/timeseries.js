define(['razorcharts/scales/scale', 'razorcharts/axes/axis', 'razorcharts/renderers/area', 'razorcharts/renderers/column', 'razorcharts/renderers/tracker', 'vendor/lodash'], function(Scale, Axis, Area, Column, Tracker, _) {
    var Timeseries = function() {
        var self = this,
            options = null,
            paper = null,
            core = null,
            width = null,
            height = null,
            xScale = null,
            yScale = null,
            xAxis = null,
            yAxis = null,
            xAxisGroup = null,
            yAxisGroup = null,
            xAxisHeight, yAxisWidth,
            chart = null,
            tracker = null,
            chartCore = null,
            trackerCore = null,
            currentZoom = 1;

        self.config = function(_options) {
            options = _options;
            options.eventManager.register('thumbDrag');
            var startDate = options.startDate || new Date('1 Jan 1970'),
                series = options.series,
                labels = [],
                data = series.data,
                min = _.min(data),
                max = _.max(data),
                totalLength = data.length,
                labelsLength = 10;

            for(var j=-1; ++j<labelsLength;) {
                var d = getDateFromUnit(options.startDate, options.unit, j / labelsLength * totalLength);
                labels.push(d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear());
            }

            xScale = new Scale.ordinal();
            xScale.domain(labels);

            yScale = new Scale.linear();
            yScale.domain([min < 0 ? min : 0, max]);

            xAxis = new Axis();
            xAxis.config({
                scale: xScale,
                type: 'bottom',
                axisLine: true
            });

            yAxis = new Axis();
            yAxis.config({
                scale: yScale,
                type: 'left'
            });
            series.seriesIndex = 1;
            if(series.displayType === 'area') {
                chart = new Area();
                chart.config({
                    yScale: yScale,
                    stacked: false,
                    series: [series],
                    dualAxis: false,
                    animateOnRender: !!options.animateOnRender,
                    eventManager: options.eventManager
                });
            }

            tracker = new Tracker();
            tracker.config({
                labels: labels,
                series: series,
                eventManager: options.eventManager
            });

            options.eventManager.bind('thumbDrag', onThumbDrag);
        };

        self.renderTo = function(_paper, w, h) {
            paper = _paper;
            width = w;
            height = h - 20 - (h * 0.2);

            xScale.range([0, width]);
            yScale.range([0, height]);

            core = paper.group('timeseries');

            

            xAxisGroup = paper.group('xAxisContainer', core);
            yAxisGroup = paper.group('yAxisContainer', core);

            yAxis.renderTo(paper, yAxisGroup, width, height);
            yAxisWidth = yAxisGroup.node.getBBox().width;

            xScale.range([0, width - yAxisWidth]);
            xAxis.renderTo(paper, xAxisGroup, width - yAxisWidth, height);
            xAxisHeight = xAxisGroup.node.getBBox().height;

            yScale.range([0, height - xAxisHeight]);
            yAxis.resizeTo(width, height - xAxisHeight);

            xAxisGroup.transform('t' + yAxisGroup.node.getBBox().width +',' + (height - xAxisHeight));

            chartCore = paper.group('chartCore', core);
            chartCore.attr({
                'clip-rect': yAxisWidth + ',0,' + (width - yAxisWidth) + ',' + height
            });

            chart.renderTo(paper, chartCore, (width * currentZoom) - yAxisWidth, height - xAxisHeight);

            trackerCore = paper.group('trackerCore', trackerCore);

            tracker.renderTo(paper, trackerCore, width, h * 0.2);
            
            chartCore.transform('t' + yAxisWidth + ',0');
            core.transform('t0,20');
            trackerCore.transform('t0,' + (height + xAxisHeight));
        };

        self.zoom = function(zoomFactor) {
            var zoomWidth = (width - yAxisWidth) * zoomFactor;

            xScale.range([0, zoomWidth]);
            // xAxis.resizeTo(zoomWidth - yAxisWidth, height);
            chart.resizeTo(zoomWidth, height - xAxisHeight);
        };

        self.resizeTo = function() {

        };

        var getDateFromUnit = function(date, unit, index) {
            var match = unit.match(/([0-9]+)\s([a-z]+)/),
                num = +match[1],
                type = match[2],
                numUnits = getItemInMillisecs(type) * num * index;
            
            return new Date(date.getTime() + numUnits);
        };

        var getItemInMillisecs = function(item) {
            if(item === 'day') {
                return 1000 * 60 * 60 * 24;
            }
        };

        var onThumbDrag = function(obj) {
            var zoomFactor = width / obj.width;
            var zoomWidth = (width - yAxisWidth) * zoomFactor;
            self.zoom(zoomFactor);
            chartCore.transform('t' + (-((obj.x / width) * zoomWidth) + yAxisWidth) + ',0');
        };
    };

    return Timeseries;
});