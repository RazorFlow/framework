<?php

/**
 * This example demonstrate how to check whether a person is a participant (CC user) in a ticket.
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

// ID of the ticket
$ticket_id	= 5;

// ID of the person
$person_id	= 9;

//-----------------------------------------------------
// EXAMPLE CODE
//-----------------------------------------------------

// Get ticket participants
$result = $api->tickets->getParticipant($ticket_id, $person_id);

if (!$result->isError()) {
	// Request completed successfully
	$data = $result->getData();
	print_r($data);
} else {
	// Something is wrong . . .  Put on your DEBUG shoes
	echo $result->getErrorMessage();
}
