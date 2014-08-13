<?php

require "../../../vendor/autoload.php";

class Deskpro {

  protected $departmentID;
  protected $supportDept;
  protected $salesDept;
  protected $data;
  public $devMode;

  const SUPPORT_DEPARTMENT = 1;
  const SALES_DEPARTMENT = 2;
  const SANDBOX_DEPARTMENT = 5;
  const API_KEY = "3:QSB3DXWKCH4WTWSGJ9MH5KGJ5";
  const TICKET_URL = "http://tools.razorflow.com/helpdesk/api/tickets";

  public function __construct($data) {
    $this->departmentID = NULL;
    $this->salesDept = false;
    $this->supportDept = false;
    $this->data = $data;
    $this->devMode = false;
    $this->setDepartment($data['department']);
  }

  public function setDepartment($department) {
    if($department === "support") {
      $this->departmentID = self::SUPPORT_DEPARTMENT;
      $this->supportDept = true;
    }
    elseif($department === "sales") {
      $this->departmentID = self::SALES_DEPARTMENT;
      $this->salesDept = true;
    }
    else {
      return;
    }
  }

  public function isSalesDept() {
    return $this->salesDept;
  }

  public function isSupportDept() {
    return $this->supportDept;
  }

  public function createTicket() {
    $client = $this->initApi();
    $postData = $this->getPostData();
    $response = $client->post(self::TICKET_URL, array(
      "body" => $postData
    ));
    $responseJSON = $response->json();
    if($responseJSON['ticket_id']) {
      return true;
    }

    return false;
  }

  public function enableDev() {
    $this->devMode = true;
  }

  private function initApi() {
    $headers = array(
      "X-DeskPRO-API-Key" => self::API_KEY
    );
    $client = new GuzzleHttp\Client();
    $client->setDefaultOption('headers', $headers);

    return $client;
  }

  private function getPostData() {
    $data = $this->data;
    if($this->devMode) {
      $data['input']['department_id'] = self::SANDBOX_DEPARTMENT;
    }
    else {
      $data['input']['department_id'] = $this->departmentID;
    }
    
    return $data['input'];
  }

}