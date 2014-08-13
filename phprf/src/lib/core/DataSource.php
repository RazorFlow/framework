<?php

class RFDataSource {
    public function pushRow ($row) {
      $this->data []= $row;
      $this->patch ('pushRow', 0, $row);
    }

    public function getRaw () {
        return $this->data;
    }

    public function addColumn ($key, $values) {
      $dataLen = sizeof($this->data);
      for ($i = 0; $i < sizeof($values); $i++) {
        if ($i >= $dataLen) {
          $this->data[$i] = array();
        }
        $this->data[$i][$key] = $values[$i];
      }

      $this->patch ('addColumn', $key, $values);
    }

    public function patch ($actionName, $index, $params) {
      if($this->cobj !== null) {
        $this->cobj->__addDPatch ($actionName, $index, $params);
      }
    }

    public function clearRows(){
      $this->data = array();
      $this->patch ('clearRows', 0, '');
    }

    protected $cobj = null;

    public function linkToComponent ($cobj) {
      $this->cobj = $cobj;
    }

    protected $data = array();
} 
