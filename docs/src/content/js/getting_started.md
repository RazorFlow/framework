--
title: "Getting started with RazorFlow"
subtitle: ""
id: "getting_started"
hideTitle: true
--

<div class="gettingStarted">
<h3>What is a dashboard?</h3>
<p>
A dashboard is an easy-to-read collection of visual data showing current metrics, and other relevant information often used to make decisions.
</p>
<h5>Parts of a dashboard</h5>
<div class="gettingStarted-subContent">
<p class="no-margin-top">
In RazorFlow, you build dashboards that are comprised of multiple <a href="/docs/dashboard/js/guide/components/index.php">components</a>.
</p>
<div class="row">
<div class="component-container">
<div class="component">
This is a component
</div>
<div class="component">
This is a component
</div>
<div class="component">
This is a component
</div>
<div class="component">
This is a component
</div>
<div class="component">
This is a component
</div>
</div>
</div>
<p>
Each component has a specific type of data and is used to show some specific information. Here are a few examples of components that you can include using this framework:
</p>
<div class="row component-row">
<div class="col-md-3 col-sm-3 col-xs-5">
<p class="componentTitle">
Form Component
</p>
<img src="/static/images/getting-started/01_features.jpg">
</div>
<div class="col-md-3 col-sm-3 col-xs-5">
<p class="componentTitle">
Table Component
</p>
<img src="/static/images/getting-started/02_features.jpg">
</div>
<div class="col-md-3 col-sm-3 col-xs-5">
<p class="componentTitle">
Chart Component
</p>
<img src="/static/images/getting-started/03_features.jpg">
</div>
<div class="col-md-3 col-sm-3 col-xs-5">
<p class="componentTitle">
and, many more...
</p>
</div>
</div>
<div class="row icon-row">
<div class="col-md-1 col-sm-1 col-xs-1">
<i class="rf-icon rf_04_dashboard"></i>  
</div>
<div class="col-md-11 col-sm-11 col-xs-10">
<p class="dashboard-info">
Components are laid out in a grid layout and RazorFlow automatically adjusts the layout based on the device. You can also take full control if you need it.
</p>
</div>
</div>
<div class="row interation-row">
<div class="col-lg-8 col-md-10 col-sm-8 hidden-xs browser-container">
<div class="desktop front">
<div class="header"></div>
<div class="content">
<img src="/static/images/getting-started/browser_long.jpg" />
</div>
</div>
<div class="mobile behind">
<div class="content">
<img src="/static/images/getting-started/mobile_long.png" />
</div>
</div>
</div>
</div>
</div>
<h5 class="margin-top-80">Installing and creating your first dashboard</h5>
<div class="gettingStarted-subContent">
<div class="row steps step-1">
<div class="col-lg-8 col-md-7 col-sm-7 col-middle">
<h6 class="">Step 1:</h6>
<p>
Visit <a href="/download">https://www.razorflow.com/download</a> to download RazorFlow Framework files to your computer. It is a free, fully-functional evaluation version. 
</p>
</div>
<div class="col-lg-5 col-md-6 col-sm-5 pull-right right-align">
<img src="/static/images/getting-started/05_step1.jpg">
</div>
</div>
<div class="row steps step-2">
<div class="col-lg-6 col-md-12 col-sm-5 col-middle">
<h6 class="">Step 2:</h6>
<p>
Extract this file, and open the directory that got extracted. You will find the following files.
</p>
</div>
<div class="col-lg-7 col-md-12 col-sm-8 pull-right right-align">
<img src="/static/images/getting-started/06_step2.jpg">
</div>
</div>
<div class="row info-row">
<div class="col-md-12">
<div class="info">
<p>
Note: There are many ways to create a dashboard, but when you're getting started, we recommend you use the <strong>dashboard_quickStart</strong> folder, which is described here. All other techniques are described in detail in the <a href="/docs">documentation</a>.
</p>
</div>
</div>
</div>
<div class="row steps step-3">
<div class="col-md-8">
<h6 class="">Step 3:</h6>
<p>
Open dashboard_quickstart > index.html in your browser.
</p>
</div>
<div class="col-md-8">
<img src="/static/images/getting-started/07_step3.jpg">
</div>
<div class="col-md-8">
<img src="/static/images/getting-started/08_step3.jpg">
</div>
</div>
<div class="row steps step-4">
<div class="col-md-10">
<h6 class="">Step 4: Explanation of dashboard_app.js</h6>
<p>
Copy <strong>dashboard_quickstart</strong> folder to some other folder in your computer. You can also rename it if you want. Open <strong>dashboard_quickstart > js > dashboard_app.js</strong>
</p>
</div>
<div class="col-md-10">
<img src="/static/images/getting-started/09_step4.jpg">
</div>
</div>
<div class="row steps step-5">
<div class="col-md-10">
<h6 class="">Step 5:</h6>
<p>
The <span class="highlight">StandaloneDashboard</span>  function sets up a dashboard which takes up the entire page, and is fully optimized.
This also gives you a variable called  <span class="highlight">db</span>  which is the main dashboard Object which is used to add components to dashboards or perform other high-level operations.
</p>
<p>
Now, add component and component attributes.
</p>
</div>
</div>

<div class="row no-margin-top">
<div class="col-md-6">
<pre class="gettingStarted_pre">
<code>
StandaloneDashboard(function(db) {
db.setDashboardTitle ("My Dashboard");

// Configure your dashboard here.
}
</code>
</pre>
</div>
</div>

<div class="row">
<div class="col-md-6 arrow">
<pre class="gettingStarted_pre">
<code>
StandaloneDashboard(function(db) {
var chart = new ChartComponent("My Dashboard");
db.addComponent (chart);
}
</code>
</pre>
</div>
<div class="col-md-6 code-block">
<p class="code highlight">
var chart = new ChartComponent ();
</p>
<p class="margin-top-5">
This creates a variable called  <span class="highlight">chart</span> , which is a Component Object. This object is used to control the parameters, behaviour and interactivity of a single chart component on the dashboard.
</p>
</div>
</div>

<div class="row">
<div class="col-md-6 arrow">
<pre class="gettingStarted_pre">
<code>
StandaloneDashboard(function(db) {
var chart = new ChartComponent("My Dashboard");
chart.setCaption("Sales");
chart.setDimensions (6, 6); 
chart.setLabels (["2013", "2014", "2015"]);
chart.addSeries ([3151, 1121, 4982]);
db.addComponent (chart);
}
</code>
</pre>
</div>
<div class="col-md-6 code-block step-5-last-code-block">
<p class="no-margin">
<span class="code highlight">chart.setCaption ("Sales");</span>
<span class="code highlight">chart.setLabels (["2013", "2014", "2015");</span>
<span class="code highlight">chart.addSeries ([3151, 1121, 4982]);</span>
</p>
<p class="margin-top-5">
These three lines call 3 different functions on the  <span class="highlight">chart</span>  variable (which is the component object).
</p>
</div>
</div>

<div class="row no-margin-top">
<div class="col-md-12">
<p>
This does things like setting caption, and chart labels and data. Don't worry about the specifics we'll go into detail in a later article.
</p>
</div>
</div>


<div class="row setRelative no-margin-top sales-row">
<div class="col-md-6 col-sm-6 col-xs-5 col-middle">
<p class="arrow">
With the above few lines of code, you will create a <strong>Column Chart</strong> component like shown in the figure here:
</p>
</div>
<div class="col-md-7 col-sm-7 pull-right right-align">
<img src="/static/images/getting-started/11_colCh.jpg">
</div>
</div>
</div>
<h5 class="margin-top-80">Customizing with parameters</h5>
<div class="gettingStarted-subContent">
<div class="row">
<div class="col-md-6">
<pre class="gettingStarted_pre">
<code>
StandaloneDashboard(function(db) {
var chart = new ChartComponent("My Dashboard");
chart.setCaption("Sales");
chart.setDimensions (6, 6); 
chart.setLabels (["2013", "2014", "2015"]);
chart.addSeries ([3151, 1121, 4982]);
db.addComponent (chart);
}
</code>
</pre>
</div>
</div>

<div class="row">
<div class="col-md-12">
<p>
You're passing a separate parameter to the  <span class="highlight">addSeries</span>  function. This is a regular JavaScript Object/Dictionary. A lot of functions in RazorFlow take a parameter like this, and it's called the Options Object.
</p>
<p>
That's because it allows you to fine-tune some aspects of the component which are optional, and helps the dashboard work better and make more sense.
</p>
</div>
</div>

<div class="row">
<div class="col-md-6">
<pre class="gettingStarted_pre">
<code>
StandaloneDashboard(function(db) {
var chart = new ChartComponent("My Dashboard");
chart.setCaption("Sales");
chart.setDimensions (6, 6); 
chart.setLabels (["2013", "2014", "2015"]);
chart.addSeries ([3151, 1121, 4982]);
db.addComponent (chart);
}
</code>
</pre>
</div>
</div>

<div class="row margin-top-25">
<div class="col-md-12">
<p>
Here, we're setting the  <span class="highlight">numberPrefix</span>  to  <span class="highlight">$</span> , this means that every number will have a  <span class="highlight">$</span>  before it indicating that it's currency. Also, the chart will be display as a line chart allowing the user to better spot trends in the data changing.
</p>
</div>
</div>

<div class="row setRelative sales-row">
<div class="col-md-6 col-sm-6 col-xs-5 col-middle">
<p class="arrow">
With the above few lines of code, you will create a <br /><strong>Line Chart</strong> component like shown in the figure here:
</p>
</div>
<div class="col-md-7 col-sm-7 pull-right right-align">
<img src="/static/images/getting-started/12_lineCh.jpg">
</div>
</div>


</div>

<h5 class="margin-top-80">Recap of core concepts</h5>
<div class="gettingStarted-subContent recap">
<div class="row">
<div class="col-md-7">
<pre class="gettingStarted_pre">
<code>
StandaloneDashboard(function(db) {
var chart = new ChartComponent("My Dashboard");
chart.setCaption("Sales");
chart.setDimensions (6, 6); 
chart.setLabels (["2013", "2014", "2015"]);
chart.addSeries ([3151, 1121, 4982]);
chart.addSeries ([3151, 1121, 4982], {
numberPrefix: "$",
seriesDisplayType: "line"
});
db.addComponent (chart);
}
</code>
</pre>
</div>
</div>

<div class="row">
<div class="col-md-12">
<p>
Lastly, let’s summarize the concepts that we learnt so far:
</p>
</div>
</div>

<div class="row summarize-row">
<table class="table hidden-xs">
<tr>
<td>
<span><span class="summarize-highlight">StandaloneDashboard</span> (function (db) {</span>
</td>
<td><span>Create an empty dashboard</span></td>
</tr>
<tr>
<td>
<span>StandaloneDashboard (function (<span class="summarize-highlight">db</span>) {</span>
</td>
<td><span>Dashboard object</span></td>
</tr>
<tr>
<td>
<span>
var <span class="summarize-highlight">chart</span> = new ChartComponent ();
</span>
</td>
<td><span>Component object</span></td>
</tr>
<tr>
<td>
<span>
var chart = new <span class="summarize-highlight">ChartComponent</span> ();
</span>
</td>
<td><span>Component class</span></td>
</tr>
<tr>
<td>
<span>
chart.<span class="summarize-highlight">setLabels</span> (["2013", "2014", "2015");
</span>
</td>
<td><span>Component function</span></td>
</tr>
<tr class="multiple-line-row">
<td>
<span>
<span class="summarize-highlight">numberPrefix</span>: "$",
</span>
<span>
<span class="summarize-highlight">seriesDisplayType</span>: "line"
</span>
</td>
<td><span>Options object</span></td>
</tr>
<tr>
<td><span class="summarize-highlight">db.addComponent (chart);</span></td>
<td>Add a component to the dashboard</td>
</tr>
</table>
<div class="col-xs-12 visible-xs">
<p>Create an empty dashboard</p>
<p><span class="summarize-highlight">StandaloneDashboard</span> (function (db) {</p>
<p>Dashboard object</p>
<p>StandaloneDashboard (function (<span class="summarize-highlight">db</span>) {</p>
<p>Component object</p>
<p>var <span class="summarize-highlight">chart</span> = new ChartComponent ();</p>
<p>Component class</p>
<p>var chart = new <span class="summarize-highlight">ChartComponent</span> ();</p>
<p>Component function</p>
<p>chart.<span class="summarize-highlight">setLabels</span> (["2013", "2014", "2015");</p>
<p>Options object</p>
<p>
<span class="summarize-highlight">numberPrefix</span>: "$",<br>
<span class="summarize-highlight">seriesDisplayType</span>: "line"
</p>
<p>Add a component to the dashboard</p>
<p><span class="summarize-highlight">db.addComponent (chart);</span></p>
</div>
</div>
</div>

<h5 class="margin-top-80">Next Steps:</h5>
<div class="row next-steps">
<div class="col-md-6">
<p class="finalTitle"><a href="/docs/dashboard/js/guide/data/dashboard_first.php">Get data from a server</a></p>
<p class="desc">Use different techniques including AJAX to fetch the right data from your server and display it on your dashboard.</p>
</div>

<div class="col-md-6">
<p class="finalTitle"><a href="/docs/dashboard/js/guide/dashboard/webframework_standalone.php">Integrate with an existing application</a></p>
<p class="desc">Embed the dashboard and integrate it with your application to make it feel like your existing application.</p>
</div>
</div>
<div class="row next-steps">
<div class="col-md-6">
<p class="finalTitle"><a href="/docs/dashboard/js/guide/components/chart/chart_event_click.php">Interactivity</a></p>
<p class="desc">Make the dashboard interactive and fun for your users to use.</p>
</div>
</div>
</div>
<script type="text/javascript">
$(function() {

  var codeBoxes = $('pre');
  var animatingStatus = false;
  codeBoxes.each(function() {
    var code = $(this).text().trim();
    var div = $('<div/>').addClass('codeBox');
    $(this).replaceWith(div);
    CodeMirror(div[0], {
      value: code,
      mode: 'javascript',
      theme: 'solarized-dark',
      lineNumbers: true,
      readOnly: true
    });
  });

  $(".mobile").on('click', function () {
    var $mobile = $(this);
    var $desktop = $(".desktop");
    animatingStatus = true;
    if($(this).hasClass("behind")) {
      $mobile.animate({
        right: '-160'
      }, function () {
        animatingStatus = false;
        $mobile.addClass("front").removeClass("behind");
        $desktop.addClass("behind").removeClass("front");
        $mobile.animate({
          right: '0'
        });
      });  
    }
    
  });

  $(".desktop").on('click', function () {
    var $desktop = $(this);
    var $mobile = $(".mobile");
    animatingStatus = true;
    if($(this).hasClass("behind")) {
      $mobile.animate({
        right: '-160'
      }, function () {
        animatingStatus = false;
        $mobile.addClass("behind").removeClass("front");
        $desktop.addClass("front").removeClass("behind");
        $mobile.animate({
          right: '0'
        });
      });
    }
  });

  $(".mobile").hover(function () {
    if (!animatingStatus) {
      $(this).stop().animate({
        "right": "-20"
      });
      $(".desktop").css({
        "left": "-20px"
      });
    }
  }, function () {
    if (!animatingStatus) {
      $(this).stop().animate({
        "right": "0px"
      });
      $(".desktop").css({
        "left": "0px"
      });
    }
  });


});
</script>