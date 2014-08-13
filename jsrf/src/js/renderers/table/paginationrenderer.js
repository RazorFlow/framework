define(['utils/media',
  "generated/templates",
  "vendor/Modernizr"
  ], function (MediaUtils, JST, Modernizr) {
  var TablePaginationRenderer = function (pro) {
    var self = this;

    var tPaginator;

    /*
     PROTECTED FUNCTIONS
     */
    return {
      pagination: {
        init: function () {
          tPaginator = self.$core.find(".rfPaginationContainer");
        },
        setData: function (d) {
          if(d.totalPages > 1) {
            var m = (self.db.pro.media.mediaSelect({"sm+xs":true}, false) || Modernizr.touch);
                // hack implelented on not letting the width go too less.
            if (tPaginator.width()<=450) {
              m = true;
            }
            tPaginator.html(JST.table_paginator({
              totalPages: d.totalPages,
              activePage: d.activePage,
              startPage: d.startPage,
              lastPage: d.lastPage,
              media: m
            }));
          }
        },
        addDomListeners: function () {

          // UGLY HACK, TODO(anirudh): remove this
          // 
          self.$core.find(".rfPrevButton").off();
          self.$core.find(".rfNextButton").off();
          self.$core.find(".rfPageNumber").off();

          self.managedBind(self.$core.find(".rfPrevButton"), 'click', function (e) {
            e.preventDefault();
            self.pro.trigger("prevPage");
            self.trigger("pageChange");
            self.trigger("prevPage");
          });
          self.managedBind(self.$core.find(".rfNextButton"), 'click', function (e) {
            e.preventDefault();
            self.pro.trigger("nextPage");
            self.trigger("pageChange");
            self.trigger("nextPage");  
          });
          self.managedBind(self.$core.find(".rfPageNumber"), 'click', function (e) {
            e.preventDefault();
            var pageNumber = $(this).data("page-number");
            self.pro.trigger("jumpToPage", pageNumber);
            self.trigger("pageChange");
          });
        }
      }
    };
  };

  return TablePaginationRenderer;
});
