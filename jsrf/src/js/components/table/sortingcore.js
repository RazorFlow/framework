define([], function () {
  var TableSortingCore = function (pro) {
    var self = this;

    return {
      sortColumn: function (className) {
        pro.query.sort(className).triggerUpdates();
      },
      initSortingRender: function () {
        pro.renderer.pro.bind("sortColumn", self.pro.sortColumn);
      }
    };
  };

  return TableSortingCore;
});
