Perch.Apps.Blog = function() {
	
	var init = function() {
		initCommentControls();
	};

	var initCommentControls = function() {
		var cntrl = $('#comment-controls');
		if (cntrl.length) {
			cntrl.prepend($('<a href="#" id="selectall">'+Perch.Lang.get('Select all')+'</a>'));
			cntrl.on('click', '#selectall', function(e){
				e.preventDefault();
				var boxen = $('#comments input.check');
				boxen.prop('checked', !boxen.prop('checked'));
			});
		}
	}
	
	return {
		init: init
	};
}();
