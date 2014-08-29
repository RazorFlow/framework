/**
 *  A simple module for running integration tests on RazorFlow Wrappers
 *
 *  Requirements:
 *  - casperjs (installation globally)
 *
 *  Module available options
 *  - testspath => Path where all the tests live
 *  - baseurl => THe base url of the testcase
 */

var _ = require('underscore');
var fs = require('fs');
var mod;


var testspath = casper.cli.options.testspath;
var host = casper.cli.options.baseurl;
var timeout = 2000;
var data;
var helper;
var fullpath;
var tests;
var dataKeys;
var totalTests;

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

    casper.test.comment(mod.desc);

    casper.test.begin('Starting...', totalTests, function(test) {

      casper.start(host + mod.url, function() {
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

}

