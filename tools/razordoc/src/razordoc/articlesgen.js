var ejs = require('ejs');
var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');
var _ = require('underscore');
var marked = require('marked');
var util = require('util');
var querystring = require('querystring');

var articleTree,
    apiTree,
    apiConfig,
    exampleTree,
    articlesDir,
    examplesDir,
    outputDir,
    tempDir,
    examplesExt,
    outputFileExt,
    articlesOutput,
    apiOutput,
    articleTemplatesDir,
    outputLinkPath,
    examplesImagesDir,
    examplesLinkPath,
    exampleLiveLinkPath,
    exampleImagesLinkPath,
    imagesPath,
    apiNav,
    riddlerURL,
    partialsPath,
    razorOptions;

var winston = require('winston')
var logger = new winston.Logger();
logger.add(winston.transports.Console, {
    colorize: true,
    level: 'info'
});

var helperFunctions = ['partial', 'embedExample', 'linkApi', 'linkArticle', 'ref', 'anchor', 'image', 'notice', 'riddlerLink', 'url'];

var preProcessHelpers = {
    anchor: function(id, title) {
        this.anchors.push({
            id: id,
            title: title
        });
    },
    partial: function(partialPath, obj) {
        partialPath = path.resolve(partialsPath, partialPath) + '.md';
        if(fs.existsSync(partialPath)) {
            var fileContents = partialTags(fs.readFileSync(partialPath, 'utf-8'));
            var outputMD = ejs.render(fileContents, obj);
            return outputMD;
        } else {
            throw "partial  `" + partialPath +  " does not exist!";
        }
    },
    anchors: []
};

var markdownHelpers = {
    partial: function(filename, obj) {
        // if(_.indexOf(articleTree.partials, filename + '.md') >= 0) {
        //     var partialPath = path.resolve(articlesDir + '/_partials/' + filename + '.md');
        //     var content = fs.readFileSync(partialPath, 'utf-8');

        //     return ejs.render(content, obj);
        // } else {
        //     throw "Partial [" + filename + "] not found!";
        //     return '';
        // }
    },
    embedExample: function(lang, filename) {
        var content = '<pre><code><%- code %></code></pre>';
        var examplesLayoutFile = articleTemplatesDir + '/' + 'exampleLayout.ejs';
        var _examplesImagesDir = !!examplesImagesDir ? examplesImagesDir : '/';
        var exampleNode = exampleTree[lang];

        if(fs.existsSync(examplesLayoutFile)) {
            content = fs.readFileSync(examplesLayoutFile, 'utf-8');
        }
        
        if(_.indexOf(exampleNode.content, filename) >= 0) {
            var examplePath = path.resolve(exampleNode.src + '/' + filename + exampleNode.srcSuffix);

            var code = fs.readFileSync(examplePath, 'utf-8'),
                riddlerURLPath = null;



            return ejs.render(content, {
                code: code,
                thumbnail: '<img src="' + exampleNode.thumbPrefix + filename + exampleNode.thumbSuffix + '" />',
                image: exampleNode.imagePrefix + filename + exampleNode.imageSuffix,
                live: exampleNode.livePrefix + filename + exampleNode.liveSuffix,
                filename: filename + '.' + lang,
                lang: lang,
                riddlerURL: function(source, lang, url_path) {
                    riddlerURLPath = riddlerURL + '?' + querystring.stringify({
                        source: source,
                        lang: lang,
                        path: path.join(url_path)
                    });
                    
                    return riddlerURLPath;
                }
            });
        } else {
            throw "Example [" + filename + "] not found!";
            return '';   
        }
    },
    linkApi: function(lang, classname, methodname, displayClass) {
        var apiNode = apiConfig[lang];
        var filename = classname + '.' + outputFileExt + '#' + methodname;
        var apiRoot =   outputLinkPath + '/' + path.basename(articlesOutput) + '/' + apiNode.linkPath + filename;
        if(fs.existsSync(apiNode.src + '/' + filename)) {
            return '<a href="' + apiRoot + '" style="background: #F66;">' + (displayClass) ? classname + '::' +methodname : methodname + '</a>';
        } else {
            return '<a href="' + apiRoot + '">' + (methodname || classname) + '</a>';    
        }
        
    },
    linkArticle: function(filename, title) {
        var url = articleURL(filename, title);
        if(url.broken) {
            return '<a href="' + url.link + '" style="background: #F66;">' + filename + '</a>';
        }

        return '<a href="' + url.link + '">' + url.title + '</a>';
    },
    url: function(filename) {
        return articleURL(filename).link;
    },
    ref: function(anchor) {
        var anchorNode = _.where(anchors, {id: anchor});
        var _path = anchorNode[0].path.replace('.md', '.' + outputFileExt);
        var articleRoot = outputLinkPath + '/' + path.basename(articlesOutput) + '/' + _path;
        if(anchorNode.length == 0) {
            throw 'No anchors with the id [' + anchor + ']';
        } else if(anchorNode.length > 1) {
            throw 'Multiple anchors with the id [' + anchor + ']';
        } else {
            
            return '<a href="' + articleRoot + '">' + anchorNode[0].title + '</a>';
        }
    },
    anchor: function(id, title) {
        return '<div id="'+id+'"></div>';
    },
    image: function(imagePath){
      return '<img src="'+path.join(imagesPath, imagePath)+'" />';
    },
    notice: function (type, title, message) {
        return "<div class='alert alert-" + type + "'><strong>" + title + "</strong> " + message + "</div>";
    },
    riddlerLink: function(source, lang, path, title) {
        var url = '',
            title = title ? title : 'Edit in Riddler';

        url = riddlerURL + '?' + querystring.stringify({
            source: source,
            lang: lang,
            path: path
        });

        return url;
    }
};

