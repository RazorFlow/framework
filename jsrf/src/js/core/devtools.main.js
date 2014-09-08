define(['utils/rflogger', 'utils/rfnotification', 'utils/versionchecker', 'utils/errorhandler'], function(RFLogger, RFNotification, RFVersionChecker, ErrorHandler) {
    if(window.rf) {
        rf.logger = RFLogger;
        rf.jsonp = {};
        rf.jsonp.versionCheckCallback = RFVersionChecker.versionCallback;
    }
    RFLogger.init();

    if(window.__rfVersion) {
        rf.disableUpdateChecker = function() {
            RFVersionChecker.disable();
        };

        // Timeout since if the user sets disable update checker.
        setTimeout(function() {
            RFVersionChecker.init();
        }, 5000);
    }
    
    ErrorHandler.init();

});