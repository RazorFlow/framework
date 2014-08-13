define(['vendor/lodash'], function(_) {
    var colorUtils = {
        darken: function(_color, intensity) {
          var color = Raphael.color(_color);
          return Raphael.hsl(color.h, color.s, color.l * ((100 - intensity) / 100));
        }
    };

    return colorUtils;
});