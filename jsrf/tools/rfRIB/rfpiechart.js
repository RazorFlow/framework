define(['graphics/rftooltip', 'constants/componentconstants', 'd3'],
    function (Tooltip, ComponentConstants, d3) {
      var RFPieChart = function () {
        var self = this,
            labels = null,
            data = null,
            displayValues = null,
            coreDiv = null,
            width = null,
            height = null,
            chartCanvas = null,
            donut = false,
            innerRadiusDistance = ComponentConstants.pieChart.innerRadiusDistance,
            profile = ComponentConstants.pieChart.profile,
            animationDuration = ComponentConstants.pieChart.animationDuration,
            padding = ComponentConstants.pieChart.padding,
            tooltip = new Tooltip(),
            dontAnimate = false,
            clickCallbacks = [],
            db = null;

        self.setData = function (l, d, dv) {
          labels = l;
          data = d;
          displayValues = dv;
        };

        self.setAnimation = function(b) {
          dontAnimate = !b;
        };

        self.updateData = function (l, d, dv) {
          self.setData(l, d, dv);

          drawData();
        };

        self.renderTo = function (c, w, h) {
          width = w;
          height = h;
          coreDiv = c;

          startRender();
        };

        self.resizeTo = function (w, h) {
          width = w;

          height = h;

          resizeDom();

          drawData();
          dontAnimate = (h ? true : dontAnimate);
        };

        var startRender = function () {
          coreDiv.empty();

          initialConfigureDom();

          resizeDom();

          drawData();
        };

        self.dispose = function () {
          chartCanvas.remove();
        };

        self.onItemClicked = function(cb) {
          clickCallbacks.push(cb);
        };

        self.linkToDashboard = function(_db) {
          db = _db;
        };

        var initialConfigureDom = function () {
          chartCanvas = d3.select(coreDiv[0])
              .append('svg');
          tooltip.setCore(chartCanvas);
        };

        var resizeDom = function () {
          chartCanvas.attr('width', width);
          chartCanvas.attr('height', height);
        };

        var drawData = function () {
          var radius = null,
              innerRadius = null,
              arc = null,
              pie = null,
              piecan = null,
              g = null,
              path = null,
              text = null,
              labelRadius = null,
              labelCollisionBoxes = [],
              factorWidth = Math.min(width, height),
              maxLabelLength = 12,
              maxLabelWidth = 0,
              sidePadding = 10;

          var media = db.pro.media.getCurrentMedia();

          var isMobile = (media === 'sm' || media === 'xs');


          for (var i = -1; ++i < labels.length;) {
            var l = Array.prototype.slice.call(labels[i], 0, maxLabelLength).join('') + ' : ' + data[i];

            var canary = chartCanvas.append('text')
                .text(l)
                .attr('style', 'font-size: 11px;');


            maxLabelWidth = _.max([canary.node().getBBox().width, maxLabelWidth]);

            canary.remove();
          }

          chartCanvas.selectAll('*').remove();
          if (!isMobile) {
            radius = (factorWidth / 2) - factorWidth * 0.1;
          } else {
            radius = factorWidth / 2 - sidePadding;
          }


          labelRadius = radius + radius * 0.1;

          if (!isMobile) {
            if (labelRadius + maxLabelWidth > width / 2) {
              var dw = (labelRadius + maxLabelWidth) - (width / 2) + 10 + padding;
              radius -= dw;
              labelRadius = radius + radius * 0.1;
            }
          }

          innerRadius = donut ? radius - innerRadiusDistance : 0;

          chartCanvas.append('g');

          arc = d3.svg.arc()
              .outerRadius(isMobile ? radius : radius - 10)
              .innerRadius(innerRadius);

          pie = d3.layout.pie()
              .sort(null)
              .value(function (d) {
                return d;
              });

          piecan = chartCanvas.append('g')
              .attr('class', 'piecan')
              .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

          g = piecan.selectAll(".arc")
              .data(pie(data))
              .enter().append("g")
              .attr("class", "arc");

          function arcTween(b) {
            b.innerRadius = 0;
            var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
            return function (t) {
              return arc(i(t));
            };
          }

          path = g.append("path")
              .attr("d", arc)
              .attr("data-label", function (d, idx) {
                return labels[idx];
              })
              .attr("data-displayValue", function (d, idx) {
                return displayValues[idx];
              })
              .attr("class", function (d, idx) {
                return 'chart-color-' + (idx + 1);
              });
          path.transition()
              .duration(dontAnimate ? 0 : animationDuration)
              .attrTween('d', arcTween);
          if (!Modernizr.touch) {
            path.on('mouseenter',function () {
              var ev = d3.event,
                  x = ev.pageX - coreDiv.offset().left,
                  y = ev.pageY - coreDiv.offset().top,
                  $el = d3.select(this),
                  label = $el.attr('data-label'),
                  value = $el.attr('data-displayValue'),
                  color = $el.attr('fill');

              tooltip.show();
              tooltip.update(value, label + ' : ', color, x, y);

            }).on("mousemove",function () {
              var ev = d3.event,
                  x = ev.pageX - coreDiv.offset().left,
                  y = ev.pageY - coreDiv.offset().top,
                  $el = d3.select(this),
                  label = $el.attr('data-label'),
                  value = $el.attr('data-displayValue'),
                  color = $el.attr('fill');
              tooltip.update(value, label + ' : ', color, x, y);
            }).on("mouseleave", function () {
              tooltip.hide();
            }).on('click', function() {
                var $el = d3.select(this),
                    label = $el.attr('data-label'),
                    value = $el.attr('data-displayValue');
              for(var i=-1; ++i<clickCallbacks.length;) {
                var cb = clickCallbacks[i];
                cb({
                  label: label,
                  value: value
                });
              }
            });
          } else {
            path.on("touchstart", function () {
              var ev = d3.mouse(this),
                  $el = d3.select(this),
                  left = $el.node().getBBox().x,
                  top = $el.node().getBBox().y,
                  label = $el.attr('data-label'),
                  value = $el.attr('data-displayValue'),
                  color = $el.attr('fill');
              tooltip.show();
              tooltip.update(value, label, color, (width / 2) + ev[0], (height / 2) + ev[1]);
            });
          }

          function correctPlacement(box) {
            if (box.x < width / 2) {
              box.x -= box.width;
            }
            return box;
          }

          function detectCollision(box1, box2) {
            var temp1 = correctPlacement(_.clone(box1)),
                temp2 = correctPlacement(_.clone(box2));

            if (temp1.x < temp2.x + temp2.width && temp1.x + temp1.width > temp2.x &&
                temp1.y < temp2.y + temp2.height && temp1.y + temp1.height > temp2.y) {
              return true;
            }

            return false;
          }

          function getClearPoint(box1, box2, origin) {
            var i = 0,
                rad,
                newX,
                newY,
                tempBox = _.clone(box2);
            while (detectCollision(box1, tempBox)) {
              rad = i * Math.PI / 180;
              newX = Math.cos(rad) * (tempBox.x - origin.x) - Math.sin(rad) * (tempBox.y - origin.y) + origin.x;
              newY = Math.sin(rad) * (tempBox.x - origin.x) + Math.cos(rad) * (tempBox.y - origin.y) + origin.y;
              tempBox.x = newX;
              tempBox.y = newY;
              i++;
            }
            if (i > 8) {
              i = 0;
              tempBox = _.clone(box2);
              while (detectCollision(box1, tempBox)) {
                rad = i * Math.PI / 180;
                newX = Math.cos(rad) * (tempBox.x - origin.x) - Math.sin(rad) * (tempBox.y - origin.y) + origin.x;
                newY = Math.sin(rad) * (tempBox.x - origin.x) + Math.cos(rad) * (tempBox.y - origin.y) + origin.y;
                tempBox.x = newX;
                tempBox.y = newY;
                i--;
              }
            }

            return tempBox;
          }

          function bringCorrectBox(collisionBox) {
            var cx = width / 2,
                cy = height / 2;

            for (var i = 0; i < labelCollisionBoxes.length; i++) {

              if (detectCollision(collisionBox, labelCollisionBoxes[i])) {
                collisionBox = getClearPoint(labelCollisionBoxes[i], collisionBox, {
                  x: cx,
                  y: cy
                });
              }
            }

            return collisionBox;
          }

          text = g.append("text")
              .attr("transform", function (d, idx) {
                var c = arc.centroid(d),
                    x = c[0],
                    y = c[1],
                    dx = x - width / 2,
                    dy = y - height / 2,
                    angle = Math.atan2(y, x) * 180 / Math.PI,
                    h = Math.sqrt(x * x + y * y),
                    _x = (x / h * labelRadius),
                    _y = (y / h * labelRadius),
                    label = labels[idx] + ' : ' + d.data;

                angle = x < 0 ? angle - 180 : angle;

                if (!isMobile) {
                  var canary = chartCanvas.append('text')
                      .text(label)
                      .attr('style', 'font-size: 11px;');
                  var boxWidth = canary.node().getBBox().width + 15;
                  var boxHeight = canary.node().getBBox().height;

                  var collisionBox = {
                    x: _x + width / 2,
                    y: _y + height / 2,
                    width: boxWidth,
                    height: boxHeight,
                    text: labels[idx] + ' : ' + d.data,
                    idx: idx
                  };
                  // Label bounding box vizualization code uncomment to see the bounding boxes
                  // chartCanvas.append('rect')
                  //             .attr('x', collisionBox.x < width / 2 ? collisionBox.x - collisionBox.width : collisionBox.x)
                  //             .attr('y', collisionBox.y - boxHeight / 2)
                  //             .attr('width', collisionBox.width)
                  //             .attr('height', collisionBox.height)
                  //             .attr('stroke', 'red')
                  //             .attr('fill', 'none');

                  var correctCollisionBox = bringCorrectBox(collisionBox);
                  labelCollisionBoxes.push(correctCollisionBox);

                  canary.remove();

                  return "translate(" + (correctCollisionBox.x - width / 2) + ',' + (correctCollisionBox.y - height / 2) + ")";
                } else {
                  return "translate(" + x + ',' + y + ")rotate(" + angle + ")";
                }
              })
              .attr("dy", "0.3em")
              .attr('style', 'font-size: 11px;')
              .style("text-anchor", function (d, idx) {
                if (!isMobile) {
                  var c = arc.centroid(d);
                  if (labelCollisionBoxes[idx].x < width / 2) {
                    return 'end';
                  } else {
                    return 'start';
                  }
                } else {
                  return 'middle';
                }


              })
              .style("pointer-events", "none")
              .attr('fill', function () {
                if (!isMobile) {
                  return '#666';
                } else {
                  return '#FFF';
                }
              })
              .text(function (d, idx) {
                if (isMobile) {
                  return labels[idx];
                } else {
                  return labels[idx] + ' : ' + d.data;
                }
              });

          if (!isMobile) {
            text.attr('dx', function (d, idx) {
              if (labelCollisionBoxes[idx].x < width / 2) {
                return -15;
              } else {
                return 15;
              }
            });

            var line1 = g.append("line")
                .attr('class', 'line1')
                .attr('x1', function (d, idx) {
                  return labelCollisionBoxes[idx].x - width / 2;
                })
                .attr('y1', function (d, idx) {
                  return labelCollisionBoxes[idx].y - height / 2;
                })
                .attr('x2', function (d, idx) {
                  var _x = labelCollisionBoxes[idx].x - width / 2;

                  if (_x < 0) {
                    return _x - 10;
                  } else {
                    return _x + 10;
                  }
                })
                .attr('y2', function (d, idx) {
                  return labelCollisionBoxes[idx].y - height / 2;
                })
                .attr('stroke', 'black');

            var line2 = g.append("line")
                .attr('class', 'line2')
                .attr('x1', function (d, idx) {
                  return labelCollisionBoxes[idx].x - width / 2;
                })
                .attr('y1', function (d, idx) {
                  return labelCollisionBoxes[idx].y - height / 2;
                })
                .attr('x2', function (d, idx) {
                  var c = arc.centroid(d),
                      x = c[0],
                      y = c[1],
                      h = Math.sqrt(x * x + y * y),
                      _x = (x / h * (radius - 10)),
                      _y = (y / h * (radius - 10));

                  return _x;
                })
                .attr('y2', function (d, idx) {
                  var c = arc.centroid(d),
                      x = c[0],
                      y = c[1],
                      h = Math.sqrt(x * x + y * y),
                      _x = (x / h * (radius - 10)),
                      _y = (y / h * (radius - 10));

                  return _y;
                })
                .attr('stroke', 'black');
          }
        };

        var translateString = function (x, y) {
          return "translate(" + x + "," + y + ")";
        };
      };

      return RFPieChart;
    });
