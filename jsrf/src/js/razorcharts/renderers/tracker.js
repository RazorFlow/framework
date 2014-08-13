define(['razorcharts/renderers/area', 'razorcharts/renderers/column', 'razorcharts/scales/scale', 'vendor/lodash'], function(Area, Column, Scale, _) {
    var Tracker = function() {
        var self = this,
            paper = null,
            core = null,
            width = null,
            height = null,
            xScale = null,
            yScale = null,
            thumbGroup = null,
            thumb = null,
            thumbW, thumbH, thumbX, thumbY;

        self.config = function(_options) {
            options = _options;

            xScale = new Scale.ordinal();
            xScale.domain(options.labels);

            yScale = new Scale.linear();
            yScale.domain([_.min(options.series.data), _.max(options.series.data)]);

            chart = new Area();
            chart.config({
                yScale: yScale,
                stacked: false,
                series: [options.series],
                dualAxis: false,
                animateOnRender: !!options.animateOnRender,
                eventManager: options.eventManager
            });

        };

        self.renderTo = function(_paper, _core, w, h) {
            paper = _paper;
            core = _core;
            width = w;
            height = h;

            xScale.range([0, w]);
            yScale.range([0, h]);

            chart.renderTo(paper, core, w, h);

            thumbGroup = paper.group('thumbGroup', core);

            thumbX = 0;
            thumbY = 0;
            thumbW = w;
            thumbH = h;

            thumb = paper.rect(0, 0, w, h, thumbGroup);
            var leftHandle = paper.rect(0, 0, 20, h, thumbGroup);
            var rightHandle = paper.rect(w-20, 0, 20, h, thumbGroup);
            thumb.attr({
                fill: '#46f',
                opacity: 0.5
            });

            rightHandle.attr({
                fill: '#aaa'
            });
            rightHandle.node.style.pointerEvents = 'none';
            leftHandle.attr({
                fill: '#aaa'
            });
            leftHandle.node.style.pointerEvents = 'none';

            var which = 'left',
                nw = thumbW,
                nx = thumbX;
            thumb.mousedown(function(ev, x, y) {
                if(x > (thumbX + thumbW - 20)) {
                    // console.log(x, thumbW - 20);
                    which = 'right';
                    console.log('right selected');
                } else if(x < thumbX + 20) {
                    which = 'left';
                    // console.log('left selected');
                } else {
                    which = 'middle';
                    // console.log('middle selected');
                }
                nw = thumbW;
                nx = thumbX;
            });
            
            thumb.drag(function(dx, dy) {
                // console.log(dx);
                if(which === 'left') {
                    thumbW = nw - dx;
                    thumbX = nx + dx;
                } else if(which === 'right') {
                    thumbW = nw + dx;
                } else if(which === 'middle') {
                    thumbX = nx + dx;
                }
                if(thumbW > w) {
                    thumbW = w;
                }
                if(thumbX < 0) {
                    thumbX = 0;
                }
                if(thumbX > w - thumbW) {
                    thumbX = w - thumbW;
                }
                repositionThumb();
                options.eventManager.trigger('thumbDrag', {
                    x: thumbX,
                    y: thumbY,
                    width: thumbW,
                    height: thumbH
                });
            });

            thumb.mouseup(function() {
                which = 'none';
            });

            function repositionThumb() {
                thumb.attr({
                    x: thumbX,
                    y: thumbY,
                    width: thumbW,
                    height: thumbH
                });
                leftHandle.attr({
                    x: thumbX
                });
                rightHandle.attr({
                    x: thumbX + thumbW - 20
                });
            }
        };

        self.resizeTo = function(w, h) {
            width = w;
            height = h;
        };

        var draw = function() {

        };
    };

    return Tracker;
});