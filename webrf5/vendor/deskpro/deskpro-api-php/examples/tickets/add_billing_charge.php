<?php

/**
 * This example demonstrate how to add a billing charge to a ticket.
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

// Time in seconds to bill. Required if there is no amount.
$time       = 3600;

// Amount (in admin-specified currency) to bill. Required if there is no time.
$amount     = 60;

// Comment or reason for the charge.
$comment    = 'Billed for XXXXX';

//-----------------------------------------------------
// EXAMPLE CODE
//-----------------------------------------------------

// Add billing charge
$result = $api->tickets->addBillingCharge($ticket_id, $time, $amount, $comment);

if (!$result->isError()) {
	// Request completed successfully
	$data = $result->getData();
	print_r($data);
} else {
	// Something is wrong . . .  Put on your DEBUG shoes
	echo $result->getErrorMessage();
}
