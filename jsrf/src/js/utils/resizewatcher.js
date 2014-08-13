define ([
	"constants/componentconstants"
], function (ComponentConstants) {
	var callBacks = [],
		currentWidths = [],
		containers = [],
		isResizeWatcher = false,
		resizeWatchDelay = ComponentConstants.dashboard.resizeDelay,
		newWidth = 0,

		ResizeWatcher = {
			require: function () {
				for (var i = 0; i < containers.length; i++) {
					newWidth = containers[i].width();
					if (currentWidths[i] !== newWidth) {
						currentWidths[i] = newWidth;
						callBacks[i]();
					}
				}

				_.defer(function () {
		          _.delay(ResizeWatcher.require, resizeWatchDelay);
		        });
			},

			checkResize: function () {
				if (!isResizeWatcher) {
					ResizeWatcher.require();
					isResizeWatcher = true;
				}
			},

			register: function (container, cWidth, cb) {
				containers.push(container);
				currentWidths.push(cWidth);
				callBacks.push(cb);
			},

			dispose: function () {
				containers = [];
				currentWidths = [];
				callBacks = [];
			}
		};

	return ResizeWatcher;
});
