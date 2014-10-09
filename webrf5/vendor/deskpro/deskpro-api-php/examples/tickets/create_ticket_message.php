<?php

/*
 * This example demonstrate how to create a new ticket message in a ticket.
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

//ID of the ticket where the reply needs to be added
$ticket_id			= 1;

// Message reply text.
$message			= 'Thank you for contacting us. We are currently inspecting your issue and will soon get back to you';

// [OPTIONAL] Array of DpApiFileUpload|string|null to upload with the reply
$file				= array('path/to/file.ext', 'path/to/another/file.ext');

// [OPTIONAL] Array of already uploaded blob IDs
$blob_ids			= array('2, 4, 6');

// [OPTIONAL] Whether to save the reply as a note, rather than a public reply. Defaults to false.
$is_note			= FALSE;

// If true, the message is considered to be written by the API agent rather than the ticket owner. Defaults to false.
$as_agen			= FALSE;

// If true, the message parameter is treated as HTML.
$is_html			= FALSE;

// If true, suppresses user notification of the reply. Defaults to false.
$mute_notification		= FALSE;

//-----------------------------------------------------
// EXAMPLE CODE
//-----------------------------------------------------

// Create the message
$result = $api->tickets->createMessage($ticket_id, $message, $files, $blob_ids, $is_note, $as_agent, $is_html, $mute_notification);

if (!$result->isError()) {
	// Message created successfully 
	$data = $result->getData();
	print_r($data);
} else {
	// Something is wrong . . .  Put on your DEBUG shoes
	echo $result->getErrorMessage();
}
