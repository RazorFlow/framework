module.exports = function (grunt) {
    grunt.initConfig({
        razordoc: {
            local: {
                options: {
                    articles: {
                        root: 'src/content'
                    },
                    examples: {
                        'js': {
                            src: "src/examples/js/",
                            srcSuffix: ".js",
                            imagePrefix: "http://samples.razorflow.com/_assets/images/js/",
                            imageSuffix: ".png",
                            thumbPrefix: "http://samples.razorflow.com/_assets/images/js/thumbs/",
                            thumbSuffix: ".png",
                            livePrefix: "http://samples.razorflow.com/js/",
                            liveSuffix: ".html"
                        },
                        'php': {
                            src: "src/examples/php/",
                            srcSuffix: ".js",
                            imagePrefix: "http://samples.razorflow.com/_assets/images/php/",
                            imageSuffix: ".png",
                            thumbPrefix: "http://samples.razorflow.com/_assets/images/php/thumbs/",
                            thumbSuffix: ".png",
                            livePrefix: "http://samples.razorflow.com/php/",
                            liveSuffix: ".html"
                        }
                    },
                    api: {
                        "js": {
                            src: ["../jsrf/src/js/components/*.js"],
                            out: "build/docs/api/js",
                            relativeLinkPath: "api/js/"
                        },
                        "php": {
                            src: ["../phprf/src/lib/components/*.php"],
                            out: "build/docs/api/php",
                            relativeLinkPath: "api/php/"
                        }
                    },
                    linkPrefix: "",
                    out: "build/docs",
                    suffix: "html",
                    /*
                    base.ejs
                    article.ejs
                    api.ejs

                    ... all other remaining EJS files
                     */
                    template: "src/templates/default/article_layout",
                    apiTemplates: "src/templates/default"
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