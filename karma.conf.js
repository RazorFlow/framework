// Karma configuration
// Generated on Mon Mar 03 2014 00:05:39 GMT+0530 (IST)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '',


    // frameworks to use
    frameworks: ['jasmine', 'requirejs'],


    // list of files / patterns to load in the browser
    files: [
      'tests/main.js',
      {pattern: 'src/vendor/js/jquery.min.js', included: false},
      {pattern: 'src/vendor/js/lodash.min.js', included: false},
      {pattern: 'build/js/templates.js', included: false},
      {pattern: 'src/js/core/rfclass.js', included: false},
      {pattern: 'src/js/prop/*.js', included: false},
      {pattern: 'src/js/helpers/*.js', included: false},
      {pattern: 'src/js/utils/*.js', included: false},
      {pattern: 'src/js/constants/*.js', included: false},
      {pattern: 'src/js/renderers/*.js', included: false},
      {pattern: 'tests/renderers/*Spec.js', included: false},
    ],


    // list of files to exclude
    exclude: [
      
    ],

    preprocessors: {
      '**/src/js/renderers/*.js': 'coverage'
    },
    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'

    reporters: ['dots', 'coverage'],

    coverageReporter: {
      type : 'text',
      dir : 'coverage/',
      file : 'coverage.txt'
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ['Chrome', 'Firefox', 'Safari', 'PhantomJS'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true
  });
};
