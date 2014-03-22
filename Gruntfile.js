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
                            src: "../examples/src/js/examples/",
                            srcSuffix: ".js",
                            imagePrefix: "http://localhost:8080/static/exampleImages/js/examples/",
                            imageSuffix: ".png",
                            thumbPrefix: "http://localhost:8080/static/exampleImages/js/examples/",
                            thumbSuffix: ".png",
                            livePrefix: "http://localhost:8080/dashboard/js/examples/",
                            liveSuffix: ""
                        },
                        'php': {
                            src: "../examples/src/php/examples/",
                            srcSuffix: ".js",
                            imagePrefix: "http://localhost:8080/static/exampleImages/php/examples/",
                            imageSuffix: ".png",
                            thumbPrefix: "http://localhost:8080/static/exampleImages/php/examples/",
                            thumbSuffix: ".png",
                            livePrefix: "http://localhost:8080/dashboard/php/examples/",
                            liveSuffix: ""
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
            },
            website: {
                options: {
                    articles: {
                        root: 'src/content'
                    },
                    examples: {
                        'js': {
                            src: "../examples/src/js/examples/",
                            srcSuffix: ".js",
                            imagePrefix: "http://examples.razorflow.com/static/exampleImages/js/examples/",
                            imageSuffix: ".png",
                            thumbPrefix: "http://examples.razorflow.com/static/exampleImages/js/examples/",
                            thumbSuffix: ".png",
                            livePrefix: "http://examples.razorflow.com/dashboard/js/examples/",
                            liveSuffix: ""
                        },
                        'php': {
                            src: "../examples/src/php/examples/",
                            srcSuffix: ".js",
                            imagePrefix: "http://examples.razorflow.com/static/exampleImages/php/examples/",
                            imageSuffix: ".png",
                            thumbPrefix: "http://examples.razorflow.com/static/exampleImages/php/examples/",
                            thumbSuffix: ".png",
                            livePrefix: "http://examples.razorflow.com/dashboard/php/examples/",
                            liveSuffix: ""
                        }
                    },
                    api: {
                        "js": {
                            src: ["../jsrf/src/js/components/*.js"],
                            out: "../webrf/backend/docs/api/js/",
                            relativeLinkPath: "api/js/"
                        },
                        "php": {
                            src: ["../phprf/src/lib/components/*.php"],
                            out: "../webrf/backend/docs/api/php/",
                            relativeLinkPath: "api/php/"
                        }
                    },
                    linkPrefix: "/docs/",
                    out: "../webrf/backend/docs",
                    suffix: "html",
                    /*
                    base.ejs
                    article.ejs
                    api.ejs

                    ... all other remaining EJS files
                     */
                    template: "src/templates/razorflow_dotcom/article_layout",
                    apiTemplates: "src/templates/razorflow_dotcom"
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