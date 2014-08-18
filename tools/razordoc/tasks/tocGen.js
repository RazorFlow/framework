var tocGen = require ('../src/tocGen');
var path = require ('path');
var fs = require ('fs');
module.exports = function (grunt) {
    grunt.registerTask ('tocGen', 'Generates toc', function () {
        try {
            var configDir = process.cwd ();
            var options = this.options({});
            var apiMetaPath = path.resolve (configDir, options.apiMeta);
            var apiMeta = JSON.parse (fs.readFileSync(apiMetaPath, 'utf-8'));
            var tocPath = path.resolve (configDir, options.toc);
            var toc = JSON.parse(fs.readFileSync (tocPath, 'utf-8'));
            var articlesDir = path.resolve(configDir, options.articlesDir);
            var apiPrefix = options.apiPrefix;
            var suffix = options.suffix;
            var html = tocGen.generateTOC (toc, articlesDir, options.articlesPrefix, suffix, apiMeta, apiPrefix);
            grunt.file.write (options.out, html);
            console.log (html);
        } catch (e) {
            console.log(e);
        }
        
    });
};