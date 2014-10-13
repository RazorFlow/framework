define([
  'core/dbregistry',
  'core/hookmanager',
  ], function(dbRegistry, HookManager) {
  var rf = {
    globals: {
      media: "md",
      dbRegistry: dbRegistry,
      builder: null
    },
    hooks: new HookManager ()
  };

  window.rf = rf;
});
