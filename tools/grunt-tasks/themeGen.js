var _ = require('underscore');
var fs = require('fs');
var path = require ('path');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('themegen', 'generate themes', function() {
    var done = this.async();

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
    });

    var mixins = grunt.file.read(options.mixins),
        vars = grunt.file.read(options.defaultVariables),
        theme = grunt.file.read(options.themeLess),
        themeLessSourceCode = mixins + theme;

    var convertStringToObject = function(variables_string){
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
    };

    var convertObjectToVariablesLess = function (variables_object) {
      var variables = '',
        count = '',
        data = variables_object;

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
    };

    vars = convertStringToObject(vars);
    var themeObject = grunt.file.readJSON(this.data.themeJSON);
    for(var key in themeObject){
      if(typeof(themeObject[key]) !== 'undefined'){
        vars["@" + key] = themeObject[key] + ';';
      }
    }
    
    
    var finalLess = convertObjectToVariablesLess(vars) + '\n' + themeLessSourceCode;
    grunt.file.write(this.data.out, finalLess);
    done();
  });

  

};
