define(['vendor/lodash'], function(_) {
    var domain = null,
        range = null;
    var OrdinalScale = function scale(_domain, _range) {
        domain = _domain || [],
        range = _range || [0, 1];
    };

    OrdinalScale.prototype.domain = function (val) {
        if(val) {
            domain = val;
        }
        else {
            return domain;
        }
    };

    OrdinalScale.prototype.range = function (val) {
        if(val) {
            range = val;
        }
        else {
            return range;
        }
    };

    OrdinalScale.prototype.calc = function(val) {
        var idx = domain.indexOf(val),
            length = domain.length;

        if(idx === -1) {
            throw new Error('key not present in the domain');
        }

        var percent = idx / length;
        
        return (range[1] - range[0]) * percent + range[0];
    };

    return OrdinalScale;
}); 