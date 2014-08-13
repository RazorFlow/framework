define(['kendo/kendo.core', 'vendor/lodash'], function (kCore, _) {
  var staticClassList = {};

  function RFClass() {
    var self = this,
        pubs = [],
        subscribers = {};

    self.pro = {
      /**
       * The event emitter
       * @type {kendo.Observable}
       */
      ee: new kendo.Observable (),
      bind: function (name, callback) {
        if (!subscribers.hasOwnProperty(name)) {
          subscribers[name] = [];
        }
        subscribers[name].push(callback);
      },
      unbindAll: function () {
        subscribers = {};
      },
      trigger: function (name, params) {
        if(name === "change") {
          self.trigger("update");
        }
        if (subscribers.hasOwnProperty(name)) {
          var len = subscribers[name].length;
          for (var i = 0; i < len; i++) {
            // TODO: jugad implemented need to find better solution (achievement unlocked: Total Jugad)
            if (subscribers[name]) {
              subscribers[name][i](params);
            }
          }
        }
        if(name === "submit") {
          self.trigger("apply");
        }
      },
      isSubscribed: function(eventName) {
        return !!(subscribers[eventName] && subscribers[eventName].length);
      },
      aspect: {
        items: [],
        revoke: function(name) {
          self.pro.aspect.items = _.without(self.pro.aspect.items, name);
        },
        provide: function (name) {
          if(_.indexOf(self.pro.aspect.items, name) === -1) {
            self.pro.aspect.items.push(name);
          }
        },
        require: function (items) {
          var errMsg = [];
          for (var key in items) {
            if(items.hasOwnProperty(key)) {
              if(_.indexOf(self.pro.aspect.items, key) === -1) {
                errMsg.push(items[key]);
              }
            }
          }
          return errMsg;
        }
      },
      handleWarning: function (msg) {
        console.warn("Got an error: ", msg);
      }
    };
    self._rawId = "";
    self._raw = {
      className: "RFClass",
      _registerPublic: function (base, pub) {
        var errorFunc = function (key) {
          return function () {
            console.warn("Note: Trying to call base '" + key + "' which doesn't exist");
            return null;
          };
        };

        for (var key in pub) {
          if (pub.hasOwnProperty(key)) {
            // Check if there's already a parent method.
            if (self.hasOwnProperty(key)) {
              base[key] = self[key];
            }
            else {
              // Otherwise just in case someone tries to access the base function, don't die
              // with an error
              base [key] = errorFunc(key);
            }

            self[key] = pub[key];
          }
        }
      },
      _registerClassName: function (name) {
        if (staticClassList.hasOwnProperty(name)) {
          staticClassList[name]++;
        }
        else {
          staticClassList[name] = 0;
        }
        self._raw.className = name;
        self._rawId = name + "_" + staticClassList[name];
      },
      _dispose: function () {
        for (var i = 0; i < pubs.length; i++) {
          for (var key in pubs[i]) {
            if (pubs[i].hasOwnProperty(key)) {
              if (typeof(pubs[i][key]) === "object") {
                pubs[i][key] = null;
              }
            }
          }
          pubs[i] = null;
        }
        pubs = null;
      },
      _registerProtected: function (base, items) {
        base = base ? base : {};
        for (var key in items) {
          if (items.hasOwnProperty(key)) {
            if (self.pro.hasOwnProperty(key)) {
              base[key] = self.pro[key];
            }
            self.pro[key] = items[key];
          }
        }
      },
      registerPublicExtensions: function (extension) {
        var pubFunctions = extension.call(self, self.pro);
        self._raw._registerPublic({}, pubFunctions);
      },
      registerProtectedExtensions: function (extension) {
        var proFunctions = extension.call(self, self.pro);
        self._raw._registerProtected({}, proFunctions);
      }
    };

    var base = {};
    self._raw._registerPublic(base, {
      /**
       * Bind a handler to the event
       * 
       * @method bind
       * @param  {string} eventName The name of the event to bind to
       * @param {function} handler A function to handle the the event
       * @param {boolean} one If set to true, it gets triggered only once
       */
        bind: function(eventName, handler, one) {
          self.pro.ee.bind(eventName, handler, one);
        },

        one: function(eventNames, handlers) {
          return self.pro.ee.one(eventName, handlers);
        },

        /**
         * Trigger an event and start any handlers attached to the event
         *
         * @method trigger
         * @param  {string} eventName The name of the event to trigger
         * @param {object} e An object containing extra data that's passed to the handler of the event
         */
        trigger: function(eventName, e) {
            return self.pro.ee.trigger(eventName, e);
        },

        /**
         * Bind a handler to the event.
         *
         * * If `eventName` is not set, all events are unbound
         * * If `handler` is not set, all handlers for the event name are removed
         * 
         * @method unbind
         * @param  {string} eventName The name of the event to unbind
         * @param {function} handler The function to unbind
         */
        unbind: function(eventName, handler) {
          return self.pro.ee.unbind(eventName, handler);
        }
    });

  }

  return RFClass;
});
