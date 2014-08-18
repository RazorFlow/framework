var fs = require('fs');
var _ = require('underscore');
var path = require('path');
var mkdirp = require('mkdirp');
var ejs = require('ejs');
var marked = require('marked');
var http = require('http');
var anchors = [];
var currentFile = '';
var currentProcess = '';
var preprocessHelpers = {
    anchor: function (id, title) {
        var anchor = (_.where(anchors, {id: id}) || [])[0];
        if(!anchor) {
            anchors.push ({
                id: id,
                title: title,
                article: currentFile
            });
        }
    },
    partial: function (){},
    linkArticle: function (){},
    linkApi: function (){},
    embedExample: function (){},
    ref: function () {},
    notice: function() {}
};
var errors = [];

var processHelpers = {
    anchor: function (id, title) {
        return '<div id="' + id + '"></div>';
    },
    partial: function (id, obj) {
        var partial = (_.where(this.partials, {path: id + '.md'}) || [])[0];
        if(partial && fs.existsSync(this.partialsPath + '/' + partial.path)) {
            var partialContent = fs.readFileSync (this.partialsPath + '/' + partial.path, 'utf-8');
            var processedContent = ejs.render (partialContent, obj);
            var content = ejs.render(processedContent.replace (/\{\{/g, '<%-').replace (/\}\}/g, '%>'), processHelpers);
            return content;
        } else {
            errors.push('PARTIAL_NOT_FOUND');
            console.log('Cannot find partial with id ' + id + ' in file `' + currentFile.path + '`');
            return 'Partial with id `' + id + '` not found';
        }
    },
    linkArticle: function (id) {
        var article = (_.where (this.articles, {id: id}) || [])[0];
        if(article) {
            return '<a href="' + this.linkPrefix + article.path.replace('.md', '.' + this.suffix) +'">' + article.title + '</a>';    
        } else {
            errors.push ('ARTICLE_NOT_FOUND');
            console.log('Cannot find article with id `' + id + '` in file `' + currentFile .path+ '`');
            return '<a href="#brokenLink">' + id + '</a>';
        }
    },
    linkApi: function (lang, classname, methodname) {
        var classObj = (_.where(this.apiTree.classes, {class: classname}) || [])[0];
        if(classObj) {
            return '<a href="' + this.apiLinkPrefix + classname + '.' + this.suffix + '#' + methodname + '">' + (!!methodname ? methodname : classname) + '</a>';
        } else {
            return '<a href="#brokenLink">' +  (!!methodname ? methodname : classname) + '</a>';
            console.log('Cannot find class `' + classname + '` found in file `' + currentFile.path + '`');
        }
    },
    embedExample: function () {

    },
    ref: function (id) {
        var anchor = (_.where(anchors, {id: id}) || [])[0];
        if(anchor) {
            return '<a href="' + this.linkPrefix + anchor.article.path.replace('.md', '.' + this.suffix) + '">' + anchor.title + '</a>';
        } else {
            errors.push('UNDEFINED_ANCHOR');
            console.log('Cannot find anchor with id `' + id + '` in file `' + currentFile.path + '`');
            return '<a href="#brokenLink">' + id + '</a>';
        }
        
    },
    notice: function() {}
};

exports.generate = function (articlesDir, templateDir, outputDir, partialsPath, linkPrefix, suffix, apiTree, apiLinkPrefix, toc, tocTree) {
    var articles = [];
    var partials = [];
    var tree = folderWalker (fs.readdirSync(articlesDir), articlesDir, articles, articlesDir);
    var partialsTree = folderWalker (fs.readdirSync(partialsPath), partialsPath, partials, partialsPath);
    var tempDir = outputDir + '/tmp';
    processHelpers.articles = articles;
    processHelpers.partials = partials;
    processHelpers.partialsPath = partialsPath;
    processHelpers.linkPrefix = linkPrefix;
    processHelpers.suffix = suffix;
    processHelpers.apiTree = apiTree;
    processHelpers.apiLinkPrefix = apiLinkPrefix;

    processMeta (articlesDir, articles);
    removeMeta (articlesDir, articles, tempDir);
    replaceTags(tempDir, articles);
    preprocess (tempDir, articles);
    process (tempDir, articles);

    render (tempDir, templateDir, outputDir, articles, suffix, toc, tocTree);
    rmdir(tempDir);
};

