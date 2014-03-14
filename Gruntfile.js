module.exports = function (grunt) {
    grunt.initConfig({
        shell: {
            local_noapi: {
                command: 'node tools/razordoc/bin/app.js --configFile src/config/local_js_noapi.json',
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

    
    grunt.registerTask('compile', ['shell:local_noapi', 'shell:copy_images']);
}