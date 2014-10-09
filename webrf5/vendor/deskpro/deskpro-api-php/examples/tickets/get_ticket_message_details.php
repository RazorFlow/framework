<?php

/*
 * This example demonstrate how to get a ticket message's details via API.
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

// ID of the ticket to get the message from
$ticket_id	= 5;

// ID of the ticket message to get details for
$message_id	= 8;

//-----------------------------------------------------
// EXAMPLE CODE
//-----------------------------------------------------

// Get the message
$result = $api->tickets->getMessageDetails($ticket_id, $message_id);

if (!$result->isError()) {
	// Message's details retrieved sucessfully
	$data = $result->getData();
	print_r($data);
} else {
	// Something is wrong . . .  Put on your DEBUG shoes
	echo $result->getErrorMessage();
}
