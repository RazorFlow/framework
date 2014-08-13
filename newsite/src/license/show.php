<?php 
function custom_title () {
  return "RazorFlow Developer License";
}

$licenses = array (
  'corporate' => array(
    'doc_id' => '236558722'
  ),
  'corporate_devdirect' => array (
    'doc_id' => '236558750'
  ),
  'saas' => array (
    'doc_id' => '236558855'
  ),
  'saas_devdirect' => array (
    'doc_id' => '236558884'
  ),
  'oem' => array (
    'doc_id' => '236558777'
  ),
  'oem_devdirect' => array (
    'doc_id' => '236558790'
  ),
);

$id = $_GET['id'] ? $_GET['id'] : "corporate";

function rf_topbar () {
  return array (
    'url' => '/dashboard/buy/',
    'title' => "EULA"
  );
}

if(!function_exists('rf_trackpage')) {
    function rf_trackpage () {
        return array (
            'name' => "",
            'opts' => array (
            )
        );
    }
}

require $_SERVER['DOCUMENT_ROOT']."/layout/header.php";
?>
<div class="container">
<div class="row">
<div class="col-md-12 content-start">
<iframe class="scribd_iframe_embed" src="//www.scribd.com/embeds/<?php echo $licenses[$id]['doc_id']; ?>/content?start_page=1&view_mode=scroll&show_recommendations=true" data-auto-height="false" data-aspect-ratio="undefined" scrolling="no" id="doc_87551" width="100%" height="1200" frameborder="0"></iframe>
</div>
</div>
</div>
<?php
require $_SERVER['DOCUMENT_ROOT']."/layout/footer.php";
