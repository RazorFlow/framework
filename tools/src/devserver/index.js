var express = require('express');
var fs = require('fs');
var app = new express();
var path = require('path');
var rootPath = path.resolve(__dirname, '../../../');
var _ = require('underscore');

app.use('/assets', express.static(rootPath + '/src'));
app.use('/transfer', express.static(rootPath + '/src/dev/transfer'));
app.use('/build', express.static(rootPath + '/build'));
app.use('/testScripts', express.static(rootPath + '/tests'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/', function(req, res) {
    var demoFiles = fs.readdirSync(rootPath + '/src/dev/demos');
    var demos = _.map(demoFiles, function(file) {
        return file.replace('.js', '');
    });

    var testcaseFiles = fs.readdirSync(rootPath + '/src/dev/testcases');
    var testcases = _.map(testcaseFiles, function(file) {
        return file.replace('.js', '');
    });

    res.render('index.ejs', {demos: demos, testcases: testcases});
});

app.get('/demos/:id', function(req, res) {
    var vendorScripts = fs.readdirSync(rootPath + '/src/vendor/js');
    var demoFiles = fs.readdirSync(rootPath + '/src/dev/demos');
    var id = req.params.id;    
    var demos = _.map(demoFiles, function(file) {
        return file.replace('.js', '');
    });
    var buildFlag = req.query.hasOwnProperty('build');
    if(req.params.id) {
        if(demos.indexOf(id) !== -1) {
            var file = fs.readFileSync(rootPath + '/src/dev/demos/' + id + '.js', 'utf-8');
            res.render('demo.ejs', {vendorScripts: vendorScripts, file: file, build: buildFlag});
        } else {
            res.end('404 not found!');
        }        
    } 
});

app.get('/demos', function(req, res) {
    var demoFiles = fs.readdirSync(rootPath + '/src/dev/demos');
    var demos = _.map(demoFiles, function(file) {
        return file.replace('.js', '');
    });

    res.render('demo_index.ejs', {files: demos});
});

app.get('/testcases/:id', function(req, res) {
    var vendorScripts = fs.readdirSync(rootPath + '/src/vendor/js');
    var demoFiles = fs.readdirSync(rootPath + '/src/dev/testcases');
    var id = req.params.id;
    var demos = _.map(demoFiles, function(file) {
        return file.replace('.js', '');
    });
    var buildFlag = req.query.hasOwnProperty('build');
    if(req.params.id) {
        if(demos.indexOf(id) !== -1) {
            var file = fs.readFileSync(rootPath + '/src/dev/testcases/' + id + '.js', 'utf-8');
            res.render('demo.ejs', {vendorScripts: vendorScripts, file: file, build: buildFlag});
        } else {
            res.end('404 not found!');
        }        
    } 
});

app.get('/testcases', function(req, res) {
    var demoFiles = fs.readdirSync(rootPath + '/src/dev/testcases');
    var demos = _.map(demoFiles, function(file) {
        return file.replace('.js', '');
    });

    res.render('testcases_index.ejs', {files: demos});
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