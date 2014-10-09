<?php

/**
 * Creates a table component
 * @class TableComponent
 * @param {String} $id     Uniquely identifies the instance of this class   
 * @augments {Component}
 */
class TableComponent extends RFComponent {
    function __construct($id) {
        parent::__construct ($id);

        $this->props = new TableComponentProperties();
        $this->props->linkToComponent ($this);

        $this->postInit();
    }

    /**
     * Adds a column to the table
     * @method addColumn
     * @param {String} $id           A unique id for this column which also corrresponds to the keys of row array
     * @param {String} $name         The name of the column which is displayed in the table
     * @param {String} $opts         Array of options
     */
    public function addColumn ($id, $name, $opts=array()) {
        $this->provide('column');
        $opts['name'] = $name;
        $this->props->addItemToList("table.columns", $id, $opts);
    }

    public function addSparkColumn ($id, $name, $opts=array()) {
      $opts['name'] = $name;
      $opts['columnType'] = "spark";
      $opts['rawHTML'] = true;
      $this->props->addItemToList("table.columns", $id, $opts);
    }

    /**
     * Add a row of data to the table. This will need to be provided as an associative array whose keys correspond to individual column keys.
     * @method addRow
     * @param {Array} $row           An associative array containing the data to be displayed in a row
     */
    public function addRow ($row) {
        $this->data->pushRow($row);
    }

    /**
     * Sets the number of rows per page in the table
     * @method setRowsPerPage        
     * @param {Number} $numRows      The number of rows in a single page on the table     
     */
    public function setRowsPerPage($numRows){
      $this->props->setValue("table.rowsPerPage", $numRows);
    }

    /**
     * Adds multiple rows of data to the table at once. Note that the each row need to be provided as an associative array whose keys match the column keys
     * @method addMultipleRows        
     * @param {Array} $rows      Array of row arrays, where each row is an associative array 
     */
    public function addMultipleRows($rows){
      for($i=0; $i<sizeof($rows); $i++){
        $row = $rows[$i];
        $this->data->pushRow($row);
      }
    }

    public function setNumberOfRows ($count) {
      $this->props->setValue('table.totalRows', $count);
    }

    /**
     * Clears all the rows in the table.
     * @method clearRows        
     */
    public function clearRows(){
      $this->data->clearRows();
    }

    public function setRowDataSource ($dsFunc, $db) {
        $this->setDashboard($db);
        $this->props->addItemToList("data.sources", "tableRowDataSource", array(
            'url' => RFUtil::buildURL($this->getBasePath (), array('action' => 'getData', 'func' => $dsFunc, 'component' => $this->getID()))
        ));
    }

    public function cellConditionalFormat ($id, $formatRule, $appliedStyle) {
        $opts = array();
        $opts["column_id"] = $id;
        $opts["conditionalExpression"] = is_string($formatRule) ? array("type" => "valueComparator", "expression" => $formatRule) : $formatRule;
        $opts["format"] = is_string($appliedStyle) ? array("cellBackgroundColor" => $appliedStyle) : $appliedStyle;

        $this->props->pushItemToList("table.cellConditionalFormatters", $opts);
    }

    /**
     * Gets the type of this component
     * @method getType
     * @return {String} The component type
     */
    public function getType () {
        return "TableComponent";
    }

    public function updateData($data) {
      return $data;
    }

    protected function validate (){
      if($this->isHidden()) {
        return;
      }
      
      parent::validate();
      $this->requireAspects (array(
        "column" => "Please provide atleast one column using addColumn"
      ));
    }
}
