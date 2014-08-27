<?php
global $rfTemplateData;
$staticRoot = $rfTemplateData['staticRoot'];
$dashboardData = $rfTemplateData['dbAsJson'];
$debugMode = $rfTemplateData['rfDebug'];
$refreshDelay = $rfTemplateData['rfRefreshDelay'];
$autoRefresh = $rfTemplateData['rfAutoRefresh'];

?>
<!doctype html>
<html>
<head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <script type="text/javascript">
    var renderDashboard = function (_data) {
        var dbAsJson = typeof _data === 'undefined' ? <?php echo $dashboardData ?> : _data;
        rf.globals.builder = new rf.StandaloneBuilder();
        rf.globals.builder.buildDashboardFromObject (dbAsJson);
    };

    <?php if($autoRefresh){ ?>
    var refreshDashboard = function() {
        setTimeout(function() {
            rf.globals.builder.db.pro.lock();
            rf.globals.builder.ajaxRequest.ajax({
                url: rf.globals.builder.refreshURL,
                success: function(data) {
                    rf.globals.builder.db.pro.dispose();
                    renderDashboard(data);
                }
            });
        }, <?php echo $refreshDelay ?>);
    }
    <?php } ?>

    </script>


    <?php if (function_exists('_rf_alternate_head')) { ?>
    <?php _rf_alternate_head (); ?>
    <?php } else { ?>

    <link rel="stylesheet" href="<?php echo $staticRoot; ?>/css/razorflow.min.css"/>
    <script type="text/javascript" src="<?php echo $staticRoot; ?>/js/jquery.min.js"></script>
    <script type="text/javascript" src="<?php echo $staticRoot; ?>/js/razorflow.wrapper.min.js"></script>
    <?php if($debugMode) { ?> 
    <script type="text/javascript" src="<?php echo $staticRoot; ?>/js/razorflow.devtools.min.js"></script>
    <?php } ?>

    <?php } ?>
</head>
<body>
<div id="dbTarget">
</div>
</body>
<?php if(function_exists('_rf_alternate_body')) { _rf_alternate_body(); } else { ?>
  <script type="text/javascript">
    renderDashboard();
  </script>
<?php } ?>
</html>
