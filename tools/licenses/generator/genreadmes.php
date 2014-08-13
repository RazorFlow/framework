<?php

	global $licenses;
$licenses = array (
	'corporate' => array(
		'license_name' => "Corporate License",
		'purchase' => true,
		'wsource' => false,
		'license_id' => 'corporate'
	),
	'corporate_devdirect' => array (
		'license_name' => "Corporate DevDirect License",
		'wsource' => true,
		'purchase' => true,
		'license_id' => 'corporate_devdirect'
	),
	'saas' => array (
		'license_name' => "SaaS License",
		'purchase' => true,
		'wsource' => false,
		'license_id' => 'saas'
	),
	'saas_devdirect' => array (
		'license_name' => "SaaS DevDirect License",
		'purchase' => true,
		'wsource' => true,
		'license_id' => 'saas_devdirect'
	),
	'oem' => array (
		'license_name' => "OEM License",
		'purchase' => true,
		'wsource' => false,
		'license_id' => 'oem'
	),
	'oem_devdirect' => array (
		'license_name' => "OEM DevDirect License",
		'purchase' => true,
		'wsource' => true,
		'license_id' => 'oem_devdirect'
	),
	'developer' => array(
		'verb' => "DOWNLOADING",
		'license_name' => "Developer License",
		'wsource' => false,
		'license_id' => 'developer',
		'purchase' => false
	)
);

function write_items ($lang, $langName) {
	global $licenses;
	foreach($licenses as $key => $item) {
		$filePath = "../razorflow_license_".$key."/".$lang.".html";
		if(file_exists($filePath)) {
			unlink($filePath);
		}

		global $data, $version;
		$data = $item;
		$data['lang'] = $lang;
		$data['version'] = $version;
		$data['langName'] = $langName;
		ob_start();
		require "template.php";
		$contents = ob_get_contents();
		ob_end_clean();
		file_put_contents($filePath, $contents);
	}
}
global $version;
$version = $argv[1];

write_items('js', "JavaScript");
write_items('php', "PHP");
write_items('suite', "Suite");

