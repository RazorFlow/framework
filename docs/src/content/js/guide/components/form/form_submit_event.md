--
title: "Form submit events"
subtitle: ""
id: "form_submit_event"
index: 2
--


You can execute a JavaScript callback when the "Apply" button on the form has been clicked, by using the {{ linkApi ('js', 'FormComponent', 'onApplyClick') }} function. This callback gives you all the data in an easy to use form.

~~~
form_object.onApplyClick (function(params) {
	// params.values contains the values of all the form items
	console.log ("The parameters are ", params);
});
~~~

The format of `params.values` is similar to what you get when you call {{ linkApi("js", "FormComponent", "getInputValue") }}, and the format is described in detail at {{ ref("getAllInputValues") }}
