module.exports = function (grunt) {
    grunt.initConfig({
    	copyto: {
    		jsrfToLocal: {
    			files: 
    			[
	    			{cwd: '../lib/phprf/', src: ["**/*"], dest: 'php_mvc/cakephp/app/vendor/razorflow_php/'},
	    			{cwd: '../lib/phprf/static/rf/', src: ["js/razorflow.wrapper.min.js", "css/razorflow.min.css"], dest: 'php_mvc/cakephp/app/webroot/'}
    			]
    		},
    	},
    });

    grunt.loadNpmTasks('grunt-copy-to');
    grunt.loadNpmTasks('grunt-saucelabs');
    grunt.loadTasks("./grunt-tasks");

    grunt.registerTask('default', ["copyto"])
}
