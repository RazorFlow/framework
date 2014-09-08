<?php

/**
 * Creates a KPI Component
 * @class KPIComponent
 * @param {String} $id     Uniquely identifies the instance of this class   
 * @augments {Component}
 */
class KPIComponent extends RFComponent {
    public function __construct ($id) {
        parent::__construct ($id);

        $this->props = new KPIComponentProperties ();
        $this->props->linkToComponent ($this);

        $this->postInit();
    }

    /**
     * Sets a numeric value to the KPI which is displayed on the dashboard.
     * @method setValue
     * @param {Number} $value          The value to be displayed
     * @param {Array}  $options        A bunch of options to configure the display passed to as an associative array
     */
    public function setValue ($value, $options=array()) {
        $this->provide('value');
        $this->props->setValue ('kpi.display.value', $value);
        $this->props->setObjectAtPath ('kpi.display', $options);
    }

    /**
      * Sets the values to be displayed by the spark
      * @method setSparkValues
      * @param  {Array} $labels  Array of labels as strings
      * @param  {Array} $values  The values used by the spark
      */
    public function setSparkValues($labels, $values){
      $this->props->setValue('kpi.display.sparkFlag', true);
      $this->data->addColumn('sparkLabel', $labels);
      $this->data->addColumn('sparkValue', $values);
    }

    /**
     * Handles Click function on a value
     * @method onValueClick
     * @param {String} $url         Remote Url that updates the value
     */
    public function onValueClick ($url) {
        $this->props->pushItemToList ('events', array(
            'url' => $url,
            'eventName' => 'valueClicked'
        ));
    }

    public function valueConditionalFormat ($formatRule, $appliedStyle) {
        $this->props->pushItemToList ("kpi.valueConditionalFormatters", array(
            "expression" => $formatRule,
            "valueColor" => $appliedStyle
        ));
    }

    /**
     * Gets the type of this component
     * @method getType
     * @return {String} The component type
     */
    public function getType () {
        return "KPIComponent";
    }

    protected function validate () {
        if($this->isHidden()) {
            return;
        }

        parent::validate();
        $this->requireAspects (array(
            'value' => "Please add a value usig setValue",
        ));
    }
}

