define(['vendor/lodash'], function(_) {
    var OrdinalScale = function scale(_domain, _range) {
        this._domain = _domain || [],
        this._range = _range || [0, 1];
    };

    OrdinalScale.prototype.type = function () {
        return 'ordinal';
    }

    OrdinalScale.prototype.domain = function (val) {
        if(val) {
            this._domain = val;
        }
        else {
            return this._domain;
        }
    };

    OrdinalScale.prototype.range = function (val) {
        if(val) {
            this._range = val;
        }
        else {
            return this._range;
        }
    };

    OrdinalScale.prototype.calc = function(val) {
        var domain = this._domain,
            range = this._range,
            idx = domain.indexOf(val),
            length = domain.length;
        
        if(idx === -1) {
            throw new Error('key not present in the domain');
        }

        var percent = idx / length;
        
        return (range[1] - range[0]) * percent + range[0];
    };

    return OrdinalScale;
}); 