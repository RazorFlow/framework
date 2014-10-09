<?php

/**
 * Creates a Form Component
 * @class FormComponent
 * @param {String} $id     Uniquely identifies the instance of this class
 * @augments {Component}
 */
class FormComponent extends RFComponent {

  function __construct ($id) {
      parent::__construct ($id);

      $this->props = new FormComponentProperties();
      $this->props->linkToComponent ($this);

      $this->postInit();
  }

  /**
    * Add a text field represented by a HTML Text input on the form
    * @method addTextField
    * @param {String} $id            Id for this field used to retrieve the value
    * @param {String} $label         The label that is displayed in the form element for the user
    * @param {Array} $options       The options as an associative array
    */
  public function addTextField ($id, $label, $options = array()) {
    $opts = array();
    $opts['type'] = 'text';
    $opts['label'] = $label;
    $opts['options'] = $options;

    $this->props->addItemToList("form.items", $id, $opts);
  }

  /**
    * Add a select/dropdown field which allows the user to select one option from a list of pre-defined options. This is displayed as a HTML Select input on the form
    * @method addSelectField
    * @param {String} $id           Id for this field used to retrieve the value
    * @param {String} $label        The label that is displayed in the form element for the user
    * @param {Array} $list          An array of strings which are the options in the select items
    * @param {Array} $options       The options as an associative array
    */
  public function addSelectField ($id, $label, $list, $options=array()){
    $opts = array();
    $opts['type'] = 'select';
    $opts['label'] = $label;
    $opts['list'] = $list;
    $opts['options'] = $options;

    $this->props->addItemToList("form.items", $id, $opts);
  }

  /**
    * Add a multi-select field which allows the user to select one option from a list of pre-defined options. This is displayed as a HTML multi select input on the form
    * @method addMultiSelectField
    * @param {String} $id             Id for this field item used to retrieve the value
    * @param {String} $label          The label that is displayed in the form element for the user
    * @param {Array} $list            An array of strings which are the options in the select items
    * @param {Array} $options         The options as an associative array
    */
  public function addMultiSelectField ($id, $label, $list, $options=array()) {
    $opts = array();
    if(!isset($options['defaultSelectedOptions'])) {
      $options['defaultSelectedOptions'] = array();
    }
    $opts['type'] = 'multiSelect';
    $opts['label'] = $label;
    $opts['list'] = $list;
    $opts['options'] = $options;

    $this->props->addItemToList("form.items", $id, $opts);
  }

  /**
    * Add a select/dropdown field which allows the user to select a single date. This is displayed with a date picker.
    * @method addDateField
    * @param {String} $id           Id for this field used to retrieve the value
    * @param {String} $label        The label that is displayed in the form element for the user
    * @param {Array} $options       The options as an associative array
    */
  public function addDateField ($id, $label, $options=array()) {
    $opts = array();
    $opts['type'] = 'date';
    $opts['label'] = $label;
    $opts['options'] = $options;

    $this->props->addItemToList("form.items", $id, $opts);
  }

  /**
    * Adds a Date Range field to the component. This field can be used to select a date range, a start date and an end date.
    * @method addDateRangeField
    * @param {String} $id           Id for this field item used to retrieve the value
    * @param {String} $label        The label that is displayed in the form element for the user
    * @param {Array} $options       The options as an associative array
    */
  public function addDateRangeField ($id, $label, $options=array()) {
    $opts = array();
    $opts['type'] = 'dateRange';
    $opts['label'] = $label;
    $opts['options'] = $options;

    $this->props->addItemToList("form.items", $id, $opts);
  }

  /**
    * Adds a Numeric Range field to the component. This field can be used to select a numeric range, a start number and an end number.
    * @method addNumericRangeField
    * @param {String} $id           Unique id for this field
    * @param {String} $label        The name displayed on the control
    * @param {Array} $values        The default values for the start and end numbers
    * @param {Array} $options       Array of options
    */
  public function addNumericRangeField ($id, $label, $values, $options=array()) {
    $opts = array();
    $opts['type'] = 'numericRange';
    $opts['label'] = $label;
    $opts['options']['values'] = $values;

    $this->props->addItemToList("form.items", $id, $opts);
  }

  /**
    * Add a checkbox field displayed as a HTML checkbox in the form.
    * @method addCheckboxField
    * @param {String} $id           Id for this field item used to retrieve the value
    * @param {String} $label        The label that is displayed in the form element for the user
    * @param {Boolean} $value       If the checkbox is supposed to be checked by default
    */
  public function addCheckboxField ($id, $label, $value) {
    $opts = array();
    $opts['type'] = 'checkbox';
    $opts['label'] = $label;
    $opts['options'] = array('value' => $value);

    $this->props->addItemToList("form.items", $id, $opts);
  }

  /**
    * Adds an on apply click handler
    * @method onApplyClick
    * @param {Array} $lockedComponents           Components to be locked
    * @param {String} $func                      Function name to be executed on apply form
    */

  public function onApplyClick ($lockedComponents, $func, $db){
    $this->bindToEvent ("submit", $lockedComponents, $func, $db);
  }

  /**
    * Get all the input values
    * @method getAllInputValues
    */

  public function getAllInputValues() {
    return $this->inputValues;
  }

  /**
    * Get input value by id
    * @method getInputValue
    * @param {String} $id       The id of a specific field item
    */

  public function getInputValue($id) {
    return $this->inputValues[$id];
  }

  /**
    * Gets the type of this component
    * @method getType
    * @return {String} The component type
    */
  public function getType () {
      return "FormComponent";
  }

  public function setInputValues($values) {
    $this->inputValues = $values;
  }

  protected function validate (){
    if($this->isHidden()) {
      return;
    }
    
    parent::validate();
  }

  private $inputValues;

} 
