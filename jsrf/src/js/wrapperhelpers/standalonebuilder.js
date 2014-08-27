/*jshint -W064 */

define([
	"core/dashboard",
	"helpers/standalonedashboard",
	"helpers/tabbeddashboard",
  "helpers/logginghelper",
	"components/kpicomponent",
	"components/tablecomponent",
	"components/chartcomponent",
	"components/formcomponent",
  "components/gaugecomponent",
  "components/kpitablecomponent",
  "components/kpigroupcomponent",
  "utils/ajaxwrapper",
  "vendor/lodash"
	], function(Dashboard, StandaloneDashboard, TabbedDashboard , LoggingHelper, KPIComponent, TableComponent, ChartComponent, FormComponent, GaugeComponent, KPITableComponent, KPIGroupComponent, AjaxWrapper, _ ) {
		// TODO: Rename to DashboardBuilder
	var StandaloneBuilder = function () {
		var self = this;

    self.db = null;

    self.refreshURL = null;

    self.ajaxRequest = new AjaxWrapper();

		self.buildDashboardFromObject = function (obj) {
      // displayLogs(obj);
			StandaloneDashboard (function (db) {
        self.db = db;
				var components = obj['components'];
        var comps = [];

        for(var key in components) {
          if(components.hasOwnProperty(key)) {
            components[key].key = key;
            comps.push(components[key]);
          }
        }
        
        for(var i=-1; ++i<comps.length;) {
          configureComponent(db, comps[i], comps[i].key);
        }

				if(obj['properties']['dashboardTitle']) {
					db.setDashboardTitle (obj['properties']['dashboardTitle']);
				}

        if(obj['properties']['dashboardDelay']) {
          self.refreshURL = obj['properties']['autoRefreshURL'];
          refreshDashboard();
        }

        addLogs(db, obj);
        disableUpdateChecker(obj['properties']);
			});
		};

    self.buildTabbedAsEmbedded = function(obj, id) {
      var tabbed = new TabbedDashboard();
      var tabbedComponents = obj['tabbedComponents'];

      disableUpdateChecker(obj['properties']);
      tabbed.setTabbedDashboardTitle(obj['tabbedDashboardTitle']);

      for(var i=0; i<tabbedComponents.length; i++){
        var active = tabbedComponents[i]['properties']['active'] ? true : false;
          var options = {'active': active};
        var db = new Dashboard();
        var dbComponents = tabbedComponents[i];
        configureDashboard(dbComponents, db);
        tabbed.addDashboardTab(db, options);
      }

      setDashboardWidthHeight(obj, tabbed);
      tabbed.embedTo(id);
      addTabbedLogs(tabbed, obj);
    };

		self.embedDashboardFromObject = function (obj, id) {
			var db = new Dashboard ();

      disableUpdateChecker(obj['properties']);
			configureDashboard (obj, db);
			setDashboardWidthHeight(obj, db);
			db.embedTo (id);
      addLogs(db, obj);
		};

    self.buildTabbedDashboardFromObject = function(obj) {
      disableUpdateChecker(obj['properties']);
			StandaloneDashboard (function (tdb) {
        tdb.setTabbedDashboardTitle(obj['tabbedDashboardTitle']);
        // tdb.pro.isTabbed = true;
			  var dbs = [];
			  var tabbedComponents = obj['tabbedComponents'];
        for(var i=0; i<tabbedComponents.length; i++){
          var active = tabbedComponents[i]['properties']['active'] ? true : false;
          var db = new Dashboard();
          var dbComponents = tabbedComponents[i];
          configureDashboard(dbComponents, db);
          tdb.addDashboardTab (db, { 'active': active });
        }

        addTabbedLogs(tdb, obj);
			}, { tabbed: true });
    };

		var configureDashboard = function (obj, db) {
				var components = obj['components'];
				for(var key in components) {
					if(components.hasOwnProperty(key)) {
						configureComponent(db, components[key], key);
					}
				}

				if(obj['properties']['dashboardTitle']) {
					db.setDashboardTitle (obj['properties']['dashboardTitle']);
				}

		};
        // Viral => Y case?? :(
		var configureComponent = function (db, config, id) {
			var cobj = null;
			switch(config.type) {
				case "KPIComponent":
					cobj = new KPIComponent();
					break;
				case "TableComponent":
					cobj = new TableComponent();
					break;
				case "ChartComponent":
					cobj = new ChartComponent();

          //TODO: Quick fix for chart drilldown to work.
          if(config.props.core.breadCrumbs && config.props.core.breadCrumbs.length > 0) {
            cobj.pro.isDrillDownable = true;
            cobj.pro.totalDrills = config.props.core.breadCrumbs.length;
          }
					break;
				case "FormComponent":
					cobj = new FormComponent();
					break;
        case "GaugeComponent":
            cobj = new GaugeComponent();
            break;
        case "KPITableComponent":
            cobj = new KPITableComponent();
            break;
        case "KPIGroupComponent":
            cobj = new KPIGroupComponent();
            break;
				default:
					throw "Cannot build for type " + config.type;
			}
        var eventArr = $.map(config["props"]["events"], function (value, index){
          return value;
        });

        config["props"]["events"] = eventArr;
        if (config["props"]["events"].length > 0) {
          eventArr = [];
          var eventArr = $.map(config["props"]["events"][0]["affectedComponents"], function (value, index){
            return value;
          });

          config["props"]["events"][0]["affectedComponents"] = eventArr;
        }
			cobj.pro.buildFromObject (config);
			cobj.setID(id);
			db.addComponent (cobj);
		};

    var setDashboardWidthHeight = function(obj, dbObj) {
      if(obj['properties']['dashboardWidth']) {
        dbObj.setWidth(obj['properties']['dashboardWidth']);
      }

      if(obj['properties']['dashboardHeight']) {
        dbObj.setHeight(obj['properties']['dashboardHeight']);
      }
    };
	};

  var addTabbedLogs = function(tdb, obj) {
    var logs = [];
    if(obj.debug) {
      logs.push(obj.logs);
    }

    for(var i=0; i<obj.tabbedComponents.length; i++) {
      if(obj.debug) {
        logs.push(obj.tabbedComponents[i].logs);
      }
    }

    if(logs.length > 0) {
      var message;
      rf.logger.init();
      for(i=0; i<logs.length; i++) {
        var dashboardLogs = logs[i];

        for(var j=0; j<dashboardLogs.length; j++) {
          message = dashboardLogs[j].message + ' : ' + dashboardLogs[j].log;
          rf.logger.log(message, {
            'source': 'server'
          });
        }
      }

    }
  };

  var addLogs = function(db, obj) {
    if(obj.debug) {
      var message;
      rf.logger.init();
      for(var i=0; i<obj.logs.length; i++) {
        message = obj.logs[i].message + ' : ' + obj.logs[i].log;
        rf.logger.log(message, {
          'source': 'server'
        });
      }
    }
  };

  var disableUpdateChecker = function(props) {
    if(props['disableUpdateChecker']) {
      if(typeof rf.disableUpdateChecker !== 'undefined') {
        rf.disableUpdateChecker();
      }
    }
  };

	return StandaloneBuilder;
});
