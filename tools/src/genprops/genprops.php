<?php

global $data;
$data = json_decode (file_get_contents('../../config/props.json'), true);

function require_and_write ($renderer, $outFile) {
	ob_start();
	require $renderer;
	$contents = ob_get_contents();
	ob_end_clean();
	
	file_put_contents($outFile, $contents);
}

# Write the actual file
require_and_write("api/jsrenderer.php", "../../../src/js/prop/properties.js");
