// var http = require('http');
// var path = require('path');
var articlesGen = require('../src/articlesGen');
// var options = require('../config/articlesConfig');
// var configDir = path.resolve(process.cwd());
// articlesGen.serve (options, configDir);


var express = require ('express');
var app = module.exports = express ();

app.get('*', function(req, res) {
    res.end('Hello world');
});
var port = process.env.PORT || 8000;
console.log('Editor server started at ' + port)
app.listen (port);