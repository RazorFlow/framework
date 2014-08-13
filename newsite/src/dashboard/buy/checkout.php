<?php 
session_start();

function extra_scripts () {
  return array(
    // "vendor/fancybox/jquery.fancybox.pack.js",
    'vendor/jquery.validate.min.js',
    "js/rfValidate.js",
    // "js/rfHelpDesk.js"
  );
}

function custom_title () {
  return "Checkout";
}

function rf_topbar () {
  return array (
    'url' => '/dashboard/buy/checkout.php',
    'title' => 'Checkout'
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

$countries = json_decode(file_get_contents($_SERVER['DOCUMENT_ROOT'] . "/dashboard/buy/countries.json"), true);

require $_SERVER['DOCUMENT_ROOT']."/layout/header.php";
?>

<div class="container">
    <div class="row rfBody checkoutBody">
        <div class="col-md-4 col-sm-12 col-xs-12 pull-right subsection checkoutSub">
        <ul>
          <li>
            <h5>Order Summary</h5>
          </li>
          <li>
            <p class="frameworkTitle">RazorFlow Dashboard Framework</p>
            <p>License Type:</p>
            <?php 
              $type = "";
              $plan = "";
              $price = $_POST["price"];
              switch ($_GET['type']) {
                case 'corporate':
                  $type = "Corporate";
                  break;
                case "saas":
                  $type = "Saas";
                  break;
                case 'oem':
                    $type = "OEM";
                    break;
              }

              if($_GET['plan'] == "standard") {
                $plan = "Standard";
              } else if($_GET['plan'] == "direct") {
                $plan = "DevDirect";
              }


            ?>
            <p class="licenseType"><?php echo $type; ?> License (<?php echo $plan; ?> Plan)</p>
          </li>
          <li>
            <p class="subTotalTitle">Subtotal</p>
            <p class="subTotal pull-right"><?php echo $price; ?><span>/server/year</span></p>
          </li>
          <li>
            Any additional taxes or VAT will be calculated during checkout
          </li>
        </ul>
        <a href="/dashboard/buy/" class="change-licence">Change license type</a>
      </div>

        <div class="col-md-8 col-sm-12 col-xs-12 form-panel-wrapper checkout-form">
            <div class="panel-container">
              <div class="panel">
                <h6>CheckOut</h6>
                <hr>
                <div class="panel-body">
                    <?php require $_SERVER['DOCUMENT_ROOT']."/layout/success_message.php" ?>
                    <form class="form-horizontal rfForm" role="form" action="/dashboard/buy/process.php" method="POST" enctype="multipart/form-data" id="helpdeskForm">
                      <div class="form-group-bottom-padded">
                        <div class="form-info pull-right">All fields are mandatory</div>
                      </div>
                      <div class="form-group">
                        <label for="inputFirstName" class="col-sm-2 control-label">First Name</label>
                        <div class="col-sm-7 co-element">
                          <input type="text" class="form-control" name="input[firstname]" id="inputFirstName" placeholder="" required>
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="inputLastName" class="col-sm-2 control-label">Last Name</label>
                        <div class="col-sm-7 co-element">
                          <input type="text" class="form-control" name="input[lastname]" id="inputLastName" placeholder="" required>
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="inputEmail" class="col-sm-2 control-label">Email Address</label>
                        <div class="col-sm-7 co-element">
                          <input type="email" class="form-control" name="input[email]" id="inputEmail" placeholder="" required>
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="inputCompany" class="col-sm-2 control-label">Company</label>
                        <div class="col-sm-7 co-element">
                          <input type="text" class="form-control" name="input[company]" id="inputCompany" placeholder="" required>
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="inputCity" class="col-sm-2 control-label">City</label>
                        <div class="col-sm-7 co-element">
                          <input type="text" class="form-control" name="input[city]" id="inputCity" placeholder="" required>
                        </div>
                      </div>
                      <input type="hidden" name="input[planCode]" value="<?php echo $_POST['planCode'] ?>">
                      <div class="form-group">
                        <label for="inputCity" class="col-sm-2 control-label">Country</label>
                        <div class="col-sm-7 co-element">
                          <select class="form-control" name="input[country]" id="inputCountry" required>
                            <option value="">Country</option>
                            <?php foreach ($countries as $value): ?>
                            <option value="<?= $value['code'] ?>"><?= $value['name'] ?></option>
                            <?php endforeach ?>
                          </select>
                        </div>
                      </div>
                     
                     <?php if(isset($_GET['type'])): ?>
                     <input type="hidden" name="input[license]" value="<?= $_GET['type'] ?>" >
                     <?php endif ?>

                     <?php if(isset($_GET['plan'])): ?>
                     <input type="hidden" name="input[plan]" value="<?= $_GET['plan'] ?>" >
                     <?php endif ?>
                     <input type="hidden">
                      <div class="form-group">
                        <div class="col-sm-7 col-lg-offset-2 col-md-offset-2 col-sm-offset-2 co-element">
                          <button type="submit" class="btn btn-secondary fit-width" name="submit">
                            Make Payment 
                            <i class="rf-icon rf_arrow_right pull-right"></i>
                          </button>
                        </div>
                      </div>
                    </form>
                    You will be redirected to our payment partner, Avangate to securely pay using Credit Card or Paypal.
                </div>
              </div>
          </div>
      </div>
    </div>
</div>
<?php
require $_SERVER['DOCUMENT_ROOT']."/layout/footer.php";
