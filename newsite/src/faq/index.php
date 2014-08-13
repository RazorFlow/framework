<?php 
function custom_title () {
	return "FAQ";
}

function rf_topbar () {
	return array (
		'title' => 'FAQ',
    "url" => "/faq/"
	);
}

function extra_scripts () {
  return array("js/faq.js");
}

// function extra_styles() {
//     return array();
// }

// if(!function_exists('rf_trackpage')) {
//     function rf_trackpage () {
//         return array (
//             'name' => "Download Start",
//             'opts' => array (
//             )
//         );
//     }
// }


require $_SERVER['DOCUMENT_ROOT']."/layout/header.php";
?>
<div class="container">
  <div class="row rfBody">
    <div class="container faq-container">
      <h2>sales</h2>
      <hr>
        <div class="row">
          <div class="col-md-6 qa-container" id="faq-1">
            <p class="question">I am looking for a perpetual license, with one-time payment. Do you offer such licenses?</p>
            <p>
                 We do not offer such licenses off-the-shelf. If you have a specific need for such a license, please write to us at <a href="mailto:sales@razorflow.com">sales@razorflow.com</a>
            </p>
          </div>

          <div class="col-md-6 qa-container" id="faq-2">
            <p class="question">How long does it take you to send the activation keys after I have made the purchase?</p>
            <p>
                 Our products are pre-activated and do not require a a key. As soon as you make the purchase, you will get a link to download the software and you can start using it right away.
            </p>
          </div>
        </div>
        
        <div class="row">
          <div class="col-md-6 qa-container" id="faq-3">
            <p class="question">I would like to purchase your products but I cannot make the purchase online. What other methods of payment do you have?</p>
            <p>
                 We take payments via bank wire, purchase orders and checks as well. <a href="/support/sales.php">Contact sales</a> with details of the license you want to purchase and we will process the order for you.
            </p>
          </div>

          <div class="col-md-6 qa-container" id="faq-4">
            <p class="question">I need to submit a quote to our purchasing department. Can you send me one?</p>
            <p>
                 Sure. Please <a href="/support/sales.php">Contact sales</a> with your name, company, company address and details of the license you want to purchase and we will send you a quote.
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 qa-container" id="faq-5">
            <p class="question">I am building a mobile application, which will be distributed free of cost on the app stores. Which license should I use?</p>
            <p>
                 You can use the free developer license to develop and distribute RazorFlow Dashboards Framework with your app, if the app is non-commercial in nature. However, if the app generates revenues through advertisements, subscription, or one-time payment, you will need to purchase the OEM license.
            </p>
          </div>

          <div class="col-md-6 qa-container" id="faq-6">
            <p class="question">I am building dashboards for our corporate Intranet or Website, for consumption by employees, vendors or shareholders. What license would I need?</p>
            <p>
                 You can use the free developer license to build and test the dashboards. For deployment on internal or public servers for consumption by anyone beyond the development team, you will need a Corporate license.
            </p>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 qa-container" id="faq-7">
            <p class="question">How do you define a developer?</p>
            <p>
                 “Developers” are persons who are working directly or indirectly with RazorFlow Software, including front-end developers, designers, QA, server-side developers, to build the dashboards or components of the dashboards, including collating data, providing design and business logic. The developers can be affiliated to your organization, or another organization that is fully-owned, partly-owned, or contracted by your organization for development and testing.
            </p>
          </div>

          <div class="col-md-6 qa-container" id="faq-8">
            <p class="question">What is Active License period?</p>
            <p>
                 “Active subscription or License period” refers to an active and valid RazorFlow software license mandatory for deployment in your Commercial applications, which needs to be renewed and activated periodically by paying the license fees. During this period, you can use the framework to build dashboards, and you will get upgrades and private support from our developers.
            </p>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 qa-container" id="faq-9">
            <p class="question">What if I buy an Annual license and discontinue payments from next year?</p>
            <p>
                 You will have to stop using RazorFlow Dashboard framework for your existing dashboards, and you would not be able to build new dashboards using for your projects, once your active license period expires. In addition, you would not get upgrades and private support from our developers. 
            </p>
          </div>

          <div class="col-md-6 qa-container" id="faq-10">
            <p class="question">Does the licensing fee depend on the number of users who might be viewing the dashboard?</p>
            <p>
                 The licensing fee is completely independent of the number of people who view the dashboard.
            </p>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 qa-container" id="faq-11">
            <p class="question">We are a government organization/educational institution/NGO and would like to purchase your products. Do you have a special pricing for us?</p>
            <p>
                 Yes we do. We offer 10% discount to governments and 30% to educational institutions and NGOs. Please <a href="/support/sales.php">Contact sales</a> to avail the special pricing.
            </p>
          </div>

          <div class="col-md-6 qa-container" id="faq-12">
            <p class="question">How do you provide support for your products?</p>
            <p>
                 We provide technical support by email, phone and webmeetings.
            </p>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 qa-container" id="faq-13">
            <p class="question">Operating times</p>
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
      </div>
    </div>
  </div>
</div>

<?php
require $_SERVER['DOCUMENT_ROOT']."/layout/footer.php";
