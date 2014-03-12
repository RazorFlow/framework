(function() {
	var themegen = {
		generateTheme: function (themeObject, defaultVariables, themeLessSourceCode, less, callback) {
			for(var key in defaultVariables){
				if(typeof(themeObject[key]) !== 'undefined'){
					defaultVariables[key] = themeObject[key] + ';'
				}
			}
			var newVariables = defaultVariables,
				finalLess = themegen.convertObjectToVariablesLess(newVariables) + '\n' + themeLessSourceCode;
			less.render(finalLess, function(err, css) {
				if(err){
					console.log(err)
				}else{
					callback(css)
				}
			});
		},
		convertObjectToVariablesLess: function (newVariables) {
			var variables = '',
				count = '';
			data = newVariables;
			for(var key in data){
				if(data.hasOwnProperty(key)){
					variables += key+':'+data[key]
					count ++ ;
					if(count<=Object.keys(data).length-1){
						variables += '\n'
					}
				}
			}
			return variables
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