<?php 
function custom_title () {
	return "RazorFlow Pricing";
}

function setActive () {
  return "pricing";
}

function rf_topbar () {
	return array (
		'title' => 'Pricing',
        "url" => "/dashboard/buy/"
	);
}

function extra_scripts () {
  return array(
    "vendor/fancybox/jquery.fancybox.pack.js",
    "js/rfBuyPage.js"
  );
}

function extra_styles () {
  return array(
    "vendor/fancybox/jquery.fancybox.css"
  );
}

if(!function_exists('rf_trackpage')) {
    function rf_trackpage () {
        return array (
            'name' => "Pricing",
            'opts' => array (
            )
        );
    }
}

function printJsonData ($section, $obj) {
    foreach ($obj as $key => $value) {
        if($key === "title" || $key == "Pricing") {
            continue;
        }

        for($i =0; $i<count($value);$i++) {
                if(gettype($value[$i]) === "boolean") {
                    if($value[$i]) {
                        $value[$i] = '<i class="rf-icon rf_tick"></i>';
                    } else {
                        $value[$i] = '<i class="rf-icon rf_cross"></i>';
                    }
                }
            }
?>
        <tr class="pricingContent <?php echo $section; ?>">
            <td>
            <p class="section-subtitle">
                <?php echo $key;
                    if(isset($value[2])) { 
                        echo '<i title="'.$value[2].'" class="rf-icon rf_info"></i>';
                    } 
                ?>
                </p>
            </td>
            <td><?php echo $value[0]; ?></td>
            <td><?php echo $value[1]; ?></td>
        </tr>

        <tr class="giveBorder <?php echo $section; ?>">
            <td colspan="3">
                <hr>
            </td>
        </tr>
<?php
    }
}

function printMobileJsonData($plan, $obj) {
    foreach ($obj as $key => $value) {
        if($key === "title") {
            continue;
        }

        for($i =0; $i<count($value);$i++) {
                if(gettype($value[$i]) === "boolean") {
                    if($value[$i]) {
                        $value[$i] = '<i class="rf-icon rf_tick"></i>';
                    } else {
                        $value[$i] = '<i class="rf-icon rf_cross"></i>';
                    }
                }
            }

?>

         <div class="planSub">
            <p class="subIndexTitle"><?php echo $key; ?></p>
            <p class="subInfo">
            <?php 
                if($plan=="standard") {
                    echo $value[0];
                } else {
                    echo $value[1];
                }
            ?></p>
            <?php
                if(isset($value[2])) { 
                ?>
                    <p class="moreInfo">+ More Info</p>
                    <p class="moreInfoContent" style="display: none;">
                        <?php echo $value[2]; ?>
                    </p>
                <?php
                }
            ?>
        </div>
<?php
    }
}


