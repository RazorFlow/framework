<?php

/*
 * This example demonstrates how to update an existing ticket
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

// ID of the ticket to be updated
$ticket_id	= 5;

// ID of the agent to assign this ticket to
$agent_id	= 2;

//-----------------------------------------------------
// EXAMPLE CODE
//-----------------------------------------------------

// Initialize a ticket builder
$ticket = $api->tickets->createBuilder();

// Set the ticket ID
$ticket->setId($ticket_id);

// Set or change values
$ticket->setSubject('New Subject of the ticket');

// Change or set an Agent
$ticket->assignToAgent($agent_id);

// Save the ticket to persist the changes
$result = $api->tickets->save($ticket);			

if (!$result->isError()) {
	// Update persisted sucessfully
	$data = $result->getData();
	print_r($data);
} else {
	// Something is wrong . . .  Put on your DEBUG shoes
	echo $result->getErrorMessage();
}
