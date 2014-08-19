define([
	"wrapperhelpers/standalonebuilder",
  'utils/rfnotification',
  'utils/rfloggerstub',
  'core/globals',
	], function(StandaloneBuilder, RFNotification, RFLogger, rf) {
	var main = function () {
		window.rf.StandaloneBuilder = StandaloneBuilder;
    window.rf.logger = RFLogger;

    window.onerror = function(msg, link, lineno, colno, exception) {
      RFNotification.create(msg, exception);
      return false;
    };


    // require('devtools/debug.main');
    // window.rf._ = Lodash;

    // Shim for console for IE9
    window.console = window.console || {
      log: function() {},
      error: function() {}
    };
	};

	main ();

	return window.rf;
});
