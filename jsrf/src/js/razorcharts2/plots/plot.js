define(['vendor/lodash'], function (_) {

    var Plot = function () {
        
    };

    Plot.prototype.init = function () {
        this.transformers = [];
        this.seriesContainers = [];
        this.plots = [];
    };


    Plot.prototype.config = function (_options) {
        this.options = _options;
    };

    Plot.prototype.registerTransformer = function (transformer) {
        this.transformers.push (transformer);
    };

    Plot.prototype.transform = function (key) {
        var t = _.where (this.transformers, {key: key});
        for(var i=0; i<t.length; ++i) {
            (t[i].transform)(this);
        }
    };

    Plot.prototype.renderTo = function (paper, core, w, h) {
        this.coreWidth = w;
        this.coreHeight = h;
        this.paper = paper;
        this.core = core;
        this.createPlots ();
        this.transform ('render');
    };

    Plot.prototype.resizeTo = function (w, h) {
        this.coreWidth = w;
        this.coreHeight = h;
        this.transform ('resize');
    };

    Plot.prototype.update = function () {
        this.transform ('update');
    };

    Plot.prototype.createPlots = function () {
        
    };

    return Plot;
});