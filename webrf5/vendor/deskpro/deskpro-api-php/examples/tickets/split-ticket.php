<?php

/**
 * Splits 1 or more messages out of a ticket into a new ticket
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

// Ticket to split from
$ticket_id	= 1;

// Message IDs to split out
$message_ids	= array(3, 4, 6, 9);

// Subject of new ticket
$subject	= 'New Ticket created after split';


//-----------------------------------------------------
// EXAMPLE CODE
//-----------------------------------------------------

// Split the ticket
// On succesful split, you should have another ticket with the splitted messages
// and the new subject
$result = $api->tickets->splitMessages($ticket_id, $message_ids, $subject);

if (!$result->isError()) {
	// Update persisted sucessfully
	$data = $result->getData();
	print_r($data);
} else {
	// Something is wrong . . .  Put on your DEBUG shoes
	echo $result->getErrorMessage();
}
