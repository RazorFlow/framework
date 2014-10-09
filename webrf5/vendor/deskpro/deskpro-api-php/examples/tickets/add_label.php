<?php

/**
 * This example demonstrate how to add a label to a ticket.
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

// Label to add
$label = "Urgent";
$label2 = "Dataabse-issue";

//-----------------------------------------------------
// EXAMPLE CODE
//-----------------------------------------------------

// Add ticket label (note that to add multiple labels, make multiple calls as per below)
// "," are not valid in labels and will be stripped

$result = $api->tickets->addTicketLabel($ticket_id, $label);
$result = $api->tickets->addTicketLabel($ticket_id, $label2);

if (!$result->isError()) {
	// Request completed successfully
	$data = $result->getData();
	print_r($data);
} else {
	// Something is wrong . . .  Put on your DEBUG shoes
	echo $result->getErrorMessage();
}
