define(['utils/rflogger', 'utils/rfnotification', 'utils/versionchecker'], function(RFLogger, RFNotification, RFVersionChecker) {
    if(window.rf) {
        rf.logger = RFLogger;
        rf.rfVersionCallback = RFVersionChecker.versionCallback;
    }
    RFLogger.init();

    if(window.__rfVersion) {
        RFVersionChecker.init();
    }
    
    window.onerror = function(msg, link, lineno, colno, exception) {
        var log = rf.logger.error(msg, exception);
        RFNotification.create(msg, exception, log);
        return false;
    };

});