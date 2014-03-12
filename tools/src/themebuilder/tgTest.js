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
	source_file = __dirname + "/../../../src/less/theme/default.less",
	default_theme_less = __dirname + "/../../../src/less/theme.less",
	mixin_less = __dirname + "/../../../src/less/mixins.less";

	fs.readFile(default_theme_less, function (err, data) {
	  	if (err){
	  		console.log(err)
	  	}else{
	  		var default_less = data
	  		fs.readFile(mixin_less,function(err,data){
	  			if(err){
	  				console.log(err)
	  			}else{
	  				default_mixin = data;
	  				lineReader.eachLine(source_file, function(line, last) {
						var x = line.split(":");
					    var key = x[0];
					    if(key[0] !== undefined) {
					    	defaultVars[key] = x[1];
					    }
					    if(last){
					    	themegen.generateTheme(themeObject, defaultVars, default_less + default_mixin, less, function (css) {
								console.log(css);
							})
					    }
					});
	  			}
	  		})	
	  	}
	});