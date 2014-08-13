<?php 
session_start();

function extra_scripts () {
  return array(
    // "vendor/fancybox/jquery.fancybox.pack.js",
    'vendor/jquery.validate.min.js',
    // "js/rfHomepage.js",
    "js/rfHelpDesk.js",
    "js/rfValidate.js"
  );
}

function custom_title () {
	return "Contact Support";
}

function rf_topbar () {
	return array (
		'title' => 'Contact Support',
    "url" => "/contact/support.php"
	);
}

if(!function_exists('rf_trackpage')) {
    function rf_trackpage () {
        return array (
            'name' => "Contact Support",
            'opts' => array (
                'department' => "Tech Support"
            )
        );
    }
}


require $_SERVER['DOCUMENT_ROOT']."/layout/header.php";
?>
<div class="container">
    <div class="row rfBody">
        <div class="col-md-8 col-sm-12 col-xs-12 form-panel-wrapper">
            <div class="panel-container">
              <div class="panel">
                <div class="panel-body">
                    <div id="response_message" style="width: 95%;"><?php require $_SERVER['DOCUMENT_ROOT']."/layout/success_message.php" ?></div>
                    <form class="form-horizontal rfForm" role="form" action="/contact/helpdesk" id="helpdeskForm" method="POST" enctype="multipart/form-data">
                      <div class="form-group-bottom-padded">
                        <div class="form-info pull-right">All fields are required</div>
                      </div>
                      <div class="form-group">
                        <label for="inputName" class="col-sm-2 control-label">Name</label>
                        <div class="col-sm-7">
                          <input type="text" class="form-control" name="input[person_name]" id="inputName" placeholder="" required>
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="inputEmail" class="col-sm-2 control-label">Email</label>
                        <div class="col-sm-7">
                          <input type="email" class="form-control" name="input[person_email]" id="inputEmail" placeholder="" required>
                        </div>
                      </div>
<!--                         <div class="form-group">
                        <label for="inputTopic" class="col-sm-2 control-label">Topic</label>
                        <div class="col-sm-7">
                            <select class="form-control" name="input[topic]" id="inputTopic">
                                <option>Some Quote</option>
                                <option>Quote.....</option>
                            </select>
                        </div>
                      </div>
 -->                      <div class="form-group">
                        <label for="inputPlatform" class="col-sm-2 control-label">Platform</label>
                        <div class="col-sm-7">
                          <label class="radio-inline hidden">
                            <input type="radio" name="input[custom_ticket_fields_field_1]" id="inputPlatform1" value="" required checked="checked"> None
                          </label>
                          <label class="radio-inline">
                            <input type="radio" name="input[custom_ticket_fields_field_1]" id="inputPlatform2" value="3" required> PHP
                          </label>
                          <label class="radio-inline">
                            <input type="radio" name="input[custom_ticket_fields_field_1]" id="inputPlatform3" value="2" required> JavaScript
                          </label>
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="inputSubject" class="col-sm-2 control-label">Subject</label>
                        <div class="col-sm-7">
                          <input type="text" class="form-control" id="inputSubject" name="input[subject]" placeholder="" required>
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="inputQuestion" class="col-sm-2 control-label">Question</label>
                        <div class="col-sm-7">
                          <textarea class="form-control" id="inputQuestion" name="input[message]" rows="8" required></textarea>
                        </div>
                      </div>
                      <div class="form-group hidden dnd-group" id="dnd-group">
                        <div class="col-sm-7 col-lg-offset-2 col-md-offset-2 col-sm-offset-2">
                          <input type="file" class="hidden" id="attachment" class="attachment" />
                          <div class="file-uploader default" id="dropTarget" ondragover="allowFileDrop(event)" ondrop="fileDrop(event)">
                            Drag your files here or <a href="#" id="file-browser-link">browse</a> to upload
                            <p>Maximum file size: 2.00 MB</p>
                          </div>
                          <ul id="dropped-files" class="dropped-files"></ul>
                        </div>
                      </div>
                      <div class="form-group hidden" id="fallback-group">
                        <div class="col-sm-7 col-lg-offset-2 col-md-offset-2 col-sm-offset-2">
                          <div id="files" class="">
                            <div class="inputFileWrapper">
                              <input type="file" name="attach1" id="attach_1" class="single-attachment">
                              <a href='javascript:void(0)' class='fileInputRemove' id='attach_remove_1'>&times;</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <input type="hidden" value="support" name="department">
                      <div class="form-group">
                        <div class="col-sm-7 col-lg-offset-2 col-md-offset-2 col-sm-offset-2 submit-btn-wrapper">
                          <input type="submit" class="btn btn-primary" name="submit" value="Submit" id="submit" />
                        </div>
                      </div>
                    </form>
                </div>
          </div>
      </div>

</div>
    <div class="col-lg-4 col-md-4 col-xs-12 sidebar-split pull-right">
        <p>All questions will be responded to directly by RazorFlow support team within 2 business days.</p>
        <p>You can also send us an email to <a href="mailto:support@razorflow.com" class="strong">support@razorflow.com</a></p>
        <div class="sidebar-panel-wrapper">
          <div class="side-panel section">
            <i class="rf-icon rf_question icon-lg rf-icon-inactive"></i>
            <h5>Checkout our popular questions</h5>
            <p>Get instant answers to common questions.</p>
            <ul class="bullet-list">
              <li>
                <i class="rf-icon rf_bullet"></i>
                <div class="list-content">
                  <a href="/faq#faq-1">I am looking for a perpetual license, with one-time payment. Do you offer such licenses?</a>
                </div>
              </li>
              <li>
                <i class="rf-icon rf_bullet"></i>
                <div class="list-content">
                  <a href="/faq#faq-2">How long does it take you to send the activation keys after I have made the purchase?</a>
                </div>
              <li>
                <i class="rf-icon rf_bullet"></i>
                <div class="list-content">
                  <a href="/faq#faq-3">I would like to purchase your products but I cannot make the purchase online. What other methods of payment do you have?</a>
                </div>
            </ul>
            <h5><a href="/faq">See our FAQs &raquo;</a></h5>
          </div>
          <div class="text-center section border">
            <i class="rf-icon rf_email icon-lg rf-icon-inactive"></i>
            <h5>Got a Sales Query?</h5>
            <p>Get instant answers to common questions</p>
            <a class="btn btn-default" href="/contact/sales.php">Contact Sales</a>
          </div>
        </div>
    </div>
    </div>
</div>
<?php
require $_SERVER['DOCUMENT_ROOT']."/layout/footer.php";
