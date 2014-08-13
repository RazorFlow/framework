<?php 
function custom_title () {
  return "RazorFlow Developer License";
}

function rf_topbar () {
  return array (
    'url' => '/license/developer.php',
    'title' => 'Developer License'
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

<p style=" margin: 12px auto 6px auto; font-family: Helvetica,Arial,Sans-serif; font-style: normal; font-variant: normal; font-weight: normal; font-size: 14px; line-height: normal; font-size-adjust: none; font-stretch: normal; -x-system-font: none; display: block;"> </p><iframe class="scribd_iframe_embed" src="//www.scribd.com/embeds/235882278/content?start_page=1&view_mode=scroll&show_recommendations=true" data-auto-height="false" data-aspect-ratio="undefined" scrolling="no" id="doc_7079" width="100%" height="1200" frameborder="0"></iframe>

</div>
</div>
</div>
<?php
require $_SERVER['DOCUMENT_ROOT']."/layout/footer.php";
