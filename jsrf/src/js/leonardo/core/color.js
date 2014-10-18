define([], function () {
    var Color = function (color) {
        this.r = 0;
        this.g = 0;
        this.b = 0;
        if(color.match(/#[[0-9A-Fa-f]{6}/)) {
            this.fromHex (color);
        }
    };

    Color.prototype.fromHex = function (hex) {
        hex = hex.replace('#', '').toUpperCase();
        var matches = hex.match(/([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})/);
        this.r = parseInt (matches[1], 16);
        this.g = parseInt (matches[2], 16);
        this.b = parseInt (matches[3], 16);
        var hsl = rgb2hsl(this.r, this.g, this.b);
        this.h = hsl[0];
        this.s = hsl[1];
        this.l = hsl[2];
        return this;
    };

    Color.prototype.darken = function (per) {
        this.l *= 1-per;
        var rgb = hsl2rgb (this.h, this.s, this.l);
        this.r = rgb[0];
        this.g = rgb[1];
        this.b = rgb[2];
        return this;
    };

    Color.prototype.toHex = function () {
        var hexStr = '#';
        hexStr += this.r.toString(16).toUpperCase();
        hexStr += this.g.toString(16).toUpperCase();
        hexStr += this.b.toString(16).toUpperCase();
        return hexStr;
    };

    function rgb2hsl(r, g, b){
        r /= 255, g /= 255, b /= 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;

        if(max == min){
            h = s = 0; // achromatic
        }else{
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch(max){
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return [h, s, l];
    }

    function hsl2rgb(h, s, l){
        var r, g, b;

        if(s == 0){
            r = g = b = l; // achromatic
        }else{
            function hue2rgb(p, q, t){
                if(t < 0) t += 1;
                if(t > 1) t -= 1;
                if(t < 1/6) return p + (q - p) * 6 * t;
                if(t < 1/2) return q;
                if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            }

            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }

        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }

    return Color;
});