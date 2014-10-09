<?php

/*
 * This example demonstrate how to get all SLAs in a ticket.
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

// ID of the ticket to fetch the SLAs for
$ticket_id	= 5;

//-----------------------------------------------------
// EXAMPLE CODE
//-----------------------------------------------------

// Get the logs
$result = $api->tickets->getTicketSlas($ticket_id);

if (!$result->isError()) {
	// SLAs retrieved sucessfully
	$data = $result->getData();
	print_r($data);
} else {
	// Something is wrong . . .  Put on your DEBUG shoes
	echo $result->getErrorMessage();
}
