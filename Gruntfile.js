module.exports = function (grunt) {
    grunt.initConfig({
        copyto: {
            assetsToPackage: {
                files: [
                    {cwd: '../jsrf/build/assets/', src: ['js/*.js', 'css/*.css', 'fonts/**', 'img/**'], dest: 'build/package/static/rf/'},
                ],
            },
            libToPackage: {
                files: [
                    {cwd: 'src/', src: ['**'], dest: 'build/package/'},
                ],
            }
        },
        clean: {
            build: ["build/package"]
        }
    });

    grunt.loadNpmTasks('grunt-copy-to');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('package', ["clean:build", 'copyto:libToPackage', 'copyto:assetsToPackage'])
}