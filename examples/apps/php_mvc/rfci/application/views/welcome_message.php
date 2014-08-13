<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Welcome to CodeIgniter</title>
	<link rel="stylesheet" href="<?php echo base_url(); ?>application/css/razorflow.min.css" />
	<script src="<?php echo base_url(); ?>application/js/razorflow.wrapper.min.js"></script>
</head>
<body>

	<div>
		<h1>Codeigniter RazorFlow Embedded Dashboard</h1>
		<?php echo $db->renderEmbedded(); ?>
	</div>
</body>
</html>