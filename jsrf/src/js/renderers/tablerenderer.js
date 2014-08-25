define([
  "generated/templates",
  "renderers/componentrenderer",
  "renderers/table/sortingrenderer",
  "renderers/table/paginationrenderer",
  "utils/numberformatter",
  "utils/styleformatter",
  "graphics/rfsparkline",
  "utils/colorutils",
  'vendor/lodash'
], function (JST, ComponentRenderer, TableSortingRenderer, TablePaginationRenderer, NumberFormatter, StyleFormatter, RFSparkline, ColorUtils, _) {
  function TableRenderer() {
    ComponentRenderer.call(this);

    var self = this,
        base = {},
        Public,
        raw = self._raw,
        Protected,
        pro = self.pro,
        _bp = {};

    var tBody = null,
        tHead = null,
        tContainer = null,
        sparkCanvasContainers = [];
    Public = {
      renderCore: function () {
        self.$core.html(JST.table_base({
          columns: formatColumns(self.props.table.columns)
        }));

        self.pagination.init();
        tContainer = self.$core.find('.rfTableContainer');
        tBody = tContainer.find(".rfTableBody");
        tHead = tContainer.find(".rfTableHeader");
        addListeners();
      },
      resizeCore: function (width, height) {
        adjustTableHeight(height);
        adjustCellWidths();
      },
      setTableData: function (d) {
        setTableBody(d);
        self.pagination.setData(d);
        adjustCellWidths();
        headScroller();
        self.pagination.addDomListeners();
      },
      dispose: function () {
        base.dispose();
        tBody = null;
        tHead = null;
        tContainer = null;
      }
    };
    /*
     * Sets the body of the table with columns and data.
     */
    var setTableBody = function (d) {
      var formattedData = formatData(d);
      tBody.html(JST.table_body({
        columns: self.props.table.columns,
        data: formattedData,
        styleClass: formatColumnStyle(formattedData),
        cellStyle: formatCellStyle(d)
      }));

      renderSparkline(formattedData);
      // drawSparkColumn(formattedData);
    };

    var drawSparkColumn = function(data, key, options) {
      for(var i=0; i<data.length; i++) {
        var one = $("<canvas />", { id: "spark" + i });
        var $child = $(tBody.find("#rfTableCell-" + key + "-" + i).children()[0]);

        if($child) {
          var spark = new RFSparkline();
          var config = {
            sparkValues: data[i][key],
            width: $child.width(),
            height: $child.height(),
            id: "spark-" + key + "-" + i,
            strokeColor: options.strokeColor
          };

          spark.configure(config);
          spark.renderTo($child);
        }
      }
    };

    var renderSparkline = function(data) {
      var columnProps = self.props.table.columns;
      var strokeColor = ColorUtils.getColor('tableSparkline');
      for(var key in columnProps) {
        if(columnProps.hasOwnProperty(key)) {
          if(columnProps[key].columnType === 'spark') {
            drawSparkColumn(data, key, {
              strokeColor: strokeColor
            });
          }
        }
      }
    };

    /*
     * Formats table data
     */
    var formatData = function (data) {
      var _data = _.cloneDeep(data);
      var formattedData = null;
      var columnProps = self.props.table.columns;
      for (var key in columnProps) {
        if (columnProps.hasOwnProperty(key)) {
          if(columnProps[key].columnType !== 'spark'){
            var formatter = new NumberFormatter();
            formatter.setConfig(columnProps[key]);
            formattedData = formatter.formatColumn(_data, key);
          }
          else{
            renderSparkline(_data, key);
          }
        }
      }

      return formattedData;
    };

    /*
     * Format table column style
     */
    var formatColumnStyle = function(data){
      var columnProps = _.cloneDeep(self.props.table.columns);
      var cellProps = _.cloneDeep(self.props.table.cellConditionalFormatters);
      var formattedStyle = null;
      for(var key in columnProps){
        if(columnProps.hasOwnProperty(key)){
          var formatter = new StyleFormatter();
          formatter.setConfig(columnProps[key]);
          formattedStyle = formatter.formatColumn(columnProps, key);
          formatter.filterHTML(data, key);
        }
      }
      return formattedStyle;
    };

    var formatCellStyle = function (data) {
      var cellProps = _.cloneDeep(self.props.table.cellConditionalFormatters);
      var formattedStyle = {};
      for(var key in cellProps){
        if(cellProps.hasOwnProperty(key)) {
          var formatter = new StyleFormatter();
          formatter.setConfig(cellProps[key]);
          formattedStyle[key] = formatter.formatCell(data, key);
        }
      }
      return formattedStyle;
    }

    var addListeners = function () {
      self.pagination.addDomListeners();
      // Sorting disabled need to enable it later
      //self.addSortListeners();
    };

    var adjustTableHeight = function (height) {
      height = height ? height : self.$core.height();
      if (self.locked) {
        return;
      }
      var tcHeight = height - self.$core.find('.rfPaginationContainer').height();
      var thHeight = tHead.height();
      tContainer.height(tcHeight);
      tBody.height(tcHeight - thHeight);

      if (tContainer.height() <= (tHead.find("table").height() + tBody.find("table").height())) {
        tBody.find("table").css({
          "border-bottom" : "0px"
        });
      }
    };

    var headScroller = function () {
      var tbodyDiv = self.$core.find('.rfTableBody'),
          theadDiv = self.$core.find('.rfTableHeader');

      tbodyDiv.on('scroll', function () {
        theadDiv.css({
          'margin-left': -this.scrollLeft
        });
      });
    };

    var formatColumns = function(props) {
      for(var key in props) {
        if(props.hasOwnProperty(key)) {
          if(props[key]['subCaption']) {
            props[key]['subCaptionUnits'] = getSubCaptionUnits(props[key]);
          }
        } 
      }

      return props;
    };

    var getSubCaptionUnits = function(key) {
      if(key.numberPrefix && key.numberSuffix) {
        return key.numberPrefix;
      }
      
      if(key.numberPrefix) {
        return key.numberPrefix;
      }

      if(key.numberSuffix) {
        return key.numberSuffix;
      }

      return null;
    };

    var adjustCellWidths = function () {
      var tbody = self.$core.find('tbody'),
          theadTable = self.$core.find('.rfTableHeader > table'),
          tbodyDiv = self.$core.find('.rfTableBody > table'),
          theadDiv = self.$core.find('.rfTableHeader > table'),
          ths = self.$core.find('th'),
          tableBody = self.$core.find('.rfTableBody'),
          tbodyWidth = null,
          columnProps = null,
          tbodyContainerWidth = tableBody.width();
          firstRowTds = self.$core.find('.rfTableBody > table > tbody > tr').first().find('td'),
          $tp = null,
          $tdWidth = 0,
          tdWidths = [];
      // Reset all the widths
      ths.css('width', 'auto');

      theadDiv.css({
        width: 'auto'
      });
      tbodyDiv.css({
        width: '100%'
      });
      theadTable.css({
        width: '100%'
      });

      columnProps = self.props.table.columns;
      for (var key in columnProps) {
        if (columnProps.hasOwnProperty(key)) {
          if (columnProps[key].columnWidth !== null) {
            $("[data-id="+key+"]").css({
              "min-width" : columnProps[key].columnWidth,
              "width" : columnProps[key].columnWidth
            });
          }
        }
      }

      firstRowTds.each(function (idx, td) {
        $tp = $('<p/>').text($(ths[idx]).text())
            .addClass('canaryTH');
        $(td).append($tp);
      });
      if (tbodyWidth < tbodyContainerWidth) {
        tbodyWidth = tbodyContainerWidth;
      }
      theadDiv.css({
        'width': tbodyWidth
      });
      tbodyDiv.css({
        'width': tbodyWidth
      });
      theadTable.css({
        'width': tbodyWidth
      });
      tbody.css({
        'width': tbodyWidth
      });

      tbody.find('tr').first().find('td').each(function (idx, td) {
        td = $(td);
        //TODO: Hack implemented need a better solution
        $(ths[idx]).find('p').width(td.width());

        tdWidths.push(td.width());
        // td.find('p').width(td.width());
      });

      tbody.find('tr').find('td').each(function (idx, td) {
        $(td).find('p').width(tdWidths[idx]);
      });
      tbody.find('.canaryTH').remove();

      tableBody.scrollTop(0);
    };

    Protected = {
      adjustTableHeight: function() {
        adjustTableHeight();
      }
    };

    raw._registerClassName("TableRenderer");
    raw._registerPublic(base, Public);
    raw._registerProtected(_bp, Protected);

    raw.registerPublicExtensions(TablePaginationRenderer);
    raw.registerPublicExtensions(TableSortingRenderer);
  }

  return TableRenderer;
});
