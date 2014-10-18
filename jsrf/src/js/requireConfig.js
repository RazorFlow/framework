(function(global) {
    var paths = {
        kendo: 'vendor/kendo',
        jsep: 'vendor/jsep'
    };
    var shim = {
        jsep: {
            exports: 'jsep'
        }
    };
    
    global.browserConfig = extend({
        paths: resetPaths(clone(paths), 'http://localhost:8080/mount/jsrf/'),
        shim: clone(shim)
    }, {
        baseUrl: 'http://localhost:8080/mount/jsrf/js/'
    });

    var requireDefaults = {
        paths: resetPaths(clone(paths), "../"),
        shim: clone(shim),
        baseUrl: "jsrf/src/js",
        name: "buildutils/almond",
        preserveLicenseComments: false,
        optimize: "uglify2",
        uglify2: {
            mangle: true
        },
        // optimize:"none"
    };

    global.core = extend(requireDefaults, {
        include: ['core/main'],
        insertRequire: ['core/main'],
        wrap: {
            'startFile': 'jsrf/src/js/buildutils/start.js',
            'endFile': 'jsrf/src/js/buildutils/end.js'
        },
        out: "build/assets/js/razorflow.min.js"
    });

    global.core_eval = extend(requireDefaults, {
        include: ['evaluation/eval_main'],
        insertRequire: ['evaluation/eval_main'],
        wrap: {
            'startFile': 'jsrf/src/js/buildutils/start.js',
            'endFile': 'jsrf/src/js/buildutils/end.js'
        },
        out: "build/eval_assets/js/razorflow.min.js"
    });

    global.devtools = extend(requireDefaults, {
        include: ['core/devtools.main'],
        insertRequire: ['core/devtools.main'],
        wrap: {
            'startFile': 'jsrf/src/js/buildutils/start.js',
            'endFile': 'jsrf/src/js/buildutils/enddebug.js'
        },
        out: "build/assets/js/razorflow.devtools.min.js"
    });

    global.wrapper = extend(requireDefaults, {
        include: ['wrapperhelpers/wrappermain'],
        insertRequire: ['wrapperhelpers/wrappermain'],
        wrap: {
            'startFile': 'jsrf/src/js/buildutils/start.js',
            'endFile': 'jsrf/src/js/buildutils/endwrapper.js'
        },
        out: "build/assets/js/razorflow.wrapper.min.js"
    });

    global.wrapper_eval = extend(requireDefaults, {
        include: ['evaluation/eval_wrapper_main'],
        insertRequire: ['evaluation/eval_wrapper_main'],
        wrap: {
            'startFile': 'jsrf/src/js/buildutils/start.js',
            'endFile': 'jsrf/src/js/buildutils/endwrapper.js'
        },
        out: "build/eval_assets/js/razorflow.wrapper.min.js"
    })

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
})((typeof module !== "undefined" && module.exports) ? module.exports : ((!!window) ? window : this));