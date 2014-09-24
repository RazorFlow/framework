define(["vendor/lodash", "vendor/klass"], function (_, klass) {

  var NumberFormatter = klass({
    numberPrefix: "",
    numberSuffix: "",
    numberHumanize: null,
    numberThousandsSeparator: null,
    numberDecimalsSeparator: null,
    numberForceDecimals: null,
    numberDecimalPoints: null,

    setConfig: function (c) {
      var config = c;
      if (config.numberFormatFlag === true && config.dataType === "number") {
        if (typeof(config.numberPrefix) === 'string') {
          this.numberPrefix = config.numberPrefix;
        }
        if (typeof(config.numberSuffix) === 'string') {
          this.numberSuffix = config.numberSuffix;
        }
        if (typeof(config.numberHumanize) === 'boolean') {
          this.numberHumanize = config.numberHumanize;
        }
        if (typeof(config.numberThousandsSeparator) === 'string' && !this.numberHumanize) {
          this.numberThousandsSeparator = config.numberThousandsSeparator;
        }
        if (typeof(config.numberDecimalsSeparator) === 'string') {
          this.numberDecimalsSeparator = config.numberDecimalsSeparator;
        }
        if (typeof(config.numberForceDecimals) === 'boolean') {
          this.numberForceDecimals = config.numberForceDecimals;
        }
        if (typeof(config.numberDecimalPoints) === 'number') {
          this.numberDecimalPoints = config.numberDecimalPoints;
        }
      }
    },

    formatValue: function (value) {
      var decimalZeroes = '';

      value = value.toString();

      value = this.numberThousandsSeparator ? this._numberThousandsSeperator(value, this.numberThousandsSeparator, this.numberDecimalsSeparator) : value;
      value = this.numberHumanize ? this._numberHumanize(value) : value;

      for (var i = 0; i < this.numberDecimalPoints; i++) {
        decimalZeroes += '0';
      }
      if(this.numberForceDecimals) {
        if(value.indexOf(this.numberDecimalsSeparator) < 0) {
          value = value + this.numberDecimalsSeparator + decimalZeroes;
        } else {
          var decimalSize = value.split(this.numberDecimalsSeparator)[1].length;
          
          if(decimalSize < this.numberDecimalPoints) {
            value = value + decimalZeroes.slice(0, this.numberDecimalPoints - decimalSize);
          }
        }
      }

      return this.numberPrefix + value + this.numberSuffix;
    },

    formatArray: function (array) {
      var result = [];
      var arrayLen = array.length;
      for (var i = 0; i < arrayLen; i++) {
        result.push(this.formatValue(array[i]));
      }

      return result;
    },

    formatColumn: function (data, key) {
      var rowLen = data.length;
      for (var i = 0; i < rowLen; i++) {
        data[i][key] = this.formatValue(data[i][key]);
      }

      return data;
    },

    splitDecimals: function (value) {
      var num = value.split('.')[0],
          decimal = value.split('.')[1],
          decimalVal = (+decimal) ? ( this.numberDecimalPoints > 0 ? this.numberDecimalsSeparator + decimal.split('').slice(0, this.numberDecimalPoints).join('') : '' )  : '';

      return num + decimalVal;
    },

    _numberHumanize: function (value) {
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

        result = this.splitDecimals(temp) + 'K';

      } else if (value.length < 10) {
        temp = (+value / 1000000).toString();

        result = this.splitDecimals(temp) + 'M';
      } else {
        temp = (+value / 1000000000).toString();

        result = this.splitDecimals(temp) + 'B';
      }

      return negative ? '-' + result : result;
    },

    _numberThousandsSeperator: function (value, separator, decimalSeparator) {
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

      result = result.split('').reverse().join('') + ((decimal) ? decimalSeparator + decimal.split('').slice(0, this.numberDecimalPoints).join('') : '');

      return negative ? '-' + result : result;
    }
  })
  .statics({
    pickFirstValid: function (items) {
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
    }
  });

  return NumberFormatter;
});
