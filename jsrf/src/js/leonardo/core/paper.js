define(['leonardo/core/element'], function (Element) {
    var Paper = function (node) {
        init (node);
    };

    var elemID = Paper.id = 'paper';
    var renderer = null;
    var elem = null;
    var attrs = {

    };

    Paper.setRenderer = function (_renderer) {
        renderer = _renderer;
    };

    Paper.prototype = new Element ();
    Paper.prototype.constructor = Paper;

    function init (node) {
        elem = new renderer(node);
    };

    return Paper;
});