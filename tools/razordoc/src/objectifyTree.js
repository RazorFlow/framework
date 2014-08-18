var _ = require('underscore');

var treeObject = {
    findAllClassNames: function(filterObj) {
        var nodes = [];
        for(var i=0; i<this.classes.length; i++) {
            var cls = this.classes[i];
            var filter = true;
            if(filterObj) {
                var keys = _.keys(filterObj);
                for(var j=0; j<keys.length; j++) {
                    var key = keys[j];
                    // This .name is a jugaad!!
                    if(cls[key] !== filterObj[key]) {
                        filter = false;
                    }
                }
            }
            if(filter) nodes.push(cls.class);
        }

        return nodes;
    },
    findNodeByClassName: function(name) {
        for(var i=0; i<this.classes.length; i++) {
            var cls = this.classes[i];
            
            if(name === cls.class) {
                return cls;
            }
        }
        console.log(name);
        return null;
    },
    hasClass: function(classname) {
        var classes = this.findAllClassNames();

        return _.indexOf(classes, classname) !== -1;
    }
};
module.exports = function objectifyTree(tree) {
    var tree = _.extend(tree, treeObject);

    postProcess(tree);

    return tree;
}

function postProcess (tree) {
    var classes = tree.classes;

    for(var i=0; i<classes.length; i++) {
        var classNode = classes[i];

        if(!_.isArray(classNode.param)) {
            classNode.params = [classNode.param];
            delete classNode.param;
        } else {
            classNode.params = classNode.param;
            delete classNode.param;
        }

        var methods = classNode.methods || [];
        var events = classNode.events || [];

        for(var j=0; j<methods.length; j++) {
            var methodNode = methods[j];

            if(!_.isArray(methodNode.param)) {
                methodNode.params = [methodNode.param];
                delete methodNode.param;
            } else {
                methodNode.params = methodNode.param;
                delete methodNode.param;
            }

        }

        for(var j=0; j<events.length; j++) {
          var callbackNode = events[j].callback;

          if(_.isUndefined(callbackNode)) {
            console.log("\n" + "Seems like there is no callback provided for: " + events[j].name);
            process.exit();
          }
          else {
            if(!_.isArray(callbackNode.param)) {
                callbackNode.params = [callbackNode.param];
                // delete callbackNode.param;
            } else {
                callbackNode.params = callbackNode.param;
                // delete callbackNode.param;
            }
          }
        }

    }
}