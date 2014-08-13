define([], function () {
    var formatType = function (value, type) {
        switch(type) {
            case 'string':
                return '' + value;
            case 'number':
                var iv = +value, fv = parseFloat(value);
                if(iv === fv) {
                    if(isNaN(iv)) {
                        return 0;
                    }
                    return iv;
                }
                if(isNaN(fv)) {
                    return 0;
                }
                return fv;
            case 'datetime':
                var timestamp = Date.parse(value);
                if(isNaN(timestamp)) {
                    console.error ("cannot parse date", value);
                }
                return new Date(timestamp);
        }
        return value;
    };

    var DataFormatter = {
        normalizeIndexedData: function (data, schema) {
            var res = [],
                rowLen = data.length,
                schemaKeys = _.keys(schema),
                schemaKeyLen = schemaKeys.length,
                j = 0;

            for(var i = 0; i < rowLen; i++) {
                var row = {};

                for (j = 0; j < schemaKeyLen; j ++) {
                    var key = schemaKeys[j],
                        item = schema[key],
                        value = data[i][item.index];

                    row[key] = formatType(value, item.type);
                }
                res.push (row);
            }

            return res;
        },
        cleanDictionaryData: function (data, schema) {
            var res = [],
                rowLen = data.length,
                schemaKeys = _.keys(schema),
                schemaKeyLen = schemaKeys.length,
                j = 0;

            for(var i = 0; i < rowLen; i++) {
                var row = {};

                for (j = 0; j < schemaKeyLen; j ++) {
                    var key = schemaKeys[j],
                        item = schema[key],
                        value = data[i][key];

                    row[key] = formatType(value, item.type);
                }
                res.push (row);
            }

            return res;
        },
        realignLabels: function (ol, newLabels, data, displayValues) {
            // Get a lookup table, such that given a label, you will get the corresponding
            // index in the new label
            var rLookup = {};

            for (var i = newLabels.length - 1; i >= 0; i--) {
                rLookup[newLabels[i]] = i;
            }

            var resData = [];
            var resDv = [];

            for(i = 0; i < data.length; i++) {
                var resDataRow = [];
                var resDvRow = [];

                for(var j = 0; j < ol.length; j++) {
                    var label = ol[j];
                    var dataValue = 0;
                    var dispValue = '0';

                    if(rLookup.hasOwnProperty(label)) {
                        var newIndex = rLookup[label];

                        dataValue = data[i][newIndex];
                        dispValue = displayValues[i][newIndex];
                    }
                    resDataRow.push(dataValue);
                    resDvRow.push(dispValue);
                }
                resData.push(resDataRow);
                resDv.push(resDvRow);
            }

            return {
                data: resData,
                displayValues: resDv
            };
        }
    };

    return DataFormatter;

});
