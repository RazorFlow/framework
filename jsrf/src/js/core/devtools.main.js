define(['utils/rflogger', 'utils/rfnotification'], function(RFLogger, RFNotification) {
    if(window.rf) {
        rf.logger = RFLogger;
    }
    RFLogger.init();
    // window.onerror = function(msg, link, lineno, colno, exception) {
    //     var log = rf.logger.error(msg, exception);
    //     RFNotification.create(msg, exception, log);
    //     return false;
    // };
});