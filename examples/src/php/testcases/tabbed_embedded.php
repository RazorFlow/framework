<?php

require 'sample_dashboards.php';

class SampleDashboard extends TabbedDashboard {

  public function buildDashboard() {
    $a = new A();
    $b = new B();
    $c = new C();

    $this->addDashboardTab($a);
    $this->addDashboardTab($b);
    $this->addDashboardTab($c);
  }

}

global $razorflow_assets;
$db = new SampleDashboard();

?>
<!doctype html>
<html>
  <head>
        <?php 
        // Replace this block with your own CSS/JS Includes
        echo $razorflow_assets;
        ?>
    </head>
  <body>
  <h1>Here's an embedded tabbed dashboard</h1>
  <?php $db->renderEmbedded (); ?>
  </body>
<script>
  require(["wrapperhelpers/wrappermain"], function () {
    renderDashboard();
  })
</script>
</html>
