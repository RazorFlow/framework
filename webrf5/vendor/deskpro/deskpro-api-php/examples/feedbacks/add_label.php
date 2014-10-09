<?php

/*
 * This example demonstrate how to add a label on a feedback.
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

// ID of the feedback where the new label will be added
$feedback_id	= 4;

// Label to add
$label 		= 'New';

//-----------------------------------------------------
// EXAMPLE CODE
//-----------------------------------------------------

// Add the label
$result = $api->feedbacks->addLabel($feedback_id, $label);

if (!$result->isError()) {
	// label added successfully
	$data = $result->getData();
	print_r($data);
} else {
	// Something is wrong . . .  Put on your DEBUG shoes
	echo $result->getErrorMessage();
}
