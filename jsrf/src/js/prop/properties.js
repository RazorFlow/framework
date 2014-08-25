define([
    'prop/propertybase',
    'prop/propertylist'
], function (PropertyBase, PropertyList) {
  var exports = {};

function NullProperties() {
  PropertyBase.call(this);

  this.register({
    
  });
}
exports.NullProperties = NullProperties;




function DataColumnProperties() {
  PropertyBase.call(this);

  this.register({
        'dataType':"auto",
    'numberFormatFlag':true,
    'numberHumanize':false,
    'numberPrefix':null,
    'numberSuffix':null,
    'numberThousandsSeparator':",",
    'numberDecimalsSeparator':".",
    'numberForceDecimals':false,
    'numberDecimalPoints':2
  });
}
exports.DataColumnProperties = DataColumnProperties;




function ComponentProperties() {
  PropertyBase.call(this);

  this.register({
        'core':new ComponentCoreProperties(),
    'events':new PropertyList(ComponentEventProperties),
    'children':new PropertyList(NullProperties),
    'data':new ComponentDataProperties(),
    'kpis':new PropertyList(ComponentKPIProperties)
  });
}
exports.ComponentProperties = ComponentProperties;




function ComponentKPIProperties() {
  DataColumnProperties.call(this);

  this.register({
        'caption':"",
    'value':0,
    'captioncolor':null,
    'valuecolor':null,
    'Width':2,
    'activeFlag':true,
    'icon':null,
    'iconprops':"{}"
  });
}
exports.ComponentKPIProperties = ComponentKPIProperties;




function ComponentDataProperties() {
  PropertyBase.call(this);

  this.register({
        'sources':new PropertyList(RemoteDataSourceProperties)
  });
}
exports.ComponentDataProperties = ComponentDataProperties;




function RemoteDataSourceProperties() {
  PropertyBase.call(this);

  this.register({
        'url':null
  });
}
exports.RemoteDataSourceProperties = RemoteDataSourceProperties;




function ComponentEventProperties() {
  PropertyBase.call(this);

  this.register({
        'type':"",
    'affectedComponents':new PropertyList(AffectedComponentProperties),
    'url':"",
    'context':""
  });
}
exports.ComponentEventProperties = ComponentEventProperties;




function AffectedComponentProperties() {
  PropertyBase.call(this);

  this.register({
        'id':null
  });
}
exports.AffectedComponentProperties = AffectedComponentProperties;




function ComponentCoreProperties() {
  PropertyBase.call(this);

  this.register({
        'caption':"",
    'icon':null,
    'iconprops':"{}",
    'absolutePosition':false,
    'dimensions':new ComponentDimensionProperties(),
    'isChild':false,
    'location':new ComponentLocationProperties(),
    'zoomable':true,
    'breadCrumbs':new PropertyList(BreadCrumbProperties),
    'isHidden':false,
    'showModal':false,
    'breadcrumbStartString':"Start",
    'index':99999
  });
}
exports.ComponentCoreProperties = ComponentCoreProperties;




function BreadCrumbProperties() {
  PropertyBase.call(this);

  this.register({
        'url':null
  });
}
exports.BreadCrumbProperties = BreadCrumbProperties;




function ComponentDimensionProperties() {
  PropertyBase.call(this);

  this.register({
        'w':null,
    'h':null
  });
}
exports.ComponentDimensionProperties = ComponentDimensionProperties;




function ComponentLocationProperties() {
  PropertyBase.call(this);

  this.register({
        'x':null,
    'y':null,
    'w':null,
    'h':null
  });
}
exports.ComponentLocationProperties = ComponentLocationProperties;




function KPIComponentProperties() {
  ComponentProperties.call(this);

  this.register({
        'kpi':new KPIProperties()
  });
}
exports.KPIComponentProperties = KPIComponentProperties;




function KPIProperties() {
  PropertyBase.call(this);

  this.register({
        'display':new KPIDisplayProperties()
  });
}
exports.KPIProperties = KPIProperties;




function KPIDisplayProperties() {
  DataColumnProperties.call(this);

  this.register({
        'dataType':"number",
    'value':0,
    'indicator':null,
    'indicatorColor':"green",
    'caption':"",
    'subcaption':"",
    'target':null,
    'gaugeType':"circular",
    'gaugeFlag':false,
    'sparkFlag':false,
    'ranges':new PropertyList(RFRangeProperties),
    'maximum':null,
    'minimum':null,
    'type':null,
    'icon':null,
    'iconprops':"{}",
    'valueTextColor':"auto"
  });
}
exports.KPIDisplayProperties = KPIDisplayProperties;




function RFRangeProperties() {
  PropertyBase.call(this);

  this.register({
        'start':null,
    'end':null,
    'color':null
  });
}
exports.RFRangeProperties = RFRangeProperties;




function ChartComponentProperties() {
  ComponentProperties.call(this);

  this.register({
        'chart':new ChartProperties()
  });
}
exports.ChartComponentProperties = ChartComponentProperties;




function ChartProperties() {
  PropertyBase.call(this);

  this.register({
        'series':new PropertyList(ChartSeriesProperties),
    'yaxis':new ChartAxisProperties(),
    'secondaryYAxis':new ChartAxisProperties(),
    'dualY':false,
    'showLegendFlag':true,
    'showPieValues':true,
    'showLabelFlag':true
  });
}
exports.ChartProperties = ChartProperties;




function ChartAxisProperties() {
  DataColumnProperties.call(this);

  this.register({
        'id':"primary",
    'dataType':"number",
    'axisName':""
  });
}
exports.ChartAxisProperties = ChartAxisProperties;




function ChartSeriesProperties() {
  DataColumnProperties.call(this);

  this.register({
        'dataType':"number",
    'seriesName':"",
    'seriesDisplayType':"column",
    'seriesColor':"auto",
    'seriesHiddenFlag':false,
    'includeInLegendFlag':true,
    'seriesStacked':false,
    'yAxis':"primary"
  });
}
exports.ChartSeriesProperties = ChartSeriesProperties;




function GaugeComponentProperties() {
  ComponentProperties.call(this);

  this.register({
        'gauge':new GaugeProperties()
  });
}
exports.GaugeComponentProperties = GaugeComponentProperties;




function GaugeProperties() {
  DataColumnProperties.call(this);

  this.register({
        'caption':"",
    'subcaption':"",
    'min':0,
    'max':100,
    'value':50
  });
}
exports.GaugeProperties = GaugeProperties;




function TableComponentProperties() {
  ComponentProperties.call(this);

  this.register({
        'table':new TableProperties()
  });
}
exports.TableComponentProperties = TableComponentProperties;




function TableProperties() {
  PropertyBase.call(this);

  this.register({
        'columns':new PropertyList(TableColumnProperties),
    'cellConditionalFormatters':new PropertyList(TableCellConditionalFormat),
    'rowsPerPage':10,
    'currentPageNumber':0,
    'totalRows':0
  });
}
exports.TableProperties = TableProperties;




function TableCellConditionalFormat() {
  PropertyBase.call(this);

  this.register({
        'conditionalExpression':new ConditionalExpressionProperties(),
    'format':new TableCellFormatProperties(),
    'column_id':""
  });
}
exports.TableCellConditionalFormat = TableCellConditionalFormat;




function ConditionalExpressionProperties() {
  PropertyBase.call(this);

  this.register({
        'expression':"",
    'type':""
  });
}
exports.ConditionalExpressionProperties = ConditionalExpressionProperties;




function TableCellFormatProperties() {
  PropertyBase.call(this);

  this.register({
        'cellBackgroundColor':"auto",
    'cellTextColor':"auto"
  });
}
exports.TableCellFormatProperties = TableCellFormatProperties;




function TableColumnProperties() {
  DataColumnProperties.call(this);

  this.register({
        'name':"",
    'columnType':"text",
    'sortable':false,
    'columnWidth':null,
    'textAlign':null,
    'textBoldFlag':false,
    'textItalicFlag':false,
    'rawHTML':false,
    'subCaption':false,
    'subCaptionUnits':null
  });
}
exports.TableColumnProperties = TableColumnProperties;




function FormComponentProperties() {
  ComponentProperties.call(this);

  this.register({
        'form':new FormProperties()
  });
}
exports.FormComponentProperties = FormComponentProperties;




function FormProperties() {
  PropertyBase.call(this);

  this.register({
        'items':new PropertyList(FormItemProperties)
  });
}
exports.FormProperties = FormProperties;




function FormItemProperties() {
  PropertyBase.call(this);

  this.register({
        'type':"",
    'label':"",
    'list':"string",
    'options':"",
    'range':"",
    'value':""
  });
}
exports.FormItemProperties = FormItemProperties;




function KPITableComponentProperties() {
  ComponentProperties.call(this);

  this.register({
        'kpitable':new KPITableProperties()
  });
}
exports.KPITableComponentProperties = KPITableComponentProperties;




function KPITableProperties() {
  PropertyBase.call(this);

  this.register({
        'items':new PropertyList(KPIDisplayProperties)
  });
}
exports.KPITableProperties = KPITableProperties;




function KPITableItem() {
  PropertyBase.call(this);

  this.register({
        'caption':"",
    'value':""
  });
}
exports.KPITableItem = KPITableItem;




function TabbedComponentProperties() {
  ComponentProperties.call(this);

  this.register({
        'children':new PropertyList(TabItemProperties),
    'tabbed':new TabbedCoreProperties()
  });
}
exports.TabbedComponentProperties = TabbedComponentProperties;




function TabbedCoreProperties() {
  PropertyBase.call(this);

  this.register({
        'activeIndex':0
  });
}
exports.TabbedCoreProperties = TabbedCoreProperties;




function TabItemProperties() {
  PropertyBase.call(this);

  this.register({
        'name':"",
    'componentId':""
  });
}
exports.TabItemProperties = TabItemProperties;




  return exports;
});
