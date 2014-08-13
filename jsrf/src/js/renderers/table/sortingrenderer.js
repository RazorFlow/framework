define([], function () {
  var TableSortingRenderer = function (pro) {
    var self = this;

    var privFunc = function () {
      console.log("New private function");
    };

    /*
     PROTECTED FUNCTIONS
     */
    return {
      initSorting: function () {
      },
      addSortListeners: function () {
        self.managedBind(self.$core.find('.rfTable > thead > tr > th'), 'click', function (e) {
          e.preventDefault();
          self.pro.trigger('sortColumn', $(this).data('id'));
        });
      }
    };
  };

  return TableSortingRenderer;
});
