define(["utils/rfnotification"], function (RFNotification) {
  var AjaxWrapper = function () {

    var self = this;

    self.ajax = function(options) {
      var renderer = options.renderer ? options.renderer : null;
      $.ajax({
        type: options.type ? options.type : 'GET',
        url: options.url,
        data: options.data ? options.data : {},
        success: function(data, status, xhr) {
          options.success(data);

          if(data.logs) {
            var message;
            for(var i=0; i<data.logs.length; i++) {
              message = data.logs[i].message + ' : ' + data.logs[i].log;
              rf.logger.log(message, {
                'source': 'server'
              });
            }

          }

        },
        error: function(xhr, errorType, error) {
          var id = rf.logger.error("There was an error processing your request.", '', {
            source: 'server',
            extraInfo: true,
            infoFormatter: errorFormatter,
            error: { type: errorType, xhr: xhr },
            obj: this
          });

          RFNotification.create(getErrorNotificationMessage(), null, id);
        }
      });
    };

     var errorFormatter = function(item) {
      var response = item.data.error.xhr.responseJSON;
      var $div = $("<div/>");
      $div.append($("<li/>").text(item.data.obj.url));
      $div.append($("<li/>").html("<strong>" + item.data.error.type + "</strong>"));
      if(response && response.errors) {
        $div.append($("<div/>").html("<strong>" + response.errors.error + "</strong>"));
        $div.append($("<div/>").html(response.backtrace));
      }
      else {
        $div.append($("<div/>").html(item.data.error.xhr.responseText));
      }

      return $div;
    };

    var getErrorNotificationMessage = function() {
      var message ;

      if(rf.logger.debugMode) {
        message = 'There was an error processing your request. Click to view.';
      }
      else {
        message = 'There was an error processing your request';
      }

      return message;
    } 

  };

  return AjaxWrapper;
});
