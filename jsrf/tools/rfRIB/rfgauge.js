define(['constants/componentconstants', 'd3'],
    function (ComponentConstants, d3) {
      var RFGauge = function () {
        var self = this,
            caption = '',
            subcaption = '',
            min = 0,
            max = 100,
            value = 50,
            width = null,
            height = null,
            coreDiv = null,
            $canvas = null,
            $container = null,
            $gaugeLayer = null,
            $textLayer = null,
            $gaugeBack = null,
            $gaugeFill = null,
            $mincaption = null,
            $maxcaption = null,
            $caption = null,
            $subcaption = null,
            $innerCircle = null,
            $triline1 = null,
            $triline2 = null,
            containerSize = null,
            startAngle = ComponentConstants.gauge.startAngle,
            endAngle = ComponentConstants.gauge.endAngle,
            fontSize = ComponentConstants.gauge.fontSize,
            arcWidth = ComponentConstants.gauge.arcWidth,
            xPadding = ComponentConstants.gauge.xPadding,
            animationDuration = ComponentConstants.gauge.animationDuration,
            dontAnimate = false;

        /**
         * Sets the parameters required to draw a gauge
         * @param  {string} _caption    The main caption of the gauge
         * @param  {string} _subcaption The sub caption of the gauge
         * @param  {number} _min        The minimum value of the gauge's range
         * @param  {[type]} _max        The maximum value of the gauge's range
         * @param  {[type]} _value      The current value of the gauge's range
         */
        self.setData = function (_caption, _subcaption, _min, _max, _value) {
          caption = _caption;
          subcaption = _subcaption;
          min = _min;
          max = _max;
          value = _value;
        };

        /**
         * Updates the parameters of the gauge after it is drawn
         * @param  {string} _caption    The main caption of the gauge
         * @param  {string} _subcaption The sub caption of the gauge
         * @param  {number} _min        The minimum value of the gauge's range
         * @param  {[type]} _max        The maximum value of the gauge's range
         * @param  {[type]} _value      The current value of the gauge's range
         */
        self.updateData = function (_caption, _subcaption, _min, _max, _value) {
          // call setData to set the values of the gauge
          self.setData(_caption, _subcaption, _min, _max, _value);

          // Just update the values in the gauge
          updateValues();

          // Redraw the gauge
          initialDrawData();
        };

        self.updateValue = function (_value, firstDraw) {

          updateValue(_value, firstDraw);

        };

        self.renderTo = function (c, w, h) {
          width = w - w * xPadding;
          height = h;
          coreDiv = c;
          startRender();
        };

        self.resizeTo = function (w, h) {
          width = w;
          height = h;
          startRender();
        };

        /**
         * @group dependsOnSize
         */
        var startRender = function () {
          // empty the core
          coreDiv.empty();
          initialConfigureDom();
          resizeDom();
          initialDrawData();
        };

        var updateValue = function (_value, firstDraw) {
          var arcFunction = null,
              cx = width / 2,
              cy = height / 2,
              arcRadius = containerSize / 2,
              startAngleInDegrees = startAngle * 180 / Math.PI,
              endAngleInDegrees = endAngle * 180 / Math.PI;

          arcFunction = d3.svg.arc()
              .innerRadius(arcRadius)
              .outerRadius(arcRadius - arcRadius * arcWidth) // 30% of the outer arc
              .startAngle(function (d) {
                return d.startAngle;
              })
              .endAngle(function (d) {
                return d.endAngle;
              });
          arcTween = function (b) {
            var i = d3.interpolate({
              endAngle: firstDraw ? startAngle : (((Math.abs(startAngle * 2 / Math.PI) + Math.abs(endAngle * 2 / Math.PI)) * (value / (max - min))) + (startAngle * 2 / Math.PI)) * (Math.PI / 2)
            }, b);
            return function (t) {
              return arcFunction(i(t));
            };
          };
          var startValue = firstDraw ? 0 : value;

          if (dontAnimate) {
            $caption.text(_value);
          } else {
            d3.timer(function (d) {
              if (d >= animationDuration) {
                $caption.text(_value);
                return true;
              }
              var newValue = Math.floor(startValue + (_value - startValue) * d / animationDuration);
              $caption.text(newValue);
            });
          }

          $gaugeFill.data([
                {
                  color: 'gray',
                  startAngle: startAngle,
                  endAngle: (((Math.abs(startAngle * 2 / Math.PI) + Math.abs(endAngle * 2 / Math.PI)) * (_value / (max - min))) + (startAngle * 2 / Math.PI)) * (Math.PI / 2)
                }
              ])
              .transition()
              .duration(0)
              .attr('d', function (d) {
                return arcFunction(d);
              });

          $gaugeFill.transition()
              .ease('linear')
              .duration(dontAnimate ? 0 : animationDuration)
              .attrTween("d", arcTween);

        };

        self.dispose = function () {

        };

        var initialConfigureDom = function () {
          $canvas = d3.select(coreDiv[0])
              .append('svg');
          $container = $canvas.append('g')
              .attr('class', 'gauge-container');
          $gaugeLayer = $container.append('g')
              .attr('class', 'gauge-layer');
          $textLayer = $container.append('g')
              .attr('class', 'text-layer');
        };

        var resizeDom = function () {
          if (width > 0 && height > 0) {
            $canvas.attr('width', width);
            $canvas.attr('height', height);
            containerSize = (width < height) ? width : height;
          }
        };

        var initialDrawData = function () {
          var arcFunction = null,
              cx = width / 2,
              cy = height / 2,
              arcRadius = containerSize / 2,
              startAngleInDegrees = startAngle * 180 / Math.PI,
              endAngleInDegrees = endAngle * 180 / Math.PI,
              innerCircleRadius = arcRadius * 0.5,
              arrowRadius = innerCircleRadius + innerCircleRadius * 0.2;

          $innerCircle = $textLayer.append('circle')
              .attr('class', 'innerCircle')
              .attr('stroke', 'rgb(235,235,235)')
              .attr('fill', 'rgb(235,235,235)');
          $arrowPath = $textLayer.selectAll('path').data([0]).enter().append('path')
              .attr('d', function (d, idx) {
                d = startAngleInDegrees;
                var arrowSize = arcRadius * 0.5;
                var arrowHalfSize = arrowSize / 2;
                return ('M' + '0,-' + arrowHalfSize +
                    ' l -'+arrowHalfSize+',' + arrowHalfSize +
                    ' l '+arrowSize+',0');
              })
              .attr('fill', 'rgb(235,235,235)')
              .attr('transform', 'translate(' + (cx + calculateX(innerCircleRadius - 5, startAngleInDegrees)) + ',' + (cy + calculateY(innerCircleRadius - 5, startAngleInDegrees)) + ')rotate(' + startAngleInDegrees + ')');

          $caption = $textLayer.append('text')
              .attr('class', 'caption')
              .text(value)
              .attr('text-anchor', 'middle')
              .attr('font-size', containerSize / 4 + 'px');

          $subcaption = $textLayer.append('text')
              .attr('class', 'subcaption')
              .text(subcaption)
              .attr('text-anchor', 'middle')
              .attr('font-size', containerSize / 16 + 'px');

          $mincaption = $textLayer.append('text')
              .attr('class', 'mincaption')
              .text(min)
              .attr('text-anchor', 'middle')
              .attr('font-size', containerSize / 16 + 'px');

          $maxcaption = $textLayer.append('text')
              .attr('class', 'maxcaption')
              .text(max)
              .attr('text-anchor', 'middle')
              .attr('font-size', containerSize / 16 + 'px');


          // Call update data to draw all the data lines
          updateData();
        };

        var updateData = function () {
          var arcFunction = null,
              cx = width / 2,
              cy = height / 2,
              arcRadius = containerSize / 2,
              startAngleInDegrees = startAngle * 180 / Math.PI,
              endAngleInDegrees = endAngle * 180 / Math.PI,
              innerCircleRadius = arcRadius * 0.5,
              arrowRadius = innerCircleRadius + innerCircleRadius * 0.2;

          arcFunction = d3.svg.arc()
              .innerRadius(arcRadius)
              .outerRadius(arcRadius - arcRadius * arcWidth) // 30% of the outer arc
              .startAngle(function (d) {
                return d.startAngle;
              })
              .endAngle(function (d) {
                return d.endAngle;
              });


          $gaugeBack = $gaugeLayer.selectAll('path.back')
              .data([
                {
                  color: 'gray',
                  startAngle: startAngle,
                  endAngle: endAngle
                }
              ])
              .enter()
              .append('path')
              .attr('class', 'back')
              .attr('d', function (d) {
                return arcFunction(d);
              })
              .attr("transform", "translate(" + cx + "," + cy + ")")
              .attr("fill", function (d) {
                return 'rgb(235,235,235)';
              });
          // .attr("filter", "url(#shadow)");

          $gaugeFill = $gaugeLayer.selectAll('path.main')
              .data([
                {
                  color: 'green',
                  startAngle: startAngle,
                  endAngle: startAngle
                }
              ])
              .enter()
              .append('path')
              .attr('class', 'main')
              .attr("fill", function (d) {
                return 'rgb(112, 207, 1)';
              })
              .attr("transform", "translate(" + cx + "," + cy + ")");

          $caption.attr('transform', 'translate(' + cx + ', ' + cy + ')')
              .attr('dy', containerSize / 10);


          self.updateValue(value, true);
          $innerCircle.attr('transform', 'translate(' + cx + ', ' + cy + ')');

          $innerCircle.attr('r', innerCircleRadius);

          var currentAngle = startAngleInDegrees + (endAngleInDegrees - startAngleInDegrees) * value / (max - min),
              newAngle;

          if (dontAnimate) {
            newAngle = startAngleInDegrees + ((180 + currentAngle) - (180 + startAngleInDegrees) );
            $arrowPath.attr('transform', 'translate(' + (cx + calculateX(innerCircleRadius - 5, newAngle)) + '1,' + (cy + calculateY(innerCircleRadius - 5, newAngle)) + ')rotate(' + newAngle + ')');
          } else {
            d3.timer(function (d) {
              if (d >= animationDuration) {
                newAngle = startAngleInDegrees + ((180 + currentAngle) - (180 + startAngleInDegrees) );
                $arrowPath.attr('transform', 'translate(' + (cx + calculateX(innerCircleRadius - 5, newAngle)) + '1,' + (cy + calculateY(innerCircleRadius - 5, newAngle)) + ')rotate(' + newAngle + ')');
                dontAnimate = (height ? true : dontAnimate);
                return true;
              }
              newAngle = startAngleInDegrees + ((180 + currentAngle) - (180 + startAngleInDegrees) ) * d / animationDuration;
              $arrowPath.attr('transform', 'translate(' + (cx + calculateX(innerCircleRadius - 5, newAngle)) + ',' + (cy + calculateY(innerCircleRadius - 5, newAngle)) + ')rotate(' + newAngle + ')');
            });
          }
        };

        var translateString = function (x, y) {
          return "translate(" + x + "," + y + ")";
        };

        var calculateY = function (r, angle) {
          return -r * Math.cos(angle * Math.PI / 180);
        };

        var calculateX = function (r, angle) {
          return -(-r * Math.sin(angle * Math.PI / 180));
        };

        var rotateString = function (deg, x, y) {
          return "rotate(" + deg + "," + x + "," + y + ")";
        };
      };

      return RFGauge;
    });
