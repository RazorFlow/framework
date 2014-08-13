define(['vendor/lodash'], function(_) {
    var EventManager = function() {
        var self = this,
            events = {};

        self.register = function (eventName) {
            events[eventName] = [];
        };

        self.bind = function(eventName, cb) {
            if(events[eventName]) {
                events[eventName].push(cb);
            } else {
                console.error('Event `' + eventName + '` does not exist');
            }
        };

        self.trigger = function(eventName, params) {
            if(events[eventName]) {
                for(var i=-1; ++i<events[eventName].length;) {
                    events[eventName][i](params);
                }
            } else {
                console.error('Event `' + eventName + '` does not exist');   
            }
        };

        self.isSubscribed = function(eventName) {
            // console.log(events[eventName]);
            return !!(events[eventName] && events[eventName].length);
        };
    };

    return EventManager;
});