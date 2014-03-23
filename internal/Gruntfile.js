module.exports = function (grunt) {
    grunt.initConfig({
    	copyto: {
    		jsrfToLocal: {
    			files: 
    			[
	    			{cwd: '../../jsrf/build/assets/', src: ["**/*"], dest: '../static/rf/'}
    			]
    		},
            phprfToLocal: {
                files: 
                [
                    {cwd: '../../phprf/build/package/', src: ["**/*"], dest: '../lib/phprf/'}
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
                    timeout: 2000,
                    extension: ".js"
                }
            },
            phpExamples: {
                options: {
                    files: "../src/php/examples/*.php",
                    out: "../static/exampleImages/php/examples/",
                    baseUrl: "http://localhost:8080/dev/php/examples/",
                    width: 1024,
                    height: 768,
                    timeout: 2000,
                    extension: ".php"
                }
            }
        },
        clean: {
            staticFiles: {
                options: {
                    force: true
                },
                src: ["../static/rf/"]
            },
            phpLib: {
                options: {
                    force: true
                },
                src: ["../lib/phprf/"]
            }
        }
    });

    grunt.loadNpmTasks('grunt-copy-to');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadTasks("./grunt-tasks");
    // grunt.loadNpmTasks('grunt-contrib-cssmin');
    // grunt.loadTasks("./tools/src/grunt-tasks");

    grunt.registerTask('build', ["clean:staticFiles", "clean:phpLib", "copyto:jsrfToLocal", "copyto:phprfToLocal"])
    grunt.registerTask('screenshots', ["screenshotGen:jsExamples", "screenshotGen:phpExamples"]);
}