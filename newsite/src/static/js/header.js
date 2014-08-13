function checkOffset(content, foot) {
    if ($(content).offset().top + $(content).height() >= $(foot).offset().top - 10) $(content).css({'position': 'relative', 'margin-bottom': '30px'});
    if ($(document).scrollTop() + window.innerHeight < $(foot).offset().top) $(content).css({'position':'fixed', 'margin-bottom': '0px'}); // restore when you scroll up
}

var scrollStatus = true;

$(function () {
	$(".rfMenuDownloadItem").hover(function () {
		$(this).addClass("rfMenuDownloadExpanded")
			   .html('<a href="/download/">Download your <b>Free developer version</b></a>');
	}, function () {
		$(this).removeClass("rfMenuDownloadExpanded")
			   .html('<a href="/download/">Get RazorFlow</a>');
	});

	// if($('.webFooter > .footerLevel1').length > 0) {
 //    	checkOffset('.webFooter > .footerLevel1', '.webFooter > .footerLevel2');
	// }

	// $(document).scroll(function() {
	// 	if($('.webFooter > .footerLevel1').length > 0) {
	//     	checkOffset('.webFooter > .footerLevel1', '.webFooter > .footerLevel2');
	// 	}
	// });
 

	$("#menuButton").click(function () {
		$(".rfMobileMenu").toggleClass("expanded");
		$(this).find("i").toggleClass("rf_hamburger");
		$(this).find("i").toggleClass("rf_cross");
		$("body").toggleClass("lockScroll");
		$("button").toggleClass("setRelative");
		if(scrollStatus === true ) {
			document.ontouchmove = function(e){ e.preventDefault(); }
			scrollStatus = false;
		} else {
			document.ontouchmove = function(e){ true; }
			scrollStatus= true;
		}
	});
	$(".rfDesktopMenu").headroom({
	  "tolerance": 5,
	  "offset": 205,
	  "classes": {
	    "initial": "animated",
	    "pinned": "slideDown",
	    "unpinned": "slideUp",
	    "top": "headroom--top",
	    "notTop": "headroom--not-top"
	  }
	});

	$(".rfMobileMenu").headroom({
	  "tolerance": 5,
	  "offset": 205,
	  "classes": {
	    "initial": "animated",
	    "pinned": "mobilePin",
	    "unpinned": "mobileUnpin",
	    "top": "headroom--top",
	    "notTop": "headroom--not-top"
	  }
	});

	// $(window).scroll(function() {
	// 	var menu = document.querySelector('.rfDesktopMenu');
	// 	var menupos = menu.offsetTop;
	// 	if (jQuery(window).scrollTop() > menupos) {
	// 	 $(".rfDesktopMenu").addClass("scrollHeader");
	// 	} else {
	// 	 $(".rfDesktopMenu").removeClass("scrollHeader");
	// 	}
	// });

	// $('.footerLevel1').addClass('footerOriginal').clone().insertAfter('.footerLevel1').addClass('footerCloned').css({
	// 		"z-index": "10",
	// 		"bottom": "0",
	// 		"position": "fixed"
	// });
	// $('.footerCloned').removeClass('footerOriginal');

	// stickMenu();
	// $(window).scroll(function() {
	// 	stickMenu();
	// });


	// function stickMenu() {
	  
	// 	var menu = document.querySelector('.footerLevel1');
	// 	var menupos = menu.offsetTop;
	//    if (jQuery(window).scrollTop() < menupos - 729) {
	//      // scrolled past the menu; only show the cloned, sticky menu.
	//      jQuery('.footerCloned').show();
	//      jQuery('.footerOriginal').css('visibility','hidden');
	//    } else {
	//      // not scrolled past the menu; only show the original menu.
	//      jQuery('.footerCloned').hide();
	//      jQuery('.footerOriginal').css('visibility','visible');
	//    }
	// }
})