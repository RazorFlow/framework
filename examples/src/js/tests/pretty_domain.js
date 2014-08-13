describe("Pretty domain related tests", function() {
    var graphUtils = require('razorcharts/utils/graphutils');

    it("should work", function() {
        var domain = graphUtils.prettyDomain(0, 121);
        expect(domain.min).toEqual(0);
        expect(domain.max).toEqual(150);
        expect(domain.ticks.length).toEqual(domain.numTicks);
        expect(domain.unit).toEqual(25);
    });

    it("should have a pretty domain", function() {
        var min = Math.floor(Math.random() * 100),
            max = Math.floor(100 + Math.random() * 1000);
        console.log('Testing prettyness for random domain : ' + min + ' -> ' + max);
        var domain = graphUtils.prettyDomain(min, max);
        console.log('Domain props : ');
        console.log('unit : ' + domain.unit);
        console.log('min : ' + domain.min);
        console.log('max : ' + domain.max);
        console.log('numTicks : ' + domain.numTicks);
        console.log('ticks : ' + domain.ticks);
        expect(domain.min).toEqual(0);
        expect(!(domain.unit % 2) || !(domain.unit % 5) || !(domain.unit % 0.25)).toBe(true);
    });

    it("should have a pretty domain when min is -ve and max is +ve", function() {
        var min = - Math.floor(Math.random() * 100),
            max = Math.floor(100 + Math.random() * 1000);
        console.log('Testing prettyness for random domain : ' + min + ' -> ' + max);
        var domain = graphUtils.prettyDomain(min, max);
        console.log('Domain props : ');
        console.log('unit : ' + domain.unit);
        console.log('min : ' + domain.min);
        console.log('max : ' + domain.max);
        console.log('numTicks : ' + domain.numTicks);
        console.log('ticks : ' + domain.ticks);
        expect(domain.min).toBeLessThan(0);
        expect(!(domain.unit % 2) || !(domain.unit % 5) || !(domain.unit % 0.25)).toBe(true);
    });

    it("should have a pretty domain when min and max both are -ve", function() {
        var min = - Math.floor(Math.random() * 100),
            max = - Math.floor(100 + Math.random() * 1000);
        console.log('Testing prettyness for random domain : ' + min + ' -> ' + max);
        var domain = graphUtils.prettyDomain(min, max);
        console.log('Domain props : ');
        console.log('unit : ' + domain.unit);
        console.log('min : ' + domain.min);
        console.log('max : ' + domain.max);
        console.log('numTicks : ' + domain.numTicks);
        console.log('ticks : ' + domain.ticks);
        expect(domain.min).toBeLessThan(0);
        expect(Math.abs(domain.max)).toEqual(0);
        expect(!(domain.unit % 2) || !(domain.unit % 5) || !(domain.unit % 0.25)).toBe(true);
    });
});


describe("pretty domain for dual axes", function() {
    var graphUtils = require('razorcharts/utils/graphutils');

    it("should have zero synced when both axes are +ve", function() {
        var min1 = Math.floor(Math.random() * 100),
            max1 = Math.floor(100 + Math.random() * 1000),
            min2 = Math.floor(Math.random() * 100),
            max2 = Math.floor(100 + Math.random() * 1000);
        var domains = graphUtils.dualAxisDomain([min1, max1], [min2, max2]);

        expect(domains.lDomain.min).toEqual(0);
        expect(domains.rDomain.min).toEqual(0);
        expect(domains.lDomain.ticks.indexOf(0)).toBe(domains.rDomain.ticks.indexOf(0))
    });

    it("should have zero synced when data is mixed", function() {
        var min1 = - Math.floor(Math.random() * 100),
            max1 = Math.floor(100 + Math.random() * 1000),
            min2 = - Math.floor(Math.random() * 100),
            max2 = Math.floor(100 + Math.random() * 1000);
        var domains = graphUtils.dualAxisDomain([min1, max1], [min2, max2]);

        expect(domains.lDomain.min).toBeLessThan(0);
        expect(domains.rDomain.min).toBeLessThan(0);
        expect(domains.lDomain.ticks.indexOf(0)).toBe(domains.rDomain.ticks.indexOf(0))
    });

    it("should have zero synced when data when both are -ve", function() {
        var min1 = - Math.floor(Math.random() * 100),
            max1 = - Math.floor(100 + Math.random() * 1000),
            min2 = - Math.floor(Math.random() * 100),
            max2 = - Math.floor(100 + Math.random() * 1000);
        var domains = graphUtils.dualAxisDomain([min1, max1], [min2, max2]);

        expect(domains.lDomain.min).toBeLessThan(0);
        expect(domains.rDomain.min).toBeLessThan(0);
        expect(domains.lDomain.ticks.indexOf(0)).toBe(domains.rDomain.ticks.indexOf(0))
    });

    it("should have zero synced when data when left is -ve", function() {
        var min1 = - Math.floor(Math.random() * 100),
            max1 = - Math.floor(100 + Math.random() * 1000),
            min2 = Math.floor(Math.random() * 100),
            max2 = Math.floor(100 + Math.random() * 1000);
        var domains = graphUtils.dualAxisDomain([min1, max1], [min2, max2]);

        expect(domains.lDomain.min).toBeLessThan(0);
        expect(domains.lDomain.ticks.indexOf(0)).toBe(domains.rDomain.ticks.indexOf(0))
    });

    it("should have zero synced when data when right is -ve", function() {
        var min1 = Math.floor(Math.random() * 100),
            max1 = Math.floor(100 + Math.random() * 1000),
            min2 = - Math.floor(Math.random() * 100),
            max2 = - Math.floor(100 + Math.random() * 1000);
        var domains = graphUtils.dualAxisDomain([min1, max1], [min2, max2]);

        expect(domains.rDomain.min).toBeLessThan(0);
        expect(domains.lDomain.ticks.indexOf(0)).toBe(domains.rDomain.ticks.indexOf(0))
    });
});