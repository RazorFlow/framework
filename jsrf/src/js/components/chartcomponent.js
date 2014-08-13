define([
  "components/component",
  "renderers/chartrenderer",
  "prop/properties",
  "utils/numberformatter",
  "utils/assert",
  'vendor/lodash'
], function (Component, ChartRenderer, Properties, NumberFormatter, Assert, _) {

  /**
   * Chart Component is used to create a chart component
   * @class  ChartComponent
   * @augments {Component}
   */
  function ChartComponent() {
    Component.apply(this, Array.prototype.slice.call(arguments));

    var self = this,
        base = {},
        Public,
        raw = self._raw,
        Protected,
        pro = self.pro,
        _bp = {};

    var seriesColors = [],
        itemClickHandler,
        originalLabels = [],
        firstAnimation = true,
        isDrillDownable = false,
        drillDownSteps = [],
        drillDownList = [],
        drillLabelList = [],
        currentDrillDownStep = 0,
        chartModal = null,
        currentParams;

    Public = {
      /**
       * Adds a series to the chart. The number of data points provided using the seriesData array should be the same as the other series and the number of labels.
       * @method addSeries
       * @param  {String} id         Unique id of the series
       * @param  {String} name       The name of the series
       * @param  {Array} seriesData  The series data
       * @param  {ChartSeriesProperties} opts       A bunch of options passed to as an object
       * @example
       *
       * var c1 = new rf.ChartComponent ('c1');
       *
       * c1.addSeries ("foo", "Foo", [1, 2, -3], {
             *     numberPrefix: "~",
             *     numberSuffix: "%",
             *     seriesDisplayType: 'column'
             * });
       */
      addSeries: function (id, name, seriesData, opts) {

        // Allow for a single addSeries using just the array and options
        if(_.isArray(id)) {
          name = _.isObject(name) ? name : {};
          self.addSeries("series_0", "", id, name);
          self.setOption ("showLegendFlag", false);
          return;
        }
        opts = opts ? opts : {};
        pro.aspect.provide("series");
        Assert.isIDString(id, 'seriesId', 'error', self);
        Assert.isString(name, 'seriesName', 'warn', self);
        Assert.isArray(seriesData, 'seriesData', 'error', self);
        opts['seriesName'] = name;
        pro.pb.addItemToList('chart.series', id, opts);
        self.ds.addColumn(id, seriesData);
      },

      /**
       * Set an array of data points which will be used for the pie chart.
       * @method setPieValues
       * @param  {Array} seriesData  The data array
       * @param  {ChartSeriesProperties} opts The series options
       */
      setPieValues: function (seriesData, opts) {
        opts = opts || {};
        self.addSeries('pie0', 'Pie', seriesData, _.extend(opts, {seriesDisplayType: 'pie'}));
      },

      /**
       * updates the series data
       * @method updateSeries
       * @param  {String} id  The id of the series
       * @param  {Array} newData  The updated data array
       */
      updateSeries: function (id, newData) {
        // TODO: do we need to do some more? This seems far too little
        // for such a major function
        self.trigger("beforeComponentUpdate");
        firstAnimation = true;
        pro.renderer.setAnimation(firstAnimation);
        self.ds.addColumn(id, newData);
        pro.renderer.setAnimation(!firstAnimation);
        self.trigger("componentUpdate");
      },

      /**
       * Set the labels of the chart, which are the names on the X-Axis.
       * @method setLabels
       * @param  {Array} labelArray  An array of labels as strings
       */
      setLabels: function (labelArray) {
        pro.aspect.provide("labels");
        Assert.isArray(labelArray, 'labelArray', 'error', self);
        self.ds.addColumn('rfLabels', labelArray);
      },

      /**
       * Configure the Y-Axis of the chart.
       * @method setYAxis
       * @param  {String} name The name of the axis
       * @param  {Object} options An option array. See the guide for available options.
       */
      setYAxis: function (name, options) {
        options = options ? options : {};
        options['axisName'] = name;

        pro.pb.setObjectAtPath('chart.yaxis', options);
      },

      /**
       * Add another Y-Axis to the chart.
       * @method addYAxis
       * @param  {String} id The unique id of this axis
       * @param  {String} name The name of the axis
       * @param  {Object} options An option array. See the guide for available options.
       */
      addYAxis: function (id, name, options) {
        options = options ? options : {};
        options['id'] = id;
        options['axisName'] = name;

        pro.pb.setObjectAtPath('chart.secondaryYAxis', options);
        pro.pb.setValue('chart.dualY', true);
      },

      /**
      * Attach a handler for the event when a chart plot item is clicked.
      *
      * @access public
      * @memberOf ChartComponent
      * @method onItemClick
      * @instance
      * @param  {Function} callback The callback function to be called
      */
      onItemClick: function (callback){
        if(pro.renderer) {
          pro.renderer.pro.bind('itemClick', callback);
          pro.renderer.itemClickSubscribed();
        }
        else {
          itemClickHandler = callback;
        }

      },

      /**
      * Clears all the data in the chart. Use this function if you want to update the
      * chart with new data and labels.
      *
      * Be sure to lock the component before 
      * @method clearChart
      */
      clearChart: function () {
        self.ds.clearRows();
        pro.pb.emptyList ("chart.series");
        pro.requestRedraw();
        pro.aspect.revoke('series');
      },

      addDrillStep: function(cb) {
        pro.isDrillDownable = true;
        drillDownSteps.push(cb);
        self.onItemClick(function(params) {
          if(drillDownSteps[currentDrillDownStep]) {
            drillDownList[currentDrillDownStep] = {
              props: pro.pb.getRootObject(),
              data: self.ds.getRawData()
            };
            params.label = self.ds.getRawData()[params.labelIndex].rfLabels;
            params.drillLabelList = _.cloneDeep(drillLabelList);
            drillLabelList[currentDrillDownStep] = params.label;
            self.lock();
            self.clearChart();
            drillDownSteps[currentDrillDownStep++](drillDownDoneCallback, params, self);
          }

        });
      },

      stacked: function() {
        pro.pb.setValue('chart.stacked', true);
      }
    };

    Protected = {
      isDrillDownable: false,

      totalDrills: 0,

      init: function () {
        _bp.init();
      },
      getErrorCodes: function () {
        return pro.aspect.require({
          "series": 1000,
          "labels": 1001
        });
      },
      createRenderer: function () {
        pro.renderer = new ChartRenderer();
        pro.renderer.setAnimation(firstAnimation);
        pro.renderer.pro.bind('legendClick', function(legend) {
          pro.pb.setValue('chart.series[' + legend.key + '].seriesHiddenFlag', legend.value);
        });
        if(itemClickHandler) {
          pro.renderer.itemClickSubscribed();
          pro.renderer.pro.bind('itemClick', itemClickHandler);
        }
        else {
          pro.renderer.pro.bind("itemClick", function (params) {
            currentParams = params;

            if(pro.isDrillDownable) {
              if(currentDrillDownStep < pro.totalDrills) {
                _.extend(params, { drillLabelList:  drillLabelList });
                pro.handleComponentEvent ("itemClick", params, currentDrillDownStep);
              }
            }
            else {
              pro.handleComponentEvent ("itemClick", params);
            }
          });
        }

        pro.renderer.pro.bind('labelActivate', function(params) {
          self.trigger('labelActivate', params);
        });

        pro.renderer.pro.bind('plotItemMouseOver', function(params) {
          self.trigger('plotItemMouseOver', params);
        });

        pro.renderer.pro.bind('plotItemMouseOut', function(params) {
          self.trigger('plotItemMouseOut', params);
        });

        pro.renderer.pro.bind('plotItemActivate', function(params) {
          self.trigger('plotItemActivate', params);
        });

        pro.renderer.setState({isDrillDownable: pro.isDrillDownable, drillLabelList: drillLabelList});
        pro.renderer.pro.bind('drillDownListClick', function(params) {
          self.lock();
          pro.pb.setRootObject(drillDownList[params.index].props);
          self.ds.setRawData(drillDownList[params.index].data);
          drillDownList.splice(params.index, drillDownList.length - params.index);
          drillLabelList.splice(params.index, drillLabelList.length - params.index);
          currentDrillDownStep = params.index;
          pro.requestRedraw();
          self.unlock();
        });
        pro.onRendererCreate();
      },

      query: self.ds.createQuery(),

      handleData: function (data) {
        var labels = _.pluck(data, 'rfLabels'),
            series = pro.pb.getObjectAtPath('chart.series');
        if(self.isLocked()) {
          return; // don't render a locked component
        }
        pro.renderer.setData({
          labels: labels,
          data: pro.seriesData(series, data),
          series: pro.seriesConfig(series),
          displayValues: pro.displayValues(series, data)
        });
        pro.updateChartData (data, labels, series);
      },

      updateChartData: function (data, labels, series) {
        var i = 0;

        for(var key in series) {
          if (series.hasOwnProperty(key)) {
            series[key].seriesIndex = i++;
            if(series[key].seriesHiddenFlag) {
              delete series[key];
            }
          }
        }
        originalLabels = labels;
        pro.renderer.realignData (originalLabels, labels, pro.seriesData(series, data), pro.displayValues(series, data));
      },


      seriesConfig: function (series) {

        var color = 1;

        return _.map(series, function (val, key, idx) {
          return {
            color: 'chart-color-' + color++,
            key: key,
            seriesName: val.seriesName,
            seriesHiddenFlag: val.seriesHiddenFlag,
            displayType: val.seriesDisplayType,
            seriesColor: val.seriesColor,
            seriesStacked: val.seriesStacked,
            yAxis: val.yAxis
          };
        });
      },

      seriesData: function (series, data) {
        return _.map(series, function (val, key) {
          return _.map(_.pluck (data, key), parseFloat);
        });
      },

      displayValues: function (series, data) {
        return _.map(series, function (val, key) {
          var values = _.pluck(data, key),
              formatter = new NumberFormatter();
          formatter.setConfig(val);

          return _.map(values, function (num) {
            if (num) {
              return formatter.formatValue(num);
            }
          });
        });
      },

      renderCore: function () {
        pro.query.runAndSubscribe(pro.handleData);
        pro.renderer.renderCore();
      },
      resizeCore: function (width, height) {
        pro.renderer.resizeCore(width, height);
        firstAnimation = false;
        pro.renderer.setAnimation(firstAnimation);
      },
      addListeners: function () {
        _bp.addListeners();
        pro.pushListeners([

        ]);
      },
      onApplyPatch: function() {
        firstAnimation = true;
      },
      configureRemoteDrilldown: function() {
        if(currentDrillDownStep < pro.totalDrills) {
          var propsS = _.cloneDeep(pro.pb.getRootObject());
          var dataS = _.cloneDeep(self.ds.getRawData());
          drillDownList[currentDrillDownStep] = {
            props: propsS,
            data: dataS
          };

          drillLabelList[currentDrillDownStep++] = currentParams.label;
          pro.drillCount = drillDownList.length;
        }
      },
      cobjSetOption: function (key, value) {
        if(key === "showLegendFlag") {
          pro.pb.setValue ("chart.showLegendFlag", value);
        } else if(key === "showPieValues") {
          pro.pb.setValue("chart.showPieValues", value);
        }
      }
    };

    var drillDownDoneCallback = function() {
      self.unlock();
      self.trigger("drillActivate");
    };

    /**
     * This is the actual constructor of the object
     */
    var construct = function () {
      pro.pb = new Properties.ChartComponentProperties();
    };

    var extractDefaultColors = function () {
      seriesColors = _.map([1, 2, 3, 4, 5], function (i) {
        return rf.utils.getColor('cs-' + i);
      });
    };

    raw._registerClassName("ChartComponent");
    raw._registerPublic(base, Public);
    raw._registerProtected(_bp, Protected);

    construct();
  }

  return ChartComponent;
});
