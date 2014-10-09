<?php

/**
 * This example demonstrates how to find chats in the database.
 *
 * In this example, we are using the Department field and the Agent field
 * to find all chats that are 
 *
 * initiated by a particular $person AND
 * assigned to a particular $agent AND
 * in a particular $department AND
 * marked with a custom $label.
 *
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

// Chats shoudl be in this department
$department_id 	= 5;

// Assigned to this agent
$agent_id 	= 9;

// It should also contain this label
$label		= 'Resolved';

// And should be initiated by this person
$person_id	= 21;

//-----------------------------------------------------
// EXAMPLE CODE
//-----------------------------------------------------

// Then we need to build our list of criteria
$criteria = $api->chats->createCriteria();

// Now set various criteria filters
$criteria->addAgent($agent_id)
            ->addDepartment($department_id)
            ->addLabel($label)
            ->createdBy($person_id);

// Then we can get our results
$result = $api->chats->find($criteria);

if (!$result->isError()) {
	// Request completed successfully
	$data = $result->getData();
	print_r($data);
} else {
	// Something is wrong . . .  Put on your DEBUG shoes
	echo $result->getErrorMessage();
}