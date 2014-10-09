/*jshint -W083 */
define([
  "generated/templates",
  "renderers/componentrenderer",
  "utils/dataformatter",
  "utils/numberformatter",
  "razorcharts2/core/rcmain",
  "utils/tooltip",
  'vendor/lodash'
], function (JST, ComponentRenderer, DataFormatter, NumberFormatter, RazorChart, Tooltip, _) {
  function ChartRenderer() {
    ComponentRenderer.call(this);

    var self = this,
        base = {},
        Public,
        raw = self._raw,
        Protected,
        pro = self.pro,
        _bp = {};

    var chart,
        labels,
        data,
        series,
        displayValues,
        state = {},
        legendBools = {},
        firstDraw = true,
        legendVisible = true,
        firstAnimation = true,
        chartBaseColors = ["#5A9BD4", "#7AC36A", "#F15A60", "#FAA65B", "#9E67AB", "#D77FB4", "#CE7058", "#737373", "#333333"],
        numBaseColors = chartBaseColors.length,
        coreChartType = '',
        tooltip = new Tooltip(),
        axesTooltip = new Tooltip(),
        hasItemClickSubscribed = false;

    for(var i=-1; ++i<numBaseColors;) {
      var color = Raphael.color(chartBaseColors[i]);
      chartBaseColors[9 + i] = Raphael.hsl(color.h, color.s, color.l * 0.8);
      chartBaseColors[18 + i] = Raphael.hsl(color.h, color.s, color.l * 1.2);
    }
    Public = {
      setAnimation: function(b) {
        firstAnimation = b;
        if(pro.chart) {
          // pro.chart.setAnimation(b);
        }
      },
      itemClickSubscribed: function() {
        hasItemClickSubscribed = true;
      },
      setData: function (opts) {
        labels = opts.labels;
        data = opts.data;
        series = opts.series;
        displayValues = opts.displayValues;
      },
      setState: function(_state) {
        state = _state;
      },
      renderCore: function () {
        var tSeries = [], tData = [], tDisplayValues = [], i = 0;
        // Temp hack
        legendVisible = self.props.chart.showLegendFlag;
        self.$core.css({"padding" : "0px 10px"});
        var _series = [];
        if(series[0].displayType === 'pie') {
          for(i=-1; ++i<labels.length;) {
            _series[i] = {
              seriesName: labels[i],
              seriesHiddenFlag: false,
              seriesColor: chartBaseColors[i]
            };
          }
        }

        tooltip.config({
          core: self.$core,
          type: series[0].displayType === 'pie' ? 'value': 'popup',
          popupType: series[0].displayType === 'bar' ? 'left' : 'top'
        });

        axesTooltip.config({
          core: self.$core,
          type: 'value'
        });

        self.$core.html(JST.chart_base({
          displayType: series[0].displayType,
          series: series[0].displayType === 'pie' ? _series : series,
          legendVisible: legendVisible
        }));

        tooltip.renderTo($('body'));
        axesTooltip.renderTo($('body'));

        pro.$chartCore = self.$core.find('.chartCore');
        pro.$legendContainer = self.$core.find('.rfLegendContainer');
        attachLegendEventHandlers();
        for(i=0; i<series.length; i++) {
          if(!series[i].seriesHiddenFlag) {
            series[i].seriesIndex = i;
            tSeries.push(series[i]);
            tData.push(data[i]);
            tDisplayValues.push(displayValues[i]);
          }
          if(series[i].seriesColor !== "auto") {
            chartBaseColors[i] = series[i].seriesColor;
          }
        }

        selectAndCreateChart(labels, tData, tSeries, tDisplayValues);
        // pro.chart.renderTo(pro.$chartCore, 0, 0);
        pro.chart.renderTo(pro.$chartCore[0], 600, 600);
        firstDraw = true;
        attachItemEventHandler();
        if(state.isDrillDownable) {
          self.$header.html(JST.bread_crumb({
            drillLabelList: state.drillLabelList,
            startString: self.props.core.breadcrumbStartString
          }));
          self.$header.find('.rfBreadCrumb > ul > li:not(:last-child)').on('click', function() {
            pro.trigger('drillDownListClick', {index: +$(this).data('index')});
          });
          self.$core.find(".rc-plot-item").css({
            "cursor" : "pointer"
          });
        }
      },
      resizeCore: function (width, height) {
        var coreHeight = height;
        if(coreHeight > 0){
          coreHeight = height - ((legendVisible || !self.props.chart.showPieValues) ? pro.$legendContainer.height() : 0);
          // if(firstDraw) {
          //   pro.chart.renderTo(pro.$chartCore[0], width, coreHeight);
          // } else {
            pro.chart.resizeTo(width, coreHeight);  
          // }
        }

        if (pro.$chartCore && pro.$chartCore.find('.rc-axis')[1]) {
          var legendLeft = Math.floor(pro.$chartCore.find('.rc-axis')[1].getBBox().width);
          pro.$legendContainer.css({
            "padding-left" : legendLeft - 1
          });
        }
        firstDraw = false;
        if(coreChartType === 'pie') {
          tLegendVisible = !pro.chart.callFunction('hasLabels');
          if(tLegendVisible !== legendVisible) {
            legendVisible = tLegendVisible;
            if(!legendVisible && self.props.chart.showPieValues) {
              pro.$legendContainer.hide();
            } else {
              pro.$legendContainer.show();
            }
            
            coreHeight = height - ((legendVisible || !self.props.chart.showPieValues) ? pro.$legendContainer.height() : 0);
            // setTimeout(function() {
            //   pro.$chartCore.find('.rc-chart').remove();
            pro.chart.resizeTo(width, coreHeight);
            // }, 300);
            
          }
        }
      },
      realignData: function (originalLabels, labels, seriesData, displayValues, series) {
        if (!firstDraw) {
          var realigned = DataFormatter.realignLabels (originalLabels, labels, seriesData, displayValues);
          // pro.chart.updateData(originalLabels, realigned.data, realigned.displayValues);
          pro.chart.update({series:series});
        }
      },
      dispose: function () {
        base.dispose();
        // pro.chart.dispose();
        pro.$chartCore = null;
        pro.$legendContainer = null;
        tooltip.dispose();
        axesTooltip.dispose();
      }
    };

    Protected = {
      $chartCore: null,
      $legendContainer: null,
      chart: null,
      chartModal: null
    };

    var attachLegendEventHandlers = function() {
      // Get the seriesVisibleFlag and initialize them to legend bools
      for(var i=-1; ++i<series.length;) {

        legendBools[series[i].key] = series[i].seriesHiddenFlag;
      }
      pro.$legendContainer.find('.rfLegendKey').on('click', function() {
        var key = $(this).data('key');
        if(_.filter(legendBools, function(val) {return !val;}).length <= 1 && !legendBools[key]) {
          return;
        }
        
        legendBools[key] = !legendBools[key];
        if(legendBools[key]) {
          $(this).addClass('disabled');  
        } else {
          $(this).removeClass('disabled');
        }
        pro.trigger('legendClick', {key: key, value: legendBools[key]});
      });
      pro.$legendContainer.find('.rfLegendKey').hover(function () {
        if(series[0].displayType === 'pie') {
          return;
        }
        $(this).addClass("disabled");
      },function () {
        $(this).removeClass("disabled");
      });

      pro.$legendContainer.find(".disabled").hover(function () {
        $(this).removeClass("disabled");
      },function () {
        $(this).addClass("disabled");
      });
    };

    var attachItemEventHandler = function(){
        pro.chart.on('plotItemClick', function(params) {
          self.trigger("plotItemActivate");
          pro.trigger('itemClick', params);
        });

        pro.chart.on('plotItemMouseOver', function(params) {
          pro.trigger("plotItemMouseOver", params);
        });

        pro.chart.on('plotItemMouseOut', function(params) {
          pro.trigger("plotItemMouseOut", params);
        });

        // pro.chart.on('labelActivate', function(params) {
        //   pro.trigger("labelActivate", params);
        // });

        pro.chart.on('plotItemActivate', function(params) {
          pro.trigger("plotItemActivate", params);
        });
    };

    var selectAndCreateChart = function (labels, data, series, displayValues) {
      var _series = [],
          customColors = [],
          dualY = self.props.chart.dualY,
          showLabelFlag = self.props.chart.showLabelFlag;
      coreChartType = series[0].displayType === 'pie' ? 'pie' : series[0].displayType === 'bar' ? 'bar' : 'linear';
      for(var i=-1; ++i<series.length;) {
        if(series) {
          _series[i] = {
            seriesIndex: series[i].seriesIndex,
            displayType: series[i].displayType,
            id: series[i].key,
            data: data[i],
            colors: coreChartType === 'pie' ? chartBaseColors : null,
            color: chartBaseColors[i],
            caption: series[i].seriesName,
            stacked: series[i].seriesStacked,
            yAxis: series[i].yAxis === 'primary' ? 'left' : 'right',
            format: (function(i) {
              return function(item) {
                var numberFormatter = new NumberFormatter();
                numberFormatter.setConfig(self.props.chart.series[series[i].key]);
                return numberFormatter.formatValue(item);
              };
            })(i)
          };
        }
      }
      
      var yConfig = self.props.chart.yaxis,
          syConfig = self.props.chart.secondaryYAxis,
          primarySeries = _.where (series, {yAxis: 'primary'}),
          secondarySeries = _.difference(series, primarySeries),
          primarySeriesConfig = primarySeries.length === 1  ? self.props.chart.series[primarySeries[0].key] : {},
          secondarySeriesConfig = secondarySeries.length === 1 ? self.props.chart.series[secondarySeries[0].key] : {};

      var yAxisFormatter = new NumberFormatter(),
          secondaryYAxisFormatter =  new NumberFormatter(),
          seriesFormatter = new NumberFormatter();

      yAxisFormatter.setConfig(NumberFormatter.pickFirstValid([
        yConfig,
        primarySeriesConfig
      ]));
      secondaryYAxisFormatter.setConfig(NumberFormatter.pickFirstValid([
        syConfig,
        secondarySeriesConfig
      ]));
    
      var yAxisFormatFunc = function(item) {
        return yAxisFormatter.formatValue(item);
      };
      var secondaryYFormatFunc= function(item) {
        return secondaryYAxisFormatter.formatValue(item);
      };

      var yAxisConfig = {
        label: self.props.chart.yaxis.axisName,
        minValue: self.props.chart.yaxis.minValue,
        maxValue: self.props.chart.yaxis.maxValue,
        numTicks: self.props.chart.yaxis.numTicks,
        axisLine: false,
        axisTick: false,
        format: coreChartType === 'linear' ? yAxisFormatFunc : null
      };
      if(dualY) {
        yAxisConfig = [
          {
            type: 'left',
            label: self.props.chart.yaxis.axisName,
            minValue: self.props.chart.yaxis.minValue,
            maxValue: self.props.chart.yaxis.maxValue,
            numTicks: self.props.chart.yaxis.numTicks,
            axisLine: false,
            axisTick: false,
            format: coreChartType === 'linear' ? yAxisFormatFunc : null    
          },
          {
            type: 'right',
            label: self.props.chart.secondaryYAxis.axisName,
            minValue: self.props.chart.secondaryYAxis.minValue,
            maxValue: self.props.chart.secondaryYAxis.maxValue,
            numTicks: self.props.chart.secondaryYAxis.numTicks,
            axisLine: false,
            axisTick: false,
            format: coreChartType === 'linear' ? secondaryYFormatFunc : null
          }
        ];
      }

      var stackedFlag = false;
      for (var i=0; i<_series.length; i++) {
        if (_series[i].stacked) {
          stackedFlag = true;
        } else {
          stackedFlag = false;
          break;
        }
      }

      pro.chart = new RazorChart();
      pro.chart.config({
        labels: labels,
        type: coreChartType,
        grid: true,
        stacked: stackedFlag,
        animateOnRender: false,
        dualAxis: dualY,
        showPieLabels: self.props.chart.showPieValues,
        plotItemClasses: hasItemClickSubscribed ? 'activate' : '',
        xAxis: {
          axisLine: true,
          axisTick: false,
          format: coreChartType === 'bar' ? yAxisFormatFunc : null,
          minValue: self.props.chart.xaxis.minValue,
          maxValue: self.props.chart.xaxis.maxValue,
          numTicks: self.props.chart.xaxis.numTicks,
        },
        yAxis: yAxisConfig,
        tooltip: {
          onShow: function(x, y, _data) {
            var data = _.cloneDeep (_data);
            var tooltipFormatter = new NumberFormatter();
            if(coreChartType === 'pie') {
              tooltipFormatter.setConfig(self.props.chart.series[series[0].key]);
            } else {
              var seriesIndex = data.seriesIndex;
              tooltipFormatter.setConfig(NumberFormatter.pickFirstValid([
                self.props.chart.series[series[seriesIndex].key],
                self.props.chart.series[series[seriesIndex].key].yAxis !== 'primary' ? syConfig : yConfig
              ]));
            }     
            data.value = tooltipFormatter.formatValue(data.value);       
            tooltip.show(x, y, data);
          },
          onHide: function() {
            tooltip.hide();
          }
        },
        axesTooltip: {
          onShow: function(x, y, data) {
            axesTooltip.show(x, y, data);
          },
          onHide: function() {
            axesTooltip.hide();
          }
        },
        series: coreChartType === 'pie' ? _series[0] : _series,
        showLabelFlag: showLabelFlag,
        labelStep: self.props.chart.labelStep
      });

    };

    raw._registerClassName("ComponentRenderer");
    raw._registerPublic(base, Public);
    raw._registerProtected(_bp, Protected);
  }

  return ChartRenderer;
});
