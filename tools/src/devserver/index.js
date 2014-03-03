var express = require('express');
var fs = require('fs');
var app = new express();
var path = require('path');
var rootPath = path.resolve(__dirname, '../../../');

app.use('/assets', express.static(rootPath + '/src'));
app.use('/build', express.static(rootPath + '/build'));
app.use('/testScripts', express.static(rootPath + '/tests'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/', function(req, res) {
    var vendorScripts = fs.readdirSync(rootPath + '/src/vendor/js');
    res.render('index.ejs', {vendorScripts: vendorScripts});
});

app.get('/dev', function(req, res) {
    var vendorScripts = fs.readdirSync(rootPath + '/src/vendor/js');
    res.render('dev.ejs', {vendorScripts: vendorScripts});
});

app.get('/tests', function(req, res) {
    var vendorScripts = fs.readdirSync(rootPath + '/src/vendor/js');
    var testScripts = fs.readdirSync(rootPath + '/tests');
    res.render('tests.ejs', {vendorScripts: vendorScripts, testScripts: testScripts});
});

app.listen(9090);