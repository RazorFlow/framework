<?php

abstract class Dashboard {

    public function __construct($id=null){
      global $_rfConfig;

      if($id == null){
        if(!isset($GLOBALS["__rf_dashboard_autoid"])) {
          $GLOBALS["__rf_dashboard_autoid"] = 0;
        }
        $GLOBALS["__rf_dashboard_autoid"] ++;
        $id = "dashboard_".$GLOBALS["__rf_dashboard_autoid"];
      }

      $this->setID($id);

      if(isset($_rfConfig['staticRoot'])){
        $this->staticRoot = $_rfConfig['staticRoot'];
      }

      $this->debugMode = false;
      $this->autoRefresh = false;
    }

    public function setID ($id) {
      $this->id = $id;
    }

    public function getID(){
      return $this->id;
    }

    public function setStaticRoot($staticRoot) {
        $this->staticRoot = $staticRoot;
    }
    public function getStaticRoot() {
        return $this->staticRoot;
    }

    protected $properties = array();

    /**
     * @param $component Component
     */
    public function addComponent ($component) {
        $this->components []= $component;
        $this->componentById [$component->getID()] = $component;

        if(!isset($_GET['action'])) {

        }

        $component->setDashboard($this);
    }

    public function setDashboardTitle ($title) {
        $this->properties['dashboardTitle'] = $title;
    }

    public function setWidth ($width) {
      $this->properties['dashboardWidth'] = $width;
    }

    public function setHeight ($height) {
      $this->properties['dashboardHeight'] = $height;
    }

    public function setActive () {
      $this->properties['active'] = true;
    }

    public function setDashboardRefreshDelay($milliseconds) {
      $this->autoRefresh = true;
      $this->properties['autoRefreshURL'] = $this->buildRefreshURL();
      $this->properties['dashboardDelay'] = $milliseconds;
    }

    public function getComponentByID ($id) {
        if(!isset($this->componentById[$id])) {
            die("Cannot find component with id $id");
        }
        return $this->componentById[$id];
    }

    public function getAsObject () {
        $result = array('components' => array(), 'properties' => $this->properties);
        $result['debug'] = $this->getDebugMode();

        if($this->getDebugMode()) {
            $result['logs'] = $this->getLogs();
        }

        /** @var $c Component */
        foreach($this->components as $c) {
            $c->initialize();
            $result['components'][$c->getID()] = $c->getAsObject();
        }

        return $result;
    }

    public function getJSONForAction () {
        $func = $_GET['func'];
        $action = $_GET['action'];
        $source = null;
        $targets = array();
        
        if(method_exists($this, $func)) {
            $params = array();
            if(isset($_POST['params'])) {
                $params = json_decode($_POST['params'], true);
            }

            if ($action === 'getData') {
                $this->initialize ();
            }
            
            if($action === 'triggerAction') {
              // parse the postback
              $parsedPostback = $this->parsePostback ($_POST['postback'], $params);
              $source = $parsedPostback['source'];
              $targets = $parsedPostback['targets'];
              
              // Initialize the dashboard members, etc
              $this->initialize ();
            }
            else {
              $this->buildDashboard();
            }

            $context = isset($_POST['context']) ? $_POST['context'] : "";
            $source->__handleContext($context);


            // Execute the function
            $response = $this->$func($source, $targets, $params);

            // Push the updates as json
            return ( $action === "triggerAction" ? $this->renderUpdates() : $this->setNewData($response) );
        }
    }

    private function setNewData($data) {
      $component = $this->getComponentByID($_GET['component']);
      $data = array(
        "data" => $component->getUpdatedDataJSON($data)
      );

      if($this->getDebugMode) {
        $data['logs'] = $this->getLogs();
      }

      return json_encode($data);
    }

    protected $actionPath = null;
    public function getBasePath () {
        if(isset($this->actionPath)) {
            return $this->actionPath;
        }
        return $_SERVER['REQUEST_URI'];
    }

    public function setActionPath ($actionPath) {
      $this->actionPath = $actionPath;
    }


    public function handleAction () {
        if($this->getDebugMode()) {
            set_error_handler(array('RFError', 'error'), E_ALL);
        }
        
        header ('Content-Type: application/json');
        echo $this->getJSONForAction();
        exit();
    }

    public function log($message, $object=null) {
      if($this->getDebugMode()) {
          $this->logs []= array(
            'message' => $message,
            'log' => print_r($object, true)
          );
      }
    }

    protected function parsePostback ($postbackString, $params) {
        $pb = json_decode($postbackString, true);
        $source = null;
        $targets = array();
        
        foreach ($pb['components'] as $key => $value) {
            $cobj = null;
            
            switch ($value['type']) {
                case 'KPIComponent':
                    $cobj = new KPIComponent ($key);
                    break;
                case 'TableComponent':
                    $cobj = new TableComponent ($key);
                    break;
                case 'ChartComponent':
                    $cobj = new ChartComponent ($key);
                    break;
                case 'FormComponent':
                    $cobj = new FormComponent($key);
                    $cobj->setInputValues($params);
                    break;
                case 'KPITableComponent':
                    $cobj = new KPITableComponent($key);
                    break;
                default:
                    die("Unknown component type");
                    break;
            }
            
            $cobj->__buildFromObject ($value);
            $cobj->__flagDirty();
            
            $this->addComponent ($cobj);

            if($value['source'] === true) {
                $source = $cobj;
            }
            else {
                $targets []= $cobj;
            }

        }
        
        return array(
            'source' => $source,
            'targets' => $targets
        );
    }

    protected function extractAction () {
        if(isset($_GET['action'])) {
            return $_GET['action'];
        }
        return null;
    }

    protected function shouldRenderDashboard () {

        if($this->isXHR()) {
            $this->handleAction ();
            return false;
        }
        return true;
    }

    protected function shouldRefreshDashboard () {

        if(isset($_GET['getDashboardAsJSON'])) {
            if($_GET['getDashboardAsJSON']) {
                $this->buildDashboard();
                header ('Content-Type: application/json');
                echo json_encode($this->getAsObject());
                exit();
            }

            return false;
        }

        return false;
    }

    protected function getDispatchObject () {
        $resp = array(
            'patches' => array()
        );
        foreach ($this->componentById as $key => $value) {
            $resp['patches'][$key] = $value->__getPatches ();
        }

        if($this->getDebugMode()) {
            $resp['logs'] = $this->getLogs();
        }
        
        return $resp;
    }

    public function RenderUpdates () {
        return json_encode ($this->getDispatchObject());
    }

    public function disableUpdateChecker () {
        $this->properties['disableUpdateChecker'] = true;
    }

    protected function initialize () {

    }

    protected function getLogs() {
        if($this->debugMode) {
            return $this->logs;
        }

        return array();
    }

    public function getDebugMode() {
        return $this->debugMode;
    }

    public function enableDevTools() {
        $this->debugMode = true;
    }

    protected function getRefreshDelay() {
        if(isset($this->properties['dashboardDelay'])) {
            return $this->properties['dashboardDelay'];
        }

        return 0;
    }

    private function isXHR() {
        $action = $this->extractAction();
        if($action === "triggerAction" || $action === "getData") {
            return true;
        }

        return false;
    }

    private function buildRefreshURL() {
        $url = RFUtil::buildURL($this->getBasePath (), array('getDashboardAsJSON' => true)); 
        return $url;
    }

    private $debugMode;
    protected $autoRefresh;
    protected $id;
    protected $staticRoot = "";
    protected $components = array();
    protected $componentById = array();
    protected $logs = array();

}
