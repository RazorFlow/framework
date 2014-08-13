/**!
* RedRaphael 1.0.0 - JavaScript Vector Library VML Module
* Copyright (c) 2012-2013 FusionCharts Technologies <http://www.fusioncharts.com>
*
* Raphael 2.1.0 - JavaScript Vector Library VML Module
* Copyright (c) 2008-2012 Dmitry Baranovskiy <http://raphaeljs.com>
* Copyright ¬© 2008-2012 Sencha Labs <http://sencha.com>
*
* Licensed under the MIT license.
*/

window.Raphael && window.Raphael.vml && function(R) {
    var has = "hasOwnProperty",
    Str = String,
    toFloat = parseFloat,
    math = Math,
    round = math.round,
    mmax = math.max,
    mmin = math.min,
    sqrt = math.sqrt,
    abs = math.abs,
    fillString = "fill",
    separator = /[, ]+/,
    eve = R.eve,
    ms = " progid:DXImageTransform.Microsoft",
    S = " ",
    E = "",
    map = {
        M: "m",
        L: "l",
        C: "c",
        Z: "x",
        m: "t",
        l: "r",
        c: "v",
        z: "x"
    },
    bites = /([clmz]),?([^clmz]*)/gi,
    blurregexp = / progid:\S+Blur\([^\)]+\)/g,
    val = /-?[^,\s-]+/g,
    cssDot = "position:absolute;left:0;top:0;width:1px;height:1px",
    zoom = 21600,
    pathTypes = {
        path: 1,
        rect: 1,
        image: 1
    },
    ovalTypes = {
        circle: 1,
        ellipse: 1
    },
    path2vml = function(path) {
        var total = /[ahqstv]/ig,
        command = R._pathToAbsolute;
        Str(path).match(total) && (command = R._path2curve);
        total = /[clmz]/g;
        if (command == R._pathToAbsolute && !Str(path).match(total)) {
            var res = Str(path).replace(bites, function(all, command, args) {
                var vals = [],
                isMove = command.toLowerCase() == "m",
                res = map[command];
                args.replace(val, function(value) {
                    if (isMove && vals.length == 2) {
                        res += vals + map[command == "m" ? "l" : "L"];
                        vals = [];
                    }
                    vals.push(round(value * zoom));
                });
                return res + vals;
            });

            return res || 'm0,0';
        }
        var pa = command(path), p, r;
        res = [];
        for (var i = 0, ii = pa.length; i < ii; i++) {
            p = pa[i];
            r = pa[i][0].toLowerCase();
            r == "z" && (r = "x");
            for (var j = 1, jj = p.length; j < jj; j++) {
                r += round(p[j] * zoom) + (j != jj - 1 ? "," : E);
            }
            res.push(r);
        }
        return res.length ? res.join(S) : 'm0,0';
    },
    compensation = function(deg, dx, dy) {
        var m = R.matrix();
        m.rotate(-deg, .5, .5);
        return {
            dx: m.x(dx, dy),
            dy: m.y(dx, dy)
        };
    },
    setCoords = function(p, sx, sy, dx, dy, deg) {
        var _ = p._,
        m = p.matrix,
        fillpos = _.fillpos,
        o = p.node,
        s = o.style,
        y = 1,
        flip = "",
        dxdy,
        kx = zoom / sx,
        ky = zoom / sy;
        s.visibility = "hidden";
        if (!sx || !sy) {
            return;
        }
        o.coordsize = abs(kx) + S + abs(ky);
        s.rotation = deg * (sx * sy < 0 ? -1 : 1);
        if (deg) {
            var c = compensation(deg, dx, dy);
            dx = c.dx;
            dy = c.dy;
        }
        sx < 0 && (flip += "x");
        sy < 0 && (flip += " y") && (y = -1);
        s.flip = flip;
        o.coordorigin = (dx * -kx) + S + (dy * -ky);
        if (fillpos || _.fillsize) {
            var fill = o.getElementsByTagName(fillString);
            fill = fill && fill[0];
            fill.parentNode && fill.parentNode.removeChild(fill);
            if (fillpos) {
                c = compensation(deg, m.x(fillpos[0], fillpos[1]), m.y(fillpos[0], fillpos[1]));
                fill.position = c.dx * y + S + c.dy * y;
            }
            if (_.fillsize) {
                fill.size = _.fillsize[0] * abs(sx) + S + _.fillsize[1] * abs(sy);
            }
            o.appendChild(fill);
        }
        s.visibility = "visible";
    };
    R._url = E;
    R.toString = function() {
        return  "Your browser doesn\u2019t support SVG. Falling down to VML.\nYou are running Rapha\xebl " + this.version;
    };
    var addArrow = function(o, value, isEnd) {
        var values = Str(value).toLowerCase().split("-"),
        se = isEnd ? "end" : "start",
        i = values.length,
        type = "classic",
        w = "medium",
        h = "medium";
        while (i--) {
            switch (values[i]) {
                case "block":
                case "classic":
                case "oval":
                case "diamond":
                case "open":
                case "none":
                    type = values[i];
                    break;
                case "wide":
                case "narrow":
                    h = values[i];
                    break;
                case "long":
                case "short":
                    w = values[i];
                    break;
            }
        }
        var stroke = o.node.getElementsByTagName("stroke")[0];
        stroke[se + "arrow"] = type;
        stroke[se + "arrowlength"] = w;
        stroke[se + "arrowwidth"] = h;
    },

    applyCustomAttributes = function (o, attrs) {
        for (var key in o.ca) {
            if (attrs.hasOwnProperty(key)) {
                o.attr(key, attrs[key]);
            }
        }
    },

    setFillAndStroke = R._setFillAndStroke = function(o, params) {
        if (!o.paper.canvas) return;
        // o.paper.canvas.style.display = "none";
        o.attrs = o.attrs || {};
        var node = o.node,
        a = o.attrs,
        s = node.style,
        xy,
        newpath = pathTypes[o.type] && (params.x != a.x || params.y != a.y || params.width != a.width || params.height != a.height || params.cx != a.cx || params.cy != a.cy || params.rx != a.rx || params.ry != a.ry || params.r != a.r),
        isOval = ovalTypes[o.type] && (a.cx != params.cx || a.cy != params.cy || a.r != params.r || a.rx != params.rx || a.ry != params.ry),
        isGroup = o.type === 'group',
        res = o;


        for (var par in params)
            if (params[has](par)) {
                a[par] = params[par];
            }
        if (newpath) {
            a.path = R._getPath[o.type](o);
            o._.dirty = 1;
        }
        params.href && (node.href = params.href);
        params.title && (node.title = params.title);
        params.target && (node.target = params.target);
        params.cursor && (s.cursor = params.cursor);
        "blur" in params && o.blur(params.blur);

        if (params.path && o.type == "path" || newpath) {
            node.path = path2vml(~Str(a.path).toLowerCase().indexOf("r") ? R._pathToAbsolute(a.path) : a.path);
            if (o.type == "image") {
                o._.fillpos = [a.x, a.y];
                o._.fillsize = [a.width, a.height];
                setCoords(o, 1, 1, 0, 0, 0);
            }
        }
        "transform" in params && o.transform(params.transform);
        if ("rotation" in params) {
            var rotation = params.rotation;
            if (R.is(rotation, "array")) {
                o.rotate.apply(o, rotation);
            }
            else {
                o.rotate(rotation);
            }
        }
        if ("visibility" in params) {
            params.visibility === 'hidden' ? o.hide() : o.show();
        }
        if (isOval) {
            var cx = +a.cx,
            cy = +a.cy,
            rx = +a.rx || +a.r || 0,
            ry = + a.ry || + a.r || 0;
            node.path = R.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x", round((cx - rx) * zoom), round((cy - ry) * zoom), round((cx + rx) * zoom), round((cy + ry) * zoom), round(cx * zoom));
        }
        if ("clip-rect" in params) {
            var rect = Str(params["clip-rect"]).split(separator);

            if (rect.length == 4) {
                rect[0] = +rect[0];
                rect[1] = +rect[1];
                rect[2] = +rect[2] + rect[0];
                rect[3] = +rect[3] + rect[1];

                /** @todo create separate element for group clip-rect to
                 * avoid unclipping issue */
                var div = isGroup ? node : (node.clipRect ||
                        R._g.doc.createElement("div")),
                    offset,
                    dstyle = div.style;

                if (isGroup) {
                    o.clip = rect.slice(); // copy param
                    offset = o.matrix.offset();
                    offset = [toFloat(offset[0]), toFloat(offset[1])];
                    // invert matrix calculation
                    rect[0] -= offset[0];
                    rect[1] -= offset[1];
                    rect[2] -= offset[0];
                    rect[3] -= offset[1];
                    // Fix for bug in ie clip-auto when height/width is not defined
                    /** @todo set dynamic w/h based on clip bounds or find
                     * another workaround fix */
                    dstyle.width = "10800px";
                    dstyle.height = "10800px";
                }
                else if (!node.clipRect) {
                    dstyle.top = "0";
                    dstyle.left = "0";
                    dstyle.width = o.paper.width + "px";
                    dstyle.height = o.paper.height + "px";
                    node.parentNode.insertBefore(div, node);
                    div.appendChild(node);
                    div.raphael = true;
                    div.raphaelid = node.raphaelid;
                    node.clipRect = div;
                }
                dstyle.position = "absolute";
                dstyle.clip = R.format("rect({1}px {2}px {3}px {0}px)", rect);
            }
            if (!params["clip-rect"]) {
                if (isGroup && o.clip) {
                    node.style.clip = "rect(auto auto auto auto)";
                    delete o.clip;
                }
                else if (node.clipRect) {
                    node.clipRect.style.clip = "rect(auto auto auto auto)";
                }
            }
        }
        if (o.textpath) {
            var textpathStyle = o.textpath.style;
            params.font && (textpathStyle.font = params.font);
            params["font-family"] && (textpathStyle.fontFamily = '"' + params["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g, E) + '"');
            params["font-size"] && (textpathStyle.fontSize = params["font-size"]);
            params["font-weight"] && (textpathStyle.fontWeight = params["font-weight"]);
            params["font-style"] && (textpathStyle.fontStyle = params["font-style"]);
        }
        if ("arrow-start" in params) {
            addArrow(res, params["arrow-start"]);
        }
        if ("arrow-end" in params) {
            addArrow(res, params["arrow-end"], 1);
        }
        if (params.opacity != null ||
            params["stroke-width"] != null ||
            params.fill != null ||
            params.src != null ||
            params.stroke != null ||
            params["stroke-width"] != null ||
            params["stroke-opacity"] != null ||
            params["fill-opacity"] != null ||
            params["stroke-dasharray"] != null ||
            params["stroke-miterlimit"] != null ||
            params["stroke-linejoin"] != null ||
            params["stroke-linecap"] != null) {
            var fill = node.getElementsByTagName(fillString),
            newfill = false,
            fillOpacity = -1;
            fill = fill && fill[0];
            !fill && (newfill = fill = createNode(fillString));
            if (o.type == "image" && params.src) {
                fill.src = params.src;
            }
            params.fill && (fill.on = true);
            if (fill.on == null || params.fill == "none" || params.fill === null) {
                fill.on = false;
            }
            if (fill.on && params.fill) {
                var isURL = Str(params.fill).match(R._ISURL);
                if (isURL) {
                    fill.parentNode && fill.parentNode.removeChild(fill);
                    fill.rotate = true;
                    fill.src = isURL[1];
                    fill.type = "tile";
                    var bbox = o.getBBox(1);
                    fill.position = bbox.x + S + bbox.y;
                    o._.fillpos = [bbox.x, bbox.y];

                    R._preload(isURL[1], function() {
                        o._.fillsize = [this.offsetWidth, this.offsetHeight];
                    });
                } else {
                    var color = R.getRGB(params.fill);
                    fill.color = color.hex;
                    fill.src = E;
                    fill.type = "solid";
                    if (color.error && (res.type in {
                        circle: 1,
                        ellipse: 1
                    } || Str(params.fill).charAt() != "r") && addGradientFill(res, params.fill, fill)) {
                        a.fill = "none";
                        a.gradient = params.fill;
                        fill.rotate = false;
                    }
                    else if ("opacity" in color && !("fill-opacity" in params)) {
                        fillOpacity = color.opacity;
                    }
                }
            }
            if (fillOpacity !== -1 || "fill-opacity" in params || "opacity" in params) {
                var opacity = ((+a["fill-opacity"] + 1 || 2) - 1) * ((+a.opacity + 1 || 2) - 1) * ((+fillOpacity + 1 || 2) - 1);
                opacity = mmin(mmax(opacity, 0), 1);
                fill.opacity = opacity;
                if (fill.src) {
                    fill.color = "none";
                }
            }
            node.appendChild(fill);
            var stroke = (node.getElementsByTagName("stroke") && node.getElementsByTagName("stroke")[0]),
                newstroke = false;
            !stroke && (newstroke = stroke = createNode("stroke"));
            if ((params.stroke && params.stroke != "none") ||
                params["stroke-width"] ||
                params["stroke-opacity"] != null ||
                params["stroke-dasharray"] ||
                params["stroke-miterlimit"] ||
                params["stroke-linejoin"] ||
                params["stroke-linecap"]) {
                stroke.on = true;
            }
            (params.stroke == "none" || params.stroke === null || stroke.on == null || params.stroke == 0 || params["stroke-width"] == 0) && (stroke.on = false);
            var strokeColor = R.getRGB(('stroke' in params) ? params.stroke : a.stroke);
            stroke.on && params.stroke && (stroke.color = strokeColor.hex);
            opacity = ((+a["stroke-opacity"] + 1 || 2) - 1) * ((+a.opacity + 1 || 2) - 1) * ((+strokeColor.opacity + 1 || 2) - 1);
            var width = (toFloat(params["stroke-width"]) || 1) * .75;
            opacity = mmin(mmax(opacity, 0), 1);
            params["stroke-width"] == null && (width = a["stroke-width"]);
            params["stroke-width"] && (stroke.weight = width);
            width && width < 1 && (opacity *= width) && (stroke.weight = 1);
            stroke.opacity = opacity;

            params["stroke-linejoin"] && (stroke.joinstyle = params["stroke-linejoin"]) || newstroke && (newstroke.joinstyle = 'miter');
            stroke.miterlimit = params["stroke-miterlimit"] || 8;
            params["stroke-linecap"] && (stroke.endcap = params["stroke-linecap"] == "butt" ? "flat" : params["stroke-linecap"] == "square" ? "square" : "round");
            if (params["stroke-dasharray"]) {
                var dasharray = {
                    "-": "shortdash",
                    ".": "shortdot",
                    "-.": "shortdashdot",
                    "-..": "shortdashdotdot",
                    ". ": "dot",
                    "- ": "dash",
                    "--": "longdash",
                    "- .": "dashdot",
                    "--.": "longdashdot",
                    "--..": "longdashdotdot"
                };
                stroke.dashstyle = dasharray[has](params["stroke-dasharray"]) ? dasharray[params["stroke-dasharray"]] :
                        ((params["stroke-dasharray"].join && params["stroke-dasharray"].join(' ')) || E);
            }
            newstroke && node.appendChild(stroke);
        }
        if (res.type == "text") {
            res.paper.canvas.style.display = E;
            var span = res.paper.span,
            m = 100,
            fontSize = a.font && a.font.match(/\d+(?:\.\d*)?(?=px)/),
            lineHeight = a['line-height'] && (a['line-height']+E).match(/\d+(?:\.\d*)?(?=px)/);
            s = span.style;
            a.font && (s.font = a.font);
            a["font-family"] && (s.fontFamily = a["font-family"]);
            a["font-weight"] && (s.fontWeight = a["font-weight"]);
            a["font-style"] && (s.fontStyle = a["font-style"]);
            fontSize = toFloat(a["font-size"] || fontSize && fontSize[0]) || 10;
            s.fontSize = fontSize * m + "px";
            lineHeight = toFloat(a["line-height"] || lineHeight && lineHeight[0]) || 12;
            a["line-height"] && (s.lineHeight = lineHeight * m + 'px');
            R.is(params.text, 'array') && (params.text = res.textpath.string = params.text.join('\n').replace(/<br\s*?\/?>/ig, '\n'));
            res.textpath.string && (span.innerHTML = Str(res.textpath.string).replace(/</g, "&#60;").replace(/&/g, "&#38;").replace(/\n/g, "<br>"));
            var brect = span.getBoundingClientRect();
            res.W = a.w = (brect.right - brect.left) / m;
            res.H = a.h = (brect.bottom - brect.top) / m;
            // res.paper.canvas.style.display = "none";
            res.X = a.x;
            res.Y = a.y;
            var leading = lineHeight - fontSize;
            switch(a["vertical-align"]) {
                case "top":
                    res.bby = res.H / 2; // + leading;
                    break;
                case "bottom":
                    res.bby = -res.H / 2; // - leading;
                    break;
                default:
                    res.bby = 0;
            }

            ("x" in params || "y" in params || res.bby !== undefined) && (res.path.v = R.format("m{0},{1}l{2},{1}", round(a.x * zoom), round((a.y + (res.bby || 0)) * zoom), round(a.x * zoom) + 1));
            var dirtyattrs = ["x", "y", "text", "font", "font-family", "font-weight", "font-style", "font-size", "line-height"];
            for (var d = 0, dd = dirtyattrs.length; d < dd; d++)
                if (dirtyattrs[d] in params) {
                    res._.dirty = 1;
                    break;
                }

            // text-anchor emulation
            switch (a["text-anchor"]) {
                case "start":
                    res.textpath.style["v-text-align"] = "left";
                    res.bbx = res.W / 2;
                    break;
                case "end":
                    res.textpath.style["v-text-align"] = "right";
                    res.bbx = -res.W / 2;
                    break;
                default:
                    res.textpath.style["v-text-align"] = "center";
                    res.bbx = 0;
                    break;
            }
            res.textpath.style["v-text-kern"] = true;
        }
    // res.paper.canvas.style.display = E;
    },
    addGradientFill = function(o, gradient, fill) {
        o.attrs = o.attrs || {};
        var attrs = o.attrs,
        pow = Math.pow,
        opacity,
        oindex,
        type = "linear",
        fxfy = ".5 .5";
        o.attrs.gradient = gradient;
        gradient = Str(gradient).replace(R._radial_gradient, function(all, opts) {
            type = "radial";
            opts = opts && opts.split(',') || [];

            // fx,fy of vml is cx,cy of svg
            var cx = opts[0],
                cy = opts[1],
                r = opts[2],
                fx = opts[3],
                fy = opts[4],
                units = opts[5];
            if (fx && fy) {
                fx = toFloat(fx);
                fy = toFloat(fy);
                pow(fx - .5, 2) + pow(fy - .5, 2) > .25 && (fy = sqrt(.25 - pow(fx - .5, 2)) * ((fy > .5) * 2 - 1) + .5);
                fxfy = fx + S + fy;
            }
            return E;
        });
        gradient = gradient.split(/\s*\-\s*/);
        if (type == "linear") {
            var angle = gradient.shift();
            angle = -toFloat(angle);
            if (isNaN(angle)) {
                return null;
            }
        }
        var dots = R._parseDots(gradient);
        if (!dots) {
            return null;
        }
        o = o.shape || o.node;
        if (dots.length) {
            fill.parentNode && fill.parentNode.removeChild(fill);
            fill.on = true;
            fill.method = "none";
            fill.color = dots[0].color;
            fill.color2 = dots[dots.length - 1].color;
            //For VML use first and last available alpha
            var clrs = [],
            opacity1 = 1,
            opacity2 = dots[0].opacity === undefined ? 1 : dots[0].opacity;
            for (var i = 0, ii = dots.length; i < ii; i++) {
                dots[i].offset && clrs.push(dots[i].offset + S + dots[i].color);
                if (dots[i].opacity !== undefined) {
                    opacity1 = dots[i].opacity;//update with latest avaible opacity
                }
            }
            fill.colors = clrs.length ? clrs.join() : "0% " + fill.color;
            //set opacity1 & opacity2
            fill.opacity = opacity1;
            fill['o:opacity2'] = opacity2;
            if (type == "radial") {
                fill.type = "gradientTitle";
                fill.focus = "100%";
                fill.focussize = "0 0";
                fill.focusposition = fxfy;
                fill.angle = 0;
            } else {
                // fill.rotate= true;
                fill.type = "gradient";
                fill.angle = (270 - angle) % 360;
            }
            o.appendChild(fill);
        }
        return 1;
    },
    Element = function(node, vml, group) {
        var o = this,
            parent = group || vml,
			skew;

		parent.canvas && parent.canvas.appendChild(node);
		skew = createNode("skew");
        skew.on = true;
        node.appendChild(skew);
        o.skew = skew;

        o.node = o[0] = node;
        node.raphael = true;
        node.raphaelid = o.id = R._oid++;

        o.X = 0;
        o.Y = 0;

        o.attrs = o.attrs || {};
        o.followers = o.followers || [];

        o.paper = vml;
        o.ca = o.customAttributes = o.customAttributes ||
            new vml._CustomAttributes();

        o.matrix = R.matrix();
        o._ = {
            transform: [],
            sx: 1,
            sy: 1,
            dx: 0,
            dy: 0,
            deg: 0,
            dirty: 1,
            dirtyT: 1
        };

        o.parent = parent;
        !parent.bottom && (parent.bottom = o);

        o.prev = parent.top;
        parent.top && (parent.top.next = o);
        parent.top = o;
        o.next = null;
    };
    var elproto = R.el;

    Element.prototype = elproto;
    elproto.constructor = Element;

    elproto.transform = function(tstr) {
        if (tstr == null) {
            return this._.transform;
        }
        var vbs = this.paper._viewBoxShift,
        vbt = vbs ? "s" + [vbs.scale, vbs.scale] + "-1-1t" + [vbs.dx, vbs.dy] : E,
        oldt;

        if (vbs) {
            oldt = tstr = Str(tstr).replace(/\.{3}|\u2026/g, this._.transform || E);
        }

        R._extractTransform(this, vbt + tstr);

        var matrix = this.matrix.clone(),
        skew = this.skew,
        o = this.node,
        split,
        isGrad = ~Str(this.attrs.fill).indexOf("-"),
        isPatt = !Str(this.attrs.fill).indexOf("url(");
        matrix.translate(-.5, -.5);
        if (isPatt || isGrad || this.type == "image") {
            skew.matrix = "1 0 0 1";
            skew.offset = "0 0";
            split = matrix.split();
            if ((isGrad && split.noRotation) || !split.isSimple) {
                o.style.filter = matrix.toFilter();
                var bb = this.getBBox(),
                bbt = this.getBBox(1),
                xget = bb.x2 && bbt.x2 && 'x2' || 'x',
                yget = bb.y2 && bbt.y2 && 'y2' || 'y',
                dx = bb[xget] - bbt[xget],
                dy = bb[yget] - bbt[yget];
                o.coordorigin = (dx * -zoom) + S + (dy * -zoom);
                setCoords(this, 1, 1, dx, dy, 0);
            } else {
                o.style.filter = E;
                setCoords(this, split.scalex, split.scaley, split.dx, split.dy, split.rotate);
            }
        } else {
            o.style.filter = E;
            skew.matrix = Str(matrix);
            skew.offset = matrix.offset();
        }
        oldt && (this._.transform = oldt);

        return this;
    };
    elproto.rotate = function(deg, cx, cy) {
        if (this.removed) {
            return this;
        }
        if (deg == null) {
            return;
        }
        deg = Str(deg).split(separator);
        if (deg.length - 1) {
            cx = toFloat(deg[1]);
            cy = toFloat(deg[2]);
        }
        deg = toFloat(deg[0]);
        (cy == null) && (cx = cy);
        if (cx == null || cy == null) {
            var bbox = this.getBBox(1);
            cx = bbox.x + bbox.width / 2;
            cy = bbox.y + bbox.height / 2;
        }
        this._.dirtyT = 1;
        this.transform(this._.transform.concat([["r", deg, cx, cy]]));
        return this;
    };
    elproto.translate = function(dx, dy) {
        if (this.removed) {
            return this;
        }
        dx = Str(dx).split(separator);
        if (dx.length - 1) {
            dy = toFloat(dx[1]);
        }
        dx = toFloat(dx[0]) || 0;
        dy = +dy || 0;
        if (this._.bbox) {
            this._.bbox.x += dx;
            this._.bbox.y += dy;
        }
        this.transform(this._.transform.concat([["t", dx, dy]]));
        return this;
    };
    elproto.scale = function(sx, sy, cx, cy) {
        if (this.removed) {
            return this;
        }
        sx = Str(sx).split(separator);
        if (sx.length - 1) {
            sy = toFloat(sx[1]);
            cx = toFloat(sx[2]);
            cy = toFloat(sx[3]);
            isNaN(cx) && (cx = null);
            isNaN(cy) && (cy = null);
        }
        sx = toFloat(sx[0]);
        (sy == null) && (sy = sx);
        (cy == null) && (cx = cy);
        if (cx == null || cy == null) {
            var bbox = this.getBBox(1);
        }
        cx = cx == null ? bbox.x + bbox.width / 2 : cx;
        cy = cy == null ? bbox.y + bbox.height / 2 : cy;

        this.transform(this._.transform.concat([["s", sx, sy, cx, cy]]));
        this._.dirtyT = 1;
        return this;
    };
    elproto.hide = function(soft) {
        var o = this;
        !o.removed && (o.node.style.display = "none");
        return o;
    };

    elproto.show = function(soft) {
        var o = this;
        !o.removed && (o.node.style.display = E);
        return o;
    };
    elproto._getBBox = function() {
        if (this.removed) {
            return {};
        }
        return {
            x: this.X + (this.bbx || 0) - this.W / 2,
            y: this.Y + (this.bby || 0) - this.H / 2,
            width: this.W,
            height: this.H
        };
    };
    elproto.remove = function() {
        if (this.removed || !this.parent.canvas) {
            return;
        }

        var o = this,
            node = R._engine.getNode(o),
            paper = o.paper,
            shape = o.shape,
            i;

        paper.__set__ && paper.__set__.exclude(o);
        eve.unbind("raphael.*.*." + o.id);

        shape && shape.parentNode.removeChild(shape);
        node.parentNode && node.parentNode.removeChild(node);

        while (i = o.followers.pop()) {
            i.el.remove();
        }
        while (i = o.bottom) {
            i.remove();
        }

        if (o._drag) {
            o.undrag();
        }

        if (o.events)  {
            while (i = o.events.pop()) {
                i.unbind();
            }
        }

        o.removeData();
        delete paper._elementsById[o.id];
        R._tear(o, o.parent);

        for (var i in o) {
            o[i] = typeof o[i] === "function" ? R._removedFactory(i) : null;
        }
        o.removed = true;
    };

    elproto.attr = function(name, value) {
        if (this.removed) {
            return this;
        }
        if (name == null) {
            var res = {};
            for (var a in this.attrs)
                if (this.attrs[has](a)) {
                    res[a] = this.attrs[a];
                }
            res.gradient && res.fill == "none" && (res.fill = res.gradient) && delete res.gradient;
            res.transform = this._.transform;
            res.visibility = this.node.style.display === "none" ? "hidden" : "visible";
            return res;
        }
        if (value == null && R.is(name, "string")) {
            if (name == fillString && this.attrs.fill == "none" && this.attrs.gradient) {
                return this.attrs.gradient;
            }
            if (name == "visibility") {
                return this.node.style.display === "none" ? "hidden" : "visible";
            }
            var names = name.split(separator),
            out = {};
            for (var i = 0, ii = names.length; i < ii; i++) {
                name = names[i];
                if (name in this.attrs) {
                    out[name] = this.attrs[name];
                } else if (R.is(this.ca[name], "function")) {
                    out[name] = this.ca[name].def;
                } else {
                    out[name] = R._availableAttrs[name];
                }
            }
            return ii - 1 ? out : out[names[0]];
        }
        if (this.attrs && value == null && R.is(name, "array")) {
            out = {};
            for (i = 0, ii = name.length; i < ii; i++) {
                out[name[i]] = this.attr(name[i]);
            }
            return out;
        }
        var params;
        if (value != null) {
            params = {};
            params[name] = value;
        }
        value == null && R.is(name, "object") && (params = name);
        for (var key in params) {
            eve("raphael.attr." + key + "." + this.id, this, params[key], key);
        }
        if (params) {
            var todel = {};
            for (key in this.ca) {
                if (this.ca[key] && params[has](key) && R.is(this.ca[key], "function") && !this.ca['_invoked' + key]) {
                    this.ca['_invoked' + key] = true; // prevent recursion
                    var par = this.ca[key].apply(this, [].concat(params[key]));
                    delete this.ca['_invoked' + key];

                    for (var subkey in par) {
                        if (par[has](subkey)) {
                            params[subkey] = par[subkey];
                        }
                    }
                    this.attrs[key] = params[key];
                    if (par === false) {
                        todel[key] = params[key];
                        delete params[key];
                    }
                }
            }

            // this.paper.canvas.style.display = "none";
            if ('text' in params && this.type == "text") {
                R.is(params.text, 'array') && (params.text = params.text.join('\n'));
                this.textpath.string = params.text.replace(/<br\s*?\/?>/ig, '\n');
            }
            setFillAndStroke(this, params);
            var follower;
            for (i = 0, ii = this.followers.length; i < ii; i++) {
                follower = this.followers[i];
                (follower.cb && !follower.cb.call(follower.el, params, this)) ||
                    follower.el.attr(params);
            }
            for (var subkey in todel) {
                params[subkey] = todel[subkey];
            }
        // this.paper.canvas.style.display = E;
        }
        return this;
    };

    elproto.blur = function(size) {
        var s = this.node.runtimeStyle,
        f = s.filter;
        f = f.replace(blurregexp, E);
        if (+size !== 0) {
            this.attrs.blur = size;
            s.filter = f + S + ms + ".Blur(pixelradius=" + (+size || 1.5) + ")";
            s.margin = R.format("-{0}px 0 0 -{0}px", round(+size || 1.5));
        } else {
            s.filter = f;
            s.margin = 0;
            delete this.attrs.blur;
        }
        return this;
    };

    elproto.on = function(eventType, handler) {
        if (this.removed) {
            return this;
        }

        this.node['on'+ eventType] = function() {
            var evt = R._g.win.event;
            evt.target = evt.srcElement;
            handler(evt);
        };
        return this;
    };

    R._engine.getNode = function (el) {
        var node = el.node || el[0].node;
        return node.clipRect || node;
    };
    R._engine.getLastNode = function (el) {
        var node = el.node || el[el.length - 1].node;
        return node.clipRect || node;
    };

    R._engine.group = function(vml, id, group) {
        var el = R._g.doc.createElement("div"),
            p = new Element(el, vml, group);

        el.style.cssText = cssDot;
        p._id = id || E;
        id && (el.className = 'raphael-group-' + p.id + '-' + id);
        (group || vml).canvas.appendChild(el);

        p.type = 'group';
        p.canvas = p.node;
        p.transform = R._engine.group.transform;
        p.top = null;
        p.bottom = null;

        return p;
    };

    R._engine.group.transform = function(tstr) {
        if (tstr == null) {
            return this._.transform;
        }

        var o = this,
            s = o.node.style,
            c = o.clip,
            vbs = o.paper._viewBoxShift,
            vbt = vbs ? "s" + [vbs.scale, vbs.scale] + "-1-1t" + [vbs.dx, vbs.dy] : E,
            oldt,
            matrix,
            offset,
            tx,
            ty;

        if (vbs) {
            oldt = tstr = Str(tstr).replace(/\.{3}|\u2026/g, o._.transform || E);
        }
        R._extractTransform(o, vbt + tstr);
        matrix = o.matrix;
        offset = matrix.offset();
        tx = toFloat(offset[0]) || 0;
        ty = toFloat(offset[1]) || 0;

        s.left = tx + "px";
        s.top = ty + "px";
        s.zoom = (o._.tzoom = matrix.get(0)) + E;

        /** @todo try perform relative group transform, thus avoiding
         * transform on clipping */
        c && (s.clip = R.format("rect({1}px {2}px {3}px {0}px)", [
            c[0] - tx, c[1] - ty, c[2] - tx, c[3] - ty
        ]));

        return o;
    };

    R._engine.path = function(vml, attrs, group) {
        var el = createNode("shape");
        el.style.cssText = cssDot;
        el.coordsize = zoom + S + zoom;
        el.coordorigin = vml.coordorigin;

		var p = new Element(el, vml, group);
        p.type = attrs.type || "path";
		p.path = [];
        p.Path = E;

		attrs.type && (delete attrs.type);
        setFillAndStroke(p, attrs);
        applyCustomAttributes(p, attrs);
        return p;
    };

    R._engine.rect = function(vml, attrs, group) {
        var path = R._rectPath(attrs.x, attrs.y, attrs.w, attrs.h, attrs.r);

		attrs.path = path;
		attrs.type = "rect";

		var res = vml.path(attrs, group),
        a = res.attrs;
        res.X = a.x;
        res.Y = a.y;
        res.W = a.width;
        res.H = a.height;
        a.path = path;

		return res;
    };
    R._engine.ellipse = function(vml, attrs, group) {
		attrs.type = "ellipse";

		var res = vml.path(attrs, group),
			a = res.attrs;
        res.X = a.x - a.rx;
        res.Y = a.y - a.ry;
        res.W = a.rx * 2;
        res.H = a.ry * 2;

        return res;
    };
    R._engine.circle = function(vml, attrs, group) {
        attrs.type = "circle";

        var res = vml.path(attrs, group),
			a = res.attrs;

        res.X = a.x - a.r;
        res.Y = a.y - a.r;
        res.W = res.H = a.r * 2;
        return res;
    };
    R._engine.image = function(vml, attrs, group) {
        var path = R._rectPath(attrs.x, attrs.y, attrs.w, attrs.h);

		attrs.path = path;
		attrs.type = "image";
		attrs.stroke = "none";
        var res = vml.path(attrs, group),
			a = res.attrs,
			node = res.node,
			fill = node.getElementsByTagName(fillString)[0];

		a.src = attrs.src;
        res.X = a.x = x;
        res.Y = a.y = y;
        res.W = a.width = w;
        res.H = a.height = h;

		fill.parentNode && fill.parentNode.removeChild(fill);
        fill.rotate = true;
        fill.src = a.src;
        fill.type = "tile";
        res._.fillpos = [a.x, a.y];
        res._.fillsize = [a.w, a.h];
        node.appendChild(fill);
        setCoords(res, 1, 1, 0, 0, 0);
        return res;
    };
    R._engine.text = function(vml, attrs, group) {
        var el = createNode("shape"),
			path = createNode("path"),
			o = createNode("textpath");
        x = attrs.x || 0;
        y = attrs.y || 0;
        text = attrs.text;
        path.v = R.format("m{0},{1}l{2},{1}", round(attrs.x * zoom), round(attrs.y * zoom), round(attrs.x * zoom) + 1);
        path.textpathok = true;
        o.string = Str(attrs.text).replace(/<br\s*?\/?>/ig, '\n');
        o.on = true;
        el.style.cssText = cssDot;
        el.coordsize = zoom + S + zoom;
        el.coordorigin = "0 0";
        var p = new Element(el, vml, group);

        p.shape = el;
        p.path = path;
        p.textpath = o;
        p.type = "text";
        p.attrs.text = Str(attrs.text || E);
        p.attrs.x = attrs.x;
        p.attrs.y = attrs.y;
        p.attrs.w = 1;
        p.attrs.h = 1;
        setFillAndStroke(p, attrs);
        applyCustomAttributes(p, attrs);

        el.appendChild(o);
        el.appendChild(path);

        return p;
    };

    R._engine.setSize = function(width, height) {
        var cs = this.canvas.style;
        this.width = width;
        this.height = height;
        width == +width && (width += "px");
        height == +height && (height += "px");
        cs.width = width;
        cs.height = height;
        cs.clip = "rect(0 " + width + " " + height + " 0)";
        if (this._viewBox) {
            R._engine.setViewBox.apply(this, this._viewBox);
        }
        return this;
    };
    R._engine.setViewBox = function(x, y, w, h, fit) {
        eve("raphael.setViewBox", this, this._viewBox, [x, y, w, h, fit]);
        var width = this.width,
        height = this.height,
        size = 1 / mmax(w / width, h / height),
        H, W;
        if (fit) {
            H = height / h;
            W = width / w;
            if (w * H < width) {
                x -= (width - w * H) / 2 / H;
            }
            if (h * W < height) {
                y -= (height - h * W) / 2 / W;
            }
        }
        this._viewBox = [x, y, w, h, !!fit];
        this._viewBoxShift = {
            dx: -x,
            dy: -y,
            scale: size
        };
        this.forEach(function(el) {
            el.transform("...");
        });
        return this;
    };
    var createNode;
    R._engine.initWin = function(win) {
        var doc = win.document;
        doc.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
        try {
            !doc.namespaces.rvml && doc.namespaces.add("rvml", "urn:schemas-microsoft-com:vml");
            createNode = R._createNode = function(tagName, attrs) {
                var el = doc.createElement('<rvml:' + tagName + ' class="rvml">'),
                prop;
                for (prop in attrs) {
                    el[prop] = Str(attrs[prop]);
                }
                return el;
            };
        } catch (e) {
            createNode = R._createNode = function(tagName, attrs) {
                var el = doc.createElement('<' + tagName + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">'),
                prop;
                for (prop in attrs) {
                    el[prop] = Str(attrs[prop]);
                }
                return el;
            };
        }
    };
    R._engine.initWin(R._g.win);
    R._engine.create = function() {
        var con = R._getContainer.apply(0, arguments),
        container = con.container,
        height = con.height,
        s,
        width = con.width,
        x = con.x,
        y = con.y;
        if (!container) {
            throw new Error("VML container not found.");
        }
        var res = new R._Paper,
        c = res.canvas = R._g.doc.createElement("div"),
        cs = c.style;
        x = x || 0;
        y = y || 0;
        width = width || 512;
        height = height || 342;
        res.width = width;
        res.height = height;
        width == +width && (width += "px");
        height == +height && (height += "px");
        res.coordsize = zoom * 1e3 + S + zoom * 1e3;
        res.coordorigin = "0 0";
        c.id = "raphael-paper-" + res.id;
        res.span = R._g.doc.createElement("span");
        res.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;";
        c.appendChild(res.span);
        cs.cssText = R.format("top:0;left:0;width:{0};height:{1};display:inline-block;cursor:default;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", width, height);
        if (container == 1) {
            R._g.doc.body.appendChild(c);
            cs.left = x + "px";
            cs.top = y + "px";
            cs.position = "absolute";
        } else {
            if (container.firstChild) {
                container.insertBefore(c, container.firstChild);
            } else {
                container.appendChild(c);
            }
        }
        res.renderfix = function() {
        };
        return res;
    };
    R.prototype.clear = function() {
        var c;
        eve("raphael.clear", this);
        while (c = this.bottom) {
            c.remove();
        }
        this.canvas.innerHTML = E;
        this.span = R._g.doc.createElement("span");
        this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
        this.canvas.appendChild(this.span);
        this.bottom = this.top = null;
    };
    R.prototype.remove = function() {
        var i;
        eve("raphael.remove", this);
        while (i = this.bottom) {
            i.remove();
        }
        this.canvas.parentNode.removeChild(this.canvas);
        for (i in this) {
            this[i] = typeof this[i] == "function" ? R._removedFactory(i) : null;
        }
        return true;
    };

    var setproto = R.st;
    for (var method in elproto)
        if (elproto[has](method) && !setproto[has](method)) {
            setproto[method] = (function(methodname) {
                return function() {
                    var arg = arguments;
                    return this.forEach(function(el) {
                        el[methodname].apply(el, arg);
                    });
                };
            })(method);
        }
}(window.Raphael);
