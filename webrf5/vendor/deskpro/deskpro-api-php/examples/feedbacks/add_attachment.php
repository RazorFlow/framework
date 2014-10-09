<?php

/*
 * This example demonstrate how to add an attachment on a feedback.
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

// ID of the feedback where the new attachment will be added
$feedback_id		= 4;

// Path to the attachment to add
$attachment_path	= '/path/to/file.ext';

//-----------------------------------------------------
// EXAMPLE CODE
//-----------------------------------------------------

// Add the attachment
$result = $api->feedbacks->addAttachment($feedback_id, $attachment_path);

if (!$result->isError()) {
	// Attachment added successfully 
	$data = $result->getData();
	print_r($data);
} else {
	// Something is wrong . . .  Put on your DEBUG shoes
	echo $result->getErrorMessage();
}
