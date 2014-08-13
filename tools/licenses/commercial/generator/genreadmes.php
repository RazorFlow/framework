<?php

$licenses = array (
	'corporate' => array(
		'license_name' => "Corporate License",
		'wsource' => false,
		'license_id' => 'corporate'
	),
	'corporate_devdirect' => array (
		'license_name' => "Corporate DevDirect License",
		'wsource' => true,
		'license_id' => 'corporate_devdirect'
	),
	'saas' => array (
		'license_name' => "SaaS License",
		'wsource' => false,
		'license_id' => 'saas'
	),
	'saas_devdirect' => array (
		'license_name' => "SaaS DevDirect License",
		'wsource' => true,
		'license_id' => 'saas_devdirect'
	),
	'oem' => array (
		'license_name' => "OEM License",
		'wsource' => false,
		'license_id' => 'oem'
	),
	'oem_devdirect' => array (
		'license_name' => "OEM DevDirect License",
		'wsource' => true,
		'license_id' => 'oem_devdirect'
	),
);

foreach($licenses as $key => $item) {
	$filePath = "../razorflow_license_".$key."/readme.html";
	if(file_exists($filePath)) {
		unlink($filePath);
	}

	global $data;
	$data = $item;
	ob_start();
	require "template.php";
	$contents = ob_get_contents();
	ob_end_clean();
	file_put_contents($filePath, $contents);
}

chdir("../");
system ("find . -name \".DS_Store\" -depth -exec rm {} \;");
foreach ($licenses as $key => $item) {
	system("zip -r razorflow_license_$key.zip razorflow_license_$key");
}