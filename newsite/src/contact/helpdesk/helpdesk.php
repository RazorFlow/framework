<?php

require "../../../vendor/autoload.php";
require $_SERVER['DOCUMENT_ROOT'] . "/storage/backend.php";
require $_SERVER['DOCUMENT_ROOT'] . "/storage/mailer.php";

class HelpDesk {

  protected $data;
  protected $builder;
  protected $api;
  protected $devMode;
  protected $status;

  const DESKPRO_URL = 'http://tools.razorflow.com/helpdesk';
  const DESKPRO_API_KEY = '3:QSB3DXWKCH4WTWSGJ9MH5KGJ5';
  const SANDBOX_DEPT = 5;
  const SUPPORT_DEPT = 1;
  const SALES_DEPT = 2;
  const SUCCESS_STATUS = 1;
  const ERROR_STATUS = 2;
  const SERVER_DOWN_STATUS = 3;
  const EMAIL_ADDRESS = "anirudh@razorflow.com";

  public function __construct($data) {
    $this->devMode = false;
    $this->data = $data;
    $this->api = new DeskPRO\Api(self::DESKPRO_URL, self::DESKPRO_API_KEY);
    $this->builder = $this->api->tickets->createBuilder();
  }

  public function create() {
    foreach ($this->data['input'] as $key => $value) {
      $this->builder->addCustomField($key, $value);
    }

    if($this->devMode) {
      $this->builder->setDepartment(self::SANDBOX_DEPT);
    }
    else{
      if($this->data['department'] === 'support') {
        $this->builder->setDepartment(self::SUPPORT_DEPT);
      }
      if($this->data['department'] === 'sales') {
        $this->builder->setDepartment(self::SALES_DEPT);
      }
    }

    if($this->isXHR()) {
      if(isset($_FILES['attachment'])) {
        foreach ($_FILES['attachment']['tmp_name'] as $key => $value) {
          if($value) {
            $this->builder->attachMultiple($value);
          }
        }
      }
    }
    else {
      foreach ($_FILES as $key => $value) {
        $match = preg_match('/^attach[\w]+$/', $key);
        if($match) {
          if($value['tmp_name']) {
            $this->builder->attachMultiple($value['tmp_name']);
          }
        }
      }
    }

    $result = $this->api->tickets->save($this->builder);
    $response = $result->getData();

    if(isset($response['ticket_id'])) {
      // if($this->isXHR()) {
      //   echo json_encode($result->getData());
      //   exit();
      // }

      $this->status = self::SUCCESS_STATUS;
      return;
    }
    else {
      if(isset($response['errors'])) {
        //TODO: Handle validation errors issued by DeskPRO

        $this->status = self::ERROR_STATUS;
        return;
      }
      else {
        $backend = new BackEnd();
        $backend->setTable("tickets");
        $data = $this->data['input'];
        $data['department'] = $this->data['department'];
        $backend->setData($data);
        $backend->create();

        $this->mail($data);

        // $this->status = self::SERVER_DOWN_STATUS;
        $this->status = self::SUCCESS_STATUS;
        return;
      }
    }

    return;
  }

  public function isSuccess() {
    return $this->status === self::SUCCESS_STATUS;
  }

  public function isError() {
    return $this->status === self::ERROR_STATUS;
  }

  public function isServerDown() {
    return $this->status === self::SERVER_DOWN_STATUS;
  }

  public function enableDev() {
    $this->devMode = true;
  }

  public function isSalesDept() {
    return $this->data['department'] === 'sales';
  }

  public function isSupportDept() {
    return $this->data['department'] === 'support';
  }

  private function mail($data) {
    $mailer = new Mailer();
    $mailer->toAddress = self::EMAIL_ADDRESS;
    $mailer->Subject = "Helpdesk is down";
    $mailer->setTemplate("helpdesk_down.php", $data);
    $mailer->deliver();
  }

  public function isXHR() {
   if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') {
      return true;
    }

    return false;
  } 


}
