var gruntRequireConfig = require('./src/dev/requireConfig').gruntConfig;

module.exports = function (grunt) {
    grunt.initConfig({
        requirejs: {
            core: {
                options: gruntRequireConfig
            }
        },
        concat: {

        },
        jst: {
            templates: {
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
        },
        lodash: {
            build: {
                dest: 'src/vendor/js/lodash.rf.js',
                options: {
                    include: ['extend', 'pluck', 'map', 'each', 'isNumber', 'isString', 'isNaN', 'isArray', 'isObject', 'find', 'defer', 'delay', 'max', 'min', 'sortBy', 'flatten', 'clone', 'cloneDeep', 'values', 'pick', 'reduce', 'filter', 'indexOf', 'keys', 'debounce'],
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
    grunt.loadNpmTasks('grunt-lodash');
    grunt.loadNpmTasks('grunt-contrib-copy');


    
    grunt.registerTask('compile', ['less', 'jst:templates']);
    grunt.registerTask('test', ['compile', 'karma:dev', 'shell:coverageReport']);

    grunt.registerTask('build', ["less", "jst:templates", 'requirejs:core'])
}