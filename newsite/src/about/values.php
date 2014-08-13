<?php 
function custom_title () {
	return "RazorFlow Corporate Values";
}

function rf_topbar () {
	return array (
		'url' => '/about/company.php',
		'title' => 'RazorFlow Corporate Values'
	);
}

function extra_scripts () {
  return array(
    // "vendor/fancybox/jquery.fancybox.pack.js",
    // "js/rfBuyPage.js"
  );
}

function extra_styles () {
  return array(
  );
}

if(!function_exists('rf_trackpage')) {
    function rf_trackpage () {
        return array (
            'name' => "Corporate Values",
            'opts' => array (
            )
        );
    }
}


require $_SERVER['DOCUMENT_ROOT']."/layout/header.php";
?>
<div class="container">
  <div class="row">
  <div class="col-md-8 col-md-offset-2" style="margin-top:50px">
    <p>Many believe that a company is defined by it's values. And they usually talk about their values for the world to see, often accompanied by a stock photograph of people shaking hands. Words like "Integrity", "teamwork", "innovation", "community", and "excellence" are plentiful.</p>
    <p>For us, there's just one word - "product". For us the product is more than just the code - it's the fact that somewhere in the world, because of our efforts, people get their work done faster, and have more time to do what they love - be it spend time with their family or play video games. That's why we pour our heart and soul into our product - from our documentation and support, to every line of code and every pixel of design.</p>
    <p>But if we <strong>had</strong> to pick one statement we consider a value that defines us, we'd pick lyrics to a <a href="http://en.wikipedia.org/wiki/Harder,_Better,_Faster,_Stronger">Daft Punk song</a></p>
    <p class="text-center lead" style="margin-top: 25px;">Work It Harder Make It Better<br/>
Do It Faster, Makes Us stronger<br/>
More Than Ever Hour After<br/>
Our Work Is Never Over<br/>
</p>
<p class="text-center">
<iframe width="420" height="315" src="//www.youtube.com/embed/K2cYWfq--Nw" frameborder="0" allowfullscreen></iframe>
</p>

  </div>
  </div>
</div>
<?php
require $_SERVER['DOCUMENT_ROOT']."/layout/footer.php";
