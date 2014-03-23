module.exports = function (grunt) {
    grunt.initConfig({
        copyto: {
            jsrfToPackage: {
                files: [
                    {cwd: 'jsrf/build/package/', src: ['**/*'], dest: 'build/package/javascript/'},
                ]
            },
            phprfToPackage: {
                files: [
                    {cwd: 'phprf/build/package/', src: ['**/*'], dest: 'build/package/php/'},
                ]
            }
        },
        clean: {
            packageBuild: ["package/**", "build/**"]
        },
        compress: {
            release: {
                options: {
                    archive: "package/razorflow_dashboard_framework.zip"
                },
                files: [
                    {cwd: 'build/package/', src: ['**'], dest: 'razorflow_dashboard_framework', expand: true},
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-copy-to');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compress');

    grunt.registerTask('release', ["clean:packageBuild", "copyto:jsrfToPackage", "copyto:phprfToPackage", "compress:release"])
}