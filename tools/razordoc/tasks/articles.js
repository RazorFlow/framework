var fs = require ('fs');
var path = require('path');
var _ = require('underscore');

var articlesGen = require('../src/articlesGen');
var objectifyTree = require('../src/objectifyTree');

module.exports = function (grunt) {
    grunt.registerTask ('articles', 'Generates articles', function () {
        grunt.log.writeln ("Starting RazorDoc...");
        var configDir = process.cwd ();
        var options = this.options ({});
        var articlesDir = path.resolve(configDir, options.articles.root);
        var outputDir = path.resolve(configDir, options.out);
        var templateDir = path.resolve(configDir, options.articleTemplates);
        var partialsPath = path.resolve(configDir, options.partialsPath);
        var linkPrefix = options.linkPrefix;
        var suffix = options.suffix;
        var apiOptions = options.api; 
        var apiTree = JSON.parse (fs.readFileSync(path.resolve(configDir, apiOptions.meta), 'utf-8'));
        var apiLinkPrefix = apiOptions.linkPrefix;
        var tocPath = path.resolve(options.toc);
        var toc = fs.readFileSync(tocPath);
        var tocTreePath = path.resolve (options.tocTree);
        var tocTree = JSON.parse (fs.readFileSync(tocTreePath, 'utf-8'));
        articlesGen.generate (articlesDir, templateDir, outputDir, partialsPath, linkPrefix, suffix, apiTree, apiLinkPrefix, toc, tocTree);
    });
};