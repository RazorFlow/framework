<?php

/*
 * This example Uploads a file 
 * and returns information about the `blob` that was created.
 * This blob can then be used in other places that accept `attach_id` values.
 */

//-----------------------------------------------------
// DESKPRO API SETTINGS
//-----------------------------------------------------

require __DIR__.'/../../deskpro-api.php';

$deskpro_url   = 'http://example.com/deskpro';   // The URL to your helpdesk
$api_key       = '123:XYZ';                      // Your API key (Admin > Apps > API Keys)

// First, create the API object
$api = new \DeskPRO\Api($deskpro_url, $api_key);

//-----------------------------------------------------
// EXAMPLE VARIABLES
//-----------------------------------------------------

// Local path of the file to be uploaded
$path		= 'path/to/file.ext';

//-----------------------------------------------------
// EXAMPLE CODE
//-----------------------------------------------------

// Upload the file
$result = $api->misc->uploadFile($path);

if (!$result->isError()) {
	// File uploaded successfully
	$data = $result->getData();
	print_r($data);
} else {
	// Something is wrong . . .  Put on your DEBUG shoes
	echo $result->getErrorMessage();
}
