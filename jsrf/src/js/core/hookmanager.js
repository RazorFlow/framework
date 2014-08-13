define (["kendo/kendo.core"], function () {
	/**
	 * How to use the hookmanager?
	 *
	 * ## Bind to an event
	 * 
	 * rf.hooks.bind("eventName", function (e) {
	 *	// handle the function here
	 *		console.log(e.myParam)
	 * })
	 *
	 * ## Trigger an event
	 * rf.hooks.trigger("eventName", {myParam: 42})
	 * 
	 * @type {[type]}
	 */
	var HookManager = kendo.Observable.extend({

	});

	return HookManager;
});