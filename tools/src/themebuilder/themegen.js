(function() {
	var themegen = {
		generateTheme: function (themeObject, themeLessSourceCode, less) {
			var parser = new less.Parser();

			// TODO: all the processing

			return "Hello World";
		}
	};

	if (typeof module !== 'undefined') {
		// This is when it's running in a node environment
		module.exports = themegen;
	} else {
		// This is when it's running in a web browser environment
		window.themegen = themegen;
	}
})();