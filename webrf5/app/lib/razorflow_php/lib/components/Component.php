<?php

/**
 * Base Component Class containing functions shared across all components.
 *
 * **This is an abstract class. You cannot create instances of this.**
 *
 * @class Component
 */
abstract class RFComponent {

    /**
     * Set the caption of this component which is the text displayed on top of the component
     * @method setCaption
     * @param {String} $caption         Caption text to be displayed on the component
     */
    public function setCaption ($caption) {
        $this->props->setValue ('core.caption', $caption);
    }

    /**
     * Set the dimensions of the component. The dimensions are based on a 12-column grid
     * @method setDimensions
     * @param {Number} $w        Width of the Component in Units
     * @param {Number} $h        Height of the Component in Units
     */
    public function setDimensions ($w, $h) {
        $this->provide('dimensions');
        $this->props->setObjectAtPath ('core.location', array(
            'x' => 0,
            'y' => 0,
            'w' => $w,
            'h' => $h
        ));
    }

    /**
     * Hides a component from the dashboard
     * @method hideComponent
     */
    public function hideComponent() {
        $this->props->setValue('core.isHidden', true);
    }

    /**
     * Show a hidden component in a modal
     * @method showAsModal
     */
    public function showAsModal() {
        //TODO: This is a hack temporarily.
        $this->setDimensions(4, 4);
        $this->props->setValue('core.showModal', true);
        $this->validate();
    }


    /**
     * Add a simple Key Performance Indicator (KPI/Metric) attached to the
     * bottom of the component. 
     * 
     * @method addComponentKPI
     * @param {String} $id A unique ID to identify the component KPI
     * @param {ComponentKPIProperties}  $options  The options as an Associative Array
     */
    public function addComponentKPI ($id, $options=array()) {
      $this->props->addItemToList('kpis', $id, $options);
    }

    /**
    * Updates the Component KPI
    * @method updateComponentKPI
    * 
    * @param {String} $id       A unique ID to identify the component KPI. This has to be the same as the one used to add the component kpi
    * @param {Array}  $options  Array with the new value to set
    */
    public function updateComponentKPI($id, $options=array()) {
        $kpis = $this->props->getObjectAtPath('kpis');
        $kpis[$id] = $this->parseKPIComponentOptions($options, $kpis[$id]);

        $this->props->setObjectAtPath('kpis', $kpis);
    }

    /**
    * Removes a Component KPI
    * @method removeComponentKPI
    * @param {String} $id       A unique ID to identify the component KPI. This has to be the same as the one used to add the component kpi
    */
    public function removeComponentKPI($id) {
        $kpis = $this->props->getObjectAtPath('kpis');
        unset($kpis[$id]);

        $this->props->emptyList('kpis');
        $this->props->setObjectAtPath('kpis', $kpis);
    }

    /**
    * Sets the index of the component on the dashboard. The component order on the dashboard is based on this index.
    * @method overrideDisplayOrderIndex
    * @param {Number} $idx The index for this component
    */
    public function overrideDisplayOrderIndex ($idx) {
        $this->props->setValue('core.index', $idx);
    }

    protected $aspects = array();

    protected function provide ($aspectName) {
        $this->aspects[$aspectName] = true;
    }

    protected function requireAspects ($object) {
        foreach ($object as $key => $value) {
            if(!isset($this->aspects[$key])) {
                throw new Exception ($value);
            }
        }
    }

    protected function validate () {
      $this->requireAspects(array(
        "dimensions" => "Please provide dimensions using setDimensions"
      ));
    }

    public function __handleContext ($context) {
        return false;
    }

    /**
       * Set the value to the key passed for the particular component.
       * @method setOption
       * @param {String} key variable which needs to be assigned
       * @param {String} value value to be assigned to the key
       */
    public function setOption ($key, $value) {
        if($key === "breadcrumbStartString") {
            $this->props->setValue ("core.breadcrumbStartString", $value);
            return true;
        }

        if($this->handleSetOption($key, $value)) {
            return true;
        }

        return false;
    }

    protected function handleSetOption ($key, $value) {
        return false;
    }

    public function bindToEvent ($eventName, $components, $target, $db, $options=array()) {
        $componentIds = array();
        foreach($components as $c) {
            $componentIds []= array('id' => $c->getID());
        }

        $this->setDashboard($db);

        $url_params = $this->getURLParams(array(
            'action' => 'triggerAction',
            'func' => $target
        ));

        $eventProperties = array(
            'type' => $eventName,
            'affectedComponents' => $componentIds,
            'url' => RFUtil::buildURL($this->getBasePath (), $this->getURLParams($url_params))
        );

        if(isset($options['context'])) {
            $eventProperties['context'] = $options['context'];
        }

        $this->props->pushItemToList("events", $eventProperties);
    }

    protected function createActionUrl ($actionName, $func) {
        return RFUtil::buildURL($this->getBasePath (), array('action' => $actionName, 'func' => $func));
    }

    public function getBasePath () {
        return $this->containingDashboard->getBasePath();
    }


    protected $id;
    /**
     * @var PropertyBase
     */
    protected $props;

    /**
     * @var DataSource
     */
    protected $data;

    protected $dirty = false;

    protected $patches = array();
    protected $dpatches = array();


    function __construct($id) {
        $this->id = $id;
        $this->data = new RFDataSource();
        $this->data->linkToComponent($this);
    }

    /**
     * Get the id for this component 
     * @method getID
     */
    public function getID () {
        return $this->id;
    }

    public function getAsObject () {
        $this->validate();
        return array(
            'type' => $this->getType (),
            'props' => $this->props->getRootObject(),
            'data' => $this->data->getRaw()
        );
    }

    public function getType () {
        return "Component";
    }

    public function __flagDirty () {
        $this->dirty = true;
    }

    public function __buildFromObject ($obj) {
        $this->props->setRootObject ($obj['props']);
    }

    public function __getPatches () {
        return array(
            'props' => $this->patches,
            'data' => $this->dpatches
        );
    }

    public function postInit () {
        $this->props->setBasePath ("");
    }

    public function __addPatch ($action, $path, $params) {
        if($this->dirty) {
            $this->patches []= array(
                'action' => $action,
                'path' => $path,
                'params' => $params
            );
        }
    }

    public function __addDPatch ($action, $index, $params) {
        if ($this->dirty ) {
            $this->dpatches []= array(
                'action' => $action,
                'index' => $index,
                'params' => $params
            );
        }
    }

    public function getUpdatedDataJSON($data) {
      return json_encode(
        $this->updateData($data),
        JSON_PRETTY_PRINT
      );
    }

    public function setDashboard ($dashboard) {
      $this->containingDashboard = $dashboard;
    }

    public function getDashboard () {
      return $this->containingDashboard;
    }

    protected function isHidden() {
        if($this->props->getValue('core.showModal')) {
            return false;
        }

        return $this->props->getValue('core.isHidden');
    }

    private function getURLParams($params) {
        $url_params = $params;
        $url_params['dashboard'] = $this->containingDashboard->getID();
        if($this->containingDashboard->getDebugMode()) {
            $url_params['rfDebug'] = true;
        }

        return $url_params;
    }
    
    private function parseKPIComponentOptions($options, $kpi) {
        foreach($options as $key => $value) {
            $kpi[$key] = $value;
        }

        return $kpi;
    }


    public function initialize () {
        // DO nothing by default
    }

    private $containingDashboard;
        
}
