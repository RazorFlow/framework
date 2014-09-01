/**
 *  Sample KPI Tester
 *
 *  Conventions followed:
 *  - url: The url path which gets appended with the base url path specified in the Gruntfile
 *  - desc: Description about the test
 *  - timeout: Override the default wait timeout(of 2000)
 *
 *  Tests are described as follows:
 *  ~~~
 *  testName: function() {
 *
 *  };
 *  ~~~
 *  Inside each test functions the following objects are available:
 *  - test: Casper's testing module which provides assertion methods. =>  this.test
 *  - casper: Casper object itself.                                   =>  this.casper
 *  - data: Data that was specified like: url, desc, timeout etc.     =>  this.data
 *
 * Note:
 * Remember each test function can contain 'ONE AND ONLY ONE' assertion.
 */

module.exports = {

  url: '/kpi',

  desc: 'KPI Tests',

  captionExists: function() {
    this.test.assertExists('.rfKPICaption', 'KPI Caption exists')
  },

  valueExists: function() {
    this.test.assertExists('.rfKPIValue', 'KPI Value exists')
  },

  captionEquals: function() {
    this.test.assertSelectorTextEquals(".rfKPICaption", "Downloads", "KPI caption should be Downloads");
  },

  valueEquals: function() {
    this.test.assertSelectorTextEquals('.rfKPIValue', "42", "KPI value should be 42");
  },

  clickTest: function() {
    var self = this;
    this.casper.then(function() {
      this.click(".rfKPIValue")
    });

    this.casper.then(function() {
      this.wait(3000, function() {
        self.test.assertSelectorTextEquals('.rfKPIValue', "100");
      });
    });
  }

};

