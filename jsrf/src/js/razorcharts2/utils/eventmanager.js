define([], function () {
    var EventManager = function () {
        this.events = {};
    };

    EventManager.prototype.bind  = function (key, cb) {
        if(!this.events[key]) {
            this.events[key] = [];
        }

        this.events[type].push (cb);
    };

    EventManager.prototype.trigger = function (key, data) {
        if(this.events[key] && this.events[key].length) {
            for(var i=0; i<this.events[key].length; i++) {
                (this.events[key][i]) (data);
            }
        }
    };

    return EventManager;
});