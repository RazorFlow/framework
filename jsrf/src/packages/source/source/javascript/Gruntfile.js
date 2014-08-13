var gruntRequireConfig = require('./src/dev/requireConfig').gruntConfig;
var gruntWrapperRequireConfig = require('./src/dev/requireConfig').gruntWrapperConfig;
var gruntDebugConfig = require('./src/dev/requireConfig').gruntDebugConfig;
module.exports = function(grunt) {
    gruntRequireConfig.out = 'dist/js/razorflow.min.js';
    gruntWrapperRequireConfig.out = 'dist/js/razorflow.wrapper.min.js';
    gruntDebugConfig.out = 'dist/js/razorflow.devtools.min.js';

    grunt.initConfig({
        requirejs: {
            core: {
                options: gruntRequireConfig
            },
            wrapper: {
                options: gruntWrapperRequireConfig
            },
            debug: {
                options: gruntDebugConfig
            }
        },
        less: {
            core: {
                options: {
                    paths: ['src/less']
                },
                files: {
                    "build/tmp/razorflow.css": "src/less/razorflow.less",
                    "build/tmp/rftheme.default.css": "build/tmp/less/rftheme.default.less"
                }
            }
        },
        concat: {
            css: {
                src: 'build/tmp/*.css',
                dest: 'build/tmp/razorflow.core.theme.css'
            }
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: 'build/tmp/',
                src: ['razorflow.core.theme.css'],
                dest: 'dist/css',
                ext: '.min.css'
            }
        },
        replace: {
            removeAMD: {
                src: "dist/js/razorflow.min.js",
                overwrite: true,
                replacements: [
                    {from: /\bdefine\b/g, to: "_dfn"},
                    {from: /\brequire\b/g, to: "_rqr"}
                ]
            }
        },
        clean: {
            build: ["build"],
            dist: ["dist"]
        },
        themegen: {
            defaultTheme: {
                options: {
                    themeJSON: "src/js/themebuilder/config/defaulttheme.json",
                    out: "build/tmp/less/rftheme.default.less"
                }
            }
        },
        copyto: {
            imgToDist: {
                files: [
                    {cwd: 'src/img/', src: ['**/*'], dest: 'dist/img/'},
                    {cwd: 'src/fonts/', src: ['**/*'], dest: 'dist/fonts/'},
                ]
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-copy-to');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadTasks("./tools/grunt-tasks");
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('compile', ['themegen', 'less:core', 'concat:css', 'cssmin:minify']);
    grunt.registerTask('build', ['clean:build', 'clean:dist', 'compile', 'requirejs:core', 'requirejs:wrapper', 'requirejs:debug', "replace:removeAMD", "copyto:imgToDist"]);
};