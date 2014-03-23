module.exports = function (grunt) {
    grunt.initConfig({
        copyto: {
            assetsToPackage: {
                files: [
                    {cwd: '../jsrf/build/assets/', src: ['js/*.js', 'css/*.css', 'fonts/**'], dest: 'build/package/static/rf/'},
                ],
            },
            libToPackage: {
                files: [
                    {cwd: 'src/', src: ['**'], dest: 'build/package/'},
                ],
            }
        }
    });

    grunt.loadNpmTasks('grunt-copy-to');

    grunt.registerTask('package', ['copyto:libToPackage', 'copyto:assetsToPackage'])
}