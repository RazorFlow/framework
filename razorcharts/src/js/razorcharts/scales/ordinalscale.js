define(['vendor/lodash'], function(_) {
    var OrdinalScale = function scale(_domain, _range) {
        var self = this,
            domain = _domain || [],
            range = _range || [0, 1];

        self.type = 'ordinal';

        self.domain = function(val) {
            if(val) {
                domain = val;
            }
            else {
                return domain;
            }
        };

        self.range = function(val) {
            if(val) {
                range = val;
            }
            else {
                return range;
            }
        };

        self.calc = function(val) {
            var idx = domain.indexOf(val),
                length = domain.length;

            var percent = idx / length;
            
            return (range[1] - range[0]) * percent + range[0];
        };

        self.min = function () {
            return domain[0];
        };

        self.max = function () {
            return domain[1];
        };
         
    };

    return OrdinalScale;
}); 