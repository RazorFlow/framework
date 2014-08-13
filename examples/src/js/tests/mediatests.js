describe("Media Tests", function () {
	var MediaHelper = require("helpers/mediahelper");

	var selectorA = {
		xs: 10,
		sm: 11,
		md: 12,
		lg: 13
	};

	it("Should select plain medias", function () {
		var mh = new MediaHelper("md");

		expect(mh.mediaSelect (selectorA)).toBe(12);

	})

	// it("Should pick the nearest media", function () {
	// 	var mh = new MediaHelper("md");

	// 	expect(mh.mediaSelect({
	// 		xs: 5,
	// 		sm: 10
	// 	})).toBe(10);

	// 	// If 2 medias are equally distant from target, it picks the one which is closer to small.
	// 	expect(mh.mediaSelect({
	// 		xs: 5,
	// 		sm: 10,
	// 		lg: 15
	// 	})).toBe(10);

	// 	// Always prefer to pick something smaller than bigger.
	// 	expect(mh.mediaSelect({
	// 		xs: 5,
	// 		lg: 15
	// 	})).toBe(5);
		
	// 	mh = new MediaHelper("sm");
	// 	expect(mh.mediaSelect({
	// 		md: 5,
	// 		lg: 15
	// 	})).toBe(5);
	// });

	it("Should support the + operator", function () {
		var mh = new MediaHelper("md");
		expect(mh.mediaSelect({
			xs: 5,
			"sm+md": 10,
			lg: 15
		})).toBe(10);

	});

	it("Should support default values", function () {
		var mh = new MediaHelper("md");
		expect(mh.mediaSelect({
			"sm+xs": 10,
		}, 50)).toBe(50);

	})
});