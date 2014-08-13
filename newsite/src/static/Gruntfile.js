module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    less: {
      development: {
        options: {
          paths: ['less']
        },
        files: {
          "css/razorflow.css": "less/razorflow.less"
        }
      }
    },

    watch: {
      lessFiles: {
        files: ['less/*.less'],
        tasks: ['less:development']
      }
    },

    squashdemos: {
      options: {
        demoPaths: {
          js: "../../../examples/src/js/demos/*.js",
          php: "../../../examples/src/php/demos/*.php"
        },
        demosConfig: "../../../jsrf/tools/config/demos.json",
        out: "transfer/build/js/rfDemos.js",
        outCode: "transfer/build/js/rfDemoCode.js"
      }
    },
    copyto: {
      jsrfToTransfer: {
        files: [
          {cwd: '../../../jsrf/build/assets/', src: ["css/*.css", "js/*.js", "img/*"], dest: 'transfer/build/'},
        ]
      },
      fixturesToFixtures: {
        files: [
          {cwd: '../../../examples/static/fixtures/', src: ["*.*"], dest: 'fixtures/'},
          {cwd: '../../../examples/fixtures/databases/', src: ["Northwind.sqlite"], dest: 'fixtures/'}
        ]
      },
      moadToWeb: {
        files: [
          {cwd: '../../../phprf/build/packages/minified/', src: ["**/*.*"], dest: 'transfer/build/'},
          {cwd: '../../../examples/src/php/tour/', src: ["*.*"], dest: 'transfer/build/tour/'}
        ]
      },
      sqlite: {
        files: [
          {cwd: '../storage/sample_db/', src: ["razorflow.sqlite"], dest: '../storage/database/'},
        ]
      }
    },
    webfont: {
      icons: {
        src: 'svg/*.svg',
        dest: 'fonts',
        destCss: "less",
        options: {
            templateOptions: {
                baseClass: 'rf-icon',
                classPrefix: 'rf_',
                mixinPrefix: 'rf-',
                stylesheet: "less",
                htmlDemo: true
            }
        }
      }
    }
  });

  
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-copy-to');
  grunt.loadNpmTasks('grunt-webfont');
  grunt.loadTasks('../../../jsrf/tools/src/grunt-tasks');
  
  grunt.registerTask('test', ['casper:runtests']);
  grunt.registerTask ('notice', ['watch']);
  grunt.registerTask ('compile', [
    "less:development"
  ]);
  grunt.registerTask ('build', [
    'compile',
    'squashdemos',
    'copyto:jsrfToTransfer',
    'copyto:fixturesToFixtures',
    'copyto:moadToWeb',
    'copyto:sqlite',
  ]);
};