define([
	"wrapperhelpers/standalonebuilder",
  'utils/rfnotification',
  'utils/rfloggerstub',
  'core/globals',
  'utils/errorhandler'
	], function(StandaloneBuilder, RFNotification, RFLogger, rf, ErrorHandler) {
	var main = function () {
		window.rf.StandaloneBuilder = StandaloneBuilder;
    window.rf.logger = RFLogger;

    ErrorHandler.init();


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
