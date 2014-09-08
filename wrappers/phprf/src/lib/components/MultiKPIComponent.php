<?php

/**
 * Base MultiKPIComponent Class containing functions shared across KPITable and KPIGroup.
 *
 * **This is an abstract class. You cannot create instances of this.**
 *
 * @class MultiKPIComponent
 */
abstract class MultiKPIComponent extends RFComponent {
    public function __construct ($id) {
        parent::__construct ($id);

        $this->props = new ComponentProperties ();
        $this->props->linkToComponent ($this);

        $this->postInit();
    }

    /**
     * Adds an individual KPI
     * @method addKPI
     * @param {String} $id                           A unique id for the KPI
     * @param {ComponentKPIProperties} $opts         Array of options
     */
    public function addKPI($id, $options=array()) {
        $this->props->addItemToList('kpis', $id, $options);
    }

    /**
     * Updates an existing KPI
     * @method updateKPI
     * @param {String} $id                           The unique id for the individual KPI
     * @param {ComponentKPIProperties} $opts         Array of options
     */
    public function updateKPI($id, $options=array()) {
        $list = $this->props->getObjectAtPath('kpis');
        $list[$id] = $this->updateList($options, $list[$id]);
        $this->props->emptyList('kpis');
        $this->props->setObjectAtPath('kpis', $list);
    }

    /**
     * Deletes an existing KPI
     * @method deleteKPI
     * @param {String} $id           The unique id for the individual KPI
     */
    public function deleteKPI($id) {
        $list = $this->props->getObjectAtPath('kpis');
        unset($list[$id]);
        $this->props->emptyList('kpis');
        $this->props->setObjectAtPath('kpis', $list);
    }

    /**
     * Sets a caption color for a KPI
     * @method setKPICaptionColor
     * @param {String} $id            The unique id for the individual KPI
     * @param {String} $color         Color for the caption
     */
    public function setKPICaptionColor($id, $color) {
        $this->props->setValue('kpis[' . $id . '].captioncolor', $color);
    }

    /**
     * Sets a value color for a KPI
     * @method setKPIValueColor
     * @param {String} $id           The unique id for the individual KPI
     * @param {String} $opts         Color for the value
     */
    public function setKPIValueColor($id, $color) {
        $this->props->setValue('kpis[' . $id . '].valuecolor', $color);   
    }

    /**
     * Gets the type of this component
     * @method getType
     * @return {String} The component type
     */
    public function getType () {
        return "MultiKPIComponent";
    }

    public function valueConditionalFormat ($formatRule, $appliedStyle) {
        foreach ($this->props->getObjectAtPath("kpis") as $key => $value) {
            $this->props->pushItemToList("kpis[". $key ."].valueConditionalFormatters", array(
                "expression" => $formatRule,
                "valueColor" => $appliedStyle
            ));
        }
    }

    protected function validate () {
        if($this->isHidden()) {
            return;
        }

        parent::validate();
    }

    private function updateList($options, $kpi) {
         foreach($options as $key => $value) {
            $kpi[$key] = $value;
        }

        return $kpi; 
    }
}