var anchors = [];

exports.generate = function(options) {
    razorOptions = options.options,
    articleTree = options.articleTree;
    apiTree = options.apiTree;
    exampleTree = options.exampleTree;
    articlesDir = options.articlesDir;
    examplesDir = options.examplesDir;
    outputDir = options.outputDir;
    tempDir = outputDir + '/_temp';
    examplesExt = options.examplesExt;
    outputFileExt = options.outputFileExt;
    articlesOutput = options.articlesOutput;
    apiOutput = options.apiOutput;
    articleTemplatesDir = options.articleTemplatesDir,
    outputLinkPath = options.outputLinkPath;
    examplesImagesDir = options.examplesImagesDir;
    examplesLinkPath = options.examplesLinkPath;
    exampleImagesLinkPath = options.exampleImagesLinkPath;
    exampleLiveLinkPath = options.exampleLiveLinkPath;
    apiConfig = options.apiConfig;
    apiNav = options.apiNav || '';
    imagesPath = options.imagesPath;
    riddlerURL = options.riddlerURL;
    partialsPath = options.partialsPath;

    if(!fs.existsSync(tempDir)) {
        mkdirp(tempDir);    
    }
    
    preprocessMD(articleTree, articlesDir, outputDir, tempDir);
    processMD(articleTree, tempDir);
    // renderMD(articleTree, tempDir, articleTemplatesDir);
    return articleTreeGen();
};

exports.render = function() {
    renderMD(articleTree, tempDir, articleTemplatesDir);
    rmdir(tempDir);
}

var rmdir = function(dir) {
    var list = fs.readdirSync(dir);
    for(var i = 0; i < list.length; i++) {
        var filename = path.join(dir, list[i]);
        var stat = fs.statSync(filename);
        
        if(filename == "." || filename == "..") {
            // pass these files
        } else if(stat.isDirectory()) {
            // rmdir recursively
            rmdir(filename);
        } else {
            // rm fiilename
            fs.unlinkSync(filename);
        }
    }
    fs.rmdirSync(dir);
};

var articleURL = function(filename, title) {
    var articleNode = _.where(articleTree.articles, {path: filename + '.md'});
    articleNode = (!articleNode.length) ? _.where(articleTree.articles, {id: filename}) : articleNode;
    if(!articleNode.length) {
        return { link: '#brokenLink', broken: true, title: '' };
    } else {
        var articleTitle = title ? title : articleNode[0].title;
        var articleRoot = outputLinkPath + '/' + path.basename(articlesOutput) + '/' +  articleNode[0].path.replace('.md', '') + '.' + outputFileExt;
        return { link: articleRoot, broken: false, title: articleTitle };
    }

};


function getArticleTitle(path) {
    return _.where(articleTree.articles, {path: path})[0].title;
}

function getArticleIndex(path) {
    return _.where(articleTree.articles, {path: path})[0].index;
}

