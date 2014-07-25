module.exports = function (grunt) {
    grunt.initConfig({
        copyto: {
            srcToPackageMin: {
                files: [
                    {cwd: 'packages/minified/', src:['**/*'], dest: 'build/packages/minified/'},
                    {cwd: 'src/', src: ['**'], dest: 'build/packages/minified/razorflow_php/'},
                    {cwd: '../jsrf/build/assets/', src: ['js/*.js', 'css/*.css', 'fonts/**', 'img/**'], dest: 'build/packages/minified/razorflow_php/static/rf/'},
                ]
            },
            srcToPackageSrc: {
                files: [
                    {cwd: 'packages/source/', src:['**/*'], dest: 'build/packages/source/'},
                    {cwd: 'src/', src: ['**'], dest: 'build/packages/source/razorflow_php/'},
                    {cwd: '../jsrf/build/assets/', src: ['js/*.js', 'css/*.css', 'fonts/**', 'img/**'], dest: 'build/packages/source/razorflow_php/static/rf/'},
                    {cwd: '../jsrf/build/packages/source/source/', src: ['**/*'], dest: 'build/packages/source/source/'},
                    {cwd: 'src/', src: ['**'], dest: 'build/packages/source/source/php/src/'}
                ]
            },
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
            build: ["build"]
        }
    });

    grunt.loadNpmTasks('grunt-copy-to');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // grunt.registerTask('package', ["clean:build", 'copyto:libToPackage', 'copyto:assetsToPackage']);
    grunt.registerTask('packageMin', ['clean:build', 'copyto:srcToPackageMin']);
    grunt.registerTask('packageSrc', ['clean:build', 'copyto:srcToPackageSrc']);
    grunt.registerTask('package', ['clean:build', 'copyto:srcToPackageMin', 'copyto:srcToPackageSrc']);
}