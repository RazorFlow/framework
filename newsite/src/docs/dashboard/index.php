<?php 

// header("Location: /docs/dashboard");

function custom_title () {
    return 'Documentation';
}

function setActive () {
  return "docs";
}

function extra_scripts () {
  return array(
    'vendor/jquery.validate.min.js',
    'vendor/underscore.min.js',
    'vendor/codemirror/js/codemirror.js',
    'vendor/codemirror/mode/javascript.js',
    'vendor/codemirror/mode/xml.js',
    'vendor/codemirror/mode/htmlmixed.js',
    'vendor/codemirror/mode/clike.js',
    'vendor/codemirror/mode/php.js',
    'js/rfDocs.js'
  );
}

function extra_styles() {
    return array(
        'vendor/codemirror/css/codemirror.css',
        'vendor/codemirror/theme/rftheme.css'
    );
}

if(!function_exists('rf_trackpage')) {
    function rf_trackpage () {
        return array (
            'name' => "Download Start",
            'opts' => array (
            )
        );
    }
}


require $_SERVER['DOCUMENT_ROOT']."/layout/header.php";
?>

<div class="col-md-12 rfDocHeader">
  <div class="container">
    <div class="col-xs-12 col-sm-8 topBarTitle"><h2>Documentation</h2></div>
    <div class="form-group col-xs-12 col-sm-4">
          <form id="docs_search" action="/search/site.php" method="get">
            <div class="input-group search-box">
                <span class="input-group-addon"><span class="glyphicon glyphicon glyphicon-search"></span></span>
                <input type="hidden" name="start" value="1">
                <input id="form1_q" name="q" class="form-control" type="search" placeholder="SEARCH DOCUMENTATION">
            </div>
        </form> 
    </div>
  </div>
</div>
  <div class="row docTopBarExtraSpace"></div>
    <div class="container">
        <div class="row col-md-12 lang-box-wrapper">
            <div class="col-sm-6">
                <div class="col-sm-3"></div>
                <div class="lang-box col-sm-9 text-center">
                    <div class="lang-container row">
                        <div class="visible-xs row">
                            <a href="/docs/dashboard/js">
                                <div class="tech-active">
                                  <div class="col-xs-4">
                                      <div class="lang-icon sp_icon sp_js"></div>
                                  </div>
                                  <div class="col-xs-4"><h4>JavaScript</h4> </div>
                                  <div class="col-xs-4">
                                      <i class="rf-icon rf_arrow_right next-article"></i>
                                  </div>
                                </div>
                            </a>
                        </div>
                        <div class="hidden-xs">
                        <div class="tech-active">
                          <div class="lang-icon sp_icon sp_js"></div>
                        </div>
                        <h3>JavaScript</h3>
                        <div class="hidden-xs">
                        <p>
                            Build immersive, interactive dashboards using JavaScript which gives you fine grained control and works with just about any server technology out there.
                        </p>
                        <br>
                        </div>
                        
                        <div class="col-sm-2"></div>
                        <div class="lang-link col-sm-8 hidden-xs">
                          <a class="btn btn-secondary btn-rounded" href="/docs/dashboard/js">Get Started</a>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <div class="hidden-sm hidden-md hidden-lg extra-spacing"></div>
            <div class="col-sm-6">
                <div class="col-md-1"></div>
                <div class="lang-box col-sm-9 text-center">
                    <div class="lang-container row">
                        <div class="visible-xs row">
                            <a href="/docs/dashboard/php">
                                <div class="tech-active">
                                  <div class="col-xs-4">
                                      <div class="lang-icon sp_icon sp_php"></div>
                                  </div>
                                  <div class="col-xs-4"><h4>PHP</h4> </div>
                                  <div class="col-xs-4">
                                      <i class="rf-icon rf_arrow_right next-article"></i>
                                  </div>
                                </div>
                            </a>
                        </div>
                        <div class="hidden-xs">
                        <div class="tech-active">
                          <div class="lang-icon sp_icon sp_php tech-active"></div>
                        </div>
                        <h3>PHP</h3>
                        <div class="hidden-xs">
                        <p>
                            Use the powerful PHP API to build full-featured interactive dashboards faster and more productively than ever. Works with all major databases, MVC Frameworks and libraries.
                        </p>
                        </div>

                        <div class="col-sm-2"></div>
                        <div class="lang-link col-sm-8 hidden-xs">
                          <a class="btn btn-secondary btn-rounded" href="/docs/dashboard/php">Get Started</a>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<?php
require $_SERVER['DOCUMENT_ROOT']."/layout/footer.php";