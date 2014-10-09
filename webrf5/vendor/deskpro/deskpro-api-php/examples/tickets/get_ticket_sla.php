<?php

/*
 * This example Checks whether a ticket SLA is associated with a ticket.
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

// ID of the SLA
$sla_id		= 8;

//-----------------------------------------------------
// EXAMPLE CODE
//-----------------------------------------------------

// Add the SLA
$result = $api->tickets->getTicketSla($ticket_id, $sla_id);

if (!$result->isError()) {
	// SLA added sucessfully
	$data = $result->getData();
	print_r($data);
} else {
	// Something is wrong . . .  Put on your DEBUG shoes
	echo $result->getErrorMessage();
}
