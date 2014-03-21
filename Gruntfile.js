module.exports = function (grunt) {
    grunt.initConfig({
        copyto: {
            buildToStatic: {
                files: [
                    {cwd: '../jsrf/src/package/', src: ['fonts/*', 'js/*.js'], dest: 'src/static/rf/'},
                    {cwd: '../jsrf/build/', src: ['js/*.js', 'css/*.css'], dest: 'src/static/rf/'},
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