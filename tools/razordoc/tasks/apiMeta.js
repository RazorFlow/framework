var fs = require ('fs');
var path = require('path');
var _ = require('underscore');

var apiGen = require('../src/apiGen');

module.exports = function (grunt) {
    grunt.registerTask ('apiMeta', 'Generates api doc meta file', function () {
        grunt.log.writeln ("Starting RazorDoc...");
        var configDir = process.cwd ();
        var options = this.options ({});
        var apiFilePath = options.out || './apiMeta.json';
        var apiFiles = grunt.file.expand ({}, options.src);
        var apiTree = apiGen.genAPIMeta (relToAbs(apiFiles, configDir));
        grunt.file.write(apiFilePath, JSON.stringify(apiTree));
    });


    function relToAbs (files, root) {
        if(_.isString(files)) 
            return path.resolve(root, files);
        else if (_.isArray(files))
            return _.map(files, function (item) {
                return path.resolve(root, item);
            });
    }
};