var _ = require('underscore');
var fs = require('fs');
var path = require ('path');
module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerTask('squashdemos', 'Squash Demos', function() {
    var out = "window.rfDemos = {\n";
    grunt.log.writeln("Squashing demos...");

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
    });

    var files = grunt.file.expand(options.demos);
    for(var i = 0; i < files.length; i++) {
      var item = files[i];
      var id = path.basename (item, ".js");
      var content = grunt.file.read(item);

      out += ""+id+":function () {\n" + content + "\n},\n";
    }

    out += "a:0}";
    grunt.file.write(options.out, out);

    grunt.log.ok("Finished squashing.");
  });

};
