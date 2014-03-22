var _ = require('underscore');
var fs = require('fs');
var path = require ('path');
var screenshot = require('url-to-screenshot');


module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('screenshotGen', 'generate screenshots', function() {
    grunt.log.writeln("taking screenshots...");
    var done = this.async();

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      width: 1024,
      height: 768,
      timeout: 1000
    });
    var files = grunt.file.expand(options.files);

    var continuation = function () {

      if(files.length == 0) {
        grunt.log.ok("Finished taking screenshots");
        done();
      }
      else {
        var fileName = files.shift ();
        var baseName = path.basename(fileName, options.extension);
        var url = options.baseUrl + baseName;
        var outPath = options.out + baseName + ".png";

        if(grunt.file.exists(outPath)) {
          grunt.log.writeln("File already exists: " + outPath);
          continuation ();
        }
        else {
          grunt.log.writeln("Capturing " + url);
          screenshot(options.baseUrl + baseName)
            .timeout (options.timeout)
            .width(options.width)
            .height(options.height)
            .capture(function(err, img) {
              if (err) throw err;
              grunt.file.write (outPath, img);
              continuation();
            });
        }
      }
    }

    continuation();

  });

};
