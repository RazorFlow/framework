var _ = require('underscore');
var fs = require('fs');
var path = require ('path');
module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerTask('squashdemos', 'Squash Demos', function() {
    var mainObject = {};
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
      var meta = JSON.parse(content.match(/\/\*&([^\*\/]*)/)[1]);

      meta.content = content;
      meta.method = "**content**"
      if(mainObject[meta.section.id]) {
        mainObject[meta.section.id].items[meta.id] = meta;
      } else {
        mainObject[meta.section.id] = {
          title: meta.section.title,
          items: {}
        }
        mainObject[meta.section.id].items[meta.id] = meta;
      }
    }

    for(var key in mainObject) {
      out += '"' + key + '" : { \n';
      out += '"title": "' + mainObject[key].title + '",\n';
      out += '"items": {\n';
      var items = mainObject[key].items;
      for(var item in items) {
        var content = items[item].content;
        var json = JSON.stringify(items[item]);
        content = content.replace(/'/g, '"');
        json = json.replace('"**content**"', "function() {" + content + "},");
        out += '"' + item + '": ' + json + ",";
      }
      out += '}},';

    } 

    // console.log(out);

    out += "}";
    grunt.file.write(options.out, out);

    grunt.log.ok("Finished squashing.");
  });

};