function getArticleID(path) {
    return _.where(articleTree.articles, {path: path})[0].id;
}

function path2Link (_path) {
    _path = _path.replace('.md', '.' + outputFileExt);
    return outputLinkPath + '/' + path.basename(articlesOutput) + '/' +  _path;
}

function linkify(title, _path) {
    _path = _path.replace('.md', '.' + outputFileExt);
    var articleRoot = outputLinkPath + '/' + path.basename(articlesOutput) + '/' +  _path;
    // console.log(articleRoot);
    return '<a href="'+articleRoot+'">'+title+'</a>';
}

function walkTree(tree, makeUL, makeLI, noLI) {
    var str = '';
    var list = null;
    for(var i=0; i<tree.length; i++) {
        var item = tree[i];
        if(item === 'placeholder') {
            str += '**placeholder**';
        }
        if(item.type === 'file' && !(path.basename(item.path, '.md') === 'index')) {
            var index = getArticleIndex(item.path);

            if(typeof index !== undefined) {
                list = list || [];
                list[index] = makeLI(linkify(getArticleTitle(item.path), item.path), getArticleID(item.path));
            }
            
            // str += makeLI(linkify(getArticleTitle(item.path), item.path));
        } else if(item.type === 'directory') {
            str += walkTree(item.content, makeUL, makeLI);
        }
    }
    if(list) {
        for(var i=0; i<list.length; i++) {
            str += list[i] || '';
        }    
    }
    
    var index = _.where(tree, {name: 'index.md'})[0];
    if(noLI) {
        return str;
    } else {
        return makeLI(linkify(getArticleTitle(index.path), index.path) + makeUL(str), getArticleID(index.path));    
    }
    
}
function makeLI (str, id) {
        return '<li data-id="'+id+'">' + str + '</li>';
    }

    function makeUL (str) {
        return '<ul>' + str + '</ul>';
    }

function articleTreeGen() {
    var tree = articleTree.articleStruct;
    var articleNav = walkTree(tree, makeUL, makeLI, true);
    return articleNav + apiNav;
}

exports.articleTreeGen = articleTreeGen;

function articleBreadcrumbGen(fpath) {
    if(fpath.trim() === 'index.md') {
        return;
    }
    var components = fpath.split('/');
    var breadcrumb = '';
    var minus = 1;
    if(path.basename(fpath, '.md') === 'index') minus = 2;

    for(var i=0; i<components.length - minus; i++) {
        var c = components[i];
        var p = components.slice(0, i + 1).join('/');
        
        if(c.match('.md')) {
            if(path.basename(c, '.md') !== 'index') {
                breadcrumb += makeLI(linkify(getArticleTitle(p), p));    
            }
        } else {
            // console.log(p + '/index.md');
            breadcrumb +=  makeLI(linkify(getArticleTitle(p+'/index.md'), p+'/index.md'));
        }
    }
    if(components.length > 1) {
        breadcrumb += makeLI(getArticleTitle(components.join('/')));
        return makeLI(linkify(getArticleTitle('index.md'), 'index.md')) + breadcrumb;
    } else {
        return makeLI(getArticleTitle('index.md')) + breadcrumb;    
    }
    
}

function renderMD (articleTree, tempDir, options) {
    var articles = articleTree.articles;
    var layout = fs.readFileSync(articleTemplatesDir + '/layout.ejs', 'utf-8');
    // console.log(articleTemplatesDir);
    for(var i=0; i<articles.length; i++) {
        var article = articles[i];
        var filePath = path.resolve(tempDir + '/' + article.path);
        var newPath = path.resolve(articlesOutput + '/' + article.path.replace('.md', '.' + outputFileExt));
        var str = fs.readFileSync(filePath, 'utf-8');

        var processed = marked(str, markdownHelpers);

        if(!fs.existsSync(path.dirname(newPath))) {
            mkdirp.sync(path.dirname(newPath));
        }
        
        var breadcrumb = articleBreadcrumbGen(article.path);

        // console.log(breadcrumb);
        var next = article.next ? {title: article.next.title, path: path2Link(article.next.path)} : null;
        var prev = article.prev ? {title: article.prev.title, path: path2Link(article.prev.path)} : null;
        var articleNav = articleTreeGen();
        var articleTitle = article.hideTitle ? "" : article.title;
        var file = ejs.render(layout, {articleNav: articleNav, apiNav: apiNav, content: processed, breadcrumb: breadcrumb, title: articleTitle, 
                    next: next, prev: prev, id: article.id, options: razorOptions});
        
        fs.writeFileSync(newPath, file, 'utf-8');
    }
}

