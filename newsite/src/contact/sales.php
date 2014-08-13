<?php 
session_start();

function extra_scripts () {
  return array(
    // "vendor/fancybox/jquery.fancybox.pack.js",
    'vendor/jquery.validate.min.js',
    // "js/rfHomepage.js",
    "js/rfValidate.js"
  );
}

function setActive () {
  return "sales";
}

function custom_title () {
	return "Contact Sales";
}

function rf_topbar () {
	return array (
		'title' => 'Contact Sales',
    "url" => "/contact/sales.php"
	);
}

if(!function_exists('rf_trackpage')) {
    function rf_trackpage () {
        return array (
            'name' => "Contact Sales",
            'opts' => array (
                'department' => "Sales"
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
                    <?php require $_SERVER['DOCUMENT_ROOT']."/layout/success_message.php" ?>
                    <form class="form-horizontal rfForm" role="form" method="POST" action="/contact/helpdesk/" enctype="multipart/form-data" id="helpdeskForm">
                      <div class="form-group-bottom-padded">
                        <div class="form-info pull-right">All fields are required</div>
                      </div>
                      <div class="form-group">
                        <label for="inputName" class="col-sm-2 control-label">Name</label>
                        <div class="col-sm-7">
                          <input type="text" class="form-control" id="inputName" name="input[person_name]" placeholder="" required>
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="inputEmail" class="col-sm-2 control-label">Email</label>
                        <div class="col-sm-7">
                          <input type="email" class="form-control" id="inputEmail" name="input[person_email]" placeholder="" required>
                        </div>
                      </div>
<!--                       <div class="form-group">
                        <label for="inputPassword3" class="col-sm-2 control-label">Topic</label>
                        <div class="col-sm-6">
                            <select class="form-control">
                                <option>Some Quote</option>
                                <option>Quote.....</option>
                            </select>
                        </div>
                      </div>
 -->                      <div class="form-group">
                        <label for="inputSubject" class="col-sm-2 control-label">Subject</label>
                        <div class="col-sm-7">
                          <input type="text" class="form-control" id="inputSubject" name="input[subject]" placeholder="" required>
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="inputMessage" class="col-sm-2 control-label">Question</label>
                        <div class="col-sm-7">
                          <textarea class="form-control" id="inputMessage" name="input[message]" rows="8" required></textarea>
                        </div>
                      </div>
                      <input type="hidden" value="sales" name="department">
                      <div class="form-group">
                        <div class="col-sm-7 col-lg-offset-2 col-md-offset-2 col-sm-offset-2 submit-btn-wrapper">
                          <input type="submit" class="btn btn-primary" name="submit" id="submit" value="Submit" />
                        </div>
                      </div>
                    </form>
                </div>
          </div>
      </div>

</div>
    <div class="col-lg-4 col-md-4 sidebar-split pull-right">
        <p>All questions will be responded to directly by RazorFlow sales team within 2 business days.</p>
        <p>You can also send us an email to <a href="mailto:sales@razorflow.com" class="strong">sales@razorflow.com</a></p>
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
          <div class="text-center section border hidden-xs">
            <i class="rf-icon rf_email icon-lg rf-icon-inactive"></i>
            <h5>Got a Support Question?</h5>

            <p>Contact our technical support team for answers to your RazorFlow questions</p>
            <a class="btn btn-default" href="/contact/support.php">Contact Support</a>
          </div>
        </div>
    </div>
    </div>
</div>
<?php
require $_SERVER['DOCUMENT_ROOT']."/layout/footer.php";
