
/* jshint -W083 */
define([
  'graphics/rftooltip',
  'utils/graphicutils',
  'utils/numberformatter',
  'utils/browserutils',
  'graphics/wrapgenius',
  'constants/componentconstants',
  'd3'], function (RFTooltip, graphicUtils, NumberFormatter, browserUtils, wrapGenius, ComponentConstants, d3) {
  var chart_profiles = ComponentConstants.chart_profiles;
  var RFChart = function () {
    var self = this,
        config = {},
        data = [],
        labels = [],
        width = 1, containerWidth,
        height = 1, containerHeight,
        coreDiv = $("<div/>"),
        chartCanvas = null, chartContainer = null, chartCore = null,
        xScale,
        yScale,
        xAxis,
        yAxis,
        yAxisWidth,
        yGrid,
        dataByType = {},
        displayValuesByType = {},
        colorsByType = {},
        i,
        seriesCanvas = {
          'column': []
        },
        profile = chart_profiles['chart'],
        pd,
        series = [],
        displayValues,
        plotBands,
        yAxisContainer,
        yAxisNameContainer,
        yAxisName = "",
        showYAxisNameFlag = false,
        calcPaddingLeft = profile.paddingLeft,
        yGridLines,
        xGridLines,
        labelHeight = null,
        clickCallbacks = [],
        dontAnimate = false,
        oneStepAnimationDuration = ComponentConstants.chart.animationDuration,
        twoStepAnimationDuration = 600,
        mouseMap = [],
        chartCanvasOffset = null,
        yAxisProperties = null,
        currentZoom = 1,
        tooltip = new RFTooltip({
        }),
        seriesData = null,
        thisCanvas = null,
        db = null;

    self.configure = function (cfg) {
      config = cfg;
    };

    self.setAnimation = function (animateBool) {
      dontAnimate = !animateBool;
    };

    self.setProfile = function (_profile) {
      var t = chart_profiles[_profile];

      // reset some of the parameters
      calcPaddingLeft = t.paddingLeft;
      calcPaddingRight = t.paddingRight;

      if (t) {
        profile = t;
      } else {
        console.error('profile ' + _profile + ' doesn\'t exist');
      }
    };

    self.setData = function (l, d, s, dv) {
      labels = l;
      data = d;
      series = s;
      displayValues = dv;
    };

    self.setYAxisProperties = function (props) {
      yAxisProperties = props;
    };
    // rf.logger.rfLog('Inside the rfgraph2!');
    self.updateData = function (l, d, dv) {
      self.setData(l, d, series, dv);

      // No need to do a full resize, just tweak the axes and scales
      //
      if (profile.dualStageAnimate) {
        splitDataIntoTypes();
        updateData();

        setTimeout(function () {
          configureScales();

          if (profile.drawAxesFlag) {
            configureAxes();
          }

          splitDataIntoTypes();

          updateData();

        }, twoStepAnimationDuration);

      } else {
        configureScales();

        if (profile.drawAxesFlag) {
          configureAxes();
        }

        splitDataIntoTypes();

        updateData();
      }


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

      // dontAnimate = true;
      resizeDom();

      if(dontAnimate === false) {
        resetAnimPositions();
      }

      updateData();
      // dontAnimate = false;
    };

    self.setYAxisName = function (name) {
      // If profile forbids it, don't draw the y axis name
      showYAxisNameFlag = profile.drawYAxisNameFlag;
      yAxisName = name;
    };

    self.onItemClicked = function (callback) {
      clickCallbacks.push(callback);

    };

    /**
     * @group dependsOnSize
     */
    var startRender = function () {
      // empty the core


      coreDiv.empty();
      initialConfigureDom();

      // setTimeout(function() {

      resizeDom();
      initialDrawData();
      // }, 50);
    };

    self.dispose = function () {
      chartContainer.remove();
    };

    self.linkToDashboard = function(_db) {
      db = _db;
    };

    var resetAnimPositions = function() {
      for (i = 0; i < dataByType['column'].length; i++) {
        var seriesData = dataByType['column'][i],
            color = colorsByType['column'][i];

        seriesCanvas['column'][i].selectAll("rect")
            .data(seriesData)
            .attr("y", yScale(0))
            .attr("height", 0);
      }

      for (i = 0; i < dataByType['line'].length; i++) {
        var seriesData = dataByType['line'][i],
            color = colorsByType['line'][i];

         seriesCanvas['line'][i].selectAll("line")
            .data(seriesData.slice(0, seriesData.length - 1))
            .attr("y1", yScale(0))
            .attr("y2", yScale(0));

         seriesCanvas['line'][i].selectAll("circle")
            .data(seriesData)
            .attr("cy", yScale(0));
      }
    };

    var initialConfigureDom = function () {
      // Create the SVG canvas
      chartCanvas = d3.select(coreDiv[0])
          .append('svg');
      chartCanvasOffset = coreDiv.offset();
      // var defs = chartCanvas.append("defs");
      // rf.RFSvgUtils.createInnerShadowFilter (defs, "inner-shadow");

      // Area for holding the chart, including the axes
      chartContainer = chartCanvas.append('g')
          .attr('class', 'chart-container');


      yScale = d3.scale.linear();
      xScale = d3.scale.ordinal();

      configureScales();

      if (profile.drawAxesFlag) {
        // be sure to configure scales to allow for pretty domain bands
        initializeAxes();
      }

      // Area for holding the core of the chart itself
      // Note: this has to be appended last to affect the SVG Z-index like thingy
      chartCore = chartContainer.append('g')
          .attr('class', 'chart-core');
      tooltip.setCore(chartCore);
    };

    var resizeDom = function () {
      containerWidth = width - calcPaddingLeft - profile.paddingRight;
      containerHeight = height - profile.paddingTop - profile.paddingBottom;

      chartContainer = chartContainer.attr('transform', translateString(calcPaddingLeft, profile.paddingTop));

      chartCanvas
          .attr('width', width)
          .attr('height', height);

      chartCanvas.select('.chart-container')
          .attr('width', containerWidth)
          .attr('height', containerHeight);

      chartCanvas.select('.chart-core')
          .attr('width', containerWidth)
          .attr('height', containerHeight);

      if (profile.drawAxesFlag) {
        reconfigureHeight();
      }


      configureScales();

      if (profile.drawAxesFlag) {
        var tAnim = dontAnimate;
        dontAnimate = true;
        configureAxes();
        dontAnimate = tAnim;
      }
    };

    var drawYAxisName = function (yAxisContainer) {
      var width = !browserUtils.isIE() ? yAxisContainer.node().getBBox().width : yAxisContainer.node().getBoundingClientRect().width;

      if (yAxisProperties.axisName) {
        yAxisName = yAxisContainer.select('.yAxisName');

        if (yAxisName[0][0]) {
          yAxisName.select('text')
              .attr('x', -containerHeight / 2);
        } else {
          yAxisContainer.append('g')
              .attr('class', 'yAxisName')
              .attr('transform', 'translate(0,0)')
              .append('text')
              .text(yAxisProperties.axisName)
              .attr('style', 'text-anchor:middle;font-size:' + profile.yAxisLabelSize + 'px;')
              .attr('transform', 'rotate(-90)')
              .attr('x', -containerHeight / 2)
              .attr('y', -width)
              .attr('dy', -profile.yAxisLabelHeight);
        }
      }
    };

    /**
     * Checks the labels if they can be split into multiple lines and
     * reconfigures the height of the container
     */
    var reconfigureHeight = function () {
      // Create temporary scale and draw the xaxis
      var tXScale = xScale,
          tYScale = yScale,
          tXAxis = null,
          tYAxis = null,
          _tYAxis = null,
          yAxisWidth = null,
          prevXAxisHeight = null,
          xAxisHeight = null;

      configureScales();


      tYScale = yScale;

      tXAxis = d3.svg.axis()
          .scale(tXScale)
          .orient("bottom");

      tYAxis = d3.svg.axis()
          .scale(tYScale)
          .orient("left")
          .tickFormat(function (val) {
            var numberFormatter = new NumberFormatter();

            numberFormatter.setConfig(yAxisProperties);

            return numberFormatter.formatValue(val);
          });

      _tYAxis = yAxisContainer.select('g.tYAxis');


      _tYAxis = yAxisContainer.append('g')
          .attr('class', 'tYAxis');


      _tYAxis.attr('transform', translateString(0, 0))
          .call(tYAxis);


      _tYAxis.selectAll('line').remove();

      drawYAxisName(_tYAxis);

      yAxisWidth = _tYAxis.node().getBBox().width;


      _tYAxis.remove();

      tXScale.rangeBands([0, containerWidth - yAxisWidth], profile.xAxisItemPadding)
          .domain(labels);

      chartCanvas.append('g')
          .attr('class', 'dummyXAxis')
          .attr('transform', translateString(0, 0))
          .call(tXAxis);

      // The height of the container before the labels are broken
      prevXAxisHeight = chartCanvas.select('.dummyXAxis').node().getBBox().height;

      // if(profile.wrapLabelsFlag) {
      //     // Breaks the label into multiple lines and create tspans for them
      //     rf.utils.breakLabels (chartCanvas.select('.xAxis'), tXScale.rangeBand());
      // }

      // // The height of the container after the labels have been broken
      // xAxisHeight = chartContainer.select('.xAxis')[0][0].getBBox().height;
      // xAxisHeight = rf.utils.getHeight (chartCanvas.select('.dummyXAxis'), tXScale.rangeBand(), coreDiv);

      labelHeight = xAxisHeight;

      chartCanvas.select('.dummyXAxis').remove();

      xAxisHeight = wrapGenius.getHeight(labels, tXScale.rangeBand(), containerHeight);

      // Readjust the height of the container
      containerHeight -= (xAxisHeight - prevXAxisHeight);
    };

    var initializeAxes = function () {
      yAxisContainer = chartContainer.append("g")
          .attr('class', 'yAxis');
      chartContainer.append("g")
          .attr('class', 'xAxis');

      if (showYAxisNameFlag) {
        yAxisNameContainer = chartCanvas.append("g")
            .attr('class', "yAxisNameContainer");

        yAxisNameContainer.append('text')
            .attr('class', 'yAxisLabel rfText')
            .attr("transform", "rotate(270)")
            .text(yAxisName);


        calcPaddingLeft += profile.yAxisNameWidth;
      }

      if (profile.showGridLineFlag) {
        yGridLines = chartContainer.append("g")
            .attr('class', 'yGridLines');
      }

      if (profile.prettifyDomain) {
        // The plot bands
        // plotBands = yAxisContainer.insert('g')
        //         .attr('class', 'plotBands');

        // plotBands.selectAll('rect')
        //         .data(pd.ticks.slice(0, pd.ticks.length - 1))
        //         .enter()
        //         .append('rect');
      }
    };

    var configureAxes = function () {
      var _yAxis,
          _yGrid,
          animationDuration = (profile.dualStageAnimate) ? twoStepAnimationDuration : oneStepAnimationDuration;

      yAxis = d3.svg.axis()
          .scale(yScale)
          .orient("left")
          .tickFormat(function (val) {
            var numberFormatter = new NumberFormatter();
            numberFormatter.setConfig(yAxisProperties);

            return numberFormatter.formatValue(val);
          });

      yGrid = d3.svg.axis()
          .scale(yScale)
          .orient("right");


      if (profile.prettifyDomain) {
        yAxis = yAxis.tickValues(pd.ticks);
        yGrid = yGrid.tickValues(pd.ticks);
      }

      xAxis = d3.svg.axis()
          .scale(xScale)
          .orient("bottom");


      _yAxis = yAxisContainer.select('g.yAxis');

      if (!_yAxis[0][0]) {
        _yAxis = yAxisContainer.append('g')
            .attr('class', 'yAxis');
      }

      _yGrid = yAxisContainer.select('g.yGrid');

      if (!_yGrid[0][0]) {
        _yGrid = yAxisContainer.append('g')
            .attr('class', 'yGrid');
      }


      _yAxis.attr('transform', translateString(0, 0))
          .transition()
          .duration(dontAnimate ? 0 : animationDuration)
          .call(yAxis);

      _yAxis.selectAll('line').remove();

      drawYAxisName(_yAxis);

      yAxisWidth = !browserUtils.isIE() ? _yAxis[0][0].getBBox().width : _yAxis[0][0].getBoundingClientRect().width;

      if (profile.showGridLineFlag) {
        yGrid = yGrid.tickSize(containerWidth - yAxisWidth);
      }

      _yGrid.attr('transform', translateString(yAxisWidth, 0))
          .transition()
          .duration(dontAnimate ? 0 : animationDuration)
          .call(yGrid);

      _yGrid.selectAll('text').remove();

      xScale.rangeBands([0, containerWidth - yAxisWidth], profile.xAxisItemPadding)
          .domain(labels);


      _yAxis.attr('transform', translateString(yAxisWidth, 0));

      chartCanvas.select('.chart-core')
          .attr('transform', translateString(yAxisWidth, 0));

      chartCanvas.select('.xAxis')
          .attr('transform', translateString(yAxisWidth, yScale.range()[0]))
          .call(xAxis);

      if (profile.wrapLabelsFlag) {
        // rf.utils.breakLabels (chartCanvas.select('.xAxis'), xScale.rangeBand());
        // rf.utils.breakLabels (chartCanvas.select('.xAxis'), xScale.rangeBand(), coreDiv);
        wrapGenius.breakLabels(chartCanvas.select('.xAxis'), xScale.rangeBand(), containerHeight);
      }

      if (profile.prettifyDomain) {
        var numTicks = pd.ticks.length,
            shadeHeight = yScale(pd.ticks[0]) - yScale(pd.ticks[1]);

        // plotBands.selectAll('rect')
        //         .data(pd.ticks.slice(0, numTicks - 1))
        //         .attr('y', function(d, i) {
        //             return yScale(pd.ticks[numTicks - i - 1]);
        //         })
        //         .attr('fill', function(d, i) {
        //             if(i % 2 === 0) {
        //                 return '#eee';
        //             } else {
        //                 return 'transparent';
        //             }
        //         })
        //         .attr('width', containerWidth)
        //         .attr('height', shadeHeight);
      }

      // Show y axis name
      if (showYAxisNameFlag) {
        yAxisNameContainer = yAxisNameContainer.attr("transform", translateString(profile.yAxisNameWidth, width * 0.6));
      }

      chartContainer.selectAll('.xAxis text').on('mousemove', function () {
        var ev = d3.event,
            x = ev.pageX - coreDiv.offset().left - (calcPaddingLeft + yAxisWidth),
            y = ev.pageY - coreDiv.offset().top - profile.paddingTop - 60,
            text = d3.select(this).text();
        if (d3.select(this).attr('data-tooltip') === 'true') {
          tooltip.show();
          tooltip.update('', d3.select(this).attr('data-full-text'), '#000', x, y);
        }
      });

      chartContainer.selectAll('.xAxis text').on('touchstart', function () {
        var ev = d3.event,
            x = ev.pageX - coreDiv.offset().left - (calcPaddingLeft + yAxisWidth),
            y = ev.pageY - coreDiv.offset().top - profile.paddingTop - 60,
            text = d3.select(this).text();
        if (d3.select(this).attr('data-tooltip') === 'true') {
          tooltip.show();
          tooltip.update('', d3.select(this).attr('data-full-text'), '#000', x, y);
        }
      });

      chartContainer.select('.xAxis text').on('mouseout', function () {
        tooltip.hide();
      });
    };

    var configureScales = function () {
      // flatten data to get an array of all values
      var allValues = _.flatten(data), min, max;

      if (profile.prettifyDomain) {
        // Create a pretty domain
        var _minValue = _.min(allValues) < 0 ? _.min(allValues) : 0;

        pd = graphicUtils.prettyDomain(_minValue, _.max(allValues));

        min = pd.min;
        max = pd.max;
      }
      else {
        min = _.min(allValues);
        max = _.max(allValues);
        if (max < 0) {
          max = 0;
        }
        if (min > 0) {
          min = 0;
        }
      }
      yScale.range([containerHeight, 0])
          .domain([min, max]);
      xScale.rangeBands([0, containerWidth], profile.xAxisItemPadding)
          .domain(labels);
    };

    var splitDataIntoTypes = function () {
      dataByType = {
        'column': [],
        'line': []
      };
      displayValuesByType = {
        'column': [],
        'line': []
      };
      colorsByType = {
        'column': [],
        'line': []
      };
      seriesColorByType = {
        'column': [],
        'line': []
      };

      for (i = 0; i < series.length; i++) {
        switch (series[i].displayType) {
          case 'column':
            dataByType['column'].push(data[i]);
            displayValuesByType['column'].push(displayValues[i]);
            colorsByType['column'].push(series[i].color);
            seriesColorByType['column'].push(series[i].seriesColor);
            break;
          case 'line':
            dataByType['line'].push(data[i]);
            displayValuesByType['line'].push(displayValues[i]);
            colorsByType['line'].push(series[i].color);
            seriesColorByType['line'].push(series[i].seriesColor);
            break;
          default:
            console.error('Unknown type ', series[i].displayType);
        }
      }
    };

    var resetMouseMap = function () {
      mouseMap = [];

      for (var i = 0; i < labels.length; i++) {
        mouseMap[i] = {
          x: xScale(labels[i]),
          width: xScale.rangeBand(),
          item: {
            'column': [],
            'line': []
          }
        };
      }
    };

    var initialDrawData = function () {
      splitDataIntoTypes();
      // Empty the div and series canvases
      seriesCanvas = {
        'column': [],
        'line': []
      };
      chartCore.selectAll('.data-series').remove();
      var seriesCount = 1;
      // Append the columns and lines, etc. But don't set the data.
      for (i = 0; i < dataByType['column'].length; i++) {
        var seriesData = dataByType['column'][i],
            color = colorsByType['column'][i] + " plotItem",
            seriesColor = seriesColorByType['column'][i] || 'auto';
        thisCanvas = chartCore.append("g")
            .attr("class", "column-series")
            .attr("class", "data-series");
        var rect = thisCanvas.selectAll("rect")
            .data(seriesData)
            .enter()
            .append("rect")
            .attr('class', seriesColor !== 'auto' ? '' : color)
            .attr("data-index", function (d, idx) {
              return idx;
            })
            .attr("data-label", function (d, idx) {
              return labels[idx];
            })
            .attr("y", yScale(0))
            .attr("height", 0)
            .attr('fill', seriesColor !== 'auto' ? seriesColor : '');

        seriesCanvas['column'].push(thisCanvas);
      }

      for (i = 0; i < dataByType['line'].length; i++) {
        var seriesData = dataByType['line'][i],
            color = colorsByType['line'][i] + " plotItem",
            seriesColor = seriesColorByType['line'][i] || 'auto';
          thisCanvas = chartCore.append("g")
              .attr("class", "column-series")
              .attr("class", "data-series");
        thisCanvas.selectAll("line")
            .data(seriesData.slice(0, seriesData.length - 1))
            .enter()
            .append("line")
            .attr('class', seriesColor !== 'auto' ? '' : color)
            .attr("y1", yScale(0))
            .attr("y2", yScale(0))
            .attr("data-index", function (d, idx) {
              return idx;
            })
            .attr('fill', seriesColor !== 'auto' ? seriesColor : '')
            .attr('stroke', seriesColor !== 'auto' ? seriesColor : '');

        thisCanvas.selectAll("circle")
            .data(seriesData)
            .enter()
            .append("circle")
            .attr('class', seriesColor !== 'auto' ? '' : color)
            .attr("cy", yScale(0))
            .attr("r", 5)
            .attr("data-index", function (d, idx) {
              return idx;
            })
            .attr("data-label", function (d, idx) {
              return labels[idx];
            })
            .attr('fill', seriesColor !== 'auto' ? seriesColor : '')
            .attr('stroke', seriesColor !== 'auto' ? seriesColor : '');
         
        seriesCanvas['line'].push(thisCanvas);
      }

      resetMouseMap();


      if (!Modernizr.touch) {
        chartCanvas.on('mouseout', function () {
          tooltip.hide();
        });
      }

      // $(chartCanvas.node()).on('mousewheel', function(ev) {
      //     // debugger
      //     currentZoom += ev.originalEvent.wheelDeltaY / 1000;
      //     // debugger
      //     xScale.rangeBands([0, containerWidth * currentZoom], profile.xAxisItemPadding)
      //         .domain(labels);
      //     updateData();
      // });

      function positionTooltip(x, y, hide) {
        var bbox = chartCore[0][0].getBBox(),
            i = Math.floor((x / (containerWidth - yAxisWidth)) * labels.length),
            _item = null;
        if (i >= 0 && i < labels.length) {
          for (var j = 0; j < mouseMap[i].item.line.length; j++) {
            _item = mouseMap[i].item.line[j];

            if (x > _item.x && x < (_item.x + _item.width) && y > _item.y && y < (_item.y + _item.height)) {
              if (tooltip.isHidden()) {
                tooltip.show();
              }
              tooltip.update(_item.displayValue, labels[i] + ' : ', _item.color, x, y);
              return;
            }
          }
          for (j = 0; j < mouseMap[i].item.column.length; j++) {
            _item = mouseMap[i].item.column[j];

            if ((x > _item.x && x < (_item.x + _item.width)) && (y > _item.y && y < (_item.y + _item.height))) {
              if (tooltip.isHidden()) {
                tooltip.show();
              }
              tooltip.update(_item.displayValue, labels[i] + ' : ', _item.color, x, y);
              return;
            }
          }
        }
        if (hide) {
          tooltip.hide();
        }
      }

      if (!Modernizr.touch) {
        chartCanvas.on('mousemove', function () {
          var ev = d3.event,
              x = ev.pageX - coreDiv.offset().left - (calcPaddingLeft + yAxisWidth),
              y = ev.pageY - coreDiv.offset().top - profile.paddingTop;

          positionTooltip(x, y);

        });
      }

      chartCanvas.on('touchstart', function () {
        var ev = d3.mouse(this);
        positionTooltip(ev[0] - (calcPaddingLeft + yAxisWidth), ev[1] - profile.paddingTop, false);
      });


      // Call update data to draw all the data lines
      updateData();
    };

    var updateData = function () {
      var nColSeries = dataByType['column'].length,
          animationDuration = (profile.dualStageAnimate) ? twoStepAnimationDuration : oneStepAnimationDuration;

      for (i = 0; i < dataByType['column'].length; i++) {
        var seriesData = dataByType['column'][i],
            columnWidth = xScale.rangeBand() / nColSeries,
            columnPadding = columnWidth * profile.seriesInterColumnPadding,
            currentDisplayValues = displayValuesByType['column'][i],
            color = colorsByType['column'][i];

        seriesCanvas['column'][i]
            .selectAll("rect")
            .data(seriesData)
            .attr("x", function (d, idx) {
              mouseMap[idx].item.column[i] = {};
              mouseMap[idx].item.column[i].x = xScale(labels[idx]) + i * columnWidth + columnPadding;
              mouseMap[idx].item.column[i].width = columnWidth - 2 * columnPadding;

              return xScale(labels[idx]) + i * columnWidth + columnPadding;
            })
            .attr("width", columnWidth - 2 * columnPadding)
            // .attr('fill', function (d, idx) {
            //   mouseMap[idx].item.column[i].color = color;
            //   return color;
            // })
            // .attr('stroke', color)
          // .attr("style", "filter:url(#inner-shadow)")
            // .attr("class", function (d, idx) {
            //   return "plotItem";
            // })
            .attr("data-displayValue", function (d, idx) {
              mouseMap[idx].item.column[i].displayValue = currentDisplayValues[idx];
              return currentDisplayValues[idx];
            })
            .transition()
            .duration(dontAnimate ? 0 : animationDuration)
            .attr("y", function (d, idx) {
              if(d.toString() === 'NaN') {
                d3.select(this).attr('style', 'display:none');
                return 0;
              }
              if (d <= 0) {
                mouseMap[idx].item.column[i].y = yScale(0);
                return yScale(0);

              }
              mouseMap[idx].item.column[i].y = yScale(d);
              return yScale(d);
            })
            .attr("height", function (d, idx) {
              if(d.toString() === 'NaN') {
                d3.select(this).attr('style', 'display:none');
                return 0;
              }
              mouseMap[idx].item.column[i].height = Math.abs(d * (yScale(0) - yScale(1)));
              return Math.abs(d * (yScale(0) - yScale(1)));
            });
      }

      var nLineSeries = dataByType['line'].length;
      for (i = 0; i < nLineSeries; i++) {
        var seriesData = dataByType['line'][i],
            nLineCount = seriesData.length - 1,
            columnWidth = xScale.rangeBand(),
            currentDisplayValues = displayValuesByType['line'][i],
            color = colorsByType['line'][i];

        seriesCanvas['line'][i]
            .selectAll("line")
            .data(seriesData.slice(0, seriesData.length - 1))
            .attr("x1", function (d, idx) {
              if (profile.stickLineChartToSides) {
                return idx * containerWidth / nLineCount;
              }
              else {
                return xScale(labels[idx]) + columnWidth / 2;
              }
            })
            .attr("x2", function (d, idx) {
              if (profile.stickLineChartToSides) {
                return (idx + 1) * containerWidth / nLineCount;
              }
              else {
                return xScale(labels[idx + 1]) + columnWidth / 2;
              }
            })
            .attr('stroke-width', 3)
            // .attr('fill', color)
            // .attr('stroke', color)
            .attr("data-displayValue", function (d, idx) {
              return currentDisplayValues[idx];
            })
            .transition()
            .duration(dontAnimate ? 0 : animationDuration)
            .attr("y1", function (d) {
              if(d.toString() === 'NaN') {
                d3.select(this).attr('style', 'display:none');
                return 0;
              }
              return yScale(d);
            })
            .attr("y2", function (d, idx) {
              if(seriesData[idx + 1].toString() === 'NaN') {
                d3.select(this).attr('style', 'display:none');
                return 0;
              }
              return yScale(seriesData[idx + 1]);
            });


        seriesCanvas['line'][i]
            .selectAll("circle")
            .data(seriesData)
            .attr('cx', function (d, idx) {
              mouseMap[idx].item.line[i] = {};
              mouseMap[idx].item.line[i].width = profile.circleRadius * 2;
              mouseMap[idx].item.line[i].height = profile.circleRadius * 2;
              if (profile.stickLineChartToSides) {
                mouseMap[idx].item.line[i].x = (idx * containerWidth / nLineCount) - profile.circleRadius;
                return idx * containerWidth / nLineCount;
              }
              else {
                mouseMap[idx].item.line[i].x = (xScale(labels[idx]) + columnWidth / 2) - profile.circleRadius;
                return xScale(labels[idx]) + columnWidth / 2;
              }
            })
            .attr('r', profile.circleRadius)
            // .attr('fill', function (d, idx) {
            //   mouseMap[idx].item.line[i].color = color;
            //   return "#fff";
            // })
            // .attr('stroke', color)
            .attr('stroke-width', 2)
            .attr("data-displayValue", function (d, idx) {
              mouseMap[idx].item.line[i].displayValue = currentDisplayValues[idx];
              return currentDisplayValues[idx];
            })
            .transition()
            .duration(dontAnimate ? 0 : animationDuration)
            .attr("cy", function (d, idx) {
              if(d.toString() === 'NaN') {
                d3.select(this).attr('style', 'display:none');
                return 0;
              }
              mouseMap[idx].item.line[i].y = yScale(d) - profile.circleRadius;
              return yScale(d);
            });

      }
      chartCore.selectAll(".plotItem").on("click", function (value) {
        for (var i = 0; i < clickCallbacks.length; i++) {
          var callback = clickCallbacks[i];
          var index = parseInt(this.attributes['data-index'].value, 10);
          callback({
            value: value,
            labelIndex: index,
            label: labels[index]
          });
        }
      });
    };

    var translateString = function (x, y) {
      return "translate(" + x + "," + y + ")";
    };
  };

  return RFChart;
}); 
