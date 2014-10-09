<?php

/**
 * This example demonstrates how to update an existing chat
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

// ID of the chat to be updated
$chat_id		= 5;

// New department ID where the chat should be moved to
$new_department_id	= 13;

//-----------------------------------------------------
// EXAMPLE CODE
//-----------------------------------------------------

// Move the chat to the new department
$result = $api->chats->update($chatId, $newDepartmentId);			

if (!$result->isError()) {
	// Update persisted sucessfully
	$data = $result->getData();
	print_r($data);
} else {
	// Something is wrong . . .  Put on your DEBUG shoes
	echo $result->getErrorMessage();
}
