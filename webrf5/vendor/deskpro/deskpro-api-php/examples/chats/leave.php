<?php

/**
 * This example demonstrates how to leave a chat and
 * optionally perform a callback action
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
$chat_id	= 5;

// [OPTIONAL] a callback action to perform on success
// Can be one of 'empty', 'unassign', or 'end'
$action 	= 'end';

//-----------------------------------------------------
// EXAMPLE CODE
//-----------------------------------------------------

// Leave the chat and perform "$action"
$result = $api->chats->leave($chat_id, $action);

if (!$result->isError()) {
	// Update persisted sucessfully
	$data = $result->getData();
	print_r($data);
} else {
	// Something is wrong . . .  Put on your DEBUG shoes
	echo $result->getErrorMessage();
}
