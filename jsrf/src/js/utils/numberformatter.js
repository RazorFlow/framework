define(["vendor/lodash"], function (_) {
  var NumberFormatter = function () {

    var self = this,
        config,
        numberPrefix = "",
        numberSuffix = "",
        numberHumanize = null,
        numberThousandsSeparator = null,
        numberDecimalsSeparator = null,
        numberForceDecimals = null,
        numberDecimalPoints = null;

    self.setConfig = function (c) {
      config = c;

      if (config.numberFormatFlag === true && config.dataType === "number") {
        if (typeof(config.numberPrefix) === 'string') {
          numberPrefix = config.numberPrefix;
        }
        if (typeof(config.numberSuffix) === 'string') {
          numberSuffix = config.numberSuffix;
        }
        if (typeof(config.numberHumanize) === 'boolean') {
          numberHumanize = config.numberHumanize;
        }
        if (typeof(config.numberThousandsSeparator) === 'string' && !numberHumanize) {
          numberThousandsSeparator = config.numberThousandsSeparator;
        }
        if (typeof(config.numberDecimalsSeparator) === 'string') {
          numberDecimalsSeparator = config.numberDecimalsSeparator;
        }
        if (typeof(config.numberForceDecimals) === 'boolean') {
          numberForceDecimals = config.numberForceDecimals;
        }
        if (typeof(config.numberDecimalPoints) === 'number') {
          numberDecimalPoints = config.numberDecimalPoints;
        }
      }
    };

    self.formatValue = function (value) {
      var decimalZeroes = '';

      value = value.toString();

      value = numberThousandsSeparator ? _numberThousandsSeperator(value, numberThousandsSeparator, numberDecimalsSeparator) : value;
      value = numberHumanize ? _numberHumanize(value) : value;

      for (var i = 0; i < numberDecimalPoints; i++) {
        decimalZeroes += '0';
      }
      if(numberForceDecimals) {
        if(value.indexOf(numberDecimalsSeparator) < 0) {
          value = value + numberDecimalsSeparator + decimalZeroes;
        } else {
          var decimalSize = value.split(numberDecimalsSeparator)[1].length;
          
          if(decimalSize < numberDecimalPoints) {
            value = value + decimalZeroes.slice(0, numberDecimalPoints - decimalSize);
          }
        }
      }

      return numberPrefix + value + numberSuffix;
    };

    self.formatArray = function (array) {
      var result = [];
      var arrayLen = array.length;
      for (var i = 0; i < arrayLen; i++) {
        result.push(self.formatValue(array[i]));
      }

      return result;
    };

    self.formatColumn = function (data, key) {
      var rowLen = data.length;
      for (var i = 0; i < rowLen; i++) {
        data[i][key] = self.formatValue(data[i][key]);
      }

      return data;
    };

    var splitDecimals = function (value) {
      var num = value.split('.')[0],
          decimal = value.split('.')[1],
          decimalVal = (+decimal) ? ( numberDecimalPoints > 0 ? numberDecimalsSeparator + decimal.split('').slice(0, numberDecimalPoints).join('') : '' )  : '';

      return num + decimalVal;
    };

    var _numberHumanize = function (value) {
      var result = '',
          temp = '',
          negative = value < 0;

      value = (Math.floor(Math.abs(+value))).toString();

      if (value === 'NaN') {
        console.error('value is not a number');
        return;
      }

      if (value.length < 4) {
        return value;
      } else if (value.length < 7) {
        temp = (+value / 1000).toString();

        result = splitDecimals(temp) + 'K';

      } else if (value.length < 10) {
        temp = (+value / 1000000).toString();

        result = splitDecimals(temp) + 'M';
      } else {
        temp = (+value / 1000000000).toString();

        result = splitDecimals(temp) + 'B';
      }

      return negative ? '-' + result : result;
    };

    var _numberThousandsSeperator = function (value, separator, decimalSeparator) {
      var result = '',
          negative = value < 0,
          temp = (Math.abs(+value)).toString().split('.')[0].split('').reverse().join(''),
          decimal = (Math.abs(+value)).toString().split('.')[1];


      if (temp === 'NaN') {
        console.error('value is not a number');
        return;
      }

      if (value.length < 4) {
        return value;
      }

      while (temp.length >= 4) {
        var tArr = temp.split('');
        result += tArr.splice(0, 3).join('') + separator;

        temp = tArr.join('');
      }

      result += temp;

      result = result.split('').reverse().join('') + ((decimal) ? decimalSeparator + decimal.split('').slice(0, numberDecimalPoints).join('') : '');

      return negative ? '-' + result : result;
    };
  };

  NumberFormatter.pickFirstValid = function (items) {
    var isValid = function (item) {
      var defaults = {
        'numberFormatFlag':true,
        'numberHumanize':false,
        'numberPrefix':null,
        'numberSuffix':null,
        'numberThousandsSeparator':",",
        'numberDecimalsSeparator':".",
        'numberForceDecimals':false,
        'numberDecimalPoints':2
      };
      // FIXME: If any of the defaults are changed this will fail catastrophically.
      // return true if ANY of the items is not the default value
      return _.any(item, function (val, key) {
        return typeof(defaults[key]) !== "undefined" && val !== defaults[key];
      });
    };

    // Return the first item that's determined as valid.
    var result = _.find(items, isValid);
    if(!result) {
      return items[0];
    }
    return result;
  };

  return NumberFormatter;
});
