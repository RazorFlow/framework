var path = require("path");
var pj = path.join;
var fse = require("fs-extra");
var _ = require("underscore");

module.exports = function(grunt) {

  grunt.registerTask('versionWriter', 'RazorFlow Version Writer', function() {
    var data = this.options();
    var currentVersion = grunt.file.readJSON (data.versionJSON);
    currentVersion[data.opts.channel] = {
      versionNumber: data.opts.versionNumber,
      versionString: data.opts.versionString
    };
    var contents = JSON.stringify(currentVersion, null, 4);
    grunt.log.warn ("Writing new version file");
    grunt.log.writeln (contents)
    grunt.file.write (data.versionJSON, contents);

    grunt.log.warn ("Writing new php version file");
    // Now write the version.php file
    contents = "<?php \n" + 
        "global $rfVersion; \n" + 
        "$rfVersion = json_decode(\'"+JSON.stringify(currentVersion)+"\', true);\n";
    grunt.log.writeln (contents);
    grunt.file.write (data.versionPHP, contents);
  });
};
