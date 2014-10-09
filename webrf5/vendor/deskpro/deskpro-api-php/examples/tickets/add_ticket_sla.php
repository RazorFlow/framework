<?php

/*
 * This example demonstrate how to add an SLA to a ticket.
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

// ID of the ticket to add SLA to
$ticket_id	= 5;

// ID of the SLA to add to the ticket
$sla_id		= 8;

//-----------------------------------------------------
// EXAMPLE CODE
//-----------------------------------------------------

// Add the SLA
$result = $api->tickets->addTicketSla($ticket_id, $sla_id);

if (!$result->isError()) {
	// SLA added sucessfully
	$data = $result->getData();
	print_r($data);
} else {
	// Something is wrong . . .  Put on your DEBUG shoes
	echo $result->getErrorMessage();
}
