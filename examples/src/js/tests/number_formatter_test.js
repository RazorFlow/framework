describe ("Number Formatter Tests", function () {
  var NumberFormatter = require("utils/numberformatter");
  var formatter = new NumberFormatter();
  var config;
  beforeEach(function () {
    config = {
      numberFormatFlag: true,
      dataType: "number",
      numberPrefix: "",
      numberSuffix: "",
      numberHumanize: false,
      numberThousandsSeparator: ',',
      numberDecimalsSeparator: '.',
      numberForceDecimals: false,
      numberDecimalPoints: 2
    }
  });

  it("Should humanize a number", function (done) {

    config.numberHumanize = true

    formatter.setConfig(config);
    expect(formatter.formatValue(4000))
    .toEqual("4K");

    done();
  });

  it("Should humanize a number to no decimal points", function(done) {

    config.numberHumanize = true
    config.numberDecimalPoints = 0;

    formatter.setConfig(config);
    expect(formatter.formatValue(4200))
    .toEqual("4K");

    done();

  });

  it("Should humanize a number to 3 decimal points", function(done) {

    config.numberHumanize = true
    config.numberDecimalPoints = 4;

    formatter.setConfig(config);
    expect(formatter.formatValue(1860000))
    .toEqual("1.86M");

    done();

  });

  it("Should separate a thousands number", function(done) {

    formatter.setConfig(config);
    expect(formatter.formatValue(100000))
    .toEqual("100,000");

    done();
  });

  it("Should use a different thousands separator", function(done) {

    config.numberThousandsSeparator = '`';

    formatter.setConfig(config);
    expect(formatter.formatValue(10000)).
    toEqual('10`000');

    done();
  });

  it("Should prefix a sign", function(done) {

    config.numberPrefix = "$";

    formatter.setConfig(config);
    expect(formatter.formatValue(500))
    .toEqual("$500");

    done();
  });

  it("Should suffix a sign", function(done) {

    config.numberSuffix = "%";

    formatter.setConfig(config);
    expect(formatter.formatValue(45))
    .toEqual("45%");

    done();   

  });

  it("Should force decimal points", function(done) {

    config.numberForceDecimals = true;
    config.numberDecimalPoints = 4;

    formatter.setConfig(config);
    expect(formatter.formatValue(33.001))
    done();
  });

});
