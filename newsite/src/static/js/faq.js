$(function () {
	$(".qa-container:nth-child(odd)").each(function () {
		$(this).css({
			"height" : $(this).height()
		});
	});
});
