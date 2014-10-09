<?php

/*
 * This example demonstrates how to 
 * exchange an agent's email and password for a token 
 * which can be used to access the API.
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

// Email of the agent
$email		= 'agent@domain.com';

// Password of the agent
$password	= 'agentpassword';

//-----------------------------------------------------
// EXAMPLE CODE
//-----------------------------------------------------

// Send request
$result = $api->misc->exchangeForToken($email, $password);

if (!$result->isError()) {
	// Token retrieved succesfully
	$data = $result->getData();
	print_r($data);
} else {
	// Something is wrong . . .  Put on your DEBUG shoes
	echo $result->getErrorMessage();
}
