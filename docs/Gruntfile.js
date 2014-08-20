    module.exports = function (grunt) {
    grunt.initConfig({
        apiMeta: {
            js: {
                options: {
                    src: ["../jsrf/src/js/components/*.js"],
                    out: "generated/jsApiMeta.json"
                }
            },
            php: {
                options: {
                    src: ["../wrappers/phprf/src/lib/components/*.php", "../wrappers/phprf/src/lib/util/ArrayUtils.php"],
                    out: "generated/phpApiMeta.json"
                }
            }
        },
        tocGen: {
            js: {
                options: {
                    toc: 'config/jsToc.json',
                    apiMeta: 'generated/jsApiMeta.json',
                    articlesDir: './src/content/js',
                    apiPrefix: "/docs/dashboard/js/api/",
                    articlesPrefix: "/docs/dashboard/js/",
                    suffix: "php",
                    out: 'generated/jsToc.html'
                }
            },
            php: {
                options: {
                    toc: "config/phpToc.json",
                    apiMeta: "generated/phpApiMeta.json",
                    articlesDir: "./src/content/php",
                    apiPrefix: "/docs/dashboard/php/api/",
                    articlesPrefix: "/docs/dashboard/php/",
                    suffix: "php",
                    out: 'generated/phpToc.html'
                }
            }
        },
        api: {
            js: {
                options: {
                    src: "generated/jsApiMeta.json",
                    toc: 'generated/jsToc.html',
                    outPath: "../website/src/docs/dashboard/js/api",
                    relativeLinkPath: "/docs/dashboard/js/api",
                    linkPrefix: "",
                    suffix: "php",
                    apiTemplates: "src/templates/razorflow_dotcom/api_templates",
                    topBarTitle: 'JavaScript Documentation',
                    langUrl: '/docs/dashboard/js'
                }
            },
            php: {
                options: {
                    src: "generated/phpApiMeta.json",
                    toc: 'generated/phpToc.html',
                    outPath: "../website/src/docs/dashboard/php/api",
                    relativeLinkPath: "/docs/dashboard/php/api",
                    linkPrefix: "",
                    suffix: "php",
                    apiTemplates: "src/templates/razorflow_dotcom/api_templates",
                    topBarTitle: 'PHP Documentation',
                    langUrl: '/docs/dashboard/php'
                }
            }
        },
        articles: {
            js: {
                options: {
                    toc: 'generated/jsToc.html',
                    tocTree: 'config/jsToc.json',
                    articles: {
                        root: 'src/content/js',
                        imagesLocalPath: 'src/images',
                        imagesRelativePath: "/docs/dashboard/_images/",
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
                        meta: 'generated/jsApiMeta.json'
                    },
                    linkPrefix: "/docs/dashboard/js/",
                    out: "../website/src/docs/dashboard/js",
                    suffix: "php",
                    articleTemplates: "src/templates/razorflow_dotcom/article_templates",
                    topBarTitle: 'JavaScript Documentation',
                    langUrl: '/docs/dashboard/js'
                } 
            },
            php: {
                options: {
                    toc: 'generated/phpToc.html',
                    tocTree: 'config/phpToc.json',
                    articles: {
                        root: 'src/content/php',
                        imagesLocalPath: 'src/images',
                        imagesRelativePath: "js/_images/",
                        imagesPhysicalPath: "../newsite/src/docs/dashboard/js/_images/"
                    },
                    constantsPath: '../jsrf/tools/config/props.json',
                    partialsPath: 'src/partials',
                    examples: {
                        src: "../examples/src/php/examples",
                        srcSuffix: ".php",
                        imagePrefix: "http://examples.razorflow.com/static/exampleImages/php/examples/",
                        imageSuffix: ".png",
                        thumbPrefix: "http://examples.razorflow.com/static/exampleImages/php/examples/",
                        thumbSuffix: ".png",
                        livePrefix: "http://examples.razorflow.com/dashboard/php/examples/",
                        liveSuffix: ""
                    },
                    api: {
                        linkPrefix: '/docs/dashboard/php/api/',
                        meta: 'generated/phpApiMeta.json'
                    },
                    linkPrefix: "/docs/dashboard/php/",
                    out: "../website/src/docs/dashboard/php",
                    suffix: "php",
                    articleTemplates: "src/templates/razorflow_dotcom/article_templates",
                    topBarTitle: 'PHP Documentation',
                    langUrl: '/docs/dashboard/php'
                }
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

    // grunt.registerTask('build', ['razordoc:website_js', 'razordoc:website_php']);
    grunt.registerTask('build', ['apiMeta', 'tocGen', 'api', 'articles']);

    // grunt.registerTask('compile', ['shell:local_js_articles', 'shell:local_php_articles', 'shell:local_jsapi', 'shell:local_phpapi', 'shell:copy_images']);
    // grunt.registerTask('webArticles', ['shell:web_js_articles', 'shell:web_php_articles']);
    // grunt.registerTask('webApi', ['shell:web_js_api', 'shell:web_php_api']);
}
