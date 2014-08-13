define([], function () {
	var ThemeGen = {
		generateTheme: function (themeObject, defaultVariables, themeLessSourceCode, callback) {
			var newVariables = ThemeGen.convertStringToObject(defaultVariables);
			for(var key in newVariables){
				if(typeof(themeObject[key]) !== 'undefined'){
					newVariables[key] = themeObject[key] + ';';
				}
			}
			
			var	finalLess = ThemeGen.convertObjectToVariablesLess(newVariables) + '\n' + themeLessSourceCode,
				parser = new less.Parser();
			parser.parse(finalLess, function(e, tree){
				if(e){
					// console.log(e);
				}else{
					callback(tree.toCSS());
				}
			});
		},
		convertObjectToVariablesLess: function (newVariables) {
			var variables = '',
				count = '';
			data = newVariables;
			for(var key in data){
				if(data.hasOwnProperty(key)){
					variables += key+':'+data[key];
					count ++ ;
					if(count<=Object.keys(data).length-1){
						variables += '\n';
					}
				}
			}
			return variables;
		},
		convertStringToObject: function(variables_string){
			var split_variables = variables_string.split('\n'),
				split_variable = '';
				variables_object = {};
			for(var key in split_variables){
				if(split_variables[key][0] === '@'){
					split_variable = split_variables[key].split(':');
					variables_object[split_variable[0]] = split_variable[1];
				}
			}
			return variables_object;
		}
	};

	return ThemeGen;

});