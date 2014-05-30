var TestHelper = function () {
	var self = this;
	var contextDiv = $("body");
	var doneFunc = null,
		continuations = [];


	var jqFilter = function (val) {
		if(contextDiv == null) {
			self.showError ("Context is null");
		}
		if(val === ".") {
			return contextDiv;
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

	self.setContext = function (context, reset) {
		if(typeof(reset) == "undefined")
		{
			reset = true;
		}
		addSyncContinuation(function () {
			// First, reset the context div to body
			if(reset) {
				contextDiv = $("body");
			}
			contextDiv = jqFilter(context); 
		});
		return self;
	};

	self.assertText = function (selector, expected, options) {
		options = options ? options : {};
		addSyncContinuation(function () {
			log("Asserting text is " + expected);
			var item = jqFilter(selector);
			var found = item.text();
			if(options.trim) {
				found = found.trim();
			}

			compareFoundToExpected(found, expected);
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
			console.log("Launching a debugger");
			console.log("The current div is ", contextDiv)
			// DO NOT REMOVE THIS DEBUGGER. It's actually MEANT to be here.
			debugger;
		});
		return self;
	}

	self.finish = function () {
		runContinuations(continuations);
	};

	self.assertCSS = function (selector, propName, expected) {
		addSyncContinuation(function () {
			var item = jqFilter(selector);

			if(typeof(propName) == "string") {
				var found = item.css(propName);
				compareFoundToExpected(found, expected);
			}
			else if(typeof(propName) == "object") {
				for(var key in propName) {
					if(propName.hasOwnProperty(key)) {
						var expectedVal = propName[key];
						var found = item.css(key);

						compareFoundToExpected(found, expectedVal);
					}
				}
			}
		});

		return self;
	};

	self.assertAttrs = function (selector, propName, expected) {
		addSyncContinuation(function () {
			var item = jqFilter(selector);

			if(typeof(propName) == "string") {
				var found = item.attr(propName);
				compareFoundToExpected(found, expected);
			}
			else if(typeof(propName) == "object") {
				for(var key in propName) {
					if(propName.hasOwnProperty(key)) {
						var expectedVal = propName[key];
						var found = item.attr(key);

						compareFoundToExpected(found, expectedVal);
					}
				}
			}
		});

		return self;
	};

	self.doSync = function (func) {
		addSyncContinuation(function () {
			func(contextDiv);
		});
	};

	self.doASync = function (func) {
		addASyncContinuation(function (done) {
			func(contextDiv, done)
		});
	};

	self.assertElementExists = function (selector) {
		addSyncContinuation(function () {
			jqFilter(selector); // This will trigger 
		});
	}

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

	var funcToValue = function (value, found) {
		if(typeof(value) === "function") {
			value(found);
		}
		else {
			return value;
		}
	};

	var compareFoundToExpected = function (found, expected) {
		if(typeof(expected) === "function") {
			if(expected(found) === true) {
				return;
			}
			else {
				self.showError("Custom check failed");
			}
		}
		else {
			expect(found).toBe(expected);	
		}
		
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