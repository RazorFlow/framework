$(document).ready(function(){
	var win = $(window);
	win.on('Perch_Init_Editors', function(){
		$('textarea.markitup.textile:not(.markItUpEditor)').markItUp(textileSettings);
		$('textarea.markitup.markdown:not(.markItUpEditor)').markItUp(markdownSettings);
		$('textarea.markitup.html:not(.markItUpEditor)').markItUp(htmlSettings);       
	});
	win.trigger('Perch_Init_Editors');
});