(function(global) {
    var paths = {
        kendo: 'vendor/js/kendo',
        Raphael: 'vendor/js/redraphael',
    };
    var shim = {
        Raphael: {
            exports: 'Raphael'
        }
    };
    
    var browserConfig = extend({
        paths: resetPaths(clone(paths), 'http://localhost:8080/devStatic/jsrf/'),
        shim: clone(shim)
    }, {
        baseUrl: 'http://localhost:8080/devStatic/jsrf/js'
    });

    var gruntConfig = extend({
        paths: resetPaths(clone(paths), '../'),
        shim: clone(shim)
    }, {
        baseUrl: "src/js",
        name: 'buildutils/almond',
        include: ['core/main'],
        insertRequire: ['core/main'],
        wrap: {
            'startFile': 'src/js/buildutils/start.js',
            'endFile': 'src/js/buildutils/end.js'
        },
        // optimize: 'none',
        out: "build/assets/js/razorflow.min.js"
        // optimize: 'none'
    });

    var gruntDebugConfig = extend({
        paths: resetPaths(clone(paths), '../'),
        shim: clone(shim)
    }, {
        baseUrl: "src/js",
        name: 'buildutils/almond',
        include: ['core/devtools.main'],
        insertRequire: ['core/devtools.main'],
        wrap: {
            'startFile': 'src/js/buildutils/start.js',
            'endFile': 'src/js/buildutils/enddebug.js'
        },
        // optimize: 'none',
        out: "build/assets/js/razorflow.devtools.min.js"
        // optimize: 'none'
    });

    var gruntWrapperConfig = extend({
        paths: resetPaths(clone(paths), '../'),
        shim: clone(shim)
    }, {
        baseUrl: "src/js",
        name: 'buildutils/almond',
        include: ['wrapperhelpers/wrappermain'],
        insertRequire: ['wrapperhelpers/wrappermain'],
        wrap: {
            'startFile': 'src/js/buildutils/start.js',
            'endFile': 'src/js/buildutils/endwrapper.js'
        },
        out: "build/assets/js/razorflow.wrapper.min.js"
    });


    function resetPaths (obj, basePath) {
        for(var key in obj) {
            obj[key] = basePath + obj[key];
        }
        return obj;
    }

    function extend(obj1, obj2) {
        var newObj = clone(obj2);
        var newSrc = clone(obj1);
        for(var key in obj1) {
            newObj[key] = newSrc[key];
        } 
        return newObj;
    }

    function clone(obj) {
        var newObj = {};
        for(var key in obj) {
            newObj[key] = obj[key];
        }
        return newObj;
    }

    global.browserConfig = browserConfig;
    global.gruntConfig = gruntConfig;
    global.gruntWrapperConfig = gruntWrapperConfig;
    global.gruntDebugConfig = gruntDebugConfig;

})((typeof module !== "undefined" && module.exports) ? module.exports : ((!!window) ? window : this));