<?php
session_start();
require '../../vendor/autoload.php';
require $_SERVER['DOCUMENT_ROOT'] . "/storage/backend.php";
require $_SERVER['DOCUMENT_ROOT'] . "/storage/mailer.php";

$mailer = new Mailer();
$input = $_POST['input'];
$download = new Backend();
$download->setTable("downloads");

$download->setData($input);

if($download->create()) {
  
  // $mailer->Subject = "RazorFlow Download";
  // $mailer->setTemplate("download.php", $input);
  // $mailer->Body = "Download by: " . (isset($input['email']) ? $input['email'] : "");
  // $mailer->deliver();
  // Start Download
	if(isset($_SESSION["tech"])) {
		unset($_SESSION["tech"]);
	}
  $_SESSION["tech"] = $input["tech"];
  header("Location: /download/thanks.php");

}

else {
  // TODO: Handle Error here
}
