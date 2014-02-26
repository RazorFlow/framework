module.exports = function (grunt) {
    grunt.initConfig({
        requirejs: {
            compile: {
                options: {
                    baseUrl: "src/js",
                    name: 'build/almond',
                    include: ['core/main'],
                    out: "build/rjsoutput.js"
                }
            }
        },
        concat: {

        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');

}