function handleErrors (articlesDir, templateDir, outputDir, partialsPath, linkPrefix, suffix, apiTree, apiLinkPrefix, toc, tempDir, article) {
    var errorsProcessed = false;
    var tmpErrors = _.clone (errors);
    for(var i=-1; ++i<tmpErrors.length;) {
        var error = errors[i];
        if(error === 'UNDEFINED_ANCHOR') {
            exports.generate(articlesDir, templateDir, outputDir, partialsPath, linkPrefix, suffix, apiTree, apiLinkPrefix, toc);
            errorsProcessed = true;
        } else if (error === 'PARTIAL_NOT_FOUND') {
            console.log('Reloading partials and compiling the file');
            var partials = [];
            var partialsTree = folderWalker (fs.readdirSync(partialsPath), partialsPath, partials, partialsPath);
            console.log(partials);
            processHelpers.partials = partials;
            processMetaArticle (articlesDir, article);
            removeMetaArticle (articlesDir, article, tempDir);
            replaceTagsArticle (tempDir, article);
            preprocessArticle (tempDir, article);
            processArticle (tempDir, article);
            renderArticle (tempDir, templateDir, outputDir, processHelpers.articles, article, suffix, toc);
        } else if (error === 'ARTICLE_NOT_FOUND') {
            console.log('Reloading articles and compiling the file');
            exports.generate(articlesDir, templateDir, outputDir, partialsPath, linkPrefix, suffix, apiTree, apiLinkPrefix, toc);
        }
    }
    return errorsProcessed;
}

exports.serve = function (options, configDir) {
    console.log('Starting the editor server');
    var articlesDir = path.resolve(configDir, options.articles.root);
    var outputDir = path.resolve(configDir, options.out);
    var templateDir = path.resolve(configDir, options.articleTemplates);
    var partialsPath = path.resolve(configDir, options.partialsPath);
    var linkPrefix = options.linkPrefix;
    var suffix = options.suffix;
    var apiOptions = options.api; 
    var apiTree = JSON.parse (fs.readFileSync(path.resolve(configDir, apiOptions.meta), 'utf-8'));
    var apiLinkPrefix = apiOptions.linkPrefix;
    var tocPath = path.resolve(options.toc);
    var toc = JSON.parse (fs.readFileSync(tocPath));
    exports.generate (articlesDir, templateDir, outputDir, partialsPath, linkPrefix, suffix, apiTree, apiLinkPrefix, toc);
    var tempDir = outputDir + '/tmp';
    var server = http.createServer(function(req, res) {
        var article = (_.where(processHelpers.articles, {link: req.url}) || [])[0];
        if(article) {
            errors = [];
            processMetaArticle (articlesDir, article);
            removeMetaArticle (articlesDir, article, tempDir);
            replaceTagsArticle (tempDir, article);
            preprocessArticle (tempDir, article);
            processArticle (tempDir, article);
            renderArticle (tempDir, templateDir, outputDir, processHelpers.articles, article, suffix, toc);
            // console.log(req.url);
            // console.log(article);
            handleErrors (articlesDir, templateDir, outputDir, partialsPath, linkPrefix, suffix, apiTree, apiLinkPrefix, toc, tempDir, article);
            res.setHeader ('Content-Type' ,'text/html');
            var outDir = '/' + _.difference(outputDir.split('/'), req.url.split('/')).join('/');
            res.end(fs.readFileSync(outDir + req.url));;
        }
        res.end(JSON.stringify(req.url));
    }).listen(8000);
}
function preprocess (tempDir, articles) {
    try {
        for(var i=-1; ++i<articles.length;) {
            var article = articles[i];
            preprocessArticle(tempDir, article)
        }
    } catch (err) {
        console.log('Error in preprocess : ', err, ' in file ' + currentFile.path);
    }
}

