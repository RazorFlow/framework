<?php 
function custom_title () {
	return "Thank you for your purchase";
}

function rf_topbar () {
	return array (
		'title' => 'THANK YOU',
        "url" => "/dashboard/buy/thanks.php"
	);
}

if(!function_exists('rf_trackpage')) {
    function rf_trackpage () {
        return array (
            'name' => "Purchase Complete",
            'opts' => array (
            )
        );
    }
}


require $_SERVER['DOCUMENT_ROOT']."/layout/header.php";
?>

<div class="container">
    <div class="row rfBody thanksBody">
        <div class="col-md-12">
            <h1 class="text-center">Thank you for your purchase!</h1>
            <!-- <p class="subtext">
                The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children.
            </p> -->
        </div>
        <div class="col-md-6 invoiceMessage">
            <div class="subContainer text-center">
                <i class="rf-icon rf_documentation"></i>
                <h5>Need an invoice?</h5>
                <p class="text-left">
                    An invoice for your purchase has been automatically emailed to you by our payment partner, Avangate. This will be emailed to the address provided during the checkout.
                </p>
                <p>If you need an additional copy of the invoice, please <a href="/contact/sales.php">contact sales team</a> or email <a href="mailto:sales@razorflow.com">sales@razorflow.com</a>.</p>
            </div>
        </div>

        <div class="col-md-6 emailMessage">
            <div class="subContainer text-center">
            <i class="rf-icon rf_call_ico"></i>
                <h5>Need phone support?</h5>
                <p class="text-left">
                    Your pre-order entitles you to priority support over email and phone. You can get direct one-on-one technical support with the same people who build RazorFlow Dashboard Framework.
                </p>
                 <p>Let us know if we can help! <a href="/contact/support.php">Contact our support team</a> or email <a href="mailto:support@razorflow.com">support@razorflow.com</a>.</p>
            </div>
        </div>
    </div>
</div>
<?php
require $_SERVER['DOCUMENT_ROOT']."/layout/footer.php";
