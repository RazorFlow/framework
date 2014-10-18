define(['vendor/lodash'], function(_) {
    var LinearScale = function scale(_domain, _range) {
        this._domain = _domain || [0, 1],
        this._range = _range || [0, 1];
    };

    LinearScale.prototype.type = function () {
        return 'linear';
    }

    LinearScale.prototype.domain = function(val) {
        if(val) {
            this._domain = val;
        }
        else {
            return this._domain;
        }
    };

    LinearScale.prototype.range = function(val) {
        if(val) {
            this._range = val;
        }
        else {
            return this._range;
        }
    };

    LinearScale.prototype.calc = function(val) {
        var domain = this._domain,
            range = this._range;
        var percent = (val - domain[0]) / (domain[1] - domain[0]);
        
        return +((range[1] - range[0]) * percent + range[0]);
    };

    LinearScale.prototype.min = function () {
        return this._domain[0];
    };

    LinearScale.prototype.max = function () {
        return this._domain[1];
    };

    return LinearScale;
}); 