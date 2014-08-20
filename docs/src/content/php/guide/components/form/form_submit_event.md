--
title: "Form submit events"
subtitle: ""
id: "php_form_submit_event"
index: 2
--


You can execute a PHP function when the "Apply" button on the form has been clicked, by using the {{ linkApi ('php', 'FormComponent', 'onApplyClick') }} function. This callback gives you all the data in an easy to use form.

~~~

public function buildDashboard(){
  $form_obj->onApplyClick (array($table_obj, "some_function"));
}

public function some_function($source, $target, $params){
  // Find the locked component by Id.
  $table_obj = $this->getComponentByID("table_id");
  $table_obj->setCaption ("New Caption");
}

~~~

The {{ linkApi ('php', 'FormComponent', 'onApplyClick') }} function takes the following parameters:
* Array of components to be locked.
* The function name that gets executed when the *Apply* button gets clicked.
