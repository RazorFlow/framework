define(["messages/errormessages"], function (ErrorMessages) {
	var errorUtils = {
		getError: function (code) {
			code = "" + (+code);
			if(ErrorMessages.hasOwnProperty(code)) {
				return "Error " + code + ":" + ErrorMessages[code];
			}
			return "Error: " + code;
		}
	};

	return errorUtils;
});