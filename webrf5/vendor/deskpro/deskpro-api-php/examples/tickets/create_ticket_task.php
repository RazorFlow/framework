<?php

/*
 * This example demonstrate how to create a new task in a ticket.
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

//ID of the ticket where the new task needs to be created
$ticket_id	= 1;

// Task title.
$task		= 'New task to be added';

//-----------------------------------------------------
// EXAMPLE CODE
//-----------------------------------------------------

// Create the task
$result = $api->tickets->addTask($ticket_id, $task);

if (!$result->isError()) {
	// Task created successfully 
	$data = $result->getData();
	print_r($data);
} else {
	// Something is wrong . . .  Put on your DEBUG shoes
	echo $result->getErrorMessage();
}
