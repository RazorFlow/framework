var fs = require ('fs');
var _ = require ('underscore');
var globals = {};

exports.generateTOC = function (toc, articlesDir, linkPrefix, suffix, apiMeta, apiPrefix) {
    var articles = [];
    var tree = folderWalker (fs.readdirSync(articlesDir), articlesDir, articles, articlesDir);
    globals.articles = articles;
    globals.linkPrefix = linkPrefix;
    globals.suffix = suffix;
    processMeta (articlesDir, articles);
    addAPINav (articles, apiMeta, apiPrefix);
    var html = constructTOC (toc);
    return html;
};

function addAPINav (articles, apiMeta, apiPrefix) {
    var classes = apiMeta.classes;
    for(var i=-1; ++i<classes.length;) {
        articles.push ({
            type: 'api',
            id: classes[i].class,
            title: classes[i].class,
            path: apiPrefix + classes[i].class + '.' + globals.suffix
        });
    }
}

function constructTOC (tocTree) {
    var html = '<ul id="docTree" class="rf-tree docTree">';
    for(var i=-1; ++i<tocTree.length;) {
        html += '<li>' + toc(tocTree[i]) + '</li>';
    }
    html += '</ul>'
    return html;
}

function toc (tocTree) {
    var articles = globals.articles;
    var str = '';
    if(tocTree.id) {
        var article = (_.where (articles, {id: tocTree.id}) || [])[0];
            if(article.type === 'api') {
                str += linkApi (article);
            } else {
                if(tocTree.title) {
                    str += linkArticle (article);
                } else {
                    str += linkArticle (article, tocTree.title);
                }
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

function linkArticle (article, title) {
    return '<a href="' + globals.linkPrefix + article.path.replace('.md', '.' + globals.suffix) + '">' + (title || article.title) + '</a>';
}

function linkApi (article) {
    return '<a href="' + article.path + '">' + article.title + '</a>';
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