function preprocessArticle (tempDir, article) {
    var filename = tempDir + '/' + article.path;
    var content = fs.readFileSync (filename, 'utf-8');
    currentFile = article;
    var output = ejs.render (content, preprocessHelpers);
}

function process (tempDir, articles) {
    try {
        for(var i=-1; ++i<articles.length;) {
            var article = articles[i];
            processArticle (tempDir, article);        
        }
    } catch (err) {
        console.log('Error in process : ', err, ' in file ' + currentFile.path);
    }
}

function processArticle (tempDir, article) {
    var filename = tempDir + '/' + article.path;
    var content = fs.readFileSync (filename, 'utf-8');
    var output = ejs.render (content, processHelpers);
    fs.writeFileSync (filename, output, 'utf-8');
}

function render (tempDir, layoutDir, outputDir, articles, suffix, toc, tocTree) {
    for(var i=-1; ++i<articles.length;) {
        var article = articles[i];
        renderArticle (tempDir, layoutDir, outputDir, articles, article, suffix, toc, tocTree);
    }
}

function renderArticle (tempDir, layoutDir, outputDir, articles, article, suffix, toc, tocTree) {
    var filename = tempDir + '/' + article.path;
    var outFilename = outputDir + '/' + article.path.replace('.md', '.' + suffix);
    mkdirp.sync (path.dirname(outFilename));
    var content = fs.readFileSync (filename, 'utf-8');
    var markdown = marked (content) + findNextAndPrev (article.id, tocTree);
    var layout = fs.readFileSync(layoutDir + '/layout.ejs', 'utf-8');
    var output = ejs.render(layout, {
        'title': article.title,
        'breadcrumb': breadCrumbGen (articles, article.path),
        'toc': toc,
        'content': markdown
    });
    fs.writeFileSync (outFilename, output, 'utf-8');
}

function constructTOC (tocTree) {
    var html = '<ul>';
    for(var i=-1; ++i<tocTree.length;) {
        html += '<li>' + toc(tocTree[i]) + '</li>';
    }
    html += '</ul>'
    return html;
}

exports.constructTOC = constructTOC;

function linkArticle (article, title) {
    return '<a href="' + processHelpers.linkPrefix + article.path.replace('.md', '.' + processHelpers.suffix) + '">' + (title || article.title) + '</a>';
}

function findNextAndPrev (id, tocTree) {
    var arr = findArticleArray (id, tocTree);
    var str = '';
    if(arr) {
        var article = _.where (arr, {id: id});
        var idx = findIndexInArray (arr, id);
        var prev = findPrev(arr, idx);
        var next = findNext(arr, idx);
        var prevArticle, nextArticle;

        if(prev) {
            prevArticle = _.where (processHelpers.articles, {id: prev.id})[0];
            str += linkArticle(prevArticle);
        }

        if(next) {
            nextArticle = _.where (processHelpers.articles, {id: next.id})[0];
            str += linkArticle(nextArticle);
        }
    } else {
        console.log('Error: cannot find id `' + id + '`in toc ');
    }

    return str;
}

function findPrev (arr, idx) {
    if(idx < 0) return null;
    if(arr[idx - 1] && arr[idx - 1].id) {
        return arr[idx - 1];
    } else {
        return findPrev (arr, idx - 1);
    }
}

function findNext (arr, idx) {
    if(idx >= arr.length - 1) return null;
    if(arr[idx] && arr[idx + 1].id) {
        return arr[idx + 1];
    } else {
        return findPrev (arr, idx + 1);
    }
}

function findIndexInArray (arr, id) {
    for(var i=-1; ++i<arr.length;) {
        if(arr[i].id === id) return i;
    }
}

function findArticleArray (id, tocTree) {
    var article = (_.where (tocTree, {id: id}) || [])[0];
    if(article) {
        return tocTree;
    } else {
        for(var i=-1; ++i<tocTree.length;) {
            if(tocTree[i].children) {
                return findArticleArray(id, tocTree[i].children);
            }
        }
    }
}

