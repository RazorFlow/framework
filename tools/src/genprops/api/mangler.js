var fs = require('fs');


var sourceFile = process.argv[2];
var destFile = process.argv[3];

var fileData = fs.readFileSync(sourceFile, 'utf-8');



fileData = fileData.replace(/".*"/g, '');
fileData = fileData.replace(/'.*'/g, '');
fileData = fileData.replace(/\/\*.*\*\//g, '');
fileData = fileData.replace(/\/\/.*\n/g, '');

var matched = fileData.match(/_[a-z0-9A-Z_$]+/g);

var table = {};

var sv = 0;
var ev = 0;

if(matched) {
    for(var i=0; i<matched.length; i++) {
        table[matched[i]] = String.fromCharCode(97 + sv) + String.fromCharCode(97 + ev);
        ev++;
        if(ev >= 26) {
            ev = 0;
            sv++;
        }
    }

    fileData = fs.readFileSync(sourceFile, 'utf-8');

    for(var item in table) {
        var regex = new RegExp(item, 'g');
        fileData = fileData.replace(regex, table[item]);
    }

    for(var item in table) {
        var regex = new RegExp('\''+table[item]+'\'', 'g');
        fileData = fileData.replace(regex, '\'' + item + '\'');

        regex = new RegExp('"'+table[item]+'"', 'g');
        fileData = fileData.replace(regex, '"' + item + '"');
    }

    for(var item in table) {
        var regex = new RegExp('\\[\''+item+'\'\\]', 'g');

        fileData = fileData.replace(regex, '[\'' + table[item] + '\']');

        regex = new RegExp('\\["'+item+'"\\]', 'g');
        fileData = fileData.replace(regex, '["' + table[item] + '"]');
    }
    console.log(table);
    fs.writeFileSync(destFile, fileData, 'utf-8');

} else {
    console.log('No tokens found!');
}



    

    
