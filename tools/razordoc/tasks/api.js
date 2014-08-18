var fs = require ('fs');
var path = require('path');
var _ = require('underscore');

var apiGen = require('../src/apiGen');
var objectifyTree = require('../src/objectifyTree');

module.exports = function (grunt) {
    grunt.registerTask ('api', 'Generates api docs', function () {
        grunt.log.writeln ("Starting RazorDoc...");
        var configDir = process.cwd ();
        var options = this.options ({});
        var apiMeta = options.src;
        var tocPath = path.resolve (configDir, options.toc);
        var toc = fs.readFileSync (tocPath, 'utf-8');
        var outPath = options.outPath;
        var templateDir = options.apiTemplates;
        var ext = options.suffix;
        var outputPath = path.resolve(configDir, options.outPath);
        var tree = JSON.parse(fs.readFileSync (apiMeta, 'utf-8'));
        tree = objectifyTree(tree);
        apiGen.generate(tree, templateDir, outPath, ext, true, {}, {}, {}, '', {}, toc);
    });
};