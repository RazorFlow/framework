module.exports = function (grunt) {

    var buildId = "";
    if(grunt.option('release-id')) {
        buildId = "_" + grunt.option('release-id');
    }
    grunt.initConfig({
        copyto: {
            jsrfToPackage: {
                files: [
                    {cwd: 'jsrf/build/package/', src: ['**/*'], dest: 'build/package/razorflow_js/'},
                ]
            },
            phprfToPackage: {
                files: [
                    {cwd: 'phprf/build/package/', src: ['**/*'], dest: 'build/package/razorflow_php/'},
                ]
            }
        },
        clean: {
            packageBuild: ["package/**", "build/**"]
        },
        compress: {
            release: {
                options: {
                    archive: "package/razorflow_dashboard_framework" + buildId + ".zip"
                },
                files: [
                    {cwd: 'build/package/', src: ['**'], dest: 'razorflow_dashboard_framework', expand: true},
                ]
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
            }
        }
    });

    grunt.registerMultiTask ("extGrunt", "Call an external grunt", function () {
        var options = this.options({
        });
        var done = this.async ();

        grunt.util.spawn({
            grunt: true,
            opts: {
                cwd: options.cwd,
                stdio: 'inherit'
            },
            args: [options.task]
        }, done)
    })

    grunt.loadNpmTasks('grunt-copy-to');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.registerTask('cleanAll', ["extGrunt:jsClean", "extGrunt:phpClean"]);

    grunt.registerTask('buildAll', ["extGrunt:jsPackage", "extGrunt:phpPackage", "extGrunt:exampleBuild"]);
    grunt.registerTask('package', ["buildAll", "clean:packageBuild", "copyto:jsrfToPackage", "copyto:phprfToPackage"])
    grunt.registerTask('simplePackage', ["clean:packageBuild", "copyto:jsrfToPackage", "copyto:phprfToPackage"])
    grunt.registerTask('release', ['package', "compress:release"])
}