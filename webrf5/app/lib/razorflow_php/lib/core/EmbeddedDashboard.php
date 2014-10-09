<?php
abstract class EmbeddedDashboard extends Dashboard {

    public function __construct($id=null){
      parent::__construct($id);
    }

    public function renderEmbedded() {
        if(!$this->shouldRenderDashboard()) {
            return;
        }
        echo $this->getEmbedHTML();
    }

    protected abstract function buildDashboard();

    public function getEmbedHTML () {
        $this->initialize();

        global $rfTemplateData;
        global $_rfConfig;
        $this->buildDashboard();
        $dbObject = $this->getAsObject();
        $dbAsJson = json_encode($dbObject);
        $rfTemplateData = array(
            'staticRoot' => $this->getStaticRoot(),
            'dbAsJson' => $dbAsJson,
            'rfDev' => false
        );
        ob_start();
        require RF_FOLDER_ROOT."/lib/templates/embedded_template.php";
        $contents = ob_get_contents();
        ob_end_clean();

        return $contents;
    }
} 
