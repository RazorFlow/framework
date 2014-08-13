<?php

session_start();

// End Point for avangate transaction

require '../../../vendor/autoload.php';
require $_SERVER['DOCUMENT_ROOT'] . "/storage/backend.php";
require $_SERVER['DOCUMENT_ROOT'] . "/storage/mailer.php";

if(isset($_SESSION['checkout_id'])) {
  $checkout = new BackEnd();
  $checkout->setTable("checkouts"); 
  $checkout->setID($_SESSION['checkout_id']);
  $checkout->updateColumn('completed', 1);

  $mailer = new Mailer();

  $mailer->Subject = "RazorFlow Check Out Completed";
  $mailer->setTemplate("checkout_complete.php", array('email' => $_SESSION['checkout_email']));
  $mailer->deliver();

  unset($_SESSION['checkout_id']);
  unset($_SESSION['checkout_email']);

  header("location: /dashboard/buy/thanks.php");
}