var browsers = [{
        browserName: "firefox",
        platform: "WIN7"
    }, {
        browserName: "chrome",
        platform: "WIN7"
    }, {
        browserName: "chrome",
        platform: "linux"
    }, {
        browserName: "internet explorer",
        platform: "WIN8",
        version: "10"
    }, {
        browserName: "internet explorer",
        platform: "VISTA",
        version: "9"
    },
    {
        browserName: "internet explorer",
        platform: "WIN7",
        version: "11"
    }
];

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
                    timeout: 5000,
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
                    timeout: 5000,
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
            screenshots: {
                options: {
                    force: true
                },
                src: ["../static/exampleImages/"]
            },
            phpLib: {
                options: {
                    force: true
                },
                src: ["../lib/phprf/"]
            }
        },
        'saucelabs-jasmine': {
            modern: {
                options: {
                    urls: ["http://localhost:8080/dev/test/all"],
                    tunnelTimeout: 5,
                    concurrency: 3,
                    browsers: browsers
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-copy-to');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-saucelabs');
    grunt.loadTasks("./grunt-tasks");
    // grunt.loadNpmTasks('grunt-contrib-cssmin');
    // grunt.loadTasks("./tools/src/grunt-tasks");

    grunt.registerTask('build', ["clean:staticFiles", "clean:phpLib", "copyto:jsrfToLocal", "copyto:phprfToLocal"])
    grunt.registerTask('screenshots', ["clean:screenshots", "screenshotGen:jsExamples", "screenshotGen:phpExamples"]);

    grunt.registerTask('slowTests', ["saucelabs-jasmine:modern"]);
}