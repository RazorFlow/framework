define([
  'core/dbregistry',
  'core/hookmanager',
  'Raphael'], function(dbRegistry, HookManager) {
  var rf = {
    globals: {
      media: "md",
      dbRegistry: dbRegistry
    },
    hooks: new HookManager ()
  };

  window.rf = rf;
});
