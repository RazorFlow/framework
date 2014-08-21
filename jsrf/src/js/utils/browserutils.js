define([
  'vendor/ua-parser'
],
    function (UAParser) {
      var browserUtils = {
        getBrowser: function() {
          var parser = new UAParser(),
              engine = parser.getEngine();

          return engine;
        },
        getDevice: function() {
          var parser = new UAParser(),
              device = parser.getDevice();

          return device;
        },
        isIE: function() {
          var browser = browserUtils.getBrowser();

          return browser.name === 'Trident';
        },
        isBrowserSupported: function() {
          var parser = new UAParser(),
              result = parser.getResult(),
              browser = result.browser,
              device = result.device;

          if(device.type === 'mobile' || device.type === 'tablet') {
            if(browser.name === 'Chrome' && browser.major < 18) {
                return false;
            } else if(browser.name === 'Mobile Safari' && browser.major < 5) {
                return false;
            } else if(browser.name === 'IEMobile' && browser.major < 10) {
                return false;
            } else {
                return true;
            }
          } else {
            if(browser.name === 'Chrome' && browser.major < 22) {
                return false;
            } else if(browser.name === 'Firefox' && browser.major < 17) {
                return false;
            } else if(browser.name === 'IE' && browser.major < 9) {
                return false;
            } else if(browser.name === 'Safari' && browser.major < 6) {
                return false;
            } else {
                return true;
            }
          }

          return true;
        }
      };
      return browserUtils;
    });