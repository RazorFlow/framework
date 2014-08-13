<?php
abstract class TabbedDashboard extends Dashboard {

    public function __construct(){
      parent::__construct();
      $this->dashboards = array();
    }

    public function addDashboardTab($db) {
      $this->dashboards[$db->getID()]= $db;
    }

    public function setTabbedDashboardTitle ($title){
      $this->tabbedDashboardTitle = $title;
    }

    public function getTabbedDashboardTitle (){
      return $this->tabbedDashboardTitle;
    }

    public function getTabbedHTML() {
      global $rfTemplateData;
      global $_rfConfig;

      $dashboardComponents = array();
      foreach($this->dashboards as $db){
        $db->initialize();
        $db->buildDashboard();
        $dbObj = $db->getAsObject();
        $dashboardComponents []= $dbObj;
      }

      $tabbedDashboardObject = $this->getTabbedObject($dashboardComponents);
      $dbAsJson = json_encode($tabbedDashboardObject);

      $staticRoot = $this->getStaticRoot();
      $rfTemplateData = array(
        'staticRoot' => $staticRoot,
        'dbAsJson' => $dbAsJson,
        'rfDev' => false,
        'rfDebug' => $this->getDebugMode()
      );

      ob_start();
      require RF_FOLDER_ROOT."/lib/templates/tabbed_template.php";
      $contents = ob_get_contents();
      ob_end_clean();

      return $contents;
    }

    public function renderEmbedded() {
      if(!$this->shouldRenderTabbed()){
        return;
      }

      global $rfTemplateData;
      global $_rfConfig;

      $this->initialize();
      $this->buildDashboard();

      $dashboardComponents = array();
      foreach($this->dashboards as $db){
        $db->setActionPath($this->actionPath);
        $db->initialize();
        $db->buildDashboard();
        $dbObj = $db->getAsObject();
        $dashboardComponents []= $dbObj;
      }

      $tabbedDashboardObject = $this->getTabbedObject($dashboardComponents);
      $dbAsJson = json_encode($tabbedDashboardObject);

      $staticRoot = $this->getStaticRoot();

      $rfTemplateData = array(
        'staticRoot' => $staticRoot,
        'dbAsJson' => $dbAsJson,
        'rfDev' => false
      );

      ob_start();
      require RF_FOLDER_ROOT."/lib/templates/tabbed_embedded_template.php";
      $contents = ob_get_contents();
      ob_end_clean();

      echo $contents;
    }

    public function renderStandalone () {
      if(!$this->shouldRenderTabbed()){
        return;
      }

      $this->buildDashboard();
      echo $this->getTabbedHTML();
    }

    private function getTabbedObject ($components){
      $tabbedObject = array(
        "tabbedDashboardTitle" => $this->getTabbedDashboardTitle(),
        "tabbedComponents" => $components,
        "properties" => $this->properties,
        "debug" => $this->getDebugMode()
      );

      if($this->getDebugMode()) {
        $tabbedObject["logs"] = $this->getLogs();
      }

      return $tabbedObject;
    }

    private function shouldRenderTabbed(){
      $this->initialize();
      $action = $this->extractAction();
      if($action === "triggerAction") {
        $dbID = $_GET['dashboard'];
        $this->buildDashboard();
        $db = $this->getDashboardByID($dbID);
        $db->initialize();
        $db->handleAction();
        return false;
      }

      return true;
    }

    private function getDashboardByID($dbID){
      return $this->dashboards[$dbID];
    }

    abstract protected function buildDashboard();
    private $dashboards;
    private $tabbedDashboardTitle;
} 
