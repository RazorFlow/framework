<?php

/**
 * This example demonstrates how to update an existing feedback
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

// ID of the feedback to be updated
$feedback_id	= 5;

// Set the values you want to change
$new_title	= 'Feedback updated via API';

//-----------------------------------------------------
// EXAMPLE CODE
//-----------------------------------------------------

// Initialize an feedback editor
$feedback = $api->feedbacks->createFeedbackEditor();

// Set the feedback ID
$builder->setId($feedback_id);

// Set the new title
$builder->setTitle($new_title);

// Save the feedback to persist the changes
$result = $api->feedbacks->save($feedback);			

if (!$result->isError()) {
	// Update persisted sucessfully
	$data = $result->getData();
	print_r($data);
} else {
	// Something is wrong . . .  Put on your DEBUG shoes
	echo $result->getErrorMessage();
}
