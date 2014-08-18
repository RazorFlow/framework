    module.exports = function (grunt) {
    grunt.initConfig({
        apiMeta: {
            options: {
                src: ["../jsrf/src/js/components/*.js"],
                out: "generated/apiMeta.json"
            }
        
        },
        tocGen: {    
            options: {
                toc: 'config/toc.json',
                apiMeta: 'generated/apiMeta.json',
                articlesDir: './src/content/js/guide/components/chart',
                apiPrefix: "/docs/dashboard/js/api/",
                articlesPrefix: "/docs/dashboard/js/",
                suffix: "html",
                out: 'generated/toc.html'
            }
        },
        api: {
            options: {
                src: "generated/apiMeta.json",
                toc: 'generated/toc.html',
                outPath: "build/docs/dashboard/js/api",
                relativeLinkPath: "/docs/dashboard/js/api",
                linkPrefix: "",
                suffix: "html",
                apiTemplates: "src/templates/default/api_templates"
            }
        },
        articles: {
            options: {
                toc: 'generated/toc.html',
                tocTree: 'config/toc.json',
                articles: {
                    root: 'src/content/js/guide/components/chart',
                    imagesLocalPath: 'src/images',
                    imagesRelativePath: "js/_images/",
                    imagesPhysicalPath: "../newsite/src/docs/dashboard/js/_images/"
                },
                constantsPath: '../jsrf/tools/config/props.json',
                partialsPath: 'src/partials',
                examples: {
                    src: "../examples/src/js/examples",
                    srcSuffix: ".js",
                    imagePrefix: "http://examples.razorflow.com/static/exampleImages/js/examples/",
                    imageSuffix: ".png",
                    thumbPrefix: "http://examples.razorflow.com/static/exampleImages/js/examples/",
                    thumbSuffix: ".png",
                    livePrefix: "http://examples.razorflow.com/dashboard/js/examples/",
                    liveSuffix: ""
                },
                api: {
                    linkPrefix: '/docs/dashboard/js/api/',
                    meta: 'generated/apiMeta.json'
                },
                linkPrefix: "/docs/dashboard/js/",
                out: "build/docs/dashboard/js/",
                suffix: "html",
                articleTemplates: "src/templates/default/article_templates",
                topBarTitle: 'JavaScript Documentation'
            }
        },
        razordoc: {
            local: {
                options: {
                    articles: {
                        root: 'src/content'
                    },
                    constantsPath: '../jsrf/tools/config/props.json',
                    partialsPath: 'src/partials',
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
                            srcSuffix: ".php",
                            imagePrefix: "http://localhost:8080/static/exampleImages/php/examples/",
                            imageSuffix: ".png",
                            thumbPrefix: "http://localhost:8080/static/exampleImages/php/examples/",
                            thumbSuffix: ".png",
                            livePrefix: "http://localhost:8080/dashboard/php/examples/",
                            liveSuffix: ""
                        }
                    },
                    api: {
                        "relativeLinkPath": 'api',
                        "lang": {
                            "js": {
                                src: ["../jsrf/src/js/components/*.js"],
                                out: "build/docs/api/js",
                                relativeLinkPath: "api/js/"
                            },
                            "php": {
                                src: ["../phprf/src/lib/components/*.php", "../phprf/src/lib/util/*.php"],
                                out: "build/docs/api/php",
                                relativeLinkPath: "api/php/"
                            }
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
                    articleTemplates: "src/templates/default/article_templates",
                    apiTemplates: "src/templates/default/api_templates"
                }
            },
            // website: {
            //     options: {
            //         articles: {
            //             root: 'src/content',
            //             imagesLocalPath: 'src/images',
            //             imagesRelativePath: "dashboard/_images/",
            //             imagesPhysicalPath: "../newsite/src/docs/dashboard/_images/"
            //         },
            //         constantsPath: '../jsrf/tools/config/props.json',
            //         partialsPath: 'src/partials',
            //         examples: {
            //             'js': {
            //                 src: "../examples/src/js/examples/",
            //                 srcSuffix: ".js",
            //                 imagePrefix: "http://examples.razorflow.com/static/exampleImages/js/examples/",
            //                 imageSuffix: ".png",
            //                 thumbPrefix: "http://examples.razorflow.com/static/exampleImages/js/examples/",
            //                 thumbSuffix: ".png",
            //                 livePrefix: "http://examples.razorflow.com/dashboard/js/examples/",
            //                 liveSuffix: ""
            //             },
            //             'php': {
            //                 src: "../examples/src/php/examples/",
            //                 srcSuffix: ".php",
            //                 imagePrefix: "http://examples.razorflow.com/static/exampleImages/php/examples/",
            //                 imageSuffix: ".png",
            //                 thumbPrefix: "http://examples.razorflow.com/static/exampleImages/php/examples/",
            //                 thumbSuffix: ".png",
            //                 livePrefix: "http://examples.razorflow.com/dashboard/php/examples/",
            //                 liveSuffix: ""
            //             }
            //         },
            //         api: {
            //             "relativeLinkPath": 'api',
            //             lang: {
            //                 "js": {
            //                     src: ["../jsrf/src/js/components/*.js"],
            //                     out: "../newsite/src/docs/dashboard/api/js/",
            //                     relativeLinkPath: "api/js/"
            //                 },
            //                 "php": {
            //                     src: ["../phprf/src/lib/components/*.php", "../phprf/src/lib/util/*.php"],
            //                     out: "../newsite/src/docs/dashboard/api/php/",
            //                     relativeLinkPath: "api/php/"
            //                 }
            //             }
            //         },
            //         linkPrefix: "/docs",
            //         out: "../newsite/src/docs/dashboard/",
            //         suffix: "php",
            //         /*
            //         base.ejs
            //         article.ejs
            //         api.ejs

            //         ... all other remaining EJS files
            //          */
            //         articleTemplates: "src/templates/razorflow_dotcom/article_templates",
            //         apiTemplates: "src/templates/razorflow_dotcom/api_templates"
            //     }
            // }
            // 
            website_js: {
                options: {
                    articles: {
                        root: 'src/content/js',
                        imagesLocalPath: 'src/images',
                        imagesRelativePath: "js/_images/",
                        imagesPhysicalPath: "../newsite/src/docs/dashboard/js/_images/"
                    },
                    constantsPath: '../jsrf/tools/config/props.json',
                    partialsPath: 'src/partials',
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
                        // 'php': {
                        //     src: "../examples/src/php/examples/",
                        //     srcSuffix: ".php",
                        //     imagePrefix: "http://examples.razorflow.com/static/exampleImages/php/examples/",
                        //     imageSuffix: ".png",
                        //     thumbPrefix: "http://examples.razorflow.com/static/exampleImages/php/examples/",
                        //     thumbSuffix: ".png",
                        //     livePrefix: "http://examples.razorflow.com/dashboard/php/examples/",
                        //     liveSuffix: ""
                        // }
                    },
                    api: {
                        "relativeLinkPath": 'api',
                        lang: {
                            "js": {
                                src: ["../jsrf/src/js/components/*.js"],
                                out: "../newsite/src/docs/dashboard/js/api",
                                relativeLinkPath: "api/"
                            },
                            // "php": {
                            //     src: ["../phprf/src/lib/components/*.php", "../phprf/src/lib/util/*.php"],
                            //     out: "../newsite/src/docs/dashboard/api/php/",
                            //     relativeLinkPath: "api/php/"
                            // }
                        }
                    },
                    linkPrefix: "/docs/dashboard",
                    out: "../newsite/src/docs/dashboard/js/",
                    suffix: "php",
                    /*
                    base.ejs
                    article.ejs
                    api.ejs

                    ... all other remaining EJS files
                     */
                    articleTemplates: "src/templates/razorflow_dotcom/article_templates",
                    apiTemplates: "src/templates/razorflow_dotcom/api_templates",
                    topBarTitle: 'JavaScript Documentation',
                    langUrl: 'js'
                }
            },
            website_php: {
                options: {
                    articles: {
                        root: 'src/content/php',
                        imagesLocalPath: 'src/images',
                        imagesRelativePath: "php/_images/",
                        imagesPhysicalPath: "../newsite/src/docs/dashboard/php/_images/"
                    },
                    constantsPath: '../jsrf/tools/config/props.json',
                    partialsPath: 'src/partials',
                    examples: {
                        // 'js': {
                        //     src: "../examples/src/js/examples/",
                        //     srcSuffix: ".js",
                        //     imagePrefix: "http://examples.razorflow.com/static/exampleImages/js/examples/",
                        //     imageSuffix: ".png",
                        //     thumbPrefix: "http://examples.razorflow.com/static/exampleImages/js/examples/",
                        //     thumbSuffix: ".png",
                        //     livePrefix: "http://examples.razorflow.com/dashboard/js/examples/",
                        //     liveSuffix: ""
                        // },
                        'php': {
                            src: "../examples/src/php/examples/",
                            srcSuffix: ".php",
                            imagePrefix: "http://examples.razorflow.com/static/exampleImages/php/examples/",
                            imageSuffix: ".png",
                            thumbPrefix: "http://examples.razorflow.com/static/exampleImages/php/examples/",
                            thumbSuffix: ".png",
                            livePrefix: "http://examples.razorflow.com/dashboard/php/examples/",
                            liveSuffix: ""
                        }
                    },
                    api: {
                        "relativeLinkPath": 'api',
                        lang: {
                            // "js": {
                            //     src: ["../jsrf/src/js/components/*.js"],
                            //     out: "../newsite/src/docs/dashboard/api/js/",
                            //     relativeLinkPath: "api/js/"
                            // },
                            "php": {
                                src: ["../phprf/src/lib/components/*.php", "../phprf/src/lib/util/*.php"],
                                out: "../newsite/src/docs/dashboard/php/api",
                                relativeLinkPath: "api/"
                            }
                        }
                    },
                    linkPrefix: "/docs/dashboard",
                    out: "../newsite/src/docs/dashboard/php/",
                    suffix: "php",
                    /*
                    base.ejs
                    article.ejs
                    api.ejs

                    ... all other remaining EJS files
                     */
                    articleTemplates: "src/templates/razorflow_dotcom/article_templates",
                    apiTemplates: "src/templates/razorflow_dotcom/api_templates",
                    topBarTitle: 'PHP Documentation',
                    langUrl: 'php'
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
    grunt.loadTasks("../tools/razordoc/tasks/");

    grunt.registerTask('build', ['razordoc:website_js', 'razordoc:website_php']);

    // grunt.registerTask('compile', ['shell:local_js_articles', 'shell:local_php_articles', 'shell:local_jsapi', 'shell:local_phpapi', 'shell:copy_images']);
    // grunt.registerTask('webArticles', ['shell:web_js_articles', 'shell:web_php_articles']);
    // grunt.registerTask('webApi', ['shell:web_js_api', 'shell:web_php_api']);
}
