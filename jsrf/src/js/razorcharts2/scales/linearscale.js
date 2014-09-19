define(['vendor/lodash'], function(_) {
    var domain = null,
        range = null;
        
    var LinearScale = function scale(_domain, _range) {
        domain = _domain || [0, 1],
        range = _range || [0, 1];
    };

    LinearScale.prototype.type = function () {
        return 'linear';
    }

    LinearScale.prototype.domain = function(val) {
        if(val) {
            domain = val;
        }
        else {
            return domain;
        }
    };

    LinearScale.prototype.range = function(val) {
        if(val) {
            range = val;
        }
        else {
            return range;
        }
    };

    LinearScale.prototype.calc = function(val) {
        var percent = (val - domain[0]) / (domain[1] - domain[0]);
        
        return +((range[1] - range[0]) * percent + range[0]);
    };

    LinearScale.prototype.min = function () {
        return domain[0];
    };

    LinearScale.prototype.max = function () {
        return domain[1];
    };

    return LinearScale;
}); 