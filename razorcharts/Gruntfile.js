module.exports = function (grunt) {
    grunt.initConfig({
        less: {
            development: {
                options: {
                    paths: ['src/less']
                },
                files: {
                    "src/css/razorcharts.css": "src/less/razorcharts.less"
                }
            }
        }
    });
 
    grunt.loadNpmTasks('grunt-contrib-less');    
    grunt.registerTask('compile', ['less']);
}