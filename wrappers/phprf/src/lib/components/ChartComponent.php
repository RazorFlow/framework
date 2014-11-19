<?php

/**
 * Creates a chart component which has a chart
 * @class ChartComponent
 * @param {String} $id     Uniquely identifies the instance of this class   
 * @augments {Component}
 */
class ChartComponent extends RFComponent {
	public function __construct ($id) {
        parent::__construct ($id);

        $this->props = new ChartComponentProperties ();
        $this->props->linkToComponent ($this);

        $this->postInit();
    }
    /**
     * Adds a series to the chart. The number of data points provided using the seriesData array should be the same as the other series and the number of labels 
     * @method addSeries
     * @param {String} $id          Unique id of the series. This will be used for updating the series data
     * @param {String} $name        The name of this series
     * @param {Array}  $seriesData  The series data
     * @param {Array}  $opts        A bunch of options passed to as an associative array
     * @example
     * $chart1 = new ChartComponent('my_chart1');
     * $chart1->addSeries('sales', 'Sales', array(826.25, 382.14, 261.36, 241.56, 93.53, 79.20, 60.39, 57.71, 40.59, 40.59));
     */
    public function addSeries ($id, $name="", $seriesData = array(), $opts = array())
    {

        if(is_array($id)) {
            if(is_string($name)) {
                $name = array();
            }
            else {
                $name = is_array($name) ? $name : array();
            }
            $this->setOption("showLegendFlag", false);
            $this->addSeries ("series_0", "", $id, $name);
            return;
        }
        $seriesData = array_map('floatval', $seriesData);
        $this->provide('series');
        $opts['seriesName'] = $name;
        $this->props->addItemToList('chart.series', $id, $opts);
        $this->data->addColumn($id, $seriesData);
    }

    /**
     * Set an array of data points which will be used for the pie chart
     * @method setPieValues
     * @param {Array} $seriesData   The series data array
     * @param {Array}  $opts        The series options as an associative array
     */
    public function setPieValues ($seriesData, $opts = array()) {
        $opts['seriesDisplayType'] = 'pie';
        $this->addSeries('pie0', 'Pie', $seriesData, $opts);
    }

    /**
     * Updates a series
     * @method updateSeries
     * @param  {String} $id       The id of the series
     * @param  {Array} $newData   The update data array
     */
    public function updateSeries ($id, $newData) {
        $this->data->addColumn($id, $newData);
    }

    /**
     * Set the labels of the chart, which are the names on the X-Axis
     * @method setLables
     * @param {Array} $labelArray An array of labels as strings
     */
    public function setLabels ($labelArray) {
        $this->provide('labels');
        $this->data->addColumn('rfLabels', $labelArray);
	}

    protected function validate () {
        if($this->isHidden()) {
            return;
        }
        
        parent::validate();
        $this->requireAspects (array(
            'series' => "Please add a series using addSeries",
            'labels' => "Please set some labels using addLabels"
        ));
    }

    /**
     * Configure the Y-Axis of the chart
     * @method setYAxis
     * @param {String} $name      The name of the y axis
     * @param {Array}  $options   Options array. See the guide for available options
     */
    public function setYAxis ($name, $options = array()) {
        $options['axisName'] = $name;
        $this->props->setObjectAtPath('chart.yaxis', $options);
    }

    /**
     * Configure the X-Axis of the chart
     * @method setXAxis
     * @param {String} $name      The name of the x axis
     * @param {Array}  $options   Options array. See the guide for available options
     */
    public function setXAxis ($name, $options = array()) {
        $options['axisName'] = $name;
        $this->props->setObjectAtPath('chart.xaxis', $options);
    }

    /**
     * Configure the Y-Axis of the chart
     * @method addYAxis
     * @param {String} $id        The unique id of this axis  
     * @param {String} $name      The name of the y axis
     * @param {Array}  $options   Options array. See the guide for available options
     */
    public function addYAxis ($id, $name, $options = array()) {
        $options['id'] = $id;
        $options['axisName'] = $name;
        $this->props->setObjectAtPath('chart.secondaryYAxis', $options);
        $this->props->setValue('chart.dualY', true);
    }

    /**
    * Attach a handler for the event when a chart plot item is clicked
    * @method onItemClick
    * @param {Array} $lockedComponents           Components to be locked
    * @param {String} $func                      Function name to be executed on item click
    * @param {Object} $db                        THe dashboard object
    */

    public function onItemClick ($lockedComponents, $func, $db){
      $this->bindToEvent ("itemClick", $lockedComponents, $func, $db);
    }

    /**
    * Clears all the data in the chart. Use this function if you want to update the chart with new data and labels. Be sure to lock the component before
    * @method clearChart
    */
    public function clearChart () {
        $this->data->clearRows ();
        $this->props->emptyList ("chart.series");
    }

    /**
    * Add a drill step for chart drilldown
    * @method addDrillStep
    * @param {String} $func                      Function name to be executed on a drill step
    * @param {Object} $db                        The dashboard object
    */
    public function addDrillStep ($func, $db) {
        $this->bindToEvent ("itemClick", array($this), $func, $db, array(
            'context' => 'drilldown'
        ));
        $this->props->pushItemToList("core.breadCrumbs", array (
            'url' => $this->createActionUrl ("handleBreadCrumbs", $func)
        ));
    }

    public function setLabelStep ($step, $index=0) {
        $this->props->setValue ("chart.labelStep.interval", $step);
        $this->props->setValue ("chart.labelStep.startIndex", $index);
    }

    public function __handleContext($context) {
        if($context === "drilldown") {
            $this->clearChart();
        }
    }

    protected function handleSetOption($key, $value) {
        if($key === "showLegendFlag") {
            $this->props->setValue ("chart.showLegendFlag", $value);
            return true;
        } else if($key === "showPieValues") {
            $this->props->setValue ("chart.showPieValues", $value);
            return true;
        } else if($key === "showLabelFlag") {
            $this->props->setValue ("chart.showLabelFlag", $value);
            return true;
        } else if($key === "stackedTotalDisplay") {
            $this->props->setValue ("chart.stackedTotalDisplay", $value);
            return true;
        }
        return false;
    }

    /**
     * Gets the type of this component
     * @method getType
     * @return {String} The component type
     */
    public function getType () {
        return "ChartComponent";
    }
} 
