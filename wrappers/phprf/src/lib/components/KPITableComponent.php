<?php

/**
 * Creates a KPI Table Component
 * @class KPITableComponent
 * @param {String} $id     Uniquely identifies the instance of this class   
 * @augments {MultiKPIComponent}
 */
class KPITableComponent extends MultiKPIComponent {
    public function __construct ($id) {
        parent::__construct ($id);
    }

    /**
     * Gets the type of this component
     * @method getType
     * @return {String} The component type
     */
    public function getType () {
        return "KPITableComponent";
    }

}

