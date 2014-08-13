define ([], function () {

	var validators = {
		maxStringLength: function (amount, code) {
			return function (value) {
				return {
					pass: value.length < amount,
					code: code
				};
			};
		},
		minCount: function (count, code) {
			return function (value) {
				return {
					pass: value.length >= count,
					code: code
				};
			};
		},
		assertColor: function (code) {
			return function (value) {
				return {
					// TODO: improve this. it doesn't even work.
					pass: value.startsWith ("#") || value === "auto",
					code: code
				};
			};
		}
	};

	var error = function (code) {
		return code;
	};

	var propChecks = {};
	propChecks['ChartProperties'] = {
		series: [
			validators.minCount(1, error(1000)), // ERROR: Please add at least one series
			function (series) {
				// If something has series.displayType as "Bar" you can't add any other type.
				var displayTypes = _.pluck(series, "seriesDisplayType");

				if(_.find(displayTypes, "Bar")) {
					return {
						pass: _.filter(displayTypes, function (val) { return val !== "Bar";}).length > 0,
						code: error(1002) // ERROR: You cannot mix bar series with any other series
					};
				}

				return null;
			},
			function (series) {
				// If something has series.displayType as "Bar" you can't add any other type.
				var displayTypes = _.pluck(series, "seriesDisplayType");

				if(_.find(displayTypes, "Pie")) {
					return {
						pass: _.filter(displayTypes, function (val) { return val !== "Pie";}).length > 0,
						code: error(1003) // ERROR: You cannot mix pie series with any other series
					};
				}

				return null;
			}
		]
	};
	propChecks['ComponentKPIProperties'] = {
		caption: [
			maxStringLength(30, 1001) // ERROR: Component KPI Caption cannot exceed 30 characters.
		]
	};

	propChecks['ChartSeriesProperties'] = {
		seriesColor: [
			validators.assertColor(1004) // ERROR: The series color is not a valid color
		]
	};

	return {
		propChecks: propChecks
	};
});