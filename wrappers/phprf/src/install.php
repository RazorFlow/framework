<?php
$valid = array();
$valid['phpversion'] = false;
$valid['confwritable'] = false;

$optional = array();
$optional['noexistingconf'] = false;

$installable = true;

$html_vars = array(
  "quick_start_guide" => "<a href='http://razorflow.com/docs/dashboard/php/'>Documentation</a>"
);

if(version_compare(phpversion(), '5.3.0', '>=')){
    $valid['phpversion'] = true;
}

$configPath = dirname(__FILE__).DIRECTORY_SEPARATOR."config".DIRECTORY_SEPARATOR;

if(is_writeable($configPath))
{
    $valid['confwritable'] = true;
}

if(!file_exists($configPath."config.php"))
{
    $optional['noexistingconf'] = true;
}

foreach($valid as $key=>$value) {
    if($value === false)
    {
        $installable = false;
    }
}

$installFlag = false;

if(isset($_GET['install'])) {
    if($_GET['install'] === 'true') {
        $installFlag = true && $installable;
    }
}

$installFinished = false;

if($installFlag) {
    $scriptName = $_SERVER['SCRIPT_NAME'];
    $webRoot = substr($scriptName, 0, strlen($scriptName) - strlen('/install.php')). "/static/rf";

    $configContents = file_get_contents($configPath."config.sample.php");
    $configContents = str_replace("{{webRoot}}", $webRoot, $configContents);

    $handle = fopen($configPath."config.php", "w");
    fwrite($handle, $configContents);
    fclose($handle);
}


?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Install RazorFlow Dashboard Framework for PHP</title>
    <link href="static/installer/install.css" rel="stylesheet">
    <style>
        body {
            padding-top: 0px; /* 60px to make the container go all the way to the bottom of the topbar */
        }
    </style>

    <!--[if lt IE 9]>
    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

</head>

<body>

<div class="container">
    <div class="row">
            <h1>RazorFlow Dashboard Framework</h1>
    </div>
    <?php if($installFlag) : ?>
    <div class="row">
        <p class="alert alert-success">RazorFlow Dashboard Framework was successfully installed.</p>
        <p><h3>Next Steps</h3></p>
        <ol>
            <li>For added security, please delete the "install.php" file</li>
            <li>Learn how to build your first dashboard with our <?php echo $html_vars['quick_start_guide'] ?></li>
        </ol>
    </div>
    <?php else: ?>
    <div class="row">
        <p>You're just a few minutes away from building interactive, mobile-friendly dashboards.</p>
        <h3>Checking requirements</h3>

        <?php if($valid['phpversion']):?>
        <div class="alert alert-success">
            <strong>Checking PHP Version:</strong> Your PHP version supports RazorFlow
        </div>
        <?php else: ?>
        <div class="alert alert-error">
            <strong>Checking PHP Version:</strong> Please upgrade your PHP version to 5.2 or above (5.3 is recommended) to use RazorFlow
        </div>
        <?php endif; ?>

        <?php if ($valid['confwritable']): ?>
        <div class="alert alert-success">
            <strong>Checking if config writable:</strong> Your config folder is writable.
        </div>
        <?php else: ?>
        <div class="alert alert-error">
            <strong>Checking if config writable:</strong> <p>The configuration folder is not writable. RazorFlow needs to write configuration files to <?php echo $configPath;?></p>
            <p>Please make the folder wirtable. If you're using Linux, you can use this command to make it writable:</p>
            <pre>chmod -R 0777 <?php echo $configPath; ?></pre>
            </p>
        </div>
        <?php endif; ?>

        <?php if ($optional['noexistingconf']): ?>
        <?php else: ?>
        <div class="alert alert-warn">
            <strong>Checking for existing config file:</strong> <p>There's already an existing config file at the following path:
            <pre><?php echo $configPath."config.php"; ?></pre>
            If you proceed with the installation, this file will be overwritten.
        </p>
            </div>
        <?php endif; ?>
    </div>
    <div class="row">
        <?php if($installable) {?>
        <p>
            <a class="btn btn-large btn-primary" href="?install=true" >Install</a>
        </p>
        <?php } else { ?>
        <p>
            <button class="btn btn-large btn-danger" disabled=true>Cannot Install</button>
        </p>

        <?php } ?>

    </div>
<?php endif; ?>

</div> <!-- /container -->

</body>
</html>
