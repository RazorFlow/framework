/**
 *  Wrapper Tester
 *  A simple module for running integration tests on RazorFlow Wrappers
 *
 *  Requirements:
 *  - casperjs (installation globally)
 *
 *  Module available options
 *  - testspath => Path where all the tests live
 *  - baseurl => THe base url of the testcase
 */

var _ = require('underscore'),
    fs = require('fs'),
    timeout = 2000,
    testspath = null,
    baseurl = null,
    mod = null,
    data = null,
    helper = null,
    fullpath = null,
    tests = [],
    dataKeys = [],
    totalTests = 0;

var raiseException = function(msg) {
  casper.log(msg, 'error');
  casper.exit();
};

testspath = typeof casper.cli.options.testspath === 'undefined' ? raiseException('Tests path not provided') : casper.cli.options.testspath;
baseurl = typeof casper.cli.options.baseurl === 'undefined' ? raiseException('Base url is not provided') : casper.cli.options.baseurl;

_.each(fs.list(testspath), function(file) {
  fullpath = fs.workingDirectory + fs.separator + testspath + fs.separator + file;
  if(fs.isFile(fullpath)) {
    mod = require(fullpath);
    data = {};

    tests = _.filter(_.keys(mod), function(k) {
      return typeof mod[k] === 'function';
    });

    dataKeys = _.filter(_.keys(mod), function(k) {
      return typeof mod[k] !== 'function';
    });

    _.each(dataKeys, function(key) {
      data[key] = mod[key];
    });

    totalTests = tests.length;

    casper.test.comment("Testcase File: " + fs.basename(fullpath));
    casper.test.begin('Running ' + mod.desc, totalTests, function(test) {

      casper.start(baseurl + mod.url, function() {
        timeout = mod.timeout ? mod.timeout : timeout;
        this.wait(timeout, function() {
          _.each(tests, function(key) {
            helper = new TestHelper({
              test: test,
              casper: casper,
              data: data
            });
            helper.execute(mod[key]);
          });
        });
      }); 

      casper.run(function() {
        test.done();
      });

    });
  }
});

function TestHelper(obj) {
  
  var self = this;

  self.test = obj.test;

  self.casper = obj.casper;

  self.data = obj.data;

  self.execute = function(method) {
    var test = _.bind(method, self);
    test();
  };

};
