var TestHelper = function () {
	var self = this;
	var contextDiv = $("body");
	var doneFunc = null,
		continuations = [];


	var jqFilter = function (val) {
		if(contextDiv == null) {
			self.showError ("Context is null");
		}
		if(typeof(val) === "string") {
			var contextFound = contextDiv.find(val);
			if(contextFound.length === 0) {
				self.showError("Cannot find selector " + val + " in context");
			}
			if(contextFound.length > 1) {
				console.warn("the number of elements found for ", val, "is ", contextFound.length);
			}
			return $(contextDiv.find(val)[0]);
		}
		if(typeof(val) === "object") {
			if(val.length === 0) {
				self.showError("Empty jquery object passed");
			}
			if(val.length > 1) {
				console.warn("the number of elements found for ", val, "is ", contextFound.length);
			}

			return val;
		}

		if(typeof(val) === "function") {
			return val(contextDiv);
		}
		throw "Unexpected type for jquery filter";
	}
	self.start = function (done) {
		log("Starting");
		doneFunc = done;
		contextDiv = $("body");
		continuations = [];

		return self;
	};

	self.setContext = function (context) {
		addSyncContinuation(function () {
			// First, reset the context div to body
			contextDiv = $("body");
			contextDiv = jqFilter(context); 
		});
		return self;
	};

	self.assertText = function (selector, value) {
		addSyncContinuation(function () {
			log("Asserting text is " + value);
			var item = jqFilter(selector);
			expect(item.text()).toBe(value);
		});
		return self;
	};

	self.wait = function (timeout) {
		addASyncContinuation(function (done) {
			log("Waiting for " + timeout);
			setTimeout(done, timeout);
		});
		return self;
	};

	self.click = function (selector, data) {
		return self.triggerEvent(selector, "click");
	};

	self.triggerEvent = function (selector, eventName, data) {
		addSyncContinuation(function () {
			log("clicking!!");
			var item = jqFilter(selector);
			item.trigger(eventName);
		});
		return self;
	}

	self.debug = function () {
		addSyncContinuation(function () {
			// DO NOT REMOVE THIS DEBUGGER. It's actually MEANT to be here.
			debugger;
		});
		return self;
	}

	self.finish = function () {
		runContinuations(continuations);
	};

	var addSyncContinuation = function (func) {
		continuations.push(function (done) {
			func ();
			done();
		})
	};

	var addASyncContinuation = function (func) {
		continuations.push(function (done) {
			func(done);
		})
	};

	var runContinuations = function (cList) {
		if(cList.length == 0) {
			log("done everything");
			doneFunc();
			return;
		}
		var cont = cList.shift();

		cont(function () {
			runContinuations(cList);
		});
	};

	var log = function (msg) {
		console.log(msg);
	};


	self.showError = function (message) {
		expect("ERROR!!").toBe(message);
	};
};

window.TestHelper = TestHelper;