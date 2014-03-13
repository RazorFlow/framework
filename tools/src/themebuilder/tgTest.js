var readline = require('readline');
 	lineReader = require('line-reader'),
 	stream = require('stream'),
 	themegen = require("./themegen"),
 	less = require("less"),
	themeObject = {
			"@table-head-font-size":"15px",
			"@table-body-color":"#000"
			},
	sourceObject = "",
	defaultVars = {},
	fs = require('fs'),
	variables_less = __dirname + "/../../../src/less/theme/" + process.argv[2],
	theme_less = __dirname + "/../../../src/less/theme.less",
	mixin_less = __dirname + "/../../../src/less/mixins.less",
	write_destination = __dirname + "/../../../src/less/theme/" + process.argv[3];

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
	  						themegen.generateTheme(themeObject, default_variables, default_mixin + default_theme, less, function (css) {
	  							fs.writeFile(write_destination, css , function(err) {
								    if(err) {
								        console.log(err);
								    } else {
								        console.log("The file was saved!");
								    }
								});
							})
	  					}
	  				});
	  			}
	  		})	
	  	}
	});