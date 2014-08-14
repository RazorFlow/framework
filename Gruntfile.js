var requireConfig = require("./jsrf/src/js/requireConfig");
var _ = require("underscore");

module.exports = function(grunt) {
    // Options for builds, usually specified by 
    var opts = {
        channel: "beta",
        version: "unknown_version"
    };

    var JSRF_Tasks = {
        requirejs: {
            core: {options:requireConfig.core},
            devtools: {options:requireConfig.devtools},
            wrapper: {options:requireConfig.wrapper}
        },
        jst: {
            jsrf: {
                options: {
                    prettify: true,
                    processName: function (filePath) {
                        var parts = filePath.split('/');
                        var fileName = parts[parts.length - 1];
                        return fileName.split('.')[0];
                    },
                    amd: true,
                    global: false,
                    requires: {
                        'vendor/lodash' : '_'
                    }
                },
                files: {
                    "jsrf/src/js/generated/templates.js": ["jsrf/src/templates/*.html"]
                }
            }
        },
        themegen: {
            jsrf: {
                options: {
                    themeLess: "jsrf/src/less/theme.less",
                    mixins: "jsrf/src/less/mixins.less",
                    defaultVariables: "jsrf/src/less/theme/variables.less"
                },
                themeJSON: "jsrf/src/js/themebuilder/config/defaulttheme.json",
                out: "build/tmp/less/rftheme.default.less",
            }
        },
        less: {
            jsrf: {
                options: {
                    paths: ['jsrf/src/less']
                },
                files: {
                    "build/tmp/css/razorflow.css": "jsrf/src/less/razorflow.less",
                }
            }
        },
        cssmin: {
            jsrf: {
                expand: true,
                cwd: 'build/tmp/css/',
                src: ['razorflow.css'],
                dest: 'build/assets/css',
                ext: '.min.css'
            }
        },
        copyto: {
            jsrf_img: {
                files:[
                    {cwd:"jsrf/src/", src:["img/*"], dest:"build/assets/"},
                    {cwd:"jsrf/src/", src:["img/*"], dest:"build/tmp/"}
                ]
            },
            examples: {
                files: [
                    {cwd: "build/razorflow_js/", src:"**/*", dest: "examples/static/rf/"},
                    {cwd: "build/php/razorflow_php/", src:"**/*", dest: "examples/lib/razorflow_php/"}
                ]
                .concat(_.map([
                    'php_mvc/cakephp/app/vendor/razorflow_php/',
                    'distributable/php_database_sample/razorflow_php/'
                ], function(val){ return {cwd:"build/php/razorflow_php", src:"**/*", dest:"examples/apps/"+val};  })).concat(_.map([
                    'html_embedded/razorflow_js/',
                    'php_mvc/rfci/application/rf/'
                ], function(val){ return {cwd:"build/assets/", src:"**/*", dest:"examples/apps/"+val};  }))
            },
        },
        packman: {

        },
        exec: {

        },
        clean: {
            build: "build"
        },
        screenshotGen: {
            jsExamples: {
                options: {
                    files: "examples/src/js/examples/*.js",
                    out: "examples/static/exampleImages/js/examples/",
                    baseUrl: "http://localhost:8080/dashboard/js/examples/",
                    width: 1024,
                    height: 768,
                    timeout: 2000,
                    extension: ".js"
                }
            },
            phpExamples: {
                options: {
                    files: "examples/src/php/examples/*.php",
                    out: "examples/static/exampleImages/php/examples/",
                    baseUrl: "http://localhost:8080/dashboard/php/examples/",
                    width: 1024,
                    height: 768,
                    timeout: 2000,
                    extension: ".php"
                }
            }
        }
    };

    var js_assets = [
        {dir: "js", files: [
            "jsrf/src/vendor/jquery.min.js",
            "build/assets/js/razorflow.min.js",
            "build/assets/js/razorflow.devtools.min.js"
        ]},
        {dir: "img", src:"build/assets/img/"},
        {dir: "css", src:"build/assets/css/"}
    ];
    var js_files = [
        {dir:"files", files: js_assets},
        {dir:"dashboard_quickstart", src:"jsrf/quickstart/", files:js_assets}
    ];

    var php_files = [
        {dir:"razorflow_php", src:"wrappers/phprf/src/", files: [
            {dir:"static", files: [
                {dir:"rf", files:[
                    {dir:"js", files: [
                        "jsrf/src/vendor/jquery.min.js",
                        "build/assets/js/razorflow.wrapper.min.js",
                        "build/assets/js/razorflow.devtools.min.js"
                    ]},
                    {dir:"img", src:"build/assets/img/"},
                    {dir:"css", src:"build/assets/css/"}
                ]}
            ]}
        ]},
        {dir: "dashboard_quickstart", src:"wrappers/phprf/dashboard_quickstart/", files:[
            {dir:"razorflow_php", copyFromPackage: "../razorflow_php/"}
        ]}
    ];

    JSRF_Tasks.packman.php_build = {
        file_name: "razorflow_php_build",
        container_name: "php",
        noZip: true,
        copyFolderTo: "build/",
        files: php_files
    };

    JSRF_Tasks.packman.js_build = {
        file_name: "razorflow_js_build",
        container_name: "razorflow_js",
        noZip: true,
        copyFolderTo: "build/",
        files: js_assets
    };

    function addPackageWithLicense (version, license) {
        var taskHost = JSRF_Tasks.packman;
        var licensePath = "razorflow_license_" + license;

        taskHost['js_' + license] = {
            file_name: "razorflow_framework_js_"+license+"-"+version,
            container_name: "razorflow_framework_js-" + version,
            files: [
                {file: "readme.html", src:"tools/licenses/"+licensePath+"/js.html"},
                {file: "license.pdf", src:"tools/licenses/"+licensePath+"/license.pdf"},
            ].concat(js_files)
        };

        taskHost['php_' + license] = {
            file_name: "razorflow_framework_php_"+license+"-"+ version,
            container_name: "razorflow_framework_php-" + version,
            files: [
                {file: "readme.html", src:"tools/licenses/"+licensePath+"/js.html"},
                {file: "license.pdf", src:"tools/licenses/"+licensePath+"/license.pdf"},
            ].concat(php_files)
        };

        taskHost['suite_' + license] = {
            file_name: "razorflow_framework_suite_"+license+"-" + version,
            container_name: "razorflow_framework_suite-" + version,
            files: [
                {file: "readme.html", src:"tools/licenses/"+licensePath+"/suite.html"},
                {file: "license.pdf", src:"tools/licenses/"+licensePath+"/license.pdf"},
                {dir: "razorflow_php", files: php_files},
                {dir: "razorflow_js", files: js_files},
            ]
        };
    }

    function createPackagesForVersion (version) {
        JSRF_Tasks.exec.php_readme_gen = {
            cmd: "php genreadmes.php " + version,
            stdout: true,
            cwd: "tools/licenses/generator"
        }
        addPackageWithLicense(version, "developer");
        addPackageWithLicense(version, "oem");
        addPackageWithLicense(version, "oem_devdirect");
        addPackageWithLicense(version, "saas");
        addPackageWithLicense(version, "saas_devdirect");
        addPackageWithLicense(version, "corporate");
        addPackageWithLicense(version, "corporate_devdirect");
    };

    createPackagesForVersion("1.0.1");

    grunt.registerTask("makePackage", ["exec:php_readme_gen", "packman"])
    grunt.registerTask("jsrf:compile", []);
    grunt.registerTask("build:jsrf", ["jst:jsrf", "requirejs", "themegen:jsrf", "less:jsrf", "cssmin:jsrf", "copyto:jsrf_img", "packman:js_build"]);
    grunt.registerTask("build:phprf", ["packman:php_build"]);
    grunt.registerTask("build", ["build:jsrf", "build:phprf"]);
    grunt.registerTask("package", ["clean:build", "build", "makePackage"]);
    grunt.registerTask("build:examples", ["copyto:examples"]);


    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-copy-to');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadTasks ('./tools/grunt-tasks/');
    grunt.initConfig (JSRF_Tasks);
};