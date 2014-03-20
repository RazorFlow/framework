module.exports = function (grunt) {
    grunt.initConfig({
        shell: {
            local_js_articles: {
                command: 'node tools/razordoc/bin/app.js --configFile src/config/local_js_articles.json',
                options: {
                    stdout: true
                }
            },
            local_php_articles: {
                command: 'node tools/razordoc/bin/app.js --configFile src/config/local_php_articles.json',
                options: {
                    stdout: true
                }
            },
            local_jsapi: {
                command: 'node tools/razordoc/bin/app.js --configFile src/config/local_js_api.json',
                options: {
                    stdout: true
                }
            },
            local_phpapi: {
                command: 'node tools/razordoc/bin/app.js --configFile src/config/local_php_api.json',
                options: {
                    stdout: true
                }
            },
            copy_images: {
                command: 'cp -r src/examples build/examples && cp -r src/exampleImages build/exampleImages',
                options: {
                    stdout: true
                }
            },
            web_js_articles: {
                command: 'node tools/razordoc/bin/app.js --configFile src/config/web_js_articles.json',
                options: {
                    stdout: true
                }
            },
            web_js_api: {
                command: 'node tools/razordoc/bin/app.js --configFile src/config/web_js_api.json',
                options: {
                    stdout: true,
                    stderr: true
                }
            },
            web_php_articles: {
                command: 'node tools/razordoc/bin/app.js --configFile src/config/web_php_articles.json',
                options: {
                    stdout: true
                }
            },
            web_php_api: {
                command: 'node tools/razordoc/bin/app.js --configFile src/config/web_php_api.json',
                options: {
                    stdout: true
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

    
    grunt.registerTask('compile', ['shell:local_js_articles', 'shell:local_php_articles', 'shell:local_jsapi', 'shell:local_phpapi', 'shell:copy_images']);
    grunt.registerTask('webArticles', ['shell:web_js_articles', 'shell:web_php_articles']);
    grunt.registerTask('webApi', ['shell:web_js_api', 'shell:web_php_api']);
}