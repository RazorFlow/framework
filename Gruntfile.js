module.exports = function (grunt) {
    grunt.initConfig({
        razordoc: {
            local: {
                options: {
                    articles: {
                        "js": {
                            src: "src/content/js/",
                            relativeLinkPath: "js/"
                        },
                        "php": {
                            src: "src/content/php/",
                            relativeLinkPath: "php/"
                        },
                    },
                    examples: {
                        'js': {
                            src: "src/examples/src/js/",
                            srcSuffix: ".js",
                            images: "src/examples/images/js/",
                            imageSuffix: ".png",
                            thumbs: "src/exampels/thumbs/js/",
                            thumbSuffix: ".png",
                            livePrefix: "http://sample.razorflow.com/php/",
                            liveSuffix: ""
                        },
                        'php': {
                            src: "src/examples/src/php/",
                            srcSuffix: ".js",
                            images: "src/examples/images/php/",
                            imageSuffix: ".png",
                            thumbs: "src/exampels/thumbs/php/",
                            thumbSuffix: ".png",
                            livePrefix: "http://sample.razorflow.com/php/",
                            liveSuffix: ""
                        }
                    },
                    api: {
                        "js": {
                            src: "../jsrf/src/js/**/*.js",
                            out: "build/docs/js/api",
                            relativeLinkPath: "js/api/"
                        },
                        "php": {
                            src: "../phprf/src/lib/**/*.php",
                            out: "build/docs/php/api",
                            relativeLinkPath: "php/api/"
                        }
                    },
                    linkPrefix: "/docs/",
                    out: "build/docs",
                    suffix: "html",
                    /*
                    base.ejs
                    article.ejs
                    api.ejs

                    ... all other remaining EJS files
                     */
                    template: "src/templates/default"
                }
            }
        },
        watch: {
            docs: {
                files: 'src/content/**/*.md',
                tasks: ['compile']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadTasks("../razordoc/src/");


    
    // grunt.registerTask('compile', ['shell:local_js_articles', 'shell:local_php_articles', 'shell:local_jsapi', 'shell:local_phpapi', 'shell:copy_images']);
    // grunt.registerTask('webArticles', ['shell:web_js_articles', 'shell:web_php_articles']);
    // grunt.registerTask('webApi', ['shell:web_js_api', 'shell:web_php_api']);
}