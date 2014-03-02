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
                jshintrc: 'src/js/.jshintrc'
            },
            files: [
                "src/js/**/*.js"
            ]
        },
        intern: {
            someReleaseTarget: {
                options: {
                    runType: 'runner', // defaults to 'client'
                    config: 'tests/intern',
                    reporters: [ 'console', 'lcov' ],
                    suites: [ 'tests/test_test.js' ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('intern');

    grunt.registerTask('test', [ 'intern' ]);
    grunt.registerTask('compile', ['less', 'jst']);
}