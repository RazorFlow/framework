define([], function() {
    var RFLogger = {
        
        debugMode: false,

        log: function(msg) {
            console.log(msg);
        },

        error: function(msg) {
            console.error(msg);
        },
        init: function() {

        },
        showLogs: function() {
            
        }
    };

    return RFLogger;
});