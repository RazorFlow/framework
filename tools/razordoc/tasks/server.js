
module.exports = function (grunt) {
    grunt.registerMultiTask ('server', 'Doc edit server', function () {
        try {
            // grunt.task.loadNpmTasks('grunt-express-server');
            // var options = this.options({});
            // var serverOpts = {
            //     options: {
            //         port: options.port
            //     },
            //     dev: {
            //         options: {
            //             script: './bin/server.js'
            //         }
            //     }
            // };
            // grunt.config('express', serverOpts);
            // grunt.task.run ('express');
            var app = require ('../bin/server');
        } catch (e) {
            console.log(e);
        }
        
    });
};