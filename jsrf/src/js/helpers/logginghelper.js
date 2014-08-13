define([
  "generated/templates",
  "kendo/kendo.window",
  "kendo/kendo.panelbar"
  ], function (JST, kWindow) {
  function LoggingHelper(options) {

    var self = this,
        $core = $("body"),
        modal = $(JST.logging_base({
        })),
        loggingItems,
        tableLogger,
        loggingContents,
        logID = 0,
        first = true;


    $core.append(modal);
    modal.kendoWindow({
      width: 600,
      height: 500,
      title: "Server Logs",
      visible: false
    }).data('kendoWindow');

    loggingItems = modal.find('.loggingItems');
    loggingContents = modal.find(".logContent");

    self.append = function(response, logs) {
      loggingItems.append(JST.logging_links({
        logID: ++logID
      }));
      loggingItems.find("li#"+ logID +" .url").text(response.url);
      loggingItems.find("li#"+ logID +" .status").text(response.responseText);
      loggingContents.append(populateLogs(response, logs));
      bindTabs(logID);
    };

    self.toggle = function() {
      if((modal).is(":visible")) {
        modal.data('kendoWindow').close();
      }
      else{
        modal.data('kendoWindow').open();
      }
    };

    self.show = function() {
      modal.data('kendoWindow').open();
      // loggingItems.data('kendoPanelBar').collapse(loggingItems.children());
      // loggingItems.data('kendoPanelBar').expand(loggingItems.children().last());
      var id = loggingItems.children().last().attr("id");
      showTab(id);
    };

    var populateLogs = function(response, logs) {
      tableLogger = JST.logging_table({
        logs: logs,
        logID: logID
      });

      return tableLogger;
    };

    var bindTabs = function (logID) {
      $("li#"+logID).click(function () {
        showTab(logID);
      });
      if (first) {
        showTab(logID);  
      }
      first = false;
    };

    var showTab = function (logID) {
      loggingContents.find("div").hide();
      loggingItems.find("li").removeClass("active");
      loggingContents.find("div#" + logID).show();
      loggingItems.find("li#" + logID).addClass("active");
    };

  }

  return LoggingHelper;
});
