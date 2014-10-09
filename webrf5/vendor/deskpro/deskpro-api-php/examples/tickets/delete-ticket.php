<?php

/*
 * Deletes a ticket and optionally bans the email used to create it
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

// ID of the ticket to be deleted
$ticket_id	= 5;

// [Optional] Whether to ban the email used to create this ticket
$ban_email	= TRUE;

//-----------------------------------------------------
// EXAMPLE CODE
//-----------------------------------------------------

// Delete the ticket
$result = $api->tickets->delete($ticket_id, $ban_email);

if (!$result->isError()) {
	// Update persisted sucessfully
	$data = $result->getData();
	print_r($data);
} else {
	// Something is wrong . . .  Put on your DEBUG shoes
	echo $result->getErrorMessage();
}
