define(['vendor/lodash'], function (_) {
    PathUtils = {
        toPathObject: function (pathString) {
            var tStr = pathString;
            var ch = ''
            var pathObj = [];
            var t;
            while((ch = peek (tStr))) {
                // TODO: Extend the parser for other commands such as arcs and bezier curves
                if(ch === 'M') {
                    tStr = pick(tStr);
                    tStr = pickSpaceI (tStr);
                    var coord = getCoord (tStr);
                    tStr = coord.str;
                    pathObj.push ({
                        command: 'M',
                        x: coord.x,
                        y: coord.y
                    });
                } else if(ch === 'L') {
                    tStr = pick(tStr);
                    tStr = pickSpaceI (tStr);
                    var coord = getCoord (tStr);
                    tStr = coord.str;
                    pathObj.push ({
                        command: 'L',
                        x: coord.x,
                        y: coord.y
                    });
                } else if (ch === 'A') {
                    tStr = pick(tStr);
                    tStr = pickSpaceI (tStr);
                    var arcArgs = getArcArgs (tStr);
                    tStr = arcArgs.str;
                    pathObj.push({
                        command: 'A',
                        rx: arcArgs.rx,
                        ry: arcArgs.ry,
                        xr: arcArgs.xr,
                        laf: arcArgs.laf,
                        sf: arcArgs.sf,
                        x: arcArgs.x,
                        y: arcArgs.y
                    });

                } else {
                    tStr = pick(tStr);
                }
            }
            return pathObj;
        },
        pathObjectLerp: function (v0, v1, t) {
            var newPathObject = [];
            for(var i=0; i<v0.length; i++) {
                var pObj0 = v0[i],
                    pObj1 = v1[i];
                if(pObj0.command === 'M' || pObj0.command === 'L') {
                    newPathObject.push ({
                        command: pObj0.command,
                        x: lerp(pObj0.x, pObj1.x, t),
                        y: lerp(pObj0.y, pObj1.y, t)
                    });
                } else {
                    newPathObject.push ({
                        command: pObj0.command,
                        rx: pObj1.rx,
                        ry: pObj1.ry,
                        xr: lerp(pObj0.xr, pObj1.xr, t),
                        laf: pObj1.laf,
                        sf: pObj1.sf,
                        x: lerp(pObj0.x, pObj1.x, t),
                        y: lerp(pObj0.y, pObj1.y, t)
                    });
                }
            }

            return newPathObject;
        },
        toPathString: function (pathObject) {
            var pathString = '';
            for(var i=0; i<pathObject.length; i++) {
                var pObj = pathObject[i];
                // TODO: This assumes only x and y coords, so will work well for M and Ls additional functionality to be added for the rest of the commands
                if(pObj.command === 'M' || pObj.command === 'L') {
                    pathString += pObj.command;
                    pathString += pObj.x;
                    pathString += ',';
                    pathString += pObj.y;
                } else if (pObj.command === 'A') {
                    pathString += pObj.command;
                    pathString += pObj.rx;
                    pathString += ',';
                    pathString += pObj.ry;
                    pathString += ',';
                    pathString += pObj.xr;
                    pathString += ',';
                    pathString += pObj.laf;
                    pathString += ',';
                    pathString += pObj.sf;
                    pathString += ',';
                    pathString += pObj.x;
                    pathString += ',';
                    pathString += pObj.y;
                }
            }
            return pathString;
        }
    };

    function lerp (v0, v1, t) {
        return v0 + t * (v1 - v0);
    }

    function getCoord (tStr) {
        var x, y, t;
        t = pickNumber (tStr);
        checkValid (t);
        x = +t[0];
        tStr = t[1];
        t = pickCommaOrSpace(tStr);
        checkValid(t);
        tStr = t;
        t = pickNumber (tStr);
        checkValid(t);
        y = +t[0];
        tStr = t[1];
        return {
            x: x,
            y: y,
            str: tStr
        };
    };

    function getArcArgs (tStr) {
        var rx, ry, xr, laf, sf, x, y, t;
        t = pickNumber (tStr);
        checkValid (t);
        rx = +t[0];
        tStr = t[1];
        t = pickCommaOrSpace (tStr);
        checkValid (t);
        tStr = t;
        t = pickNumber (tStr);
        checkValid (t);
        ry = +t[0];
        tStr = t[1];
        t = pickCommaOrSpace (tStr);
        checkValid (t);
        tStr = t;
        t = pickNumber (tStr);
        checkValid (t);
        xr = +t[0];
        tStr = t[1];
        t = pickCommaOrSpace (tStr);
        checkValid (t);
        tStr = t;
        t = pickNumber (tStr);
        checkValid (t);
        laf = +t[0];
        tStr = t[1];
        t = pickCommaOrSpace (tStr);
        checkValid (t);
        tStr = t;
        t = pickNumber (tStr);
        checkValid (t);
        sf = +t[0];
        tStr = t[1];
        t = pickCommaOrSpace (tStr);
        checkValid (t);
        tStr = t;
        t = pickNumber (tStr);
        checkValid (t);
        x = +t[0];
        tStr = t[1];
        tStr = pickCommaOrSpace (tStr);
        t = pickNumber (tStr);
        checkValid (t);
        y = +t[0];
        tStr = t[1];
        return {
            rx: rx,
            ry: ry,
            xr: xr,
            laf: laf,
            sf: sf,
            x: x,
            y: y,
            str: tStr
        };
    };

    function checkValid (t) {
        if(!t) {
            throw "Invalid path string";
        }
    }

    function peek (string) {
        var c = string.slice (0, 1);
        return c;
    }

    function pick (string) {
        return string.slice (1);
    }

    function pickNumber (string) {
        var str = '';
        var num = peek (string);
        while(num !== '' && num !== ' ' && (num === '.' || (_.isNumber(+num) && !_.isNaN(+num)))) {
            str += num;
            string = pick (string);
            num = peek (string);
        }
        if(str) {
            return [str, string];    
        } else {
            return null;
        }
    }

    function pickComma (string) {
        var ch = peek (string);
        if(ch === ',') {
            return pick(string);
        }
        return null;
    }

    function pickCommaOrSpace (string) {
        var ch = peek (string);
        if(ch === ',' || ch === ' ') {
            return pick(string);
        }
        return null;
    }

    function pickSpaceI (string) {
        var ch = peek (string);
        if(ch === ' ') {
            return pick (string);
        }
        return string;
    }

    return PathUtils;
});