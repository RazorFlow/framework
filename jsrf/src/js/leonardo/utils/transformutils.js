define(['vendor/lodash'], function (_) {
    var TransformUtils = {
         parseTransformString: function (transformString) {
            transformString = transformString || '';
            var translateRegex = /translate\((-{0,1}[0-9]+[.]{0,1}[0-9]*),{0,1}(-{0,1}[0-9]+[.]{0,1}[0-9]*){0,1}\)/g;
            var rotateRegex = /rotate\((-{0,1}[0-9]+[.]{0,1}[0-9]*),{0,1}(-{0,1}[0-9]+[.]{0,1}[0-9]*){0,1},{0,1}(-{0,1}[0-9]+[.]{0,1}[0-9]*){0,1}\)/g;
            var tr = translateRegex.exec (transformString.replace(/\s/, ''));
            var ro = rotateRegex.exec (transformString.replace(/\s/, ''));
            var translateX = 0, translateY = 0;
            var rotateAngle = 0, rotateX = 0, rotateY = 0;
            if(_.isArray(tr) && tr.length > 2) {
                translateX = +tr[1];
                translateY = +tr[2];
            }
            if(_.isArray(ro) && ro.length > 1) {
                rotateAngle = +ro[1];
                rotateX = +ro[2];
                rotateY = +ro[3];
            }
            return {
                translate: [translateX, translateY],
                rotate: [rotateAngle, rotateX || 0, rotateY || 0]
            };
        },

        transformObjectToString: function  (tObj) {
            var tStr = '';
            if(typeof tObj === 'object') {
                if(typeof tObj['translate'] === 'object') {
                    tStr += 'translate(' + tObj.translate[0] + ',' + tObj.translate[1] + ')';
                }
                if(typeof tObj['rotate'] === 'object') {
                    tStr += 'rotate(' + tObj.rotate[0] + ',' +tObj.rotate[1] + ',' + tObj.rotate[2] + ')';
                }
            } else {
                throw 'expected transform object found ' + tObj + ' instead';
            }
            return tStr;
        }
    };

    return TransformUtils;
});