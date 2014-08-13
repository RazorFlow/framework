
/**
 * Searches the AST for classnodes
 * @param  {[type]} tree      [description]
 * @param  {[type]} classname [description]
 * @return {[type]}           [description]
 */
exports.findNodeByClassName = function (tree, classname) {

    for(var i=0; i<tree.classes.length; i++) {
        var cls = tree.classes[i];
        if(cls.class.name === classname) {
            return cls;
        }
    }

    return null;
}