<?php

class BackEnd {

  protected $table;
  protected $data;
  protected $columns;
  protected $columns_prepared;
  protected $id;
  private $pdo;

  public function __construct() {
    $this->data = array();
    $this->pdo = new PDO("sqlite:" . $_SERVER['DOCUMENT_ROOT'] . "/storage/database/razorflow.sqlite");
    $this->columns = array();
    $this->columns_prepared = array();
  }

  public function setTable($table) {
    $this->table = $table;
  }

  public function setData($data) {
    foreach ($data as $key => $value) {
      $this->data[$key] = $value;
      $this->columns []= $key;
      $this->columns_prepared []= ":" . $key;
    }

  }

  public function create() {
    $columns = implode(", ", $this->columns);
    $column_prepared = implode(", ", $this->columns_prepared);
    try {
      $stmt = "INSERT INTO " . $this->table . "(" . $columns . ") VALUES(" . $column_prepared. ") ";
      $stmt = $this->pdo->prepare($stmt);
      if($stmt->execute($this->data)) {
        $this->id = $this->pdo->lastInsertId();

        return true;
      }

      return false;
    }
    catch(Exception $e) {
      return false;
    }
  }

  public function updateColumn($key, $value) {
    $id = $this->getID();

    try {
      $stmt = "UPDATE " . $this->table . " SET " . $key . "=:$key" . " WHERE id=:id";
      $stmt = $this->pdo->prepare($stmt);
      $stmt->execute(array($key => $value, 'id' => $id));

      return true;
    }
    catch(Exception $e) {
      return false;
    }
  }

  public function setID($id) {
    $this->id = $id;
  }

  public function getID() {
    return $this->id;
  }

}