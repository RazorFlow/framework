<?php

class Mailer extends PHPMailer {

  public $toAddress;
  protected $body;

  public function __construct() {
    parent::__construct();

    // Change email to sales@razorflow.com
    $this->toAddress = "sales@razorflow.com";
  }

  public function setTemplate($template, $data) {
    foreach ($data as $key => $value) {
      ${$key} = $value;
    }

    ob_start();
    require $_SERVER['DOCUMENT_ROOT'] . "/storage/email_templates/" . $template;
    $this->body = ob_get_contents();

    ob_end_clean();
  }

  public function deliver() {

    $this->IsSMTP(); 
    $this->SMTPAuth = true;
    $this->SMTPSecure = 'ssl';
    $this->Host = "smtp.gmail.com";
    $this->Port = 465;
    $this->IsHTML(true);
    $this->Username = "support@razorflow.com";
    $this->Password = "Slayer2925";
    $this->SetFrom("support@razorflow.com");
    $this->AddAddress($this->toAddress);
    $this->Body = $this->body;

    if(!$this->Send()) {
      return false;
    } 
    else {
      return true;
    }
    
  }

}