function processMD (articleTree, tempDir) {
    var articles = articleTree.articles;

    for(var i=0; i<articles.length; i++) {
        var article = articles[i];
        var filePath = path.resolve(tempDir + '/' + articles[i].path);
        var str = fs.readFileSync(filePath, 'utf-8');
        var processed = ejs.render(str, markdownHelpers);
        
        fs.writeFileSync(filePath, processed, 'utf-8');
    }
}


function preprocessMD (articleTree, articlesDir, outputDir, tempDir) {
    var articles = articleTree.articles;
    for(var i=0; i<articles.length; i++) {
        var article = articles[i],
            str = fs.readFileSync(articlesDir + '/' + article.path, 'utf-8'),
            meta = readMetaTag(str, article),
            tags = codeTags(meta);
            _anchors = processAnchor(tags),
            partialsProcessed = processPartial(tags);
            preProcessed = partialsProcessed,
            dirname = path.dirname(article.path),
            crdr = tempDir + '/' + dirname,
            crPath = path.resolve(tempDir + '/' + article.path);
        if(typeof article.id !== 'string') {
            logger.warn('article `' + article.path + '` doesn\'t have an id. Please make sure id is present to be able to link from other articles');
        }
        if(_anchors.anchors.length) {
            for(var j=0; j<_anchors.anchors.length; j++) {
                anchors.push({
                    id: _anchors.anchors[j].id,
                    title: _anchors.anchors[j].title,
                    path: article.path + '#' + _anchors.anchors[j].id
                });
            }
        }
        if(!fs.existsSync(crdr)) {
            mkdirp.sync(crdr);
        }

        fs.writeFileSync(crPath, preProcessed, 'utf-8');
    }

    for(var i=0; i<articles.length; i++) {
        addNavButtons(articles[i]);
    }   
}

function addNavButtons (article) {
    if(typeof article.index === 'number') {
        var index = article.index,
        series = article.series,
        dir = path.dirname(article.path),
        siblings = _.filter(articleTree.articles, function(item) {
            return path.dirname(item.path) === dir && item.series === series;
        }),
        prev = _.where(siblings, {index: index - 1})[0],
        next = _.where(siblings, {index: index + 1})[0];
        
        article.prev = prev;
        article.next = next;
    } else {
        if(article.name !== 'index.md') {
            logger.warn('Article `' + article.path + '` doesn\'t have an index or is not a number');    
        }
    }
}

function codeTags(str) {
    return str.replace(/\{\{/g, '<%-').replace(/\}\}/g, '%>');
}

function partialTags(str) {
    return str.replace(/\{\%/g, '<%').replace(/\%\}/g, '%>');
}

function ejsTags(str) {
    return str.replace(/\<\%\-/g, '{{').replace(/\%\>/g, '}}');
}

function processPartial(file) {
    var processFile = partialTags(ejsTags(file)),
        processedFile = ejs.render(processFile, {partial: preProcessHelpers.partial});
    if(file.indexOf('partial') !== -1) {
        console.log(file);
    }
    return codeTags(processedFile);
}

function readMetaTag(str, node) {
    var matched = str.match(/<meta>([\s\S]*)<\/meta>/),
        json = matched ? matched[1] : '{}';
        obj = JSON.parse(json);

    for(var key in obj) {
        node[key] = obj[key];
    }

    if(_.isUndefined(node['id'])) {
        node['id'] = Date.now();
    }
    if(_.isUndefined(node['series'])) {
        node['series'] = 'default';
    }
    return str.replace(/<meta>([\s\S]*)<\/meta>/, '');
}

function helperGen(hf) {
    var obj = {};

    for(var i=0; i<helperFunctions.length; i++) {
        obj[helperFunctions[i]] = new Function();
    }

    return _.extend(obj, hf);
}

function processAnchor(str) {
    var helpers = helperGen(preProcessHelpers);

    helpers.anchors = [];
    str = ejs.render(str, helpers);

    return {
        str: str,
        anchors: helpers.anchors
    };
}
