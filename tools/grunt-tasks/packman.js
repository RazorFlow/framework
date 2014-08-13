module.exports = function(grunt) {
  grunt.registerMultiTask('packman', 'Package Maker', function() {
    var options = this.options({
      tmpDir: "build/tmp/packman/"
    });
    var data = this.data;

    grunt.log.debug("Removing temp dir", options.tmpDir);
    grunt.file.delete(options.tmpDir);
    
  });
};
