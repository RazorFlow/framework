define(['utils/ajaxwrapper'], function (AjaxWrapper) {
  function Query() {
    var self = this,
        ds = null,
        subscribers = [],
        component = null,
        params = {
          sort : {
            column: null,
            order: null
          }
        };

    self.setDataSource = function (d) {
      ds = d;
    };

    self.run = function (callback) {
      self.runAsync(callback);
    };

    self.subscribe = function (callback) {
      subscribers.push(callback);
    };

    self.limit = function (skip, take) {
      params.limit = {
        skip: skip,
        take: take
      };

      return self;
    };

    self.runAndSubscribe = function (callback) {
      self.subscribe(callback);
      self.run(callback);
    };

    self.triggerUpdates = function (_component) {
      component = _component;
      self.runAsync(function (newData) {
        for (var i = 0; i < subscribers.length; i++) {
          subscribers[i](newData);
        }
      });

    };

    self.runAsync = function (callback) {
      if(ds.url === null) {
        var res = self.runSyncArray ();
        callback(res);
      }
      else {
        self.runAsyncURL (callback);
      }
    };

    self.runSyncArray = function () {
      // Get the data.
      var data = ds.getRawData();
      var handleLimit = function () {
        if (typeof(params.limit) === "object") {
          data = data.slice(params.limit.skip, params.limit.skip + params.limit.take);
        }
      };

      handleLimit();
      return data;
    };

    self.runAsyncURL = function (callback) {
      component.lock();
      var rfAjax = new AjaxWrapper();
      rfAjax.ajax({
        type: "POST",
        url: ds.url,
        renderer: component.pro.renderer,
        db: component.pro.db,
        data: {
          params: JSON.stringify(params)
        },
        success: function(data) {
          component.unlock();
          callback(JSON.parse(data.data));
        }
      });
    };

    self.sort = function (column, order) {
      order = order ? order : (params.sort.order === 'DESC' ? 'AESC' : 'DESC');
      params.sort = {
        column: column,
        order: order
      };
      return self;
    };
  }

  return Query;
});
