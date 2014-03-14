#!/usr/bin/env node

var fs = require('fs');
var fileparser = require('../src/fileparser');
var docgen = require('../src/docgen');
var objectifyTree = require('../src/objectifyTree');
var articlesGenerator = require('../src/articlesgen');
var utils = require('util');
var path = require('path');
var _ = require('underscore');
var opts = require("optimist")
               .demand(['configFile'])
               .default({
                    verbose: false
               })
               .describe({
                    configFile: "The configuration JSON file path",
                    verbose: "Enable verbose logging"
               })
               .boolean(['verbose'])


if(!opts.argv.configFile) {
    opts.showHelp()
    process.exit(-1);
}

var winston = require('winston')
var logger = new winston.Logger();
logger.add(winston.transports.Console, {
    colorize: true,
    level: 'info'
});

if(opts.verbose) {

}

logger.info("Starting RazorDoc with file: %s", opts.argv.configFile)


var config = JSON.parse(fs.readFileSync(opts.argv.configFile, 'utf-8'));
var configDir = path.dirname(fs.realpathSync(opts.argv.configFile));
var filenames = config.sources;
var templateDir = config.apiTemplates;
var articleTemplates = config.articleTemplates;
var articlesDir = config.articles;
var outputDir = config.outputDir;
var outputExt = config.outputFileExt;

var noApi = config.noApi;

var files = [];
if(!noApi) {
    for(var i=0; i<filenames.length; i++) {
        var filename = filenames[i];

        var file = path.basename(filename);

        // Check for a wildcard
        if(file.match(/\*/g)) {
            var fileRegex = new RegExp(file.replace('*', '[a-zA-Z\\-]*').replace('.', '\\.'));

            var dir = path.resolve(configDir, path.dirname(filename));

            var filesInDir = fs.readdirSync(dir);

            for(var j=0; j<filesInDir.length; j++) {
                var f = filesInDir[j];

                if(fileRegex.test(f)) {
                    files.push(dir + '/' + f);
                }
            }
            // console.log(files);
        } else {
            files.push(filename)
        }
    }
}


var templateDir;
var apiOutput = 'fakepath';
if(!noApi) {
    templateDir = path.resolve(configDir, config.apiTemplates);
    apiOutput = path.resolve(configDir, config.apiOutput);    
}

var articleTemplatesDir = path.resolve(configDir, config.articleTemplates);
var outputDir = path.resolve(configDir, config.outputDir);
var articlesDir = path.resolve(configDir, config.articles);
var examplesDir = path.resolve(configDir, config.examples);
var examplesExt = config.examplesExt;
var articlesOutput = path.resolve(configDir, config.articlesOutput);
var outputLinkPath = config.outputLinkPath;
var examplesImagesDir = path.resolve(configDir, config.examplesImagesDir);
var examplesLinkPath = config.examplesLinkPath;
var exampleImagesLinkPath = config.exampleImagesLinkPath;
var exampleLiveLinkPath = config.exampleLiveLinkPath;

var tree = {classes:[]};

if(!noApi) {
    logger.info('Parsing api source files...');

    for(var i=0; i<files.length; i++) {
        var file = files[i];

        if(!fs.existsSync(file)) {
            logger.error(file + ' file not found!');
            process.exit(-1);
        }

        var fileContents = fs.readFileSync(file, 'utf-8');

        fileparser.parse(fileContents, tree);
    }
    if(config.onlyJSON) {
        logger.info('Found onlyJSON option, generating intermediate.json for api tree.');
        fs.writeFileSync(outputDir + '/' + 'intermediate.json', JSON.stringify(tree, null, 4));    
    } else {
        tree = objectifyTree(tree);

        // console.log(tree.classes[0].methods);

        // console.log(_.flatten(tree));
        logger.info("START Generating API Documentation")
        docgen.generate(tree, templateDir, apiOutput, outputExt);    
        logger.info("END Generating API Documentation. SUCCESS")
    }
}

var articlesFolder = fs.readdirSync(articlesDir);
var articlesPartialsDir = articlesDir + '/_partials';
var articlesPartials = [];
articlesFolder = _.without(articlesFolder, '_partials');
articlesFolder = _.without(articlesFolder, 'include'); // Temporary code

if(fs.existsSync(articlesPartialsDir)) {
    articlesPartials = fs.readdirSync(articlesPartialsDir);
}

var articles = [];
var articleStruct = _.flatten(folderWalker(articlesFolder, articlesDir, articles));


function folderWalker(dirArray, dirPath, articles) {
    var dirList = [];
    for(var i=0; i<dirArray.length; i++) {
        var item = dirArray[i];
        var itemPath = dirPath + '/' + item;
        var stats = fs.statSync(itemPath);
        if(stats.isDirectory()) {
            dirList.push({
                'name': item,
                'path': itemPath.replace(articlesDir, '').replace(/\/*/, ''),
                'type': 'directory',
                'content': folderWalker(fs.readdirSync(itemPath), itemPath, articles)
            });
            
            // dirList.push(folderWalker(fs.readdirSync(itemPath), itemPath));
        } else if(stats.isFile()) {
            dirList.push({
                'name': item,
                'path': itemPath.replace(articlesDir, '').replace(/\/*/, ''),
                'type': 'file',
            });
            articles.push({
                'name': item,
                'path': itemPath.replace(articlesDir, '').replace(/\/*/, '')
            });
        }
    }

    return dirList;
}

// console.log(articleStruct);

var articleTree = {
    articles: articles,
    partials: articlesPartials,
    articleStruct: articleStruct
};

var examples = _.map(fs.readdirSync(examplesDir), function(item) {
    return item.replace('.' + examplesExt, '');
});


if(config.onlyJSON) {
    logger.info('Found onlyJSON option, generating intermediate.json for articles tree.');
    fs.writeFileSync(outputDir + '/articleTree.json' ,JSON.stringify(articleTree.articleStruct, null, 4), 'utf-8');    
} else {
    logger.info("START Generating Articles")
    articlesGenerator.generate({
        articleTree: articleTree, 
        apiTree: tree, 
        exampleTree: examples,
        articlesDir: articlesDir,
        examplesDir: examplesDir,
        outputDir: outputDir,
        articlesOutput: articlesOutput, 
        apiOutput: apiOutput,
        examplesExt: examplesExt,
        outputFileExt: outputExt,
        articleTemplatesDir: articleTemplatesDir,
        outputLinkPath: outputLinkPath,
        examplesImagesDir: examplesImagesDir,
        examplesLinkPath: examplesLinkPath,
        exampleImagesLinkPath: exampleImagesLinkPath,
        exampleLiveLinkPath: exampleLiveLinkPath
    });
    logger.info("END Generating Articles ")
}


logger.info("RazorDoc finished successfully")