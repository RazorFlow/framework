<?php

session_start();

require '../../../vendor/autoload.php';
require $_SERVER['DOCUMENT_ROOT'] . "/storage/backend.php";
require $_SERVER['DOCUMENT_ROOT'] . "/storage/mailer.php";

if($_SERVER['REQUEST_METHOD'] === "POST" && isset($_POST['submit'])) {

  $mailer = new Mailer();
  $input = $_POST['input'];
  $checkout = new BackEnd();
  $checkout->setTable("checkouts");
  $checkout->setData($input);

  if($checkout->create()) {

    $_SESSION['checkout_email'] = $input['email'];
    $_SESSION['checkout_id'] = $checkout->getID();

    $mailer->Subject = "RazorFlow Check Out Started";
    $mailer->setTemplate('checkout_start.php', $input);
    $mailer->deliver();

    //TODO: Redirect to Avangate
    header("location: https://secure.avangate.com/order/pf.php?MERCHANT=RAZORFLO&BILL_FNAME=".$input['firstname']."&BILL_LNAME=".$input['lastname']."&BILL_EMAIL=".$input['email']."&BILL_CITY=".$input['city']."&BILL_COUNTRYCODE=".$input['country']."&URL=https%3A%2F%2Fsecure.avangate.com%2Forder%2Fcheckout.php%3FPRODS%3D".$input['planCode']."%26QTY%3D1%26CART%3D1%26CARD%3D2%26ORDERSTYLE%3DnLWo4pW5mHE%3D%26BACK_REF%3Dhttps%3A%2F%2Fwww.razorflow.com%2Fdashboard%2Fbuy%2Fcomplete.php");

    // Use below as Avangate End pint

    // header("location: /dashboard/buy/complete.php");
  }
  else {
    //TODO: Handle Error
  }

}