define(['vendor/lodash'], function (_) {
  var graphUtils = {
    /**
     * Takes an input domain and prettifies it
     * @param  Number min lowest number in the domain
     * @param  Number max highest number in the domain
     * @return Object output domain
     */
    prettyDomain: function (min, max) {

      if(min < 0 && max === 0) {
        max = -1;
      }

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
    },

    dualAxisDomain: function(lDomain, rDomain) {
      var prettyLDomain = graphUtils.prettyDomain(lDomain[0], lDomain[1]),
          prettyRDomain = graphUtils.prettyDomain(rDomain[0], rDomain[1]),
          i, numNegativeTicks, totalTicks, numPoistiveTicks, diff;

      if(prettyLDomain.ticks.indexOf(0) < prettyRDomain.ticks.indexOf(0)) {
        numNegativeTicks = prettyRDomain.ticks.indexOf(0) - prettyLDomain.ticks.indexOf(0);
        totalTicks = numNegativeTicks + prettyLDomain.numTicks;
        numPoistiveTicks = totalTicks < prettyRDomain.numTicks ? prettyRDomain.numTicks - totalTicks : 0;
        var newLDomain = [];
        for(i=-1; ++i<numNegativeTicks;) {
          newLDomain.push(prettyLDomain.min + prettyLDomain.unit * -(i+1));
        }
        newLDomain = newLDomain.reverse().concat(prettyLDomain.ticks);
        for(i=-1; ++i<numPoistiveTicks;) {
          newLDomain.push(prettyLDomain.max + prettyLDomain.unit * (i + 1));
        }
        if(prettyRDomain.numTicks < newLDomain.length) {
          diff = newLDomain.length - prettyRDomain.numTicks;
          for(i=-1; ++i<diff;) {
            prettyRDomain.ticks.push((i + 1) * prettyRDomain.unit + prettyRDomain.max);
          }
        }

        prettyLDomain.ticks = newLDomain;
        prettyLDomain.numTicks = newLDomain.length;
      } else {
        numNegativeTicks = prettyLDomain.ticks.indexOf(0) - prettyRDomain.ticks.indexOf(0);
        totalTicks = numNegativeTicks + prettyRDomain.numTicks;
        numPoistiveTicks = totalTicks < prettyLDomain.numTicks ? prettyLDomain.numTicks - totalTicks : 0;
        var newRDomain = [];
        for(i=-1; ++i<numNegativeTicks;) {
          newRDomain.push(prettyRDomain.min + prettyRDomain.unit * -(i+1));
        }
        newRDomain = newRDomain.reverse().concat(prettyRDomain.ticks);
        for(i=-1; ++i<numPoistiveTicks;) {
          newRDomain.push((prettyRDomain.unit * (i + 1)) + prettyRDomain.max);
        }
        if(prettyLDomain.numTicks < newRDomain.length) {
          diff = newRDomain.length - prettyLDomain.numTicks;
          for(i=-1; ++i<diff;) {
            prettyLDomain.ticks.push((i + 1) * prettyLDomain.unit + prettyLDomain.max);
          }
        }
        prettyRDomain.ticks = newRDomain;
        prettyRDomain.numTicks = newRDomain.length;
      }
      return {lDomain: prettyLDomain, rDomain: prettyRDomain};
    }
  };

  return graphUtils;
});