<?php

/**
 * Creates a Gauge Component
 * @class GaugeComponent
 * @param {String} $id     Uniquely identifies the instance of this class   
 * @augments {KPIComponent}
 */
class GaugeComponent extends KPIComponent {
    public function __construct ($id) {
        parent::__construct ($id);

        $this->props = new KPIComponentProperties ();
        $this->props->setValue('kpi.display.gaugeFlag', true);
        $this->props->linkToComponent ($this);

        $this->postInit();
    }

    /**
     * Sets the maximum and minimum values of the gauge.
     * @method setLimits
     * @param  {Number} min Lower bound of the gauge
     * @param  {Number} max Upper bound of the gauge
     */
    public function setLimits ($min, $max) {
        $this->provide('limits');
        $this->props->setValue('kpi.display.minimum', $min);
        $this->props->setValue('kpi.display.maximum', $max);
    }

    /**
     * Gets the type of this component
     * @method getType
     * @return {String} The component type
     */
    public function getType () {
        return "GaugeComponent";
    }

    protected function validate () {
        parent::validate();
        $this->requireAspects (array(
            'limits' => "Please set the limits using setLimits",
        ));
    }
}

