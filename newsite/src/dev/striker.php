<?php

function extra_scripts () {
  return array(
    // "vendor/fancybox/jquery.fancybox.pack.js",
    // 'vendor/jquery.validate.min.js',
    "js/rfHomepage.js"
  );
}

function extra_styles () {
  return array(
    // "vendor/fancybox/jquery.fancybox.css"
  );
}

if(!function_exists('rf_trackpage')) {
    function rf_trackpage () {
        return array (
            'name' => "Home",
            'opts' => array (
            )
        );
    }
}

require "../layout/header.php";
?>
<div class="container" style="padding-top: 10px;">
  <div class="panel-container">
    <div class="panel">
      <h6>Select Technology</h6>
      <hr>
      <div class="panel-body">
        Body Content here...
      </div>
    </div>
    <div class="panel">
      <h6>Enter Your Details</h6>
      <hr>
      <div class="panel-body">
        Form Content Here
        <form class="form-horizontal" role="form">
  <div class="form-group">
    <label for="inputEmail3" class="col-sm-2 control-label">Email</label>
    <div class="col-sm-10">
      <input type="email" class="form-control" id="inputEmail3" placeholder="Email">
    </div>
  </div>
  <div class="form-group">
    <label for="inputPassword3" class="col-sm-2 control-label">Password</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" id="inputPassword3" placeholder="Password">
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <div class="checkbox">
        <label>
          <input type="checkbox"> Remember me
        </label>
      </div>
    </div>
  </div>
  <div class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" class="btn btn-default btn-lg">Default Button</button>
      <button type="submit" class="btn btn-default btn-rounded btn-lg">Default Button</button>
      <br><br>
      <button type="submit" class="btn btn-primary btn-lg">Primary Button</button>
      <button type="submit" class="btn btn-primary btn-rounded btn-lg">Primary Button</button>
      <br><br>
      <button type="submit" class="btn btn-secondary btn-lg">Secondary Button</button>
      <button type="submit" class="btn btn-secondary btn-rounded btn-lg">Secondary Button</button>
    </div>
  </div>
</form>
      </div>
    </div>
  </div>
</div>
