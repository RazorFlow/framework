$(function () {
	$("#buyAnnual").click (function (e) {
		$.fancybox.open($("#annualModal"), {
			fitToView	: false,
			width		: 400,
			height		: 310,
			autoSize	: false,
			closeClick	: false,
			openEffect	: 'none',
			closeEffect	: 'none'
		});
		analytics.track("Opened Buy Modal", {
			type: "Annual"
		});
		e.preventDefault ();
	});

	$("#buyPerpetual").click (function (e) {
		$.fancybox.open($("#perpetualModal"), {
			fitToView	: false,
			width		: 400,
			height		: 310,
			autoSize	: false,
			closeClick	: false,
			openEffect	: 'none',
			closeEffect	: 'none'
		});
		analytics.track("Opened Buy Modal", {
			type: "Perpetual"
		});
		e.preventDefault ();
	});

	$(".planSub").bind("click", function () {
		var $content = $(this).find(".moreInfoContent"),
			shown = $content.hasClass("shown");
		if(shown) {
			$content.hide();
			$content.removeClass("shown");
			$(this).find(".moreInfo").text("+ More Info");
		} else {
			$content.show();
			$content.addClass("shown");
			$(this).find(".moreInfo").text("- Less Info");
		}
	});


	// $(".plan").bind("click", function () {
	// 	$(".drop").hide();
	// 	debugger
	// 	$(".active").removeClass("active");
	// 	$(this).addClass("active");
	// 	$(this).find(".drop").show();

	// });

	// $(".pricingLink th").on("click", function() {
	// 	var cellSpacing = 20,
	// 		width = $(this).width(),
	// 		left = $(this).position().left,
	// 		initLeft = $(this).parent().position().left + cellSpacing,
	// 		mLeft = left + ((width / 2) - initLeft - cellSpacing);
	// 		$(".pricingMarker").css({"left" : mLeft+"px"});

	// 	$(".pricingLink").find(".active").removeClass("active");
	// 	$(this).addClass("active");
	// });

	$(".rf_info").tooltip({
		 'show': true,
        'placement': 'top'
	});

	function panellify ($node) {
    	var id = $node.parent().attr("id"),
        	list = $node.parent().parent().find("."+id),
        	collapsed = $node.parent().hasClass("collapsed"),
        	$icon = $node.find("i");
        if(id === "pricing") return;
        if(!collapsed) {
            list.hide();
            $node.parent().addClass("collapsed");
            $icon.removeClass("rf_arrow_down");
            $icon.addClass("rf_arrow_right");
        } else {
            list.show();
            $node.parent().removeClass("collapsed");
            $icon.removeClass("rf_arrow_right");
            $icon.addClass("rf_arrow_down");
        }
    }

    $(".subTitle td").bind("click", function() {
    	panellify($(this));
    });


    $("#mobilePricing > ul.pricingLink > li").each(function () {
    	if($(this).hasClass("active")) {
    		$(this).find("a.mobTitleLink .pull-right i").removeClass("rf_arrow_right");
    		$(this).find("a.mobTitleLink .pull-right i").addClass("rf_arrow_down");
    	}
    });

    
	$(document).scroll(function() {
		if($('.mobileBuyBtn').length > 0) {
			if($('.mobileFooter').css('display') === 'none') {
	    		checkOffset('.mobileBuyBtn', '.webFooter');
			} else {
	    		checkOffset('.mobileBuyBtn', '.mobileFooter');
	    	}
		}
	});
    

  //   function parseJson(id) {
  //   	var $tbody = $(".pricingTable tbody");
  //   	$tbody.html(htmlData);
  //   	for (var subSection in jsonData[id]) {
		// 	$tbody.append('<tr class="subTitle" id="'+subSection+'">\
  //                       <td colspan="3"><h6>'+jsonData[id][subSection].title+'</h6></td>\
  //                   </tr>');
			
		// 	$tbody.append(addData(subSection, jsonData[id][subSection]));
		// 	$tbody.append(addData(subSection, jsonData.common[subSection]));
		// }
		// $tbody.find(".standardPrice").text(jsonData[id].pricing.Pricing[0]);
		// $tbody.find(".devPrice").text(jsonData[id].pricing.Pricing[1]);

  //   }

  //   function addData(subSection, data) {
  //   	var rtnStr = "";
  //   	for(var elem in data) {
		// 	if(elem === "title") continue;

		// 	for(var i =0; i<data[elem].length;i++) {
		// 		if(typeof data[elem][i] === "boolean") {
		// 			if(data[elem][i]) {
		// 				data[elem][i] = '<i class="rf-icon rf_tick"></i>';
		// 			} else {
		// 				data[elem][i] = '<i class="rf-icon rf_cross"></i>';
		// 			}
		// 		}
		// 	}
		// 	rtnStr += '<tr class="pricingContent '+subSection+'">\
  //                       <td>'+elem+'</td>\
  //                       <td>'+data[elem][0]+'</td>\
  //                       <td>'+data[elem][1]+'</td>\
  //                   </tr>';
		// }

		// return rtnStr;
  //   }
    
 //    var jsonData = null,
 //    	htmlData = "";
 //    $.get("/dashboard/buy/pricingTemp.html", function(data) {
 //    	htmlData = data;
 //    });

 //    $.getJSON("/dashboard/buy/pricing.json", function (data) {
	// 	jsonData = data;
	// 	// parseJson("corporate");
	// });

})