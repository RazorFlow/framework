module.exports = function (grunt) {
    grunt.initConfig({
    	copyto: {
    		jsrfToLocal: {
    			files: 
    			[
	    			{cwd: '../../jsrf/src/package', src: ["fonts/**", "css/**"], dest: '../static/rf/'},
	    			{cwd: '../../jsrf/build', src: ["js/**"], dest: '../static/rf/'},
                    {cwd: '../../phprf/src', src: ["**"], dest: '../lib/phprf/'}
    			]
    		}
    	},
        screenshotGen: {
            jsExamples: {
                options: {
                    files: "../src/js/examples/*.js",
                    out: "../static/exampleImages/js/examples/",
                    baseUrl: "http://localhost:8080/dev/js/examples/",
                    width: 1024,
                    height: 768,
                    timeout: 2000
                }
            }
        },
    });


   grunt.loadNpmTasks('grunt-copy-to');
    grunt.loadTasks("./grunt-tasks");
    // grunt.loadNpmTasks('grunt-contrib-cssmin');
    // grunt.loadTasks("./tools/src/grunt-tasks");


    
    grunt.registerTask('build', ["copyto:jsrfToLocal"])
    grunt.registerTask('screenshots', ["screenshotGen:jsExamples"])
}