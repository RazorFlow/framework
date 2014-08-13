module.exports = function (grunt) {
    grunt.initConfig({
    	copyto: {
    		jsrfToLocal: {
    			files: 
    			[
	    			{cwd: '../lib/phprf/', src: ["**/*"], dest: 'php_mvc/cakephp/app/vendor/razorflow_php/'},
	    			{cwd: '../lib/phprf/static/rf/', src: ["js/razorflow.wrapper.min.js", "css/razorflow.min.css"], dest: 'php_mvc/cakephp/app/webroot/'},
				{cwd: '../lib/phprf/', src: ["**/*"], dest: 'php_mvc/rfci/application/libraries/razorflow_php/'},
				{cwd: '../lib/phprf/static/rf/', src: ["js/razorflow.wrapper.min.js", "css/razorflow.min.css", "img/**"], dest: 'php_mvc/rfci/application/'},
				{cwd: '../lib/phprf/', src: ["**/*"], dest: 'php_embedded/razorflow_php/'},
				{cwd: '../lib/phprf/', src: ["**/*"], dest: 'distributable/php_database_sample/razorflow_php/'},
				{cwd: '../static/rf/', src: ["**/*"], dest: 'html_embedded/razorflow_js/'},
    			]
    		},
    	},
    });

    grunt.loadNpmTasks('grunt-copy-to');
    grunt.loadNpmTasks('grunt-saucelabs');

    grunt.registerTask('default', ["copyto"])
}
