define(['leonardo/utils/transformutils'], function (TransformUtils) {
    function lerp (v0, v1, t) {
        return v0 + t * (v1 - v0);
    }

    function numberLerpHelper (v0, v1, t) {
        return lerp(+v0, +v1, t);
    }

    function transformLerpHelper (v0, v1, t) {
        v0 = TransformUtils.parseTransformString (v0);
        if(v1.translate) {
            var newTranslate = [lerp(v0.translate[0], v1.translate[0], t), lerp(v0.translate[1], v1.translate[1], t)]
        }
        var r = TransformUtils.transformObjectToString ({
            translate: newTranslate
        });

        return r;
    }

    var PropertyInterpolators = {
        x: numberLerpHelper,
        y: numberLerpHelper,
        width: numberLerpHelper,
        height: numberLerpHelper,
        transform: transformLerpHelper,
        opacity: numberLerpHelper
    };

    return PropertyInterpolators;
});