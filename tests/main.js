var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (/Spec\.js$/.test(file)) {
      tests.push(file);
    }
  }
}
requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/src/js',

    paths: {
        'jquery': '../src/vendor/js/jquery.min',
        'underscore': '../src/vendor/js/lodash.min',
        'dashboard': '../js/core/dashboard'
    },

    shim: {
        'underscore': {
            exports: '_'
        }
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});