define([
  'vendor/lodash',
  'core/dashboard',
  'helpers/standalonedashboard',
  'helpers/embeddeddashboard',
  'helpers/tabbeddashboard',
  'components/kpicomponent',
  'components/gaugecomponent',
  'components/tablecomponent',
  'components/chartcomponent',
  'components/formcomponent',
  'components/kpigroupcomponent',
  'components/kpitablecomponent',
  'utils/rfnotification',
  'utils/rfloggerstub',
  'core/globals',
  'iecompat/main'
], function (Lodash, Dashboard, StandaloneDashboard, EmbeddedDashboard, TabbedDashboard, KPIComponent, GaugeComponent, TableComponent, ChartComponent, FormComponent, KPIGroupComponent, KPITableComponent, RFNotification, RFLogger) {
  window.StandaloneDashboard = StandaloneDashboard;
  window.EmbeddedDashboard = EmbeddedDashboard;
  window.TabbedDashboard = TabbedDashboard;
  window.KPIComponent = KPIComponent;
  window.Dashboard = Dashboard;
  window.TableComponent = TableComponent;
  window.ChartComponent = ChartComponent;
  window.FormComponent = FormComponent;
  window.KPIGroupComponent = KPIGroupComponent;
  window.KPITableComponent = KPITableComponent;
  window.GaugeComponent = GaugeComponent;
  window.rf.StandaloneDashboard = StandaloneDashboard;
  window.rf.EmbeddedDashboard = EmbeddedDashboard;
  window.rf.TabbedDashboard = TabbedDashboard;

  window.rf.logger = RFLogger;

  window.onerror = function(msg, link, lineno, colno, exception) {
    var log = rf.logger.error(msg, exception);
    RFNotification.create(msg, exception, log);
    return false;
  };

  // require('devtools/debug.main');
  window.rf._ = Lodash;

  // Shim for console for IE9
  
  window.console = window.console || {
    log: function() {},
    error: function() {}
  };

  return window.rf;
});
