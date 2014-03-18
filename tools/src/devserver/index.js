var express = require('express');
var fs = require('fs');
var app = new express();
var path = require('path');
var rootPath = path.resolve(__dirname, '../../../');
var _ = require('underscore');
var glob = require("glob");

app.use('/assets', express.static(rootPath + '/src'));
app.use('/transfer', express.static(rootPath + '/src/dev/transfer'));
app.use('/build', express.static(rootPath + '/build'));
app.use('/testScripts', express.static(rootPath + '/tests'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

var samples = glob.sync(rootPath + "/src/samples/**/*.js");
var sampleNames = [];
var sampleLookup = {};
var indexedSamples = {
    'Demos': [],
    'TestCases': [],
    'Examples': []
};
for(var i = 0; i < samples.length; i++) {
    var name = path.basename (samples[i], ".js");
    sampleLookup[name] = samples[i];
    sampleNames.push (name);

    if(samples[i].indexOf("/demos/") !== -1) {
        indexedSamples["Demos"].push(name);
    }

    if(samples[i].indexOf("/testcases/") !== -1) {
        indexedSamples["TestCases"].push(name);
    }

    if(samples[i].indexOf("/examples/") !== -1) {
        indexedSamples["Examples"].push(name);
    }
}

app.get('/', function(req, res) {

    res.render('index.ejs', {samples: samples, sampleNames: sampleNames, indexedSamples: indexedSamples});
});

app.get('/dev/:id', function (req, res) {
    var id = req.params.id;
    var file = fs.readFileSync(sampleLookup[id], 'utf-8');
    res.render('demo.ejs', {file: file, build: false});
});

app.get('/tests', function(req, res) {
    var vendorScripts = fs.readdirSync(rootPath + '/src/vendor/js');
    var testScripts = fs.readdirSync(rootPath + '/tests');
    res.render('tests.ejs', {vendorScripts: vendorScripts, testScripts: testScripts});
});

app.listen(9090);