function toc (tocTree) {
    var articles = processHelpers.articles;
    var str = '';
    if(tocTree.id) {
        var article = (_.where (articles, {id: tocTree.id}) || [])[0];
        if(tocTree.title) {
            str += linkArticle (article);
        } else {
            str += linkArticle (article, tocTree.title);
        }        
    } else {
        if(tocTree.title) {
            str += '<span>' + tocTree.title + '</span>'
        } else {
            console.log('Error: No id or title provided in toc node');
        }
    }

    if(tocTree.children) {
        str += '<ul>';
        for(var i=-1; ++i<tocTree.children.length;) {
            str += '<li>';
            str += toc (tocTree.children[i]);
            str += '</li>';
        }
        str += '</ul>';
    }
    return str;
}

function breadCrumbGen (articles, fpath) {
    var breadcrumb = [];
    var root = (_.where(articles, {path: 'index.md'}) || [])[0];

    breadcrumb.push(_.extend(root, {
        link: processHelpers.linkPrefix + root.path.replace('.md', '.' + processHelpers.suffix)
    }));
    var article = (_.where(articles, {path: fpath}) || [])[0];
    var parts = fpath.split('/');
    if(article.path.indexOf('index.md') !== -1) {
        parts = parts.slice(0, parts.length - 1);
    }
    
    for(var i=-1; ++i<parts.length;) {
        if(i == parts.length - 1) {
            breadcrumb.push (_.extend(article, {
                link: processHelpers.linkPrefix + parts[i].replace('.md', '.html')
            }));
        } else {
            // TODO
        }
    }
    return breadcrumb;
}

function processMeta (articlesDir, articles) {
    try {
        for(var i=-1; ++i<articles.length;) {
            var article = articles[i];
            processMetaArticle (articlesDir, article);
        }
    } catch (err) {
        console.log('Error in processMeta : ', err);
    }
}

function processMetaArticle (articlesDir, article) {
    var content = fs.readFileSync (articlesDir + '/' + article.path, 'utf-8');
    var meta = stripMeta (content);
    var article = _.extend(article, meta);
}

function stripMeta (str) {
    try {
        var metaObj = {};
        var meta = str.match (/--([\s\S]*)--/)[0].replace(/--/g, '').trim().split('\n');
        for(var i=-1; ++i<meta.length;) {
            var key = meta[i].split(':')[0].trim();
            var value = meta[i].split(':')[1].trim();
            if(!value.match(/"/)) {
                value = +value;
            } else {
                value = value.replace(/"/g, '');
            }
            metaObj[key] = value;
        }
        return metaObj;
    } catch (err) {
        console.log('Error in stripMeta : ', err);
    }
}

function removeMeta (articlesDir, articles, tempDir) {
    try {
        for(var i=-1; ++i<articles.length;) {
            var article = articles[i];
            removeMetaArticle (articlesDir, article, tempDir);
        }
    } catch (err) {
        console.log('Error in removeMeta : ', err);
    }
}

function removeMetaArticle (articlesDir, article, tempDir) {
    var content = fs.readFileSync (articlesDir + '/' + article.path, 'utf-8');
    content = content.replace (/--[\s\S]*--/, '').replace(/--/g, '').trim();
    var filename = tempDir + '/' + article.path;
    mkdirp.sync(path.dirname (filename));
    fs.writeFileSync (filename, content, 'utf-8');
}

function replaceTags (tempDir, articles) {
    try {
        for(var i=-1; ++i<articles.length;) {
            var article = articles[i];
            replaceTagsArticle (tempDir, article);
        }
    } catch (err) {
        console.log ('Error in replaceTags : ', err);
    }
}

function replaceTagsArticle (tempDir, article) {
    var filename = tempDir + '/' + article.path;
    var content = fs.readFileSync (filename, 'utf-8');

    content = content.replace (/\{\{/g, '<%-').replace (/\}\}/g, '%>');
    fs.writeFileSync (filename, content, 'utf-8');
}

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