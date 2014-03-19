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
               .boolean(['verbose']);


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


var config = JSON.parse(fs.readFileSync(opts.argv.configFile, 'utf-8')),
    configDir = path.dirname(fs.realpathSync(opts.argv.configFile)),
    filenames = config.sources,
    templateDir = config.apiTemplates,
    articleTemplates = config.articleTemplates,
    articlesDir = config.articles,
    outputDir = config.outputDir,
    outputExt = config.outputFileExt,
    noApi = config.noApi,
    noArticles = config.noArticles,
    showInheritedMethods = config.showInheritedMethods,
    files = [],
    apiOutput = 'fakepath';
    
// If noApi flag is true, don't generate api docs
if(!noApi) {
    for(var i=0; i<filenames.length; i++) {
        var filename = filenames[i],
            file = path.basename(filename);

        // Check for a wildcard
        if(file.match(/\*/g)) {
            var fileRegex = new RegExp(file.replace('*', '[a-zA-Z\\-]*').replace('.', '\\.')),
                dir = path.resolve(configDir, path.dirname(filename)),
                filesInDir = fs.readdirSync(dir);

            for(var j=0; j<filesInDir.length; j++) {
                var f = filesInDir[j];
                if(fileRegex.test(f)) {
                    files.push(dir + '/' + f);
                }
            }
        } else {
            files.push(path.resolve(configDir, filename));
        }
    }

    
    var tree = {classes:[]};

    templateDir = path.resolve(configDir, config.apiTemplates);
    apiOutput = path.resolve(configDir, config.apiOutput);

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
        logger.info("START Generating API Documentation")
        docgen.generate(tree, templateDir, apiOutput, outputExt, showInheritedMethods);    
        logger.info("END Generating API Documentation. SUCCESS")
    }
}

if(!noArticles) {
    var templateDir,
        articleTemplatesDir = path.resolve(configDir, config.articleTemplates),
        outputDir = path.resolve(configDir, config.outputDir),
        articlesDir = path.resolve(configDir, config.articles),
        examplesDir = path.resolve(configDir, config.examples),
        examplesExt = config.examplesExt,
        articlesOutput = path.resolve(configDir, config.articlesOutput),
        outputLinkPath = config.outputLinkPath,
        examplesImagesDir = !!config.examplesImagesDir ? path.resolve(configDir, config.examplesImagesDir) : '',
        examplesLinkPath = config.examplesLinkPath,
        exampleImagesLinkPath = config.exampleImagesLinkPath,
        exampleLiveLinkPath = config.exampleLiveLinkPath,
        articlesFolder = fs.readdirSync(articlesDir),
        articlesPartialsDir = articlesDir + '/_partials',
        articlesPartials = [];

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
}