define([
    "core/dashboard",
    "generated/templates",
    "utils/browserutils",
    "kendo/kendo.tabstrip",
    "kendo/kendo.mobile.tabstrip",
    "vendor/Modernizr"
], function (Dashboard, JST, browserUtils, KTabStrip, KMobileTabStrip, Modernizr) {
  function TabbedDashboard() {
    Dashboard.call(this);

    var self = this,
        base = {},
        Public = {},
        raw = self._raw,
        title = "",
        Protected,
        pro = self.pro,
        _bp = {};

    Public = {
      setTabbedDashboardTitle: function(TabbedDashboardTitle) {
        title = TabbedDashboardTitle;
      },

      addDashboardTab: function(db, options) {
        var dbID = db.pro.getID(),
            newDB = null;
        options = options ? options : {};
        db.pro.isTabbed = true;
        if (!pro.dbList.hasOwnProperty(dbID)) {
          pro.dbList[dbID] = db;
          pro.dbList[dbID].active = options.active ? true : false;
          pro.dbList[dbID].title = options.title ? options.title : pro.dbList[dbID].pro.getDashboardTitle();
          pro.dbList[dbID].closable = options.closable ? true : false;
          pro.dbList[dbID].highlightOnActivity = options.highlightOnActivity ? true : false;
        }
      },

      renderTo: function($dbDiv) {
        preRender($dbDiv);
        renderShell();
        renderCore();
        pro.addServerLogButtonListener();
      },

      embedTo: function($dbDiv) {
        preRender($("#"+$dbDiv));
        pro.setEmbeddedWidthHeight();
        renderShell();
        renderCore();
        pro.addServerLogButtonListener();
      }

    };

    Protected = {

      dbList: {},

      tabObj: null,

      previousSelectedTab: null,

      $containerDiv: null,
      $activeDashboardDiv: null,
      $tabDiv: null,
      currentDashboard: null,
      $activeTab: null,
      currentDashboardKey: null,

      managedBind: function (jqDiv, eventName, callback) {
        jqDiv.bind(eventName, callback);
      },

      dispose: function () {
        pro.tabObj.destroy();
      }

    };

    var renderShell = function() {
      // Find the corediv
      pro.$containerDiv.html(JST.tabbeddashboard_standalone({
        title: title,
        mobile: Modernizr.touch
      }));
      pro.$tabDiv = pro.$containerDiv.find('#rfTabCore');
      pro.$serverLogButton = pro.$containerDiv.find(".rfServerLogButton");
    };

    var renderCore = function() {
      var data = [],
            firstDB = null,
            activeTab = null,
            key = null;
      if (!Modernizr.touch) {
        for (key in pro.dbList) {
          if(pro.dbList.hasOwnProperty(key)) {
            if (firstDB === null) {
              firstDB = key;
            }
            if (pro.dbList[key].active && activeTab === null) {
              activeTab = key;
            }
            $(".tabLinks").append('<li data-id="'+key+'">'+pro.dbList[key].title+'</li>');
            $("#rfTabCore").append("<div data-id='"+key+"'></div>");
          }
        }
        if (activeTab === null) {
          activeTab = firstDB;
        }
        pro.tabObj = $("#rfTabCore").kendoTabStrip({
          activate: onActivate,
          animation: {
            close: {
                duration: 100,
                effects: "fadeOut"
            },
            open: {
                duration: 100,
                effects: "fadeIn"
            }
          }
        }).data("kendoTabStrip");
        var tabToActivate = $("li[data-id='"+activeTab+"']");
        pro.tabObj.activateTab(tabToActivate);
      } else {
        for (key in pro.dbList) {
          if(pro.dbList.hasOwnProperty(key)) {
            if (firstDB === null) {
              firstDB = key;
            }
            if (pro.dbList[key].active && activeTab === null) {
              activeTab = key;
            }
            $("#mobile-tabstrip").append('<a href="#' + key + '" data-id="' + key + '">' + pro.dbList[key].title + '</a>');
            $("#content-container").append('<div id="' + key + '" style="display:none"></div>');
          }
        }

        if (activeTab === null) {
          activeTab = firstDB;
        }
        pro.tabObj = $("#mobile-tabstrip").kendoMobileTabStrip({
          select: onSelect
        }).data("kendoMobileTabStrip").switchTo("#" + activeTab);

        $("#" + activeTab).show();
        pro.dbList[activeTab].embedTo(activeTab);
        
      }
    };

    var onActivate = function (e) {
      var key = e.contentElement.id,
          dataset = e.contentElement.getAttribute("data-id");
      if(pro.previousSelectedTab !== null) {
        pro.dbList[pro.previousSelectedTab].pro.dispose();
      }
      if($("#" + key).text().length === 0) {
        pro.dbList[dataset].embedTo(key);
      } else {
        pro.dbList[dataset].pro.setResizeWatcher();
      }
      pro.previousSelectedTab = dataset;
    };

    var onSelect = function (e) {
      var key = e.item.data().id;
      hideAll();
      $("#" + key).show();
      if($("#" + key).text().length === 0) {
        pro.dbList[key].embedTo(key);
      }
    };

    var hideAll = function () {
      $("#content-container > div").hide();
    };

    var preRender = function($dbDiv) {
      pro.$containerDiv = $dbDiv;
      pro.$containerDiv.css({
        'margin': '0 auto'
      });
      if(!browserUtils.isBrowserSupported()) {
        pro.$containerDiv.html(window.JST.browser_error({}));
        return;
      }
    };

    raw._registerClassName("TabbedDashboard");
    raw._registerPublic(base, Public);
    raw._registerProtected(_bp, Protected);

  }
  return TabbedDashboard;
});
