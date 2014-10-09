<?php

/*
 * This example demonstrates how to create a ticket via the API
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

// The person creaeting the ticket
$person_name = 'John Doe';
$person_email = 'john.doe@example.com';

// organization details for the user (optional)
$person_organization = 'DeskPRO Ltd';
$person_organization_position = 'Support Agent';

// The message
$ticket_subject = 'How do I create a trigger?';
$ticket_message = 'I want to create a trigger to send an SMS for urgent tickets, how do I do that?';

// does the message contain HTML?
$isHtml = false;

//-----------------------------------------------------
// EXAMPLE CODE
//-----------------------------------------------------

$ticket = $api->tickets->createBuilder();

$person = $api->people->createPersonEditor();

$person->setName($person_name)
		->setEmail($person_email)
		->setOrganizationByName($person_organization)
		->setOrganizationPosition($person_organization_position);

$ticket->setCreatedBy($person)
		->setSubject($ticket_subject)
		->setMessage($ticket_message, $isHtml);

$result = $api->tickets->save($ticket);

if (!$result->isError()) {
	$data = $result->getData();
	print_r($data);
} else {
	echo $result->getErrorMessage();
}
