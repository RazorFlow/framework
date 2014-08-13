define([

],
    function () {
      var posUtils = {
        unitsToPixels: function (u, width) {
          return u / 12 * width;
        },
        unitsToPc: function (u) {
          return u * 100 / 12;
        },
        unitsToPcString: function (u) {
          return posUtils.unitsToPc(u) + "%";
        }
      };
      return posUtils;
    });