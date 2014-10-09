<?php

/*
 * This example demonstrate how to merge two tickets
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

// ID of the ticket that needs to be merged
// This ticket will be removed after a succesfull merge
$from_ticket_id		= 4;

// ID of the ticket that the $from_ticket_id will be merged into
$target_ticket_id	= 5;

//-----------------------------------------------------
// EXAMPLE CODE
//-----------------------------------------------------

// Merge the tickets
$result = $api->tickets->merge($target_ticket_id, $from_ticket_id);

if (!$result->isError()) {
	// Update persisted sucessfully
	$data = $result->getData();
	print_r($data);
} else {
	// Something is wrong . . .  Put on your DEBUG shoes
	echo $result->getErrorMessage();
}
