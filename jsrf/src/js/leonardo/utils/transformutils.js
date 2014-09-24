define(['vendor/lodash'], function (_) {
    var TransformUtils = {
         parseTransformString: function (transformString) {
            transformString = transformString || '';
            var translateRegex = /translate\((-{0,1}[0-9]+[.]{0,1}[0-9]*),(-{0,1}[0-9]+[.]{0,1}[0-9]*)\)/g;
            var tr = translateRegex.exec(transformString.replace(/\s/, ''));
            var translateX = 0, translateY = 0;
            if(_.isArray(tr) && tr.length === 3) {
                translateX = +tr[1];
                translateY = +tr[2];
            }
            return {
                translate: [translateX, translateY]
            };
        },

        transformObjectToString: function  (tObj) {
            var tStr = '';
            if(typeof tObj === 'object') {
                if(typeof tObj['translate'] === 'object') {
                    tStr += 'translate(' + tObj.translate[0] + ',' + tObj.translate[1] + ')';
                }
            } else {
                throw 'expected transform object found ' + tObj + ' instead';
            }
            return tStr;
        }
    };

    return TransformUtils;
});