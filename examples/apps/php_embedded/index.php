<?php
require "salesdashboard.php";
?>
<html>
	<head>
		<link rel="stylesheet" href="razorflow_php/static/rf/css/razorflow.min.css"/>
		<script src="razorflow_php/static/rf/js/jquery.min.js" type="text/javascript"></script>
		<script src="razorflow_php/static/rf/js/razorflow.wrapper.min.js" type="text/javascript"></script>
	</head>
	<body>
		<h1>Embedded Dashboard!!</h1>
		<?php
		$db = new SalesDashboard ();
		$db->setActionPath("action.php");
		$db->setWidth("400px");
		$db->renderEmbedded();
		?>
	</body>
</html>