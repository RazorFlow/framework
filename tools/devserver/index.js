var express = require('express');
var fs = require('fs');
var app = new express();
var path = require('path');
var rootPath = path.resolve(__dirname, '../../');

app.use('/assets', express.static(rootPath + '/src'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/', function(req, res) {
    var vendorScripts = fs.readdirSync(rootPath + '/src/vendor/js');
    res.render('index.ejs', {vendorScripts: vendorScripts});
});

app.listen(9090);