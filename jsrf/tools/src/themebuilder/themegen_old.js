var fs = require('fs'),
	source_file = __dirname + "/themevariables.json",
	target_file = __dirname + "/variables.less",
	variables = "",
 	count = 0;
fs.readFile(source_file, 'utf8', function(err,data){
	data = JSON.parse(data);
	for(var key in data){
		if(data.hasOwnProperty(key)){
			variables += '@'+key+':'+data[key]+';';
			count += 1;
			if(count<=Object.keys(data).length-1){
				variables += '\n'	
			}
		}
	}
	fs.writeFile(target_file, variables, function(err){
		if(err){
			console.log(err);
		}else {
			console.log("The file was saved");
		}
	})
});

