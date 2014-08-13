define([], function () {
  var graphicUtils = {
    /**
     * Takes an input domain and prettifies it
     * @param  Number min lowest number in the domain
     * @param  Number max highest number in the domain
     * @return Object output domain
     */
    prettyDomain: function (min, max) {
      var negateFlag = false,
          negateInvert = false;

      min = typeof min === "undefined" ? 0 : min;
      max = typeof max === "undefined" ? 100 : max;

      function log10(val) {
        return Math.log(val) / Math.LN10;
      }

      var newMin = min,
          newMax = max,
          exponent = Math.floor(log10(newMax)),
          magnitude = Math.pow(10, exponent),
          u = [1.25, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10],
          m = newMax / magnitude,
          nu = 0,
          _2 = [],
          _5 = [],
          unit = null,
          uo = null,
          ticks = [],
          i = 0,
          val = 0;

      function getNewMax(newMax, m, u) {
        for (i = 0; i < u.length; i++) {
          if (m < u[i]) {
            nu = u[i];
            if (u[i] - m <= 0.2) {
              var nextU = u[i + 1];
              if (!u[i + 1]) {
                nextU = u[0] * 10;
              }
              nu = nextU;

            }
            newMax = nu * magnitude;
            return newMax;
          }
        }
      }

      if (min < 0) {
        if (-min > max) {
          exponent = Math.floor(log10(-min));
          magnitude = Math.pow(10, exponent);
          m = -min / magnitude;

          newMin = -newMax;
          newMax = getNewMax(-min, m, u);
          negateInvert = true;
          negateFlag = true;
        } else {
          newMin = min;
          newMax = getNewMax(newMax, m, u);
          negateFlag = true;
        }
      } else {
        newMax = getNewMax(newMax, m, u);
      }


      for (i = 3; i <= 6; i++) {
        unit = ((nu / i) * magnitude) / 10;
        var mul = 10;

        if (unit < 0.1) {
          unit *= 1000;
          mul = 0.01;
        }
        else if (unit < 1) {
          unit *= 100;
          mul = 0.1;
        } else if (unit <= 2.5) {
          unit *= 10;
          mul = 1;
        }
        if (nu > 10) {
          unit *= 10;
          mul = 1;
          if (magnitude === 10) {
            mul = 0.1;
          }

        }

        if (unit % 5 === 0) {
          _5.push({
            unit: unit * mul,
            num: i
          });
        } else if (unit % 2 === 0) {
          _2.push({
            unit: unit * mul,
            num: i
          });
        }
      }

      if (_5.length) {
        uo = _.min(_5, function (d) {
          return d.unit;
        });
      } else {
        uo = _.min(_2, function (d) {
          return d.unit;
        });
      }

      if (negateFlag) {
        if (negateInvert) {

          for (i = uo.num; i >= 0; i--) {
            ticks.push(i * uo.unit * -1);
          }
          val = 0;

          while (val <= -newMin) {
            val += uo.unit;
            ticks.push(val);
          }
        } else {
          val = 0;
          while (val <= -newMin) {
            val += uo.unit;
            ticks.push(val * -1);
          }
          ticks = ticks.reverse();
          for (i = 0; i < uo.num + 1; i++) {
            ticks.push(i * uo.unit);
          }
        }
      } else {
        for (i = 0; i < uo.num + 1; i++) {
          ticks.push(i * uo.unit);
        }
      }

      return {
        min: ticks[0],
        max: ticks[ticks.length - 1],
        numTicks: ticks.length,
        unit: uo.unit,
        ticks: ticks
      };
    }
  };

  return graphicUtils;
});
