module.exports = function (grunt) {
    grunt.initConfig({
        requirejs: {
            compile: {
                options: {
                    baseUrl: "src/js",
                    name: 'buildutils/almond',
                    include: ['core/main'],
                    insertRequire: ['core/main'],
                    wrap: {
                        'startFile': 'src/js/buildutils/start.js',
                        'endFile': 'src/js/buildutils/end.js'
                    }, 
                    paths: {
                        lodash: '../vendor/js/lodash.min',
                        zepto: '../vendor/js/zepto.min',
                        d3: '../vendor/js/d3.rf',
                        Modernizr: '../vendor/js/modernizr.rf',
                        spin: '../vendor/js/spin'
                    },
                    shim: {
                        lodash: {
                            exports: '_'
                        },
                        zepto: {
                            exports: '$'
                        },
                        d3: {
                            exports: 'd3'
                        },
                        Modernizr: {
                            exports: 'Modernizr'
                        },
                        spin: {
                            exports: 'Spinner'
                        }
                    },
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
        karma: {
            dev: {
                configFile: './karma.conf.js',
                singleRun: true
            }
        },
        shell: {
            coverageReport: {
                command: 'cat "build/coverage/PhantomJS 1.9.7 (Mac OS X)/coverage.txt"',
                options: {
                    stdout: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-shell');

    
    grunt.registerTask('compile', ['less', 'jst']);
    grunt.registerTask('test', ['compile', 'karma:dev', 'shell:coverageReport']);
}