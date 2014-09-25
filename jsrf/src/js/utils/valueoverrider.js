define(['vendor/lodash'], function(_) {

    var valueoverrider = {

      validate: function(cObj) {

       if(cObj.type === 'ChartComponent') {
        validations.run('chartComponent', cObj);
       } 

      }

    };

    var validations = {

      chartComponent: {

        series: function(componentObj) {

          // Overrides string values in series data to be null
          var series = componentObj.props.chart.series;
          var tempData;
          var dataIncorrect;
          for(var key in series) {
            tempData = _.pluck(componentObj.data, key);
            _.each(tempData, function(value, index) {
              if(_.isString(value)) {
                dataIncorrect = componentObj.data[index][key];
                componentObj.data[index][key] = null;

              }
            });
          }

        }

      },

      run: function(key, cObj) {
        for(var i in validations[key]) {
          validations[key][i](cObj);
        }
      }

    };

    return valueoverrider;
});
