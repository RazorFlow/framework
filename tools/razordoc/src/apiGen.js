var fs = require('fs');
var apiParser = require('./apiParser');
var articlesGen = require ('./articlesGen');

exports.genAPIMeta = function (files) {
    var tree = {
       classes: []
    };
    for(var i=-1; ++i<files.length;) {
        var file = files[i];
        var content = fs.readFileSync (file, 'utf-8');

        apiParser.parse(content, tree);
    }
    sanitizeTree (tree);

    return tree;
};


function sanitizeTree (tree) {
    var classes = tree.classes;

    for(var i=-1; ++i<classes.length;) {
        sanitizeClass (classes[i]);
    }
}

function sanitizeClass (classNode) {
    if(classNode.desc) {
        classNode.desc = classNode.desc.content;
    }

    if(classNode.class) {
        classNode.class = classNode.class.name;
    }

    if(classNode.augments) {
        classNode.augments = classNode.augments.name;
    }

    if(classNode.access) {
        classNode.access = classNode.access.name;
    }
    if(classNode.methods) {
        for(var i=-1; ++i<classNode.methods.length;) {
            method = classNode.methods[i];
            if(method.desc) {
                method.desc = method.desc.content;
            }

            if(method.method) {
                method.method = method.method.name;
            }

            if(method.example) {
                method.example = method.example.code;
            }
        }
    }
}

var fs = require('fs');
var ejs = require('ejs');
var _ = require('underscore');
var path = require('path');
var mkdirp = require('mkdirp');

var templateDir = '';

var viewObjectHelpers = {
    render: function (templateFile, obj) {
        var templateFilePath = path.resolve(templateDir, templateFile);

        var template = fs.readFileSync(templateFilePath, 'utf-8');
        _.extend(obj, viewObjectHelpers);
        return ejs.render(template, obj);
    },
    linkify: function(options) {
        return '<a href=' + (options.href || '#') + '>' + options.text + '</a>';
    },
    findConstantsObject: function(id) {
        var obj = exports.constantsObj[id];
        var resultObj = {};
        if(obj) {
             extractProps(obj, resultObj);
             return resultObj;
        }
        
        return null;
    }
}

var extractProps = function(obj, props) {
    for(var key in obj.properties) {
        if(obj.properties[key].public) {
            props[key] = obj.properties[key];    
        }
    }
    if(obj.base !== 'PropertyBase') {
        extractProps(exports.constantsObj[obj.base], props);
    }
    return props;
};

exports.generate = function(tree, _templateDir, _outputDir, outputExt ,showInheritedMethods, apiNav, articleNav, constantsObj, lang, razorOptions, toc) {
    var layoutTemplate = '',
        layoutTemplatePath = _templateDir + '/' + 'layout.ejs';

    exports.constantsObj = constantsObj;
    templateDir = _templateDir; 
    var viewOptions = _.extend({
        tree: tree,
        apiNav: apiNav,
        articleNav: articleNav,
        lang: lang,
        options: razorOptions,
        toc: toc
    }, viewObjectHelpers);

    if(!fs.existsSync(layoutTemplatePath)) {
        fatalError('Layout template missing!');
    }

    layoutTemplate = fs.readFileSync(layoutTemplatePath, 'utf-8');

    var renderList = tree.findAllClassNames({'access': 'public'});
    try {
        renderList = ['index'].concat(renderList);
        for(var _i=0; _i<renderList.length; _i++) {
            viewOptions.currentClass = renderList[_i];
            var layoutHTML = ejs.render(layoutTemplate, viewOptions);
            var outputPath = _outputDir + '/' + renderList[_i] + '.' + outputExt;
            if(!fs.existsSync(path.dirname(outputPath))) {
                mkdirp.sync(path.dirname(outputPath));
            }

            fs.writeFileSync(outputPath, layoutHTML, 'utf-8');
        }
    } catch (e) {
        console.log(e);
    }
        
};


function fatalError(msg) {
    console.error(msg);
    process.exit(0);
}
