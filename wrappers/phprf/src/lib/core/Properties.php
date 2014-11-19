<?php

class NullProperties extends PropertyBase {

  public function init() {
    parent::init();

    $this->register(array(
      
    ));
  }
  
}

class DataColumnProperties extends PropertyBase {

  public function init() {
    parent::init();

    $this->register(array(
          'dataType' => "auto",
    'numberFormatFlag' => true,
    'numberHumanize' => false,
    'numberPrefix' => null,
    'numberSuffix' => null,
    'numberThousandsSeparator' => ",",
    'numberDecimalsSeparator' => ".",
    'numberForceDecimals' => false,
    'numberDecimalPoints' => 2
    ));
  }
  
}

class ComponentProperties extends PropertyBase {

  public function init() {
    parent::init();

    $this->register(array(
          'core' => new ComponentCoreProperties(),
    'events' => new PropertyList('ComponentEventProperties'),
    'children' => new PropertyList('NullProperties'),
    'data' => new ComponentDataProperties(),
    'kpis' => new PropertyList('ComponentKPIProperties')
    ));
  }
  
}

class ComponentKPIProperties extends DataColumnProperties {

  public function init() {
    parent::init();

    $this->register(array(
          'caption' => "",
    'value' => 0,
    'captioncolor' => null,
    'valuecolor' => null,
    'Width' => 2,
    'activeFlag' => true,
    'icon' => null,
    'iconprops' => "{}",
    'valueConditionalFormatters' => new PropertyList('ValueConditionalFormat')
    ));
  }
  
}

class ComponentDataProperties extends PropertyBase {

  public function init() {
    parent::init();

    $this->register(array(
          'sources' => new PropertyList('RemoteDataSourceProperties')
    ));
  }
  
}

class RemoteDataSourceProperties extends PropertyBase {

  public function init() {
    parent::init();

    $this->register(array(
          'url' => null
    ));
  }
  
}

class ComponentEventProperties extends PropertyBase {

  public function init() {
    parent::init();

    $this->register(array(
          'type' => "",
    'affectedComponents' => new PropertyList('AffectedComponentProperties'),
    'url' => "",
    'context' => ""
    ));
  }
  
}

class AffectedComponentProperties extends PropertyBase {

  public function init() {
    parent::init();

    $this->register(array(
          'id' => null
    ));
  }
  
}

class ComponentCoreProperties extends PropertyBase {

  public function init() {
    parent::init();

    $this->register(array(
          'caption' => "",
    'icon' => null,
    'iconprops' => "{}",
    'absolutePosition' => false,
    'dimensions' => new ComponentDimensionProperties(),
    'isChild' => false,
    'location' => new ComponentLocationProperties(),
    'zoomable' => true,
    'breadCrumbs' => new PropertyList('BreadCrumbProperties'),
    'isHidden' => false,
    'showModal' => false,
    'breadcrumbStartString' => "Start",
    'index' => 99999
    ));
  }
  
}

class BreadCrumbProperties extends PropertyBase {

  public function init() {
    parent::init();

    $this->register(array(
          'url' => null
    ));
  }
  
}

class ComponentDimensionProperties extends PropertyBase {

  public function init() {
    parent::init();

    $this->register(array(
          'w' => null,
    'h' => null
    ));
  }
  
}

class ComponentLocationProperties extends PropertyBase {

  public function init() {
    parent::init();

    $this->register(array(
          'x' => null,
    'y' => null,
    'w' => null,
    'h' => null
    ));
  }
  
}

class KPIComponentProperties extends ComponentProperties {

  public function init() {
    parent::init();

    $this->register(array(
          'kpi' => new KPIProperties()
    ));
  }
  
}

class KPIProperties extends PropertyBase {

  public function init() {
    parent::init();

    $this->register(array(
          'display' => new KPIDisplayProperties(),
    'valueConditionalFormatters' => new PropertyList('ValueConditionalFormat')
    ));
  }
  
}

class ValueConditionalFormat extends PropertyBase {

  public function init() {
    parent::init();

    $this->register(array(
          'expression' => "",
    'valueColor' => "auto"
    ));
  }
  
}

class KPIDisplayProperties extends DataColumnProperties {

  public function init() {
    parent::init();

    $this->register(array(
          'dataType' => "number",
    'value' => 0,
    'indicator' => null,
    'indicatorColor' => "green",
    'caption' => "",
    'subcaption' => "",
    'target' => null,
    'gaugeType' => "circular",
    'gaugeFlag' => false,
    'sparkFlag' => false,
    'ranges' => new PropertyList('RFRangeProperties'),
    'maximum' => null,
    'minimum' => null,
    'type' => null,
    'icon' => null,
    'iconprops' => "{}",
    'valueTextColor' => "auto"
    ));
  }
  
}

class RFRangeProperties extends PropertyBase {

  public function init() {
    parent::init();

    $this->register(array(
          'start' => null,
    'end' => null,
    'color' => null
    ));
  }
  
}

class ChartComponentProperties extends ComponentProperties {

  public function init() {
    parent::init();

    $this->register(array(
          'chart' => new ChartProperties()
    ));
  }
  
}

class ChartProperties extends PropertyBase {

