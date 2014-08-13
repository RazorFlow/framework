<?php

session_start();

// require 'deskpro.php';
require 'helpdesk.php';

$method = $_SERVER['REQUEST_METHOD'];
const SUCCESS_MESSAGE = "Ticket created successfully";

if($method === 'POST') {
  $data = $_POST;
  $supportURL = "/support";
  $salesURL = "/support/sales.php";

  $dp = new HelpDesk($data);
  // On Development Mode
  // Comment this when using on production
  // $dp->enableDev();
  
  $dp->create();

  if($dp->isSuccess()) {

    if($dp->isXHR()) {
      echo json_encode(array("success" => true));
      return;
    }
    else {
      $_SESSION['message'] = SUCCESS_MESSAGE;
      if($dp->isSalesDept()) {
        header('Location: ' . $salesURL);
      }

      if($dp->isSupportDept()) {
        header('Location: ' . $supportURL);
      }
    }
  }
  else {
    if($dp->isServerDown()) {
      if($dp->isXHR()) {
        echo json_encode(array("success" => false));

        return;
      }
    }
    // TODO: Store this data in some file on the server.
    echo "<h1>There was an error</h1>";
    return;
  }
}
else {
  header("Location: /");
}
