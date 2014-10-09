<?php

/*
 * This example demonstrate how to removes a label from a chat.
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

// ID of the chat
$chat_id	= 4;

// Label to remove
$label		= 'resolved';

//-----------------------------------------------------
// EXAMPLE CODE
//-----------------------------------------------------

// Remove the Label
$result = $api->chats->removeLabel($chat_id, $label);

if (!$result->isError()) {
	// Request completed successfully 
	$data = $result->getData();
	print_r($data);
} else {
	// Something is wrong . . .  Put on your DEBUG shoes
	echo $result->getErrorMessage();
}
