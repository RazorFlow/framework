define([
    'prop/propertybase',
    'prop/propertylist'
], function (PropertyBase, PropertyList) {
  var exports = {};

function NullProperties() {
  PropertyBase.call(this);

  this.register([
    
  ]);
}
exports.NullProperties = NullProperties;




function DataColumnProperties() {
  PropertyBase.call(this);

  this.register([
    {
key: 'dataType',
    value:"auto",
    type: 'string'},
{
key: 'numberFormatFlag',
    value:true,
    type: 'boolean'},
{
key: 'numberHumanize',
    value:false,
    type: 'boolean'},
{
key: 'numberPrefix',
    value:null,
    type: 'string'},
{
key: 'numberSuffix',
    value:null,
    type: 'string'},
{
key: 'numberThousandsSeparator',
    value:",",
    type: 'string'},
{
key: 'numberDecimalsSeparator',
    value:".",
    type: 'string'},
{
key: 'numberForceDecimals',
    value:false,
    type: 'boolean'},
{
key: 'numberDecimalPoints',
    value:2,
    type: 'number'}
  ]);
}
exports.DataColumnProperties = DataColumnProperties;




function ComponentProperties() {
  PropertyBase.call(this);

  this.register([
    {
key: 'core',
    value:new ComponentCoreProperties(),
    type: 'PropertyBase'},
{
key: 'events',
    value:new PropertyList(ComponentEventProperties),
    type: 'PropertyList'},
{
key: 'children',
    value:new PropertyList(NullProperties),
    type: 'PropertyList'},
{
key: 'data',
    value:new ComponentDataProperties(),
    type: 'PropertyBase'},
{
key: 'kpis',
    value:new PropertyList(ComponentKPIProperties),
    type: 'PropertyList'}
  ]);
}
exports.ComponentProperties = ComponentProperties;




function ComponentKPIProperties() {
  DataColumnProperties.call(this);

  this.register([
    {
key: 'caption',
    value:"",
    type: 'string'},
{
key: 'value',
    value:0,
    type: 'number'},
{
key: 'captioncolor',
    value:null,
    type: 'string'},
{
key: 'valuecolor',
    value:null,
    type: 'string'},
{
key: 'Width',
    value:2,
    type: 'number'},
{
key: 'activeFlag',
    value:true,
    type: 'boolean'},
{
key: 'icon',
    value:null,
    type: 'string'},
{
key: 'iconprops',
    value:"{}",
    type: 'string'},
{
key: 'valueConditionalFormatters',
    value:new PropertyList(ValueConditionalFormat),
    type: 'PropertyList'}
  ]);
}
exports.ComponentKPIProperties = ComponentKPIProperties;




function ComponentDataProperties() {
  PropertyBase.call(this);

  this.register([
    {
key: 'sources',
    value:new PropertyList(RemoteDataSourceProperties),
    type: 'PropertyList'}
  ]);
}
exports.ComponentDataProperties = ComponentDataProperties;




function RemoteDataSourceProperties() {
  PropertyBase.call(this);

  this.register([
    {
key: 'url',
    value:null,
    type: 'string'}
  ]);
}
exports.RemoteDataSourceProperties = RemoteDataSourceProperties;




function ComponentEventProperties() {
  PropertyBase.call(this);

  this.register([
    {
key: 'type',
    value:"",
    type: 'string'},
{
key: 'affectedComponents',
    value:new PropertyList(AffectedComponentProperties),
    type: 'PropertyList'},
{
key: 'url',
    value:"",
    type: 'string'},
{
key: 'context',
    value:"",
    type: 'url'}
  ]);
}
exports.ComponentEventProperties = ComponentEventProperties;




function AffectedComponentProperties() {
  PropertyBase.call(this);

  this.register([
    {
key: 'id',
    value:null,
    type: 'string'}
  ]);
}
exports.AffectedComponentProperties = AffectedComponentProperties;




function ComponentCoreProperties() {
  PropertyBase.call(this);

  this.register([
    {
key: 'caption',
    value:"",
    type: 'string'},
{
key: 'icon',
    value:null,
    type: 'string'},
{
key: 'iconprops',
    value:"{}",
    type: 'string'},
{
key: 'absolutePosition',
    value:false,
    type: 'boolean'},
{
key: 'dimensions',
    value:new ComponentDimensionProperties(),
    type: 'PropertyBase'},
{
key: 'isChild',
    value:false,
    type: 'boolean'},
{
key: 'location',
    value:new ComponentLocationProperties(),
    type: 'PropertyBase'},
{
key: 'zoomable',
    value:true,
    type: 'string'},
{
key: 'breadCrumbs',
    value:new PropertyList(BreadCrumbProperties),
    type: 'PropertyList'},
{
key: 'isHidden',
    value:false,
    type: 'boolean'},
{
key: 'showModal',
    value:false,
    type: 'boolean'},
{
key: 'breadcrumbStartString',
    value:"Start",
    type: 'string'},
{
key: 'index',
    value:99999,
    type: 'Number'}
  ]);
}
exports.ComponentCoreProperties = ComponentCoreProperties;




function BreadCrumbProperties() {
  PropertyBase.call(this);

  this.register([
    {
key: 'url',
    value:null,
    type: 'string'}
  ]);
}
exports.BreadCrumbProperties = BreadCrumbProperties;




function ComponentDimensionProperties() {
  PropertyBase.call(this);

  this.register([
    {
key: 'w',
    value:null,
    type: 'number'},
{
key: 'h',
    value:null,
    type: 'number'}
  ]);
}
exports.ComponentDimensionProperties = ComponentDimensionProperties;




function ComponentLocationProperties() {
  PropertyBase.call(this);

  this.register([
    {
key: 'x',
    value:null,
    type: 'number'},
{
key: 'y',
    value:null,
    type: 'number'},
{
key: 'w',
    value:null,
    type: 'number'},
{
key: 'h',
    value:null,
    type: 'number'}
  ]);
}
exports.ComponentLocationProperties = ComponentLocationProperties;




function KPIComponentProperties() {
  ComponentProperties.call(this);

  this.register([
    {
key: 'kpi',
    value:new KPIProperties(),
    type: 'PropertyBase'}
  ]);
}
exports.KPIComponentProperties = KPIComponentProperties;




function KPIProperties() {
  PropertyBase.call(this);

  this.register([
    {
key: 'display',
    value:new KPIDisplayProperties(),
    type: 'PropertyBase'},
{
key: 'valueConditionalFormatters',
    value:new PropertyList(ValueConditionalFormat),
    type: 'PropertyList'}
  ]);
}
exports.KPIProperties = KPIProperties;




function ValueConditionalFormat() {
  PropertyBase.call(this);

  this.register([
    {
key: 'expression',
    value:"",
    type: 'string'},
{
key: 'valueColor',
    value:"auto",
    type: 'string'}
  ]);
}
exports.ValueConditionalFormat = ValueConditionalFormat;




function KPIDisplayProperties() {
  DataColumnProperties.call(this);

  this.register([
    {
key: 'dataType',
    value:"number",
    type: 'string'},
{
key: 'value',
    value:0,
    type: 'number'},
{
key: 'indicator',
    value:null,
    type: 'string'},
{
key: 'indicatorColor',
    value:"green",
    type: 'string'},
{
key: 'caption',
    value:"",
    type: 'string'},
{
key: 'subcaption',
    value:"",
    type: 'string'},
{
key: 'target',
    value:null,
    type: 'number'},
{
key: 'gaugeType',
    value:"circular",
    type: 'string'},
{
key: 'gaugeFlag',
    value:false,
    type: 'boolean'},
{
key: 'sparkFlag',
    value:false,
    type: 'boolean'},
{
key: 'ranges',
    value:new PropertyList(RFRangeProperties),
    type: 'PropertyList'},
{
key: 'maximum',
    value:null,
    type: 'number'},
{
key: 'minimum',
    value:null,
    type: 'number'},
{
key: 'type',
    value:null,
    type: 'string'},
{
key: 'icon',
    value:null,
    type: 'string'},
{
key: 'iconprops',
    value:"{}",
    type: 'string'},
{
key: 'valueTextColor',
    value:"auto",
    type: 'string'}
  ]);
}
exports.KPIDisplayProperties = KPIDisplayProperties;




function RFRangeProperties() {
  PropertyBase.call(this);

  this.register([
    {
key: 'start',
    value:null,
    type: 'number'},
{
key: 'end',
    value:null,
    type: 'number'},
{
key: 'color',
    value:null,
    type: 'string'}
  ]);
}
exports.RFRangeProperties = RFRangeProperties;




function ChartComponentProperties() {
  ComponentProperties.call(this);

  this.register([
    {
key: 'chart',
    value:new ChartProperties(),
    type: 'PropertyBase'}
  ]);
}
exports.ChartComponentProperties = ChartComponentProperties;




function ChartProperties() {
  PropertyBase.call(this);

  this.register([
    {
key: 'series',
    value:new PropertyList(ChartSeriesProperties),
    type: 'PropertyList'},
{
key: 'yaxis',
    value:new ChartAxisProperties(),
    type: 'PropertyBase'},
{
key: 'secondaryYAxis',
    value:new ChartAxisProperties(),
    type: 'PropertyBase'},
{
key: 'dualY',
    value:false,
    type: 'boolean'},
{
key: 'showLegendFlag',
    value:true,
    type: 'boolean'},
{
key: 'showPieValues',
    value:true,
    type: 'boolean'},
{
key: 'showLabelFlag',
    value:true,
    type: 'boolean'},
{
key: 'labelStep',
    value:new LabelStepProperties(),
    type: 'PropertyBase'}
  ]);
}
exports.ChartProperties = ChartProperties;




function LabelStepProperties() {
  PropertyBase.call(this);

  this.register([
    {
key: 'interval',
    value:null,
    type: 'number'},
{
key: 'startIndex',
    value:0,
    type: 'number'}
  ]);
}
exports.LabelStepProperties = LabelStepProperties;




function ChartAxisProperties() {
  DataColumnProperties.call(this);

  this.register([
    {
key: 'id',
    value:"primary",
    type: 'string'},
{
key: 'dataType',
    value:"number",
    type: 'string'},
{
key: 'axisName',
    value:"",
    type: 'string'}
  ]);
}
exports.ChartAxisProperties = ChartAxisProperties;




function ChartSeriesProperties() {
  DataColumnProperties.call(this);

  this.register([
    {
key: 'dataType',
    value:"number",
    type: 'string'},
{
key: 'seriesName',
    value:"",
    type: 'string'},
{
key: 'seriesDisplayType',
    value:"column",
    type: 'string'},
{
key: 'seriesColor',
    value:"auto",
    type: 'color'},
{
key: 'seriesHiddenFlag',
    value:false,
    type: 'boolean'},
{
key: 'includeInLegendFlag',
    value:true,
    type: 'boolean'},
{
key: 'seriesStacked',
    value:false,
    type: 'boolean'},
{
key: 'yAxis',
    value:"primary",
    type: 'string'}
  ]);
}
exports.ChartSeriesProperties = ChartSeriesProperties;




function GaugeComponentProperties() {
  ComponentProperties.call(this);

  this.register([
    {
key: 'gauge',
    value:new GaugeProperties(),
    type: 'PropertyBase'}
  ]);
}
exports.GaugeComponentProperties = GaugeComponentProperties;




function GaugeProperties() {
  DataColumnProperties.call(this);

  this.register([
    {
key: 'caption',
    value:"",
    type: 'string'},
{
key: 'subcaption',
    value:"",
    type: 'string'},
{
key: 'min',
    value:0,
    type: 'number'},
{
key: 'max',
    value:100,
    type: 'number'},
{
key: 'value',
    value:50,
    type: 'number'}
  ]);
}
exports.GaugeProperties = GaugeProperties;




function TableComponentProperties() {
  ComponentProperties.call(this);

  this.register([
    {
key: 'table',
    value:new TableProperties(),
    type: 'PropertyBase'}
  ]);
}
exports.TableComponentProperties = TableComponentProperties;




function TableProperties() {
  PropertyBase.call(this);

  this.register([
    {
key: 'columns',
    value:new PropertyList(TableColumnProperties),
    type: 'PropertyList'},
{
key: 'cellConditionalFormatters',
    value:new PropertyList(TableCellConditionalFormat),
    type: 'PropertyList'},
{
key: 'rowsPerPage',
    value:10,
    type: 'number'},
{
key: 'currentPageNumber',
    value:0,
    type: 'number'},
{
key: 'totalRows',
    value:0,
    type: 'number'}
  ]);
}
exports.TableProperties = TableProperties;




function TableCellConditionalFormat() {
  PropertyBase.call(this);

  this.register([
    {
key: 'conditionalExpression',
    value:new ConditionalExpressionProperties(),
    type: 'PropertyBase'},
{
key: 'format',
    value:new TableCellFormatProperties(),
    type: 'PropertyBase'},
{
key: 'column_id',
    value:"",
    type: 'string'}
  ]);
}
exports.TableCellConditionalFormat = TableCellConditionalFormat;




function ConditionalExpressionProperties() {
  PropertyBase.call(this);

  this.register([
    {
key: 'expression',
    value:"",
    type: 'string'},
{
key: 'type',
    value:"",
    type: 'string'}
  ]);
}
exports.ConditionalExpressionProperties = ConditionalExpressionProperties;




function TableCellFormatProperties() {
  PropertyBase.call(this);

  this.register([
    {
key: 'cellBackgroundColor',
    value:"auto",
    type: 'string'},
{
key: 'cellTextColor',
    value:"auto",
    type: 'string'}
  ]);
}
exports.TableCellFormatProperties = TableCellFormatProperties;




function TableColumnProperties() {
  DataColumnProperties.call(this);

  this.register([
    {
key: 'name',
    value:"",
    type: 'string'},
{
key: 'columnType',
    value:"text",
    type: 'string'},
{
key: 'sortable',
    value:false,
    type: 'boolean'},
{
key: 'columnWidth',
    value:null,
    type: 'number'},
{
key: 'textAlign',
    value:null,
    type: 'string'},
{
key: 'textBoldFlag',
    value:false,
    type: 'boolean'},
{
key: 'textItalicFlag',
    value:false,
    type: 'boolean'},
{
key: 'rawHTML',
    value:false,
    type: 'boolean'},
{
key: 'subCaption',
    value:false,
    type: 'boolean'},
{
key: 'subCaptionUnits',
    value:null,
    type: 'string'}
  ]);
}
exports.TableColumnProperties = TableColumnProperties;




function FormComponentProperties() {
  ComponentProperties.call(this);

  this.register([
    {
key: 'form',
    value:new FormProperties(),
    type: 'PropertyBase'}
  ]);
}
exports.FormComponentProperties = FormComponentProperties;




function FormProperties() {
  PropertyBase.call(this);

  this.register([
    {
key: 'items',
    value:new PropertyList(FormItemProperties),
    type: 'PropertyList'}
  ]);
}
exports.FormProperties = FormProperties;




function FormItemProperties() {
  PropertyBase.call(this);

  this.register([
    {
key: 'type',
    value:"",
    type: 'string'},
{
key: 'label',
    value:"",
    type: 'string'},
{
key: 'list',
    value:"string",
    type: 'string'},
{
key: 'options',
    value:"",
    type: 'string'},
{
key: 'range',
    value:"",
    type: 'string'},
{
key: 'value',
    value:"",
    type: 'string'}
  ]);
}
exports.FormItemProperties = FormItemProperties;




function KPITableComponentProperties() {
  ComponentProperties.call(this);

  this.register([
    {
key: 'kpitable',
    value:new KPITableProperties(),
    type: 'PropertyBase'}
  ]);
}
exports.KPITableComponentProperties = KPITableComponentProperties;




function KPITableProperties() {
  PropertyBase.call(this);

  this.register([
    {
key: 'items',
    value:new PropertyList(KPIDisplayProperties),
    type: 'PropertyList'}
  ]);
}
exports.KPITableProperties = KPITableProperties;




function KPITableItem() {
  PropertyBase.call(this);

  this.register([
    {
key: 'caption',
    value:"",
    type: 'string'},
{
key: 'value',
    value:"",
    type: 'number'}
  ]);
}
exports.KPITableItem = KPITableItem;




function TabbedComponentProperties() {
  ComponentProperties.call(this);

  this.register([
    {
key: 'children',
    value:new PropertyList(TabItemProperties),
    type: 'PropertyList'},
{
key: 'tabbed',
    value:new TabbedCoreProperties(),
    type: 'PropertyBase'}
  ]);
}
exports.TabbedComponentProperties = TabbedComponentProperties;




function TabbedCoreProperties() {
  PropertyBase.call(this);

  this.register([
    {
key: 'activeIndex',
    value:0,
    type: 'number'}
  ]);
}
exports.TabbedCoreProperties = TabbedCoreProperties;




function TabItemProperties() {
  PropertyBase.call(this);

  this.register([
    {
key: 'name',
    value:"",
    type: 'string'},
{
key: 'componentId',
    value:"",
    type: 'string'}
  ]);
}
exports.TabItemProperties = TabItemProperties;




  return exports;
});
