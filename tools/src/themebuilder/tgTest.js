var readline = require('readline');
 	lineReader = require('line-reader'),
 	stream = require('stream'),
 	themegen = require("./themegen"),
 	less = require("less"),
	themeObject = {
			"@table-head-font-size":"15px",
			"@table-body-color":"#f00"
			},
	sourceObject = "",
	defaultVars = {},
	fs = require('fs'),
	variables_less = __dirname + "/../../../src/less/theme/default.less",
	theme_less = __dirname + "/../../../src/less/theme.less",
	mixin_less = __dirname + "/../../../src/less/mixins.less";

	fs.readFile(theme_less, function (err, data) {
	  	if (err){
	  		console.log(err)
	  	}else{
	  		var default_theme = data
	  		fs.readFile(mixin_less,function(err,data){
	  			if(err){
	  				console.log(err)
	  			}else{
	  				default_mixin = data;
	  				fs.readFile(variables_less,function(err,data){
	  					if(err){
	  						console.log(err)
	  					}else{
	  						default_variables = data.toString()
	  						themegen.generateTheme(themeObject, default_variables, default_theme + default_mixin, less, function (css) {
	  							console.log(css)
							})
	  					}
	  				});
	  			}
	  		})	
	  	}
	});