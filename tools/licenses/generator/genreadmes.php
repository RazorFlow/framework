<?php
ini_set("date.timezone", "Asia/Kolkata");
	global $licenses;
$licenses = array (
	'standard' => array(
		'license_name' => "Standard License",
		'purchase' => true,
		'wsource' => false,
		'license_id' => 'standard'
	),
	'pro' => array(
		'license_name' => "Pro License",
		'purchase' => true,
		'wsource' => false,
		'license_id' => 'pro'
	),
	'devdirect' => array(
		'license_name' => "DevDirect License",
		'purchase' => true,
		'wsource' => false,
		'license_id' => 'devdirect'
	),
	'trial' => array(
		'verb' => "DOWNLOADING",
		'license_name' => "Trial Version",
		'wsource' => false,
		'license_id' => 'trial',
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
		echo "Successfully wrote: $filePath\n";
	}
}
global $version;
$version = $argv[1];

write_items('js', "JavaScript");
write_items('php', "PHP");
write_items('suite', "Suite");

