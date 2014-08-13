<?php 
session_start();

require "../version.php";
require $_SERVER['DOCUMENT_ROOT']."/../vendor/autoload.php";
require $_SERVER['DOCUMENT_ROOT'] . "/storage/backend.php";
require $_SERVER['DOCUMENT_ROOT'] . "/storage/mailer.php";

global $rf_version;

function custom_title () {
	return "Download";
}

function rf_topbar () {
	return array (
		'title' => 'Download',
    "url" => "/download/" 
	);
}

$input = array ();;

if($_SERVER['REQUEST_METHOD'] === "POST") {
  $input = $_POST['input'];
  $download = new Backend();
  $download->setTable("downloads");

  $download->setData($input);
  $download->create();
}

if(isset($_GET['platform'])) {
  $input['tech'] = $_GET['platform'];
}

if(!function_exists('rf_trackpage')) {
    function rf_trackpage () {
        return array (
            'name' => "Download Finish",
            'opts' => array (
            )
        );
    }
}

  $requirementCallFlag = false;
if(isset($input['name'])) {
  // require $_SERVER['DOCUMENT_ROOT']."/../vendor/autoload.php";
  $client = new GuzzleHttp\Client();

  try {
  $response = $client->post('http://tools.razorflow.com/sendy/subscribe', [
    'body' => [
      'name' => $input['name'],
      'email' => $input['email'],
      'list' => 'JNnwvTS6U892O6NQ50ID8922GA',
      'uh' => md5($input['email']),
      'platform' => $input['tech']
    ]
  ]);

  if(!function_exists('rf_identify')) {
    function rf_identify () {
      return array (
        'name' => $_POST['input']['name'],
        'email' => $_POST['input']['email']
      );
    }
  }

  if(isset($input['email_notify'])) {
  if($input['email_notify'] == "1") {
   $response = $client->post('http://tools.razorflow.com/sendy/subscribe', [
    'body' => [
      'name' => $input['name'],
      'email' => $input['email'],
      'list' => 'SBPqyPrY4cWgceEuFLINNg',
      'uh' => md5($input['email'])
    ]
  ]); 
  }

  }

  if(isset($input['phone_consultation'])) {
  if($input['phone_consultation'] == "1") {
    $requirementCallFlag = true;
   $response = $client->post('http://tools.razorflow.com/sendy/subscribe', [
    'body' => [
      'name' => $input['name'],
      'email' => $input['email'],
      'list' => 'vzIEFRr7v0l2Rv763892Vs56gA',
      'uh' => md5($input['email'])
    ]
  ]); 
  }
  }
}
catch (Exception $e){

}}
$langStrings = array (
  'js' => array(
    'version' => "JavaScript",
    'using' => "JavaScript",
    'getStartedLink' => "/docs/dashboard/js/",
    'docsName' => "JavaScript"
  ),
  'php' => array(
    'version' => "PHP",
    'using' => "PHP",
    'getStartedLink' => "/docs/dashboard/php/",
    'docsName' => "PHP"
  ),
  'suite' => array(
    'version' => "Suite",
    'using' => "RazorFlow",
    'getStartedLink' => "/docs/",
    'docsName' => ""
  )
);
$langCode = isset($input['tech']) ? $input['tech'] : "js";
$strings = isset($langStrings[$langCode]) ? $langStrings[$langCode] : $langStrings["js"];
// $download_url = "https://s3.amazonaws.com/download_bucket/razorflow_dashboard_framework_".$langCode.$rf_version.".zip";
$download_url = "/download/get.php?platform=" . ($_SERVER['REQUEST_METHOD'] === "POST" ? $input['tech'] : "suite") . "&version=latest&license=dev"; 
require $_SERVER['DOCUMENT_ROOT']."/layout/header.php";
?>
<script type="text/javascript">
    var hiddenIFrameID = 'hiddenDownloader',
        iframe = document.getElementById(hiddenIFrameID);
    if (iframe === null) {
        iframe = document.createElement('iframe');
        iframe.id = hiddenIFrameID;
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
    }
    iframe.src = "<?php echo $download_url; ?>";
</script>
<div class="container">
    <div class="row rfBody thanksBody">
        <div class="col-md-12">
            <h2>Your download is starting</h2>
            <p class="subtext">You are now downloading RazorFlow Dashboard Framework <?php echo $strings['version']; ?>. <a href="<?php echo $download_url; ?>">Click here</a> if the download doesn't start automatically.</p>
            <?php //perch_content('ThanksSubText') ?>
        </div>
        <div class="col-md-12 nextStepTitle">
        <div class="fadingLine"></div>
          <div class="nextStepTitleContainer">
            <h5>Next Steps</h5>
          </div>
        </div>
        <?php //perch_content('NextStepsContainer') ?>
        <div class="col-md-3 stepsContainer">
        <div class="iconContainer">
          <i class="rf-icon rf_buy"></i>
        </div>
        <h5><a href="<?php echo $strings['getStartedLink'];?>">Build your first Dashboard</a></h5>
        <p>Build your first dashboard using <?php echo $strings['using']; ?> under 20 minutes. Visit the <a href="<?php echo $strings['getStartedLink'];?>"><?php echo $strings['docsName'];?> Documentation Center</a> to find tutorials, guides, how-to articles and API reference.</p>
      </div>
      <div class="col-md-3 stepsContainer">
        <div class="iconContainer">
          <i class="rf-icon rf_contact"></i>
        </div>
        <h5><a href="/contact/support.php">Contact Support</a></h5>
        <p>If you run into any problems getting started with RazorFlow Dashboard Framework, <a href="/contact/support.php">Contact our support team</a> and they will be happy to help.</p>
      </div>
      <div class="col-md-3 stepsContainer">
        <div class="iconContainer">
          <i class="rf-icon rf_contact"></i>
        </div>
        <h5><a href="/contact/sales.php">Contact Sales</a></h5>
        <p>Have questions regarding pricing or licensing? Need to pay by PO, cheque or bank transfer? <a href="/contact/sales.php">Contact our sales team</a>.</p>
      </div>
      <div class="col-md-3 stepsContainer">
        <div class="iconContainer">
          <i class="rf-icon rf_document"></i>
        </div>
        <h5><a href="/dashboard/buy">Purchase License</a></h5>
        <p>Like what you see? <a href="/dashboard/buy">Purchase a license</a> and show-off your dashboard to the world!</p>
      </div>
</div>
</div>
<?php
require $_SERVER['DOCUMENT_ROOT']."/layout/footer.php";
