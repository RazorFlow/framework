define([], function() {
    var dbRegistry =  {
        /**
         * The dashboard object in the current instance.
         */
        dashboards: {},
        currentDashboard: null,
        defaultDashboard: null,
        /**
         * Register a dashboard in the dbRegistry
         */
        registerDashboard: function(id, db) {
          if(id !== 'default') {
            dbRegistry.dashboards[id] = db;  
          } else {
            dbRegistry.defaultDashboard = db;
          }
        },
        setCurrentDashboard: function(id) {
            dbRegistry.currentDashboard = dbRegistry.dashboards[id];
        },
        getCurrentDashboard: function() {
            return dbRegistry.currentDashboard;
        },
        getDefaultDashboard: function() {
          return dbRegistry.defaultDashboard;
        }
    };

    return dbRegistry;
});
