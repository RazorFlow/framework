define(['core/dashboard',
        'helpers/tabbeddashboard'
        ], function (Dashboard, TabbedDashboard) {
  function StandaloneDashboard(callback, options) {
    options = options ? options : {};
    $(function() {
        db = options.tabbed ? new TabbedDashboard() : new Dashboard();
        callback(db);
        // This is a hack TODO: remove this
        if(!window.__disableSimpleDashboards) {
            db.renderTo($("#dbTarget"));
        }
    });
  }
  return StandaloneDashboard;
});
