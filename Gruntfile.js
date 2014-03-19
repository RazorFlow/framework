module.exports = function (grunt) {
    grunt.initConfig({
        copyto: {
            buildToStatic: {
                files: [
                    {cwd: '../jsrf/src/package/', src: ['js/*.js', 'css/*.css', 'fonts/*'], dest: 'package/static/'},
                ],
            },
            localToRelease: {
                files: [
                    {cwd: 'src/', src: ['**'], dest: 'package/rfphp/'},
                ],
            },
            releaseToFinal: {
                files: [
                    {cwd: 'package/', src: ['**'], dest: '../package/rf/php/'},
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-copy-to');

    grunt.registerTask('package', ['copyto:buildToStatic', 'copyto:localToRelease'])
    grunt.registerTask('release', ['package', 'copyto:releaseToFinal'])
}