<?php

/*
 * This example demonstrate how to merge two feedback records.
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

//$target is the ID of the feedback that the other will be merged into
$target_id	= 8;

//$from This feedback will be marged into $target_id and then removed on a successful merge
$from_id	= 9;

//-----------------------------------------------------
// EXAMPLE CODE
//-----------------------------------------------------

// Merge the feedbacks now
$result = $api->feedbacks->merge($target_id, $from_id);

if (!$result->isError()) {
	// Feedback merged sucessfully
	$data = $result->getData();
	print_r($data);
} else {
	// Something is wrong . . .  Put on your DEBUG shoes
	echo $result->getErrorMessage();
}
