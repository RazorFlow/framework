module.exports = function(grunt) {
    // The grunt configuration
    var config = {
        'clean': {}
    };
    // Options for builds, usually specified by 
    var opts = {
        channel: "beta",
        version: "unknown_version"
    };

    // 
    // START GLOBAL Tasks
    config['clean']['build'] = {
        "build"
    }

    // END GLOBAL tasks
    // 


    // 
    // START JS Specific tasks
    

    // END JS Specific tasks
    // 

    grunt.initConfig (config);
};