require $_SERVER['DOCUMENT_ROOT']."/layout/header.php";
?>
<div class="container">
    <div class="row rfBody">
        <?php
            $json = file_get_contents("pricing.json");
            $obj = json_decode($json, true);

            $id="corporate";
            $faqMode = false;
            if(isset($_GET["type"])) {
                if($_GET["type"] == "corporate" || $_GET["type"] == "oem" || $_GET["type"] == "saas") {
                    $id = $_GET["type"];
                }
                // if($_GET["type"] == "faq") {
                //     $faqMode = true;
                // }
            }
            $plan = null;
            if(isset($_GET["plan"])) {
                if($_GET["plan"] == "direct" || $_GET["plan"] == "standard") {
                    $plan = $_GET["plan"];
                }
            }
        ?>
        <div class="alert alert-info hidden-sm hidden-xs">
            <h5 class="offer">RazorFlow Dashboard Framework offers a <a class="rfstrong dottedUnderline" href="/download/">Free Developer License</a> for evaluation and testing.</h5>
            <!-- <a href="" class="learnMore">Learn more about the free developer license here</a> -->
        </div>
        <div class="container pricingBody">
            <div class="col-md-12" style="<?php if(isset($plan) || $faqMode) echo 'display:none' ?>">
                <h5 class="log">Choose the license that suits your requirements. If you need help choosing, <a href="/support/sales.php">contact our sales team</a></h5>
            </div>

            <table class="table pricingTable hidden-xs hidden-sm">
                <thead>
                    <tr class="pricingLink">
                        <th id="Corporate" class="<?php if($id=="corporate") { echo "active"; }?>">
                            <a href="/dashboard/buy?type=corporate">
                                <div class="full">
                                    <i class="rf-icon rf_corporate"></i>
                                    <p class="licenseTitle">Corporate License</p>
                                    <p>Deploy dashboards for basic commercial use like corporate websites, company intranets.</p>
                                </div>
                            </a>
                        </th>
                        <th id="Saas" class="<?php if($id=="saas") { echo "active"; }?>">
                            <a href="/dashboard/buy?type=saas">
                                    <div class="full">
                                        <i class="rf-icon rf_saas"></i>
                                        <p class="licenseTitle">Saas<br>License</p>
                                        <p>Use in Software as a Service (SaaS) applications.</p>
                                    </div>
                            </a>
                        </th>
                        <th id="Oem" class="<?php if($id=="oem") { echo "active"; }?>"> 
                            <a href="/dashboard/buy?type=oem">
                                <div class="full">
                                     <i class="rf-icon rf_oem"></i>
                                    <p class="licenseTitle">Oem<br>License</p>
                                    <p>Distribute products which contain RazorFlow-powered dashboards, for on-premise delivery.</p>
                                </div>
                            </a>
                        </th>
                    </tr>
                    <tr>
                        <th class="markerRow" colspan="3"><span class="pricingMarker<?php echo ucfirst($id); ?>"></span></th>
                    </tr>
                </thead>
                 <tbody>
                    <tr class="licenseInfo">
                        <td colspan="3">
                            <div class="col-md-1 corpIconContainer iccontainer_<?php echo $id; ?>">
                                <i class="rf-icon rf_<?php echo $id; ?>"></i>
                            </div>
                            <div class="col-md-11 corpTextContainer">
                                <h5>
                                    <?php
                                       echo $obj["subtitle"][$id];
                                    ?>
                                </h5>
                            </div>    
                        </td>
                    </tr>

                    <tr class="planHeadRow">
                        <td></td>
                        <td>
                            <p class="planTitle">Standard Plan</p>
                            <!-- <p class="planSub">For use in SaaS applications</p> -->
                            <p class="standardPrice"><?php echo $obj[$id]["pricing"]["Pricing"][0] ?></p>
                            <p class="licensePerYear">license/year</p>
                        </td>
                        <td>
                            <p class="planTitle">DevDirect Plan</p>
                            <!-- <p class="planSub">For use in SaaS applications</p> -->
                            <p class="devPrice"><?php echo $obj[$id]["pricing"]["Pricing"][1] ?></p>
                            <p class="licensePerYear">license/year</p>
                        </td>
                    </tr>
                    <?php

                        foreach ($obj[$id] as $key => $value) {
                    ?>
                            <tr class="subTitle" id="<?php echo $key; ?>">
                                <td colspan="3">
                                        <i class="rf-icon rf_arrow_down">
                                        </i>
                                    <h6><?php echo $value["title"] ?></h6>
                                </td>
                            </tr>
                    <?php
                            printJsonData($key, $value);
                            printJsonData($key, $obj["common"][$key]);
                        }
                    ?>
                    <tr class="pricingContent pricing">
                        <td>
                            <p class="section-subtitle">
                                Pricing
                            </p>
                        </td>
                        <td>
                            <p class="standardPrice"><?php echo $obj[$id]["pricing"]["Pricing"][0] ?></p>
                            <p class="licensePerYear">license/year</p>
                            <a href="<?php echo $obj["eula"][$id][0] ?>" class="readEULA">Read EULA</a>
                            <span class="curveLeftTop"></span>
                            <span class="curveLeftBottom"></span>
                            <span class="curveTop"></span>
                            <span class="curveBottom"></span>
                        </td>
                        <td>
                            <p class="devPrice"><?php echo $obj[$id]["pricing"]["Pricing"][1] ?></p>
                            <p class="licensePerYear">license/year</p>
                            <a href="<?php echo $obj["eula"][$id][1] ?>" class="readEULA">Read EULA</a>
                            <span class="curveLeftTop"></span>
                            <span class="curveLeftBottom"></span>
                            <span class="curveTop"></span>
                            <span class="curveBottom"></span>
                        </td>
                    </tr>
                    <tr class="pricingContent buyNow">
                        <td></td>
                        <td>
                            <form action="/dashboard/buy/checkout.php?type=<?php echo $id; ?>&plan=standard" method="post">
                                <input type="hidden" name="price" value="<?php echo $obj[$id]["pricing"]["Pricing"][0] ?>">
                                <input type="hidden" name="planCode" value="<?php echo $obj['planCode'][$id][0] ?>">
                                <button type="submit" class="btn btn-secondary btn-rounded buyBtn">Buy Now <i class="rf-icon rf_arrow_right"></i></button>
                            </form>
                        </td>
                        <td>
                            <form action="/dashboard/buy/checkout.php?type=<?php echo $id; ?>&plan=direct" method="post">
                                <input type="hidden" name="price" value="<?php echo $obj[$id]['pricing']["Pricing"][1] ?>">
                                <input type="hidden" name="planCode" value="<?php echo $obj["planCode"][$id][1] ?>">
                                <button type="submit" class="btn btn-secondary btn-rounded buyBtn">Buy Now <i class="rf-icon rf_arrow_right"></i></button>
                            </form>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- <div class="container faq-container hidden-xs">
                <h2 class="faq-title">FAQ</h2>
                <hr class="faq-divider"></hr>
                <?php //perch_content('faq') ?>
                <div class="col-md-6 qa-container">
                    <p class="question">OPERATION TIME</p>
                    <div class="answer">
                        <p>
                           For phone support, and requirements discussion, we are available from <strong>9 AM to 11:30 PM (GMT+0530) (Indian Standard Time)</strong>. If you would like to schedule a call with us, it would be helpful if it would be within these times.
                        </p>
                        <p>
                           Our operating time in other time-zones are:
                        </p>
                        <table class="table table-horzontal">
                            <thead>
                                <tr>
                                    <th>Time Zone</th>
                                    <th>Suggested Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Pacific Time (USA)</td>
                                    <td>Before 11:30 AM</td>
                                </tr>
                                <tr>
                                    <td>Eastern Time (USA)</td>
                                    <td>Before 2:30 PM</td>
                                </tr>
                                <tr>
                                    <td>GMT/UTC</td>
                                    <td>Before 6:30 PM</td>
                                </tr>
                                <tr>
                                    <td>Australia</td>
                                    <td>After 1:30 PM</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div> -->

            <div class="col-md-12 visible-sm visible-xs" id="mobilePricing">
                <?php if(!($faqMode) || $plan != null) { ?>
                <ul class="pricingLink" style="<?php if(isset($_GET["type"]) && $plan!=null) echo "display:none" ?>">
                    <li id="corporate" class="plan <?php if(isset($_GET['type']) && $id=="corporate") { echo "active"; }?>">
                        <a class="mobTitleLink" href="/dashboard/buy?type=corporate#corporate">
                            <div class="col-xs-12 full">
                                <div class="col-xs-1">
                                    <i class="rf-icon rf_corporate"></i>
                                </div>
                                <div class="col-xs-8">
                                    <p class="licenseTitle">Corporate License</p>
                                </div>
                                <div class="col-xs-1 pull-right">
                                    <i class="rf-icon rf_arrow_right"></i>
                                </div>
                            </div>
                        </a>
                        <div class="col-xs-12 drop <?php if(isset($_GET['type']) && $id=="corporate") { echo "show"; }?>">
                            <ul class="planDetails">
                                <li>
                                    <p class="mobileInfo">
                                        <?php echo $obj["subtitle"]["corporate"]; ?>
                                    </p>
                                    <a class="col-xs-12 subTitle" href="/dashboard/buy?type=corporate&plan=standard#moreInfo">
                                        <i class="rf-icon rf_arrow_right pull-right"></i>
                                        <p class="planTitle">Standard Plan</p>
                                        <!-- <p class="planSub">For use in SaaS applications</p> -->
                                        <p class="standardPrice"><?php echo $obj["corporate"]["pricing"]["Pricing"][0] ?></p>
                                        <p class="licensePerYear">/license/year</p>
                                    </a>
                                    <div class="col-xs-12 line">
                                        <hr>
                                    </div>
                                    <a class="col-xs-12 subTitle" href="/dashboard/buy?type=corporate&plan=direct#moreInfo">
                                        <i class="rf-icon rf_arrow_right pull-right"></i>
                                        <p class="planTitle">DevDirect Plan</p>
                                        <!-- <p class="planSub">For use in SaaS applications</p> -->
                                        <p class="standardPrice"><?php echo $obj["corporate"]["pricing"]["Pricing"][1] ?></p>
                                        <p class="licensePerYear">/license/year</p>
                                    </a>
                                </li>
                                
                            </ul>
                        </div>
                        
                    </li>
                    <li id="saas" class="plan saas <?php if($id=="saas") { echo "active"; }?>">
                        <a class="mobTitleLink" href="/dashboard/buy?type=saas#saas">
                            <div class="col-xs-12 full">
                                <div class="col-xs-1">
                                    <i class="rf-icon rf_saas"></i>
                                </div>
                                <div class="col-xs-8">
                                    <p class="licenseTitle">Saas License</p>
                                </div>
                                <div class="col-xs-1 pull-right">
                                    <i class="rf-icon rf_arrow_right"></i>
                                </div>
                            </div>
                        </a>

                        <div class="col-xs-12 drop <?php if($id=="saas") { echo "show"; }?>">
                            <ul class="planDetails">
                                <li>
                                    <p class="mobileInfo">
                                        <?php echo $obj["subtitle"]["saas"]; ?>
                                    </p>
                                    <a class="col-xs-12 subTitle" href="/dashboard/buy?type=saas&plan=standard#moreInfo">
                                        <i class="rf-icon rf_arrow_right pull-right"></i>
                                        <p class="planTitle">Standard Plan</p>
                                        <!-- <p class="planSub">For use in SaaS applications</p> -->
                                        <p class="standardPrice"><?php echo $obj["saas"]["pricing"]["Pricing"][0] ?></p>
                                        <p class="licensePerYear">/license/year</p>
                                    </a>
                                    <div class="col-xs-12 line">
                                        <hr>
                                    </div>
                                    <a class="col-xs-12 subTitle" href="/dashboard/buy?type=saas&plan=direct#moreInfo">
                                        <i class="rf-icon rf_arrow_right pull-right"></i>
                                        <p class="planTitle">DevDirect Plan</p>
                                        <!-- <p class="planSub">For use in SaaS applications</p> -->
                                        <p class="standardPrice"><?php echo $obj["saas"]["pricing"]["Pricing"][1] ?></p>
                                        <p class="licensePerYear">/license/year</p>
                                    </a>
                                </li>
                                
                            </ul>
                        </div>
                    </li>
                    <li id="oem" class="plan oem <?php if($id=="oem") { echo "active"; }?>">
                        <a class="mobTitleLink" href="/dashboard/buy?type=oem#oem">
                            <div class="col-xs-12 full">
                                <div class="col-xs-1">
                                    <i class="rf-icon rf_oem"></i>
                                </div>
                                <div class="col-xs-8">
                                    <p class="licenseTitle">OEM License</p>
                                </div>
                                <div class="col-xs-1 pull-right">
                                    <i class="rf-icon rf_arrow_right"></i>
                                </div>
                            </div>
                        </a>

                        <div class="col-xs-12 drop <?php if($id=="oem") { echo "show"; }?>">
                            <ul class="planDetails">
                                <li>
                                    <p class="mobileInfo">
                                        <?php echo $obj["subtitle"]["oem"]; ?>
                                    </p>
                                    <a class="col-xs-12 subTitle" href="/dashboard/buy?type=oem&plan=standard#moreInfo">
                                        <i class="rf-icon rf_arrow_right pull-right"></i>
                                        <p class="planTitle">Standard Plan</p>
                                        <!-- <p class="planSub">For use in SaaS applications</p> -->
                                        <p class="standardPrice"><?php echo $obj["oem"]["pricing"]["Pricing"][0] ?></p>
                                        <p class="licensePerYear">/license/year</p>    
                                    </a>
                                    <div class="col-xs-12 line">
                                        <hr>
                                    </div>
                                    <a class="col-xs-12 subTitle" href="/dashboard/buy?type=oem&plan=direct#moreInfo">
                                        <i class="rf-icon rf_arrow_right pull-right"></i>
                                        <p class="planTitle">DevDirect Plan</p>
                                        <!-- <p class="planSub">For use in SaaS applications</p> -->
                                        <p class="standardPrice"><?php echo $obj["oem"]["pricing"]["Pricing"][1] ?></p>
                                        <p class="licensePerYear">/license/year</p>
                                    </a>
                                </li>
                                
                            </ul>
                        </div>
                    </li>
                    <!-- <li class="plan">
                        <div class="col-xs-12 full" style="background:none;">
                            <hr>
                        </div>
                    </li>
                    <li id="faq" class="plan">
                        <a href="/dashboard/buy?type=faq#faqMoreInfo">
                            <div class="col-xs-12 full">
                                <div class="col-xs-8">
                                    <p class="licenseTitle">FAQ</p>
                                </div>
                                <div class="col-xs-1 pull-right">
                                    <i class="rf-icon rf_arrow_right"></i>
                                </div>
                            </div>
                        </a>
                    </li> -->
                </ul>
                <?php 
                    }
                    if(isset($_GET["type"]) && $plan != null) {
                ?>
                <div class="moreInfoContainer" id="moreInfo">
                    <a href="/dashboard/buy">
                        <div class="col-sm-12 mobilelBack">
                            <i class="rf-icon rf_arrow_left pull-left"></i>
                            Back to License Types
                        </div>
                    </a>

                    <p class="licenseName"><?php echo $_GET["type"]; ?> License</p>
                    <p class="planName">
                    <?php
                        if($plan == "standard") {
                            echo "Standard";
                        } else {
                            echo "DevDirect";
                        }
                    ?>
                     Plan</p>
                    
                    <?php

                        foreach ($obj[$id] as $key => $value) {
                    ?>
                            <div class="subTitle">
                                <?php echo $value["title"] ?>
                            </div>
                    <?php
                            printMobileJsonData($_GET['plan'], $value);
                            printMobileJsonData($_GET['plan'], $obj["common"][$key]);
                        }
                    ?>
                </div>
                <?php
                    }
                    // if($faqMode) {
                ?>
                <!-- <div class="moreInfoContainer" id="faqMoreInfo">
                    <a href="/dashboard/buy">
                        <div class="col-sm-12 mobilelBack">
                            <i class="rf-icon rf_arrow_left pull-left"></i>
                            Back to License Types
                        </div>
                    </a>

                    <?php // perch_content('faq') ?>
                </div>
                <?php
                    // }
                ?> -->
                
            </div>
        </div>
    </div>
</div>
<?php 
            if(isset($_GET["type"]) && $plan != null) {
                if($plan=="standard") {
                    $price = $obj[$id]["pricing"]["Pricing"][0];
                    $planCode = $obj['planCode'][$id][0];
                } else if ($plan=="direct") {
                    $price = $obj[$id]["pricing"]["Pricing"][1];
                    $planCode = $obj['planCode'][$id][1];
                }
        ?>
        <form action="/dashboard/buy/checkout.php?type=<?php echo $id; ?>&plan=<?php echo $plan; ?>" method="post">
            <input type="hidden" name="price" value="<?php echo $price ?>">
            <input type="hidden" name="planCode" value="<?php echo $planCode ?>">
            <button type="submit" class="btn btn-secondary mobileBuyBtn visible-xs visible-sm fit-width no-radius">Buy Now <i class="rf-icon rf_arrow_right"></i></button>
        </form>
        <?php
            }
        ?>
<?php
require $_SERVER['DOCUMENT_ROOT']."/layout/footer.php";
