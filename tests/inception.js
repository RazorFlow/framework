require(["prop/propertybase"], function(PropertyBase) {

	function Level1Props () {
        PropertyBase.call (this);

        this.register ({
            foo: null,
            bar: 42
        })
    }
	describe('PropertyBase tests', function() {
    	it('should have default values to data', function() {
      		var prop = new Level1Props();

      		expect(prop.getValue("foo")).toBe(null);
      		expect(prop.getValue("bar")).toBe(42);
    	});
	});

	window.jasmineEnv.execute();
});