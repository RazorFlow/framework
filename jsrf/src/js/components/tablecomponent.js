define([
  "components/component",
  "renderers/tablerenderer",
  "prop/properties",
  "components/table/sortingcore",
  "components/table/paginationcore",
  "utils/errorutils",
  "vendor/lodash"
], function (Component, TableRenderer, Properties, TableSortingCore, TablePaginationCore, errorUtils, _) {
  /**
   * Creates a component which displays a table
   * @class TableComponent
   * @augments {Component}
   */
  function TableComponent() {
    Component.apply(this, Array.prototype.slice.call(arguments));

    var self = this,
        base = {},
        Public,
        raw = self._raw,
        Protected,
        pro = self.pro,
        _bp = {};

    //noinspection JSUnusedGlobalSymbols
    Public = {
      /**
       * Add a row of data to the table.
       * This will need to be provided as a key-value object whose keys correspond to individual column keys
       * @method addRow
       * @param  {RowObject} rowData an key-value object containing the data to be displayed in a row.
       */
      addRow: function (rowData) {
        self.ds.pushRow(rowData);
      },

      /**
       * Adds a column definition to the table
       * @method addColumn
       * @param  {String} id      A unique id for this column which also corrresponds to the keys of row objects
       * @param  {String} name    The name of the column which is displayed in the table
       * @param  {TableColumnProperties} options Configure how the data is displayed
       */
      addColumn: function (id, name, options) {
        options = options ? options : {};
        pro.aspect.provide("addColumn");
        options.name = name;
        if(options.dataType === 'number' && !options.textAlign) {
          options.textAlign = 'right';
        }
        pro.pb.addItemToList("table.columns", id, options);
      },

      addSparkColumn: function(id, name, options) {
        options = options ? options : {};
        options.name = name;
        options.columnType = 'spark';
        options.rawHTML = true;
        pro.pb.addItemToList("table.columns", id, options);
      },

      /**
       * Sets the number of rows per page in the table
       * @method setRowsPerPage
       * @param  {Number} numRows the number of rows in a single page on the table
       */
      setRowsPerPage: function (numRows) {
        numRows = +numRows;
        if (_.isNumber(numRows) && !_.isNaN(numRows)) {
          pro.pb.setValue('table.rowsPerPage', numRows);
        } else {
          console.error('Error in `setRowsPerPage`, expected a number and found ' + numRows + '. Defaulting it to ' + pro.pb.getValue('table.rowsPerPage'));
        }
      },

      /**
       * Adds multiple rows of data to the table at once.
       * Note that the each row need to be provided as a key-value object whose keys match the column keys
       * @method addMultipleRows
       * @param  {Array} rows An array of objects
       */
      addMultipleRows: function (rows) {
        for (var i = -1; ++i < rows.length;) {
          self.ds.pushRow(rows[i]);
        }
      },

      /**
       * Clears all the rows from the table
       * @method clearRows
       */
      clearRows: function () {
        self.ds.clearRows();
      },

      cellConditionalFormat: function (id, formatRule, appliedStyle) {
        options = {};
        options.column_id = id;
        options.conditionalExpression = _.isString(formatRule) ? {"type": "valueComparator", "expression": formatRule } : formatRule;
        options.format = _.isString(appliedStyle) ? {"cellBackgroundColor" : appliedStyle} : appliedStyle;

        pro.pb.pushItemToList("table.cellConditionalFormatters", options);
      }
    };


    Protected = {
      init: function () {
        _bp.init();

          if(pro.props.data) {
            if(pro.props.data.sources) {
              if(pro.props.data.sources.tableRowDataSource) {
                if(typeof(pro.props.data.sources.tableRowDataSource.url) !== "undefined") {
                  self.ds.url = pro.props.data.sources.tableRowDataSource.url;
                }
              }
            }
          }
      },
      validate: function () {
        _bp.validate();
        pro.errMsg = pro.aspect.require({
          "addColumn": errorUtils.getError ("1004")
        });
        if(pro.errMsg.length > 0) {
          pro.showError(pro.errMsg);
        } else {
          pro.hideError();
        }
      },
      createRenderer: function () {
        pro.renderer = new TableRenderer();
        pro.onRendererCreate();
      },
      query: self.ds.createQuery(),
      renderCore: function () {
        // Sorting disabled need to enable it later
        //pro.initSortingRender();
        pro.renderer.renderCore();

        // Listen to the events from the renderer to get info whenever the page
        // number changes.

        pro.query.subscribe(pro.onDataReady);
        pro.pagination.initRender();
      },
      resizeCore: function (width, height) {
        pro.renderer.resizeCore(width, height);
      },
      addListeners: function () {
        _bp.addListeners();
        pro.pushListeners([
        ]);

        pro.pagination.addListeners();
      },
      onDataReady: function (data) {
        var rendererData = {
          data: data
        };
        rendererData = pro.pagination.extendData(data);
        pro.renderer.setTableData(rendererData);

        if(self.ds.url) {
          pro.resize();
        }
      }

    };


    /**
     * This is the actual constructor of the object
     */
    var construct = function () {
      pro.pb = new Properties.TableComponentProperties();
    };

    raw._registerClassName("TableComponent");
    raw._registerPublic(base, Public);
    raw._registerProtected(_bp, Protected);
    raw.registerProtectedExtensions(TableSortingCore);
    raw.registerProtectedExtensions(TablePaginationCore);

    construct();
  }

  return TableComponent;
});
