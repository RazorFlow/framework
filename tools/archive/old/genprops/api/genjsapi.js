var esprima = require('esprima');
var fs = require('fs');


var fileList = {
	"Component": "../rfjs/src/js/core/component.js"
}

var componentText = fs.readFileSync(fileList['Component']);

var string = '';

function traverse(node, func) {
    func(node);
    for (var key in node) { 
        if (node.hasOwnProperty(key)) { 
            var child = node[key];
            if (typeof child === 'object' && child !== null) { 
                if (Array.isArray(child)) {
                    child.forEach(function(node) { 
                        traverse(node, func);
                    });
                } else {
                    traverse(child, func); 
                }
            }
        }
    }
}

function trimString(string){
    string = string.replace(/\s+$/,'');
    string = string.replace(/^\s+/,'');
    return string;
}

function analyzeCode(code) {
    var ast = esprima.parse(code,{comment:true, loc:true});
    var y = [];
    var fin = null;
    var length = null;
    var arrlen = 0;
    var re = new RegExp("[a-zA-Z\s@\{\}\[\]\,\.]*\n");
    var search = 0;
    var description = 0;
    var splitString = '';
    var functionName = '';
    var value = '';
    var paramList = [];
    var returnParam = [];
    var apiContainer = {};
    var cName = null;
    
    traverse(ast,function(node){
    	if(node.type === 'FunctionDeclaration'){
        	
            var bodlen = node.body.body.length;
            for(var j=0;j<bodlen-1;j++){
                if(typeof(node.body.body[j].expression) != 'undefined'){
                    if(typeof(node.body.body[j].expression.right) != 'undefined'){
                        var funcName = node.body.body[j].expression.left.name;
                        if(typeof(funcName) != 'undefined'){
                            var checkProtected = funcName.match(/\w*Protected$/);
                            if(checkProtected == null){
                                y.push(node.body.body[j].expression);
                            }
                        }
                    }
                }
            }
        }
    });
    
    for(var p=0;p<y.length;p++){
        apiContainer[y[p].left.name] = {};
        cName = apiContainer[y[p].left.name];
        cName['functions'] = {};
        for(var i=0;i<y[p].right.properties.length;i++){
            traverse(ast,function(node){
                if(node.type == 'Block'){
                    if(node.loc['end'].line == y[p].right.properties[i].loc['start'].line-1){
                        functionName = y[p].right.properties[i].key.name;
                        value = node.value;
                        value = value.replace(/(\r\n|\n|\r)/gm," ");
                        var x = value.split('*');
                        paramList = [];
                        returnParam = [];
                        funcDesc = x[2];
                        funcDesc = trimString(funcDesc);
                        cName['functions'][functionName] = {
                            'description' : funcDesc,
                            'params' : [],
                            'return' : []
                        };
                        for(var q=3;q<x.length;q++){
                            x[q] = x[q].replace(/^\s/,'');
                            var n = x[q].match(/^\s*$/);

                            if(n == null){
                                splitString = x[q].split(/\s+/,1);
                                if(splitString[0] == '@param'){
                                    splitString = x[q].split(/\s+/,3);
                                    search = x[q].search(splitString[2])+splitString[2].length;
                                    description = x[q].slice(search,x[q].length);
                                    description = trimString(description);
                                    var param = {
                                        'name' : splitString[2],
                                        'type' : splitString[1],
                                        'description' : description
                                    };
                                    paramList.push(param);
                                }
                                if(splitString[0] == '@return'){
                                    splitString = x[q].split(/\s+/,2);
                                    search = x[q].indexOf(splitString[1])+splitString[1].length;
                                    description = x[q].slice(search,x[q].length);
                                    description = trimString(description);
                                    var retParam = {
                                        'returnType' : splitString[1],
                                        'description' : description
                                    };
                                    returnParam.push(retParam); 
                                }
                            }
                        }
                        if(paramList.length > 0){
                            cName['functions'][functionName]['params'].push(paramList);
                        }
                        if(returnParam.length>0){
                            cName['functions'][functionName]['return'].push(returnParam);
                        }
                    }    
                }
            }); 
        }
    }
    console.log(JSON.stringify(apiContainer, null, 4));
}
analyzeCode(componentText);
