define(["kendo/kendo.notification", "generated/templates"], function(KNotification, JST) {
    var RFNotification = {
        create: function(msg, exception, id) {
            var $notification = $("<div/>").addClass("rfNotification");
            $("body").append($notification);

            var errorTemplate = JST.notification_errors({
                msg: msg
            });

            $notification.append(errorTemplate);
            $notification.kendoNotification({
              allowHideAfter: 2000,
               position: {
                stacking: 'down',
                top: 30,
                right: 30
               },
              handleClick: function() {
                rf.logger.showLogs(id);
              }
            }).data('kendoNotification');

            $notification.data('kendoNotification').show(errorTemplate, "error");
        }
    };

    return RFNotification;
});