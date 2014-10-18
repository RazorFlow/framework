define([
  'core/dbregistry',
  'core/hookmanager',
  'vendor/lodash',
  'Raphael'], function(dbRegistry, HookManager, _) {
  var rf = {
    globals: {
      media: "md",
      dbRegistry: dbRegistry,
      builder: null
    },
    hooks: new HookManager (),
    _: _
  };

  window.rf = rf;
});
