module.exports = function(grunt) {

    var buildId = "";
    if (grunt.option('release-id')) {
        buildId = "_" + grunt.option('release-id');
    }
    grunt.initConfig({
        copyto: {
            jsrfToPackage: {
                files: [{
                    cwd: 'jsrf/build/packages/',
                    src: ['**/*'],
                    dest: 'build/package/razorflow_js/'
                }, ]
            },
            phprfToPackage: {
                files: [{
                    cwd: 'phprf/build/packages/',
                    src: ['**/*'],
                    dest: 'build/package/razorflow_php/'
                }, ]
            },
            packageToSuite: {
                files: [
                    {
                        cwd: 'build/package/razorflow_js/minified',
                        src: ['**/*'],
                        dest: 'build/package/razorflow_framework_suite_minified/razorflow_framework_js/'
                    },
                    {
                        cwd: 'build/package/razorflow_php/minified',
                        src: ['**/*'],
                        dest: 'build/package/razorflow_framework_suite_minified/razorflow_framework_php/'
                    },
                    {
                        cwd: 'build/package/razorflow_js/source',
                        src: ['**/*'],
                        dest: 'build/package/razorflow_framework_suite_source/razorflow_framework_js/'
                    },
                    {
                        cwd: 'build/package/razorflow_php/source',
                        src: ['**/*'],
                        dest: 'build/package/razorflow_framework_suite_source/razorflow_framework_php/'
                    },
                ]
            }
        },
        clean: {
            packageBuild: ["package/**", "build/**"]
        },
        compress: {
            // release: {
            //     options: {
            //         archive: "package/razorflow_dashboard_framework" + buildId + ".zip"
            //     },
            //     files: [{
            //         cwd: 'build/package/',
            //         src: ['**'],
            //         dest: 'razorflow_dashboard_framework',
            //         expand: true
            //     }, ]
            // },
            js_min: {
                options: {
                    archive: "package/js_minified/razorflow_framework_js" + buildId + ".zip"
                },
                files: [{
                    cwd: 'build/package/razorflow_js/minified/',
                    src: ['**'],
                    dest: 'razorflow_framework_js',
                    expand: true
                }]
            },
            js_src: {
                options: {
                    archive: "package/js_source/razorflow_framework_js_wsource" + buildId + ".zip"
                },
                files: [{
                    cwd: 'build/package/razorflow_js/source/',
                    src: ['**'],
                    dest: 'razorflow_framework_js',
                    expand: true
                }]
            },
            php_min: {
                options: {
                    archive: "package/php_minified/razorflow_framework_php" + buildId + ".zip"
                },
                files: [{
                    cwd: 'build/package/razorflow_php/minified/',
                    src: ['**'],
                    dest: 'razorflow_framework_php',
                    expand: true
                }]
            },
            php_src: {
                options: {
                    archive: "package/php_source/razorflow_framework_php_wsource" + buildId + ".zip"
                },
                files: [{
                    cwd: 'build/package/razorflow_php/source/',
                    src: ['**'],
                    dest: 'razorflow_framework_php',
                    expand: true
                }]
            },
            suite_min: {
                options: {
                    archive: "package/suite_minified/razorflow_framework_suite" + buildId + ".zip"
                },
                files: [{
                    cwd: 'build/package/razorflow_framework_suite_minified/',
                    src: ['**'],
                    dest: 'razorflow_framework_suite',
                    expand: true
                }]
            },
            suite_src: {
                options: {
                    archive: "package/suite_source/razorflow_framework_suite_wsource_" + buildId + ".zip"
                },
                files: [{
                    cwd: 'build/package/razorflow_framework_suite_source/',
                    src: ['**'],
                    dest: 'razorflow_framework_suite',
                    expand: true
                }]
            }
        },
        extGrunt: {
            jsPackage: {
                options: {
                    cwd: "jsrf",
                    task: "package"
                }
            },
            phpPackage: {
                options: {
                    cwd: "phprf",
                    task: "package"
                }
            },
            exampleBuild: {
                options: {
                    cwd: "examples/internal",
                    task: "build"
                }
            },
            transferSiteStatic: {
                options: {
                    cwd: "newsite/src/static",
                    task: "build"
                }
            },
            takeScreenshots: {
                options: {
                    cwd: "examples/internal",
                    task: "screenshots"
                }
            },
            buildMVCApps: {
                options: {
                    cwd: "examples/apps/",
                    task: "default"
                }
            },
            buildDocs: {
                options: {
                    cwd: "docs",
                    task: "build"
                }
            }
        },
        exec: {
            show_gg: {
                cmd: "say 'RazorFlow has been deployed. GG.'"
            }
        },
        s3: {
            options: {
                key: 'AKIAIUKBV2KPXI6GM43A',
                secret: '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',
                bucket: 'download_bucket',
                access: 'public-read',
                headers: {
                    // Two Year cache policy (1000 * 60 * 60 * 24 * 730)
                    "Cache-Control": "max-age=630720000, public",
                    "Expires": new Date(Date.now() + 63072000000).toUTCString()
                }
            },
            upload_package: {
                // These options override the defaults
                options: {
                    encodePaths: true,
                    maxOperations: 20

                },
                // Files to be uploaded.
                upload: [
                    // {
                    //     src: 'package/razorflow_dashboard_framework' + buildId + ".zip",
                    //     dest: 'razorflow_dashboard_framework' + buildId + ".zip",
                    // },
                    {
                        src: 'package/js_minified/razorflow_framework_js' + buildId + '.zip',
                        dest: 'razorflow_framework_js' + buildId + '.zip'
                    },
                    {
                        src: "package/js_source/razorflow_framework_js_wsource" + buildId + ".zip",
                        dest: "razorflow_framework_js_wsource" + buildId + ".zip"
                    },
                    {
                        src: "package/php_minified/razorflow_framework_php" + buildId + ".zip",
                        dest: "razorflow_framework_php" + buildId + ".zip"
                    },
                    {
                        src: "package/php_source/razorflow_framework_php_wsource" + buildId + ".zip",
                        dest: "razorflow_framework_php_wsource" + buildId + ".zip"
                    },
                    {
                        src: "package/suite_minified/razorflow_framework_suite" + buildId + ".zip",
                        dest: "razorflow_framework_suite" + buildId + ".zip"
                    },
                    {
                        src: "package/suite_source/razorflow_framework_suite_wsource_" + buildId + ".zip",
                        dest: "razorflow_framework_suite_wsource_" + buildId + ".zip"
                    }
                ]
            }
        }
    });

    grunt.registerMultiTask("extGrunt", "Call an external grunt", function() {
        var options = this.options({});
        var done = this.async();

        grunt.util.spawn({
            grunt: true,
            opts: {
                cwd: options.cwd,
                stdio: 'inherit'
            },
            args: [options.task]
        }, done)
    })

    grunt.registerTask("createVersionPhp", "Create a version in PHP", function() {
        grunt.file.write("newsite/src/version.php", "<?php\nglobal $rf_version;\n$rf_version=\'" + buildId + "';\n");
    });


    grunt.loadNpmTasks('grunt-copy-to');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-s3');
    grunt.loadNpmTasks('grunt-exec');

    grunt.registerTask('cleanAll', ["extGrunt:jsClean", "extGrunt:phpClean"]);

    grunt.registerTask('buildAll', ["extGrunt:jsPackage", "extGrunt:phpPackage", "extGrunt:exampleBuild"]);
    grunt.registerTask('package', ["buildAll", "clean:packageBuild", "copyto:jsrfToPackage", "copyto:phprfToPackage", "copyto:packageToSuite"]);
    grunt.registerTask('simplePackage', ["clean:packageBuild", "copyto:jsrfToPackage", "copyto:phprfToPackage"])
    grunt.registerTask('release', ['package', "compress", "extGrunt:buildMVCApps", "extGrunt:buildDocs", "createVersionPhp"]);
    grunt.registerTask("upload", ["extGrunt:takeScreenshots","s3:upload_package", "exec:show_gg"]);


}