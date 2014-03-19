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

    
    grunt.registerTask('compile', ['shell:local_js_articles', 'shell:local_js_articles', 'shell:local_jsapi', 'shell:local_phpapi', 'shell:copy_images']);
}