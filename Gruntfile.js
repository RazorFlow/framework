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

        },
        jst: {
            compile: {
                options: {
                    prettify: true,
                    processName: function (filePath) {
                        var parts = filePath.split('/');
                        var fileName = parts[parts.length - 1];
                        return fileName.split('.')[0];
                    }
                },
                files: {
                    "build/js/templates.js": ["src/templates/*.html"]
                }
            }
        },
        less: {
            development: {
                options: {
                    paths: ['src/less']
                },
                files: {
                    "build/css/razorflow.css": "src/less/razorflow.less"
                }
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                forin: true,
                latedef: true,
                newcap: true,
                noarg: true,
                //undef: true,
                //unused: true,
                maxdepth: 3,
                evil: true,
                smarttabs: true,
                "-W099": true, //Mixed tabs and spaces
                sub: true,
                globals: {
                    jQuery: true,
                    node: true
                }
            },
            files: [
                "src/js/**/*.js"
            ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('compile', ['less', 'jst']);
}