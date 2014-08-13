var path = require("path");
var pj = path.join;
var fse = require("fs-extra");
var _ = require("underscore");

module.exports = function(grunt) {
  var ensureCopyFile = function (src, dest) {
    if(src.length > 1 && _.isArray(src)) {
      grunt.fail.fatal ("The file parameter has multiple options", src);
    }
    if(_.isArray(src)) {
      src = src[0];
    }
    grunt.log.debug("Copying ", src, " to ", dest);
    grunt.file.copy(src, dest);
  };

  var ensureCopyDir = function (src, dest) {
    if(src.length > 1 && _.isArray(src)) {
      grunt.fail.fatal ("The file parameter has multiple options", src);
    }
    if(_.isArray(src)) {
      src = src[0];
    }
    grunt.log.debug("Copying ", src, " to ", dest);
    fse.copySync(src, dest);
  }

  var handle_files = function (cwd, files) {
    grunt.log.debug("Handling files at cwd:", cwd);
    _.each(files, function(item) {
      grunt.log.debug("CWD: ", cwd, "ITEM:", JSON.stringify(item));
      // Item to be generated is a file
      if(_.isString(item)) {
        ensureCopyFile([item], pj(cwd, path.basename(item)));
      }
      else if(item.file) {
        ensureCopyFile(item.src, pj(cwd, item.file));
      }
      else if (item.dir) {
        if (item.src) {
          ensureCopyDir (item.src, pj(cwd, item.dir));
        }
        else if(item.files) {
          grunt.file.mkdir (pj(cwd, item.dir));
        }
        else if(item.copyFromPackage) {
          ensureCopyDir (pj(cwd, item.copyFromPackage), pj(cwd, item.dir));
        }
        else{
          grunt.fail.fatal ("Don't know how to handle this dir: ", JSON.stringify(item.dir));
        }

        if(item.files) {
          handle_files(pj(cwd, item.dir), item.files);
        }
      }
    });
  };


  grunt.registerMultiTask('packman', 'Package Maker', function() {
    var options = this.options({
      tmpDir: "build/tmp/packman/",
      outDir: "build/packages/"
    });
    var data = this.data;
    var done = this.async();

    if(grunt.file.exists(pj(options.tmpDir, data.container_name))) {
      grunt.log.debug("Removing temp dir", options.tmpDir);
      grunt.file.delete(options.tmpDir);
    }

    grunt.log.debug("Making container folder");
    grunt.file.mkdir(pj(options.tmpDir, data.container_name));

    handle_files (pj(options.tmpDir, data.container_name), data.files);

    grunt.log.debug("Executing zip command now")
    grunt.util.spawn({
      cmd: "zip",
      args: ["-r", data.file_name + ".zip", data.container_name],
      opts: {
        cwd: options.tmpDir
      }
    }, function (error) {
      if(error == null) {
        grunt.log.debug("Executing zip command now")
        grunt.file.copy(pj(options.tmpDir, data.file_name + ".zip"), pj(options.outDir, data.file_name + ".zip"));
        grunt.log.ok("Successfully built ", data.file_name + ".zip")
      }
      else {
        grunt.fail.fatal("something went wrong with zip");
      }
      done();
    });


  });
};
