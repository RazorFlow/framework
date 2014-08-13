<?php 
function custom_title () {
    return "Search Results";
}

function extra_scripts () {
  return array(
  );
}

function extra_styles() {
    return array(
    );
}

if(!function_exists('rf_trackpage')) {
    function rf_trackpage () {
        return array (
            'name' => "Search Results",
            'opts' => array (
            )
        );
    }
}


require $_SERVER['DOCUMENT_ROOT']."/layout/header.php";
?>
<div class="col-md-12 rfDocHeader">
  <div class="container">
    <div class="col-xs-12 col-sm-8 topBarTitle"><h2>JavaScript Documentation</h2></div>
    <div class="form-group col-xs-12 col-sm-4">
          <form id="docs_search" action="" method="get">
            <div class="input-group search-box">
                <span class="input-group-addon"><span class="glyphicon glyphicon glyphicon-search"></span></span>
                <input id="form1_q" name="q" class="form-control" type="search" placeholder="SEARCH DOCUMENTATION">
            </div>
        </form> 
    </div>
  </div>
</div>
<div class="container rfSearch">
  <div class="hidden-xs hidden-sm">
    <h2 class="search-text">&lsquo;column chart&rsquo;</h2>
  </div>
    <div class="row">
      <hr class="docDivider hidden-sm hidden-xs">
        <div class="col-md-12 rfSearchContent pull-right">
          <!-- <h5>Documentation</h5> -->

          <div class="search-results">
            <ul>
              <li>
                <a href="#">
                  <h6>Stacked Charts</h6>
                  <span>http://razorflow.com/docs</span>
                  <p>You can create a stacked column chart by creating a regular column chart and passing an extra property seriesStacked:true in your series configuration.</p>
                </a>
              </li>
              <li>
                <a href="#">
                  <h6>Stacked Charts</h6>
                  <span>http://razorflow.com/docs</span>
                  <p>You can create a stacked column chart by creating a regular column chart and passing an extra property seriesStacked:true in your series configuration.</p>
                </a>
              </li>
              <li>
                <a href="#">
                  <h6>Stacked Charts</h6>
                  <span>http://razorflow.com/docs</span>
                  <p>You can create a stacked column chart by creating a regular column chart and passing an extra property seriesStacked:true in your series configuration.</p>
                </a>
              </li>
            </ul>

          </div>
            <ul class="rfPagination pull-right">
              <li class="active"><a href="#">1</a></li>
              <li><a href="#">2</a></li>
              <li><a href="#">3</a></li>
              <li><a href="#">4</a></li>
              <li><a href="#">5</a></li>
              <li class="active"><a href="#">Next</a></li>
            </ul>
        </div>
    </div>
</div>

<script type="text/javascript">
window.doc_id = "<%= id %>";
</script>

<?php
require $_SERVER['DOCUMENT_ROOT']."/layout/footer.php";