  public function init() {
    parent::init();

    $this->register(array(
          'series' => new PropertyList('ChartSeriesProperties'),
    'yaxis' => new ChartAxisProperties(),
    'xaxis' => new ChartAxisProperties(),
    'secondaryYAxis' => new ChartAxisProperties(),
    'dualY' => false,
    'showLegendFlag' => true,
    'showPieValues' => true,
    'showLabelFlag' => true,
    'labelStep' => new LabelStepProperties(),
    'stackedTotalDisplay' => false
    ));
  }
  
}

class LabelStepProperties extends PropertyBase {

  public function init() {
    parent::init();

    $this->register(array(
          'interval' => null,
    'startIndex' => 0
    ));
  }
  
}

class ChartAxisProperties extends DataColumnProperties {

  public function init() {
    parent::init();

    $this->register(array(
          'id' => "primary",
    'dataType' => "number",
    'axisName' => "",
    'minValue' => null,
    'maxValue' => null,
    'numTicks' => null
    ));
  }
  
}

class ChartSeriesProperties extends DataColumnProperties {

  public function init() {
    parent::init();

    $this->register(array(
          'dataType' => "number",
    'seriesName' => "",
    'seriesDisplayType' => "column",
    'seriesColor' => "auto",
    'seriesHiddenFlag' => false,
    'includeInLegendFlag' => true,
    'seriesStacked' => false,
    'yAxis' => "primary"
    ));
  }
  
}

class GaugeComponentProperties extends ComponentProperties {

  public function init() {
    parent::init();

    $this->register(array(
          'gauge' => new GaugeProperties()
    ));
  }
  
}

class GaugeProperties extends DataColumnProperties {

  public function init() {
    parent::init();

    $this->register(array(
          'caption' => "",
    'subcaption' => "",
    'min' => 0,
    'max' => 100,
    'value' => 50
    ));
  }
  
}

class TableComponentProperties extends ComponentProperties {

  public function init() {
    parent::init();

    $this->register(array(
          'table' => new TableProperties()
    ));
  }
  
}

class TableProperties extends PropertyBase {

  public function init() {
    parent::init();

    $this->register(array(
          'columns' => new PropertyList('TableColumnProperties'),
    'cellConditionalFormatters' => new PropertyList('TableCellConditionalFormat'),
    'rowsPerPage' => 10,
    'currentPageNumber' => 0,
    'totalRows' => 0
    ));
  }
  
}

class TableCellConditionalFormat extends PropertyBase {

  public function init() {
    parent::init();

    $this->register(array(
          'conditionalExpression' => new ConditionalExpressionProperties(),
    'format' => new TableCellFormatProperties(),
    'column_id' => ""
    ));
  }
  
}

class ConditionalExpressionProperties extends PropertyBase {

  public function init() {
    parent::init();

    $this->register(array(
          'expression' => "",
    'type' => ""
    ));
  }
  
}

class TableCellFormatProperties extends PropertyBase {

  public function init() {
    parent::init();

    $this->register(array(
          'cellBackgroundColor' => "auto",
    'cellTextColor' => "auto"
    ));
  }
  
}

class TableColumnProperties extends DataColumnProperties {

  public function init() {
    parent::init();

    $this->register(array(
          'name' => "",
    'columnType' => "text",
    'sortable' => false,
    'columnWidth' => null,
    'textAlign' => null,
    'textBoldFlag' => false,
    'textItalicFlag' => false,
    'rawHTML' => false,
    'subCaption' => false,
    'subCaptionUnits' => null
    ));
  }
  
}

class FormComponentProperties extends ComponentProperties {

  public function init() {
    parent::init();

    $this->register(array(
          'form' => new FormProperties()
    ));
  }
  
}

class FormProperties extends PropertyBase {

  public function init() {
    parent::init();

    $this->register(array(
          'items' => new PropertyList('FormItemProperties')
    ));
  }
  
}

class FormItemProperties extends PropertyBase {

  public function init() {
    parent::init();

    $this->register(array(
          'type' => "",
    'label' => "",
    'list' => "string",
    'options' => "",
    'range' => "",
    'value' => ""
    ));
  }
  
}

class KPITableComponentProperties extends ComponentProperties {

  public function init() {
    parent::init();

    $this->register(array(
          'kpitable' => new KPITableProperties()
    ));
  }
  
}

class KPITableProperties extends PropertyBase {

  public function init() {
    parent::init();

    $this->register(array(
          'items' => new PropertyList('KPIDisplayProperties')
    ));
  }
  
}

class KPITableItem extends PropertyBase {

  public function init() {
    parent::init();

    $this->register(array(
          'caption' => "",
    'value' => ""
    ));
  }
  
}

class TabbedComponentProperties extends ComponentProperties {

  public function init() {
    parent::init();

    $this->register(array(
          'children' => new PropertyList('TabItemProperties'),
    'tabbed' => new TabbedCoreProperties()
    ));
  }
  
}

class TabbedCoreProperties extends PropertyBase {

  public function init() {
    parent::init();

    $this->register(array(
          'activeIndex' => 0
    ));
  }
  
}

class TabItemProperties extends PropertyBase {

  public function init() {
    parent::init();

    $this->register(array(
          'name' => "",
    'componentId' => ""
    ));
  }
  
}