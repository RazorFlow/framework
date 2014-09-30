define(['leonardo/core/element'], function(Element) {
    var renderer = null;

    var Path = function (pathString) {
        this.init ();
        init (this, pathString);
    };

    Path.id = 'path';

    Path.setRenderer = function (_renderer) {
        renderer = _renderer
    };

    Path.prototype = new Element ();
    Path.prototype.constructor = Path;

    function init (self, pathString) {
        self.pathString = pathString
        self.__elem = new renderer(pathString);
    }

    Path.prototype.startPath = function () {
        this.pathString = "";
        return this;
    };

    Path.prototype.moveTo = function (x, y) {
        this.pathString += 'M' + x + ',' + y;
        return this;
    };

    Path.prototype.lineTo = function (x, y) {
        this.pathString += 'L' + x + ',' + y;
        return this;
    };

    Path.prototype.closePath = function () {
        this.pathString += 'Z';
    };

    Path.prototype.endPath = function () {
        this.attr ('d', this.pathString);
    };

    Path.prototype.animatePath = function () {
        this.animate ({'d': this.pathString});
    };

    return Path;
});