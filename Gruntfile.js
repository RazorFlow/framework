var requireConfig = require("./jsrf/src/js/requireConfig");

module.exports = function(grunt) {
    // The grunt configuration. Filled with stubs
    var tasks = {
        'clean': {},
        'requirejs':{},
        'jst': {}
    };
    // Options for builds, usually specified by 
    var opts = {
        channel: "beta",
        version: "unknown_version"
    };

    // 
    // START GLOBAL Tasks
    
    // Clear build directory
    tasks['clean']['build'] = "build";

    // END GLOBAL tasks
    // 


    // 
    // START JS Specific tasks
    
    // Build razorflow.min.js
    tasks['requirejs']['core'] = {options:requireConfig.core};
    tasks['requirejs']['devtools'] = {options:requireConfig.devtools};
    tasks['requirejs']['wrapper'] = {options:requireConfig.wrapper};

    tasks['jst']['compile'] = {
        options: {
            prettify: true,
            processName: function (filePath) {
                var parts = filePath.split('/');
                var fileName = parts[parts.length - 1];
                return fileName.split('.')[0];
            },
            amd: true,
            global: false,
            requires: {
                'vendor/lodash' : '_'
            }
        },
        files: {
            "jsrf/src/js/generated/templates.js": ["jsrf/src/templates/*.html"]
        }
    };
    // END JS Specific tasks
    // 

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.initConfig (tasks);
};