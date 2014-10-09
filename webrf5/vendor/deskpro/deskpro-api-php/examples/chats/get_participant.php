<?php

/*
 * This example demonstrate how to check 
 * whether a person is a participant (CC user) in a chat.
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
$chat_id 	= 4;

// ID of the person to check
$person_id	= 8;

//-----------------------------------------------------
// EXAMPLE CODE
//-----------------------------------------------------

// Get the Participant
$result = $api->chats->getParticipant($chat_id, $person_id);

if (!$result->isError()) {
	// Request completed successfully 
	$data = $result->getData();
	print_r($data);
} else {
	// Something is wrong . . .  Put on your DEBUG shoes
	echo $result->getErrorMessage();
}
