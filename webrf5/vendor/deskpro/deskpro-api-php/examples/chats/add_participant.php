<?php

/*
 * This example demonstrate how to add a new participant to a chat.
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

// ID of the chat where the new participant will be added
$chat_id 	= 4;

// The person to add
$person_id	= 8;

//-----------------------------------------------------
// EXAMPLE CODE
//-----------------------------------------------------

// Add the Participant
$result = $api->chats->addParticipant($chat_id, $person_id);

if (!$result->isError()) {
	// Request completed successfully 
	$data = $result->getData();
	print_r($data);
} else {
	// Something is wrong . . .  Put on your DEBUG shoes
	echo $result->getErrorMessage();
}
