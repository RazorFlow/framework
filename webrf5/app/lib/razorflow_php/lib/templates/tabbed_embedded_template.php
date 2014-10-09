<?php
global $rfTemplateData;
$staticRoot = $rfTemplateData['staticRoot'];
$dashboardData = $rfTemplateData['dbAsJson'];
$div_id = rand (10000, 100000);
?>
<div id="dashboard_<?php echo $div_id; ?>"></div>
<script type="text/javascript">
    var renderDashboard = function () {
        var builder = new rf.StandaloneBuilder();
        var dbAsJson = <?php echo $dashboardData; ?>;
        builder.buildTabbedAsEmbedded (dbAsJson, "dashboard_<?php echo $div_id; ?>");
    };
</script>
