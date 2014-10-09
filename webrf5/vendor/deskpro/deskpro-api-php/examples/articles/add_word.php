<?php

/**
 * This example adds a glossary word.
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

// Glossary word to add
$word 			= 'subscription';

// Glossary word definitation
$word_definitation 	= 'A valid subscription means ...';

//-----------------------------------------------------
// EXAMPLE CODE
//-----------------------------------------------------

// Add Word
$result = $api->articles->addWord(array($word), $word_definitation)

if (!$result->isError()) {
	// Request completed successfully
	$data = $result->getData();
	print_r($data);
} else {
	// Something is wrong . . .  Put on your DEBUG shoes
	echo $result->getErrorMessage();
}
