define ([
  'utils/rflogger',
  'utils/rfnotification'
  ], function (RFLogger, RFNotification) {

  var error = {

    init: function() {
      var errorListener = function() {};
      if(window.onerror) {
        errorListener = window.onerror;
      }

      window.onerror = function(msg, link, lineno, colno, exception) {
        var log = rf.logger.error(msg, exception);
        RFNotification.create(msg, exception, log);
        errorListener();
        return false;
      };
    }

  };

  return error;
});