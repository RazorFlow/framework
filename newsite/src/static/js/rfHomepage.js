$(function () {
	var animStatus = false;
	var $script = $("<script />", {
	  "type" : "text/javascript",
	  "charset" : "utf-8",
	  "src" : "/static/animation/homepage_hype_generated_script.js"
	});
	$(document).scroll(function () {
	  if(($(document).scrollTop() + window.innerHeight >= $("#homepage_hype_container").offset().top) && !animStatus) {
	    animStatus = true;
	    $("#homepage_hype_container").html($script);
	  }
	});
});