define(['vendor/lodash'], function (_) {
  var TablePaginationCore = function (pro) {
    var self = this,
        table_profiles = {
          pagination: {
            maxPages: 5
          }
        };


    var handlePageNumberUpdated = function (pageNumber) {
      var rowsPerPage = pro.pb.getValue('table.rowsPerPage');
      pro.query.limit(pageNumber * rowsPerPage, rowsPerPage).triggerUpdates(self);
    };


    /*
     * Returns the starting number to be rendered in the pagination.
     */
    var getStartPage = function () {
      var pageNum = pro.pb.getValue("table.currentPageNumber");
      pageNum++;
      if (notMaxPages(pageNum)) {
        if (pageNum < paginationLimit()) {
          return 0;
        }
        else {
          return Math.abs(paginationLimit() - pageNum) + 1;
        }
      }
      else {
        return (getTotalPages() - paginationLimit());
      }
    };

    /*
     * Returns the last page number to be rendered in the pagination.
     */
    var getLastPage = function () {
      return getStartPage() + (paginationLimit() - 1);
    };

    /*
     * Returns the total number of page numbers to be displayed in the pagination.
     */
    var paginationLimit = function () {
      var maxPages = table_profiles.pagination.maxPages;
      if(getTotalPages() < maxPages){
        return getTotalPages();
      }

      return maxPages;
    };

    /*
     * Checks if the current page number is lesser than the maximum/total number of pages.
     */
    var notMaxPages = function (pageNumber) {
      return (pageNumber < getTotalPages());
    };

    /**
     * Returns the total number of pages.
     */
    var getTotalPages = function () {
      var totalRows = pro.pb.getValue("table.totalRows") ? pro.pb.getValue("table.totalRows") : self.ds.getRawData().length;
      var totalPages = (totalRows / pro.pb.getValue("table.rowsPerPage"));
      return Math.ceil(totalPages);
    };


    return {
      pagination: {
        initRender: function () {
          pro.renderer.pro.bind("nextPage", self.pro.pagination.nextPage);
          pro.renderer.pro.bind("prevPage", self.pro.pagination.previousPage);
          pro.renderer.pro.bind("jumpToPage", self.pro.pagination.jumpToPage);

          handlePageNumberUpdated(pro.pb.getValue("table.currentPageNumber"));

        },
        addListeners: function () {
          pro.pushListeners([
            {
              path: "table.currentPageNumber",
              callback: handlePageNumberUpdated
            }
          ]);
        },
        previousPage: function () {
          var pageNum = pro.pb.getValue("table.currentPageNumber");
          if (pageNum !== 0) {
            pageNum--;
            pro.pb.setValue("table.currentPageNumber", pageNum);
          }
        },
        nextPage: function () {
          var pageNum = pro.pb.getValue("table.currentPageNumber");
          if (pageNum !== getTotalPages() - 1) {
            pageNum++;
            pro.pb.setValue("table.currentPageNumber", pageNum);
          }
        },
        jumpToPage: function (pageNumber) {
          if (notMaxPages(pageNumber)) {
            pro.pb.setValue("table.currentPageNumber", pageNumber);
            pro.query.subscribe(pro.onDataReady);
          }
        },
        extendData: function (data) {
          return _.extend(data, {
            totalPages: getTotalPages(),
            activePage: pro.pb.getValue("table.currentPageNumber"),
            startPage: getStartPage(),
            lastPage: getLastPage()
          });
        }
      }
    };
  };

  return TablePaginationCore;
});
