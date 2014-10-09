<?php

/**
 * This example demonstrate how to add a ticket participant.
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

// ID of the person to add to the ticket
$person_i	= 9;

// Email address of the person to add to the ticket. If no person can be found with this email, one will be created.
$email		= 'newemail@domain.com';

//-----------------------------------------------------
// EXAMPLE CODE
//-----------------------------------------------------

// Add ticket participant
$result = $api->tickets->addParticipant($ticket_id, $person_id = null, $email);

if (!$result->isError()) {
	// Request completed successfully
	$data = $result->getData();
	print_r($data);
} else {
	// Something is wrong . . .  Put on your DEBUG shoes
	echo $result->getErrorMessage();
}
