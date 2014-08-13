<?php 
function custom_title () {
    return "Feature Browser";
}

function rf_topbar () {
    return array (
        'url' => '/features/',
        'title' => 'Features'
    );
}

function setActive () {
  return "features";
}

function extra_scripts () {
  return array(
    'vendor/jquery.validate.min.js',
    'js/rfDemos.js',
    'vendor/underscore.min.js',
    'vendor/prism.min.js',
    'transfer/build/js/rfDemos.js',
    'transfer/build/js/rfDemoCode.js',
    'transfer/build/js/razorflow.min.js',
    'vendor/codemirror/js/codemirror.js',
    'vendor/codemirror/mode/javascript.js',
    'vendor/codemirror/mode/xml.js',
    'vendor/codemirror/mode/htmlmixed.js',
    'vendor/codemirror/mode/clike.js',
    'vendor/codemirror/mode/php.js'
  );
}

function extra_styles() {
    return array(
        'transfer/build/css/razorflow.min.css',
        'vendor/prism.css',
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

<div class="container">
    <div class="row rfBody">
        <div class="demo-container">
            <div class="col-md-3 rf-panel">
                <div class="rfsidepanel">
                </div>
            </div>
            <div class="col-md-9" id="main-container">
                <div class="demo-bar">
                    <span class="icon"></span>
                    <div class="rf-optgroup">
                        <ul>
                            <li id="web" class="selected">WEB</li>
                            <li id="mobile">MOBILE</li>
                        </ul>
                        <span class="opt-marker"></span>
                    </div>
                </div>
                <div class="demo-toolbar">
                    <div class="web">
                        <span class="img-link standalone-button">
                            <i class="rf-icon rf_fullwidth"></i>
                            <a>View full width</a>
                        </span>
                        <span class="img-link documentation-button">
                            <i class="rf-icon rf_documentation"></i>
                            <a>Documentation</a>
                        </span>
                    </div> 
                </div>
                <div id="db-chrome">
                    <div id="db-container" class="web">
                        <div id="db-canvas">
                        </div>
                    </div>
                </div>
                <div id="db-desc">
                    <div class="heading">
                    </div>
                    <div class="desc">
                    </div>
                </div>
                <div class="code">
                    <h3></h3>
                    <p></p>
                    <div class="codebox">
                        <div class="header">
                            <div class="rf-optgroup" id="lang-selector">
                                <ul>
                                    <li class="selected" id="js">JAVASCRIPT</li>
                                    <li id="php">PHP</li>
                                </ul>
                                <span class="opt-marker"></span>
                            </div>
                        </div>
                        <div class="code-div">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<?php
require $_SERVER['DOCUMENT_ROOT']."/layout/footer.php";
