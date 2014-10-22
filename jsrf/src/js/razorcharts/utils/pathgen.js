define([], function() {
    var PathGen = function () {
        var self = this,
            path = '';

        self.moveTo = function(x, y) {
            path += 'M' + x + ',' + y + ' ';
            return self;
        };

        self.lineTo = function(x, y) {
            path += 'L' + x + ',' + y + ' ';
            return self;
        };

        self.qTo = function(x, y, dx, dy) {
            path += 'Q' + x + ',' + y + ' ' + dx + ',' + dy + ' ';
            return self;
        };

        self.path = function() {
            return path;
        };

        self.clear = function() {
            path = '';
        };
    };

    return PathGen;
});