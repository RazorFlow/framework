<?php
abstract class StandaloneDashboard extends Dashboard {

    public function __construct($id=null){
      parent::__construct($id);
    }

    public function renderStandalone() {
        if(!$this->shouldRenderDashboard()) {
            return;
        }
        if($this->shouldRefreshDashboard()) {
            return;
        }
        echo $this->getStandaloneHTML();
    }

    protected abstract function buildDashboard();

    public function getStandaloneHTML () {
        $this->initialize();

        global $rfTemplateData;
        global $_rfConfig;
        $this->buildDashboard();
        $dbObject = $this->getAsObject();
        $dbAsJson = json_encode($dbObject);
        $rfTemplateData = array(
            'staticRoot' => $this->getStaticRoot(),
            'dbAsJson' => $dbAsJson,
            'rfDev' => false,
            'rfDebug' => $this->getDebugMode(),
            'rfRefreshDelay' => $this->getRefreshDelay(),
            'rfAutoRefresh' => $this->autoRefresh
        );
        ob_start();
        require RF_FOLDER_ROOT."/lib/templates/standalone_template.php";
        $contents = ob_get_contents();
        ob_end_clean();

        return $contents;
    }
} 
