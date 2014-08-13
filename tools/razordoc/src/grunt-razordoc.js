var path = require('path');
var fs = require('fs');
var articlesGenerator = require('./razordoc/articlesgen');
var fileparser = require('./razordoc/fileparser');
var objectifyTree = require('./razordoc/objectifyTree');
var docgen = require('./razordoc/docgen');
var _ = require('underscore');

module.exports = function(grunt) {

    // process.on('error', function(err) {
    //     console.log('err' + err);
    // });
  grunt.registerMultiTask('razordoc', 'RazorDoc', function() {
    grunt.log.writeln("Starting RazorDoc...");
    var options = this.options({

    });

    try {

    var configDir = process.cwd();
    // var configDir = path.resolve('.', '../docsrf');
    var articlesDir = configDir + '/' + options.articles.root;
    var linkPrefix = options.linkPrefix;
    var outputDir = path.resolve(configDir, options.out);
    var outputExt = options.suffix;
    var articleTemplates = options.articleTemplates;
    var articles = [];
    var articleStruct = null;
    var apiConfig = {};
    var apiObjectTree = {};
    var imagesPath = configDir + '/' + options.articles.imagesPath;
    var constantsPath = options.constantsPath;
    var constantsFile = fs.readFileSync(path.resolve(configDir, constantsPath), 'utf-8');
    var constantsObj = JSON.parse(constantsFile);
    var imagesRelativePath = linkPrefix + "/" + options.articles.imagesRelativePath;
    var imagesPhysicalPath = path.resolve(configDir, options.articles.imagesPhysicalPath);
    var imagesLocalPath = path.resolve(configDir, options.articles.imagesLocalPath);
    var riddlerURL = options.riddler ? options.riddler.url : '';
    var partialsPath = options.partialsPath ? path.resolve(configDir, options.partialsPath) : '';
    // api configs
    var apiTree = {
        title: 'API Documentation',
        // link: linkPrefix + '/' + path.basename(outputDir) + '/' + options.api.relativeLinkPath,
        content: []
    };

    for(var key in options.api.lang) {
        var _apiTree = {
            title: 'API Documentation',
            lang: key,
            // link: linkPrefix + '/' + path.basename(outputDir) + '/' + options.api.lang[key].relativeLinkPath,
            content: []
        };
        apiConfig[key] = {
            src: path.resolve(configDir, options.api.lang[key].src[0]),
            linkPath: options.api.lang[key].relativeLinkPath
        }
        var filenames = options.api.lang[key].src;
        var files = [];
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
        
        var tree = {classes:[], namespace: key};

        templateDir = path.resolve(configDir, options.apiTemplates);
        apiOutput = path.resolve(configDir, options.api.lang[key].out);

        
        for(var i=0; i<files.length; i++) {
            var file = files[i];

            if(!fs.existsSync(file)) {
                console.error(file + ' file not found!');
                process.exit(-1);
            }

            var fileContents = fs.readFileSync(file, 'utf-8');

            fileparser.parse(fileContents, tree);
        }
        
        tree = objectifyTree(tree);
        var classes = tree.findAllClassNames({access: 'public'});
        for(var i=0; i<classes.length; i++) {
            var _class = classes[i];
            var node = tree.findNodeByClassName(_class);
            var classTree = {
                title: _class,
                link: linkPrefix + '/' + path.basename(outputDir) + '/' + options.api.lang[key].relativeLinkPath + _class + '.' + outputExt,
                class: _class,
                lang: key
            };
            _apiTree.content.push(classTree);
        }
        apiTree.content.push(_apiTree);
        console.info("START Generating API Documentation")
        var showInheritedMethods =  true;
        apiObjectTree[key] = {
            tree: tree,
            templateDir: templateDir,
            apiOutput: apiOutput,
            outputExt: outputExt,
            showInheritedMethods: true,
            options: options
        }
        // apiObjectTree[key] = tree;
        // apiObjectTree[key]
        // docgen.generate(tree, templateDir, apiOutput, outputExt, showInheritedMethods);
        console.info("END Generating API Documentation. SUCCESS");

        console.info("START Copying images from ", imagesLocalPath);
        grunt.file.recurse(imagesLocalPath, function (abspath, rootdir, subdir, filename) {
            // console.info("Gonna copy to ", imagesPhysicalPath + "/" + subdir + "/" + filename)
            grunt.file.copy(abspath, imagesPhysicalPath + "/" + subdir + "/" + filename);

        })

        console.info("END Copying images");
            
    }

    function navGen(tree) {
        var contents = '';
        var lang = tree.lang || '';
        var _class = tree['class'];
        if(tree.content) {
            contents += '<ul>';
            for(var i=0; i<tree.content.length; i++) {
                var _tree = tree.content[i];
                contents += navGen(_tree);
            }
            contents += '</ul>';
        }
        return '<li data-lang="'+lang+'" data-class="'+lang + '_' + _class+'">' + ((!!tree.link) ? '<a href="' + tree.link + '">' + tree.title + '</a>' : '<span>' + tree.title + '</span>') + contents + '</li>';
    }

    var apiNav = navGen(apiTree);

    // Article configs
    var articleStruct = folderWalker(fs.readdirSync(articlesDir), articlesDir, articles, articlesDir);
    var articleTree = {
        articles: articles,
        articleStruct: articleStruct,
        partials: []
    };
    // var apiTree = {};
    var exampleTree = {};
    
    var examplesDir = '';
    var apiOutput = '';
    var examplesExt = '';
    var articleTemplatesDir = path.resolve(configDir, options.articleTemplates);
    var examplesImagesDir = '';
    var examplesLinkPath = '';
    var exampleImagesLinkPath = '';
    var exampleLiveLinkPath = '';

    // Construct the example tree

    for(var key in options.examples) {
        examplesDir = path.resolve(configDir, options.examples[key].src);
        examplesExt = options.examples[key].srcSuffix;
        var examples = _.map(fs.readdirSync(examplesDir), function(item) {
            return item.replace(examplesExt, '');
        });
        exampleTree[key] = {
            src: path.resolve(configDir, options.examples[key].src),
            srcSuffix: options.examples[key].srcSuffix,
            imagePrefix: options.examples[key].imagePrefix,
            imageSuffix: options.examples[key].imageSuffix,
            thumbPrefix: options.examples[key].thumbPrefix,
            thumbSuffix: options.examples[key].thumbSuffix,
            livePrefix: options.examples[key].livePrefix,
            liveSuffix: options.examples[key].liveSuffix,
            content: examples
        }
    }
    var articleNav = articlesGenerator.generate({
        namespaces: ['js', 'php'],
        articleTree: articleTree, 
        apiConfig: apiConfig,
        apiTree: apiTree, 
        exampleTree: exampleTree,
        articlesDir: articlesDir,
        examplesDir: examplesDir,
        outputDir: outputDir,
        articlesOutput: outputDir, 
        apiOutput: apiOutput,
        examplesExt: examplesExt,
        outputFileExt: outputExt,
        articleTemplatesDir: articleTemplatesDir,
        outputLinkPath: linkPrefix,
        examplesImagesDir: examplesImagesDir,
        examplesLinkPath: examplesLinkPath,
        exampleImagesLinkPath: exampleImagesLinkPath,
        exampleLiveLinkPath: exampleLiveLinkPath,
        imagesPath: imagesRelativePath,
        riddlerURL: riddlerURL,
        apiNav: navGen(apiTree.content[0]),
        partialsPath: partialsPath,
        options: options
    });

    console.log(apiTree);

    articlesGenerator.render();
    for(var key in options.api.lang) {
        var conf = apiObjectTree[key];
        docgen.generate(conf.tree, conf.templateDir, conf.apiOutput, conf.outputExt, conf.showInheritedMethods, apiNav, articleNav, constantsObj, key, conf.options);
    }
    articleNav = articleNav.replace('**placeholder**', apiNav);

    } catch (e) {
        console.log(e.stack);
        grunt.fail.warn(e);
    }

    grunt.log.ok("RazorDoc Finished");

    function folderWalker(dirArray, dirPath, articles, rootPath) {
        var dirList = [];
        for(var i=0; i<dirArray.length; i++) {
            var item = dirArray[i];
            var itemPath = dirPath + '/' + item;
            var stats = fs.statSync(itemPath);
            if(stats.isDirectory()) {
                dirList.push({
                    'name': item,
                    'path': itemPath.replace(rootPath, '').replace(/\/*/, ''),
                    'type': 'directory',
                    'content': folderWalker(fs.readdirSync(itemPath), itemPath, articles, rootPath)
                });
                
                // dirList.push(folderWalker(fs.readdirSync(itemPath), itemPath));
            } else if(stats.isFile()) {

              // Check for hidden files, if there exists: ignore it
              if(!item.match(/^\./)){
                  dirList.push({
                      'name': item,
                      'path': itemPath.replace(rootPath, '').replace(/\/*/, ''),
                      'type': 'file',
                  });
                  articles.push({
                      'name': item,
                      'path': itemPath.replace(rootPath, '').replace(/\/*/, '')
                  });
              }
            }
        }

        return dirList;
    }
  });
};
