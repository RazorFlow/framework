<?php

/*
 * This example demonstrates how to get a ticket from a ticket ID
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

// The ticket id
$ticketId = 5;

//-----------------------------------------------------
// EXAMPLE CODE
//-----------------------------------------------------

$result = $api->tickets->findById($ticketId);

if (!$result->isError()) {
	$data = $result->getData();
	print_r($data);
} else {
	echo $result->getErrorMessage();
}
