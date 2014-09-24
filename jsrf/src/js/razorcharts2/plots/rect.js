define(['vendor/lodash'], function (_) {

    var Rect = function () {
        
    };

    Rect.prototype.init = function () {
        this.transformers = [];
        this.seriesContainers = [];
        this.rects = [];
    };


    Rect.prototype.config = function (_options) {
        this.options = _options;
    };

    Rect.prototype.registerTransformer = function (transformer) {
        this.transformers.push (transformer);
    };

    Rect.prototype.transform = function (key) {
        var t = _.where (this.transformers, {key: key});
        for(var i=0; i<t.length; ++i) {
            (t[i].transform)(this);
        }
    };

    Rect.prototype.renderTo = function (paper, core, w, h) {
        this.coreWidth = w;
        this.coreHeight = h;
        this.paper = paper;
        this.core = core;
        this.createRects ();
        this.transform ('render');
    };

    Rect.prototype.resizeTo = function (w, h) {
        this.coreWidth = w;
        this.coreHeight = h;
        this.transform ('resize');
    };

    Rect.prototype.update = function () {
        this.transform ('update');
    };

    Rect.prototype.createRects = function () {
        var paper = this.paper,
            series = this.options.series;

        for(var i=0; i<series.length; i++) {
            var seriesContainer = paper.g ();
            seriesContainer.attr ('id', 'rc-series-' + series[i].seriesIndex);
            this.rects [i] = [];
            for(var j=0; j<series[i].data.length; j++) {
                var rect = paper.rect (0,0,0,0);
                rect.attr('id', 'rc-series-' + series[i].seriesIndex + '-rect-' + j);
                seriesContainer.append (rect);
                this.rects[i].push (rect);
            }
            this.seriesContainers.push (seriesContainer);
            this.core.append (seriesContainer);
        }            
    };

    return Rect;
});