define(['vendor/lodash'], function(_) {
    var LinearScale = function scale(_domain, _range) {
        var self = this,
            domain = _domain || [0, 1],
            range = _range || [0, 1];

        self.type = 'linear';

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
            var percent = (val - domain[0]) / (domain[1] - domain[0]);
            
            return +((range[1] - range[0]) * percent + range[0]);
        };

        self.min = function () {
            return domain[0];
        };

        self.max = function () {
            return domain[1];
        };
         
    };

    return LinearScale;
}); 