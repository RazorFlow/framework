var _ = require('underscore');
var fs = require('fs');
var path = require ('path');


module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('featuregen', 'generate screenshots', function() {
    grunt.log.writeln("calculating");
    var done = this.async();

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({

    });
    var files = grunt.file.expand(options.files),
        features = {},
        featuresPending = {},
        featuresTodo = {},
        HTMLStr = '';

    var buildHTML = function (features) {
      var str = "<table>";
      str += "<tr><th>Feature</th><th>JS</th><th>PHP</th><th>JSDocs</th><th>PHPDocs</th></tr>";
      for (var key in features) {
        str += "<tr>";
        str += "<td>" + key + "</td>";
        for (var sub in features[key]) {
          str += "<td>" + features[key][sub] + "</td>";
        }
        str += "</tr>";
      }
      str += "</table>";
      return str;
    };

    var continuation = function () {

      if(files.length == 0) {
        HTMLStr = "<h2>Features</h2>";
        HTMLStr += buildHTML(features);
        HTMLStr += "<h2>Features Pending</h2>";
        HTMLStr += buildHTML(featuresPending);
        HTMLStr += "<h2>Features TODO</h2>";
        HTMLStr += buildHTML(featuresTodo);
        grunt.file.write("build/featurelist.html", HTMLStr);
        grunt.log.ok("Finished calculating");
        done();
      }
      else {
        var fileName = files.shift ();
        var baseName = path.basename(fileName, ".js");
        var url = options.baseUrl + baseName;
        var outPath = options.out + baseName + ".png";
        grunt.log.writeln("searching in  " + fileName);
        var fileContent = grunt.file.read(fileName);
        var docTags = fileContent.match(/\/\*\*[\s\S]*?\*\//g);
        if (docTags) {
          for (var i = 0; i < docTags.length; i++) {
            freatureBreaker(sanitizeDocTag(docTags[i]));
          }
        }
        continuation();
      }
    }

    var sanitizeDocTag = function (str) {
        return str.replace('/**', '').replace('*/','').replace(/\s*\*\s/g, '\n');
    };

    var freatureBreaker = function (str) {
        var newFeatures = str.match(/f\((.*),(.*)\)/),
            newFeaturesPending = str.match(/fp\((.*),(.*)\)/),
            newFeaturesTodo = str.match(/ft\((.*),(.*)\)/),
            newFeature = null,
            newFeatureFor = null,
            featureType = null;
        if (newFeatures !== null) {
          newFeature = newFeatures[1].replace(/[^a-zA-Z0-9_-]/g,'');
          newFeatureFor = newFeatures[2].replace(/[^a-zA-Z0-9_-]/g,'').toLowerCase();
          featureType = "F";
        } else if (newFeaturesPending !== null) {
          newFeature = newFeaturesPending[1].replace(/[^a-zA-Z0-9_-]/g,'');
          newFeatureFor = newFeaturesPending[2].replace(/[^a-zA-Z0-9_-]/g,'').toLowerCase();
          featureType = "FP";
        } else if (newFeaturesTodo !== null) {
          newFeature = newFeaturesTodo[1].replace(/[^a-zA-Z0-9_-]/g,'');
          newFeatureFor = newFeaturesTodo[2].replace(/[^a-zA-Z0-9_-]/g,'').toLowerCase();
          featureType = "FT";
        }

        if ((newFeature !== null) && (newFeatureFor !== null)) {
          addFeature(newFeature, featureType);
          addFeatureType(newFeature, newFeatureFor, featureType);
        }
        
    };

    var addFeature = function (newFeature, featureType) {
      if (featureType === "F") {
        if(!features.hasOwnProperty(newFeature)) {
          features[newFeature] = {
            "js" : false,
            "php" : false,
            "jsdocs" : false,
            "phpdocs" : false
          };
        }
      } else if (featureType === "FP") {
        if(!featuresPending.hasOwnProperty(newFeature)) {
          featuresPending[newFeature] = {
            "js" : false,
            "php" : false,
            "jsdocs" : false,
            "phpdocs" : false
          };
        }
      } else if (featureType === "FT") {
        if(!featuresTodo.hasOwnProperty(newFeature)) {
          featuresTodo[newFeature] = {
            "js" : false,
            "php" : false,
            "jsdocs" : false,
            "phpdocs" : false
          };
        }
      }
    };

    var addFeatureType = function (newFeature, newFeatureFor, featureType) {
      if (featureType === "F") {
        features[newFeature][newFeatureFor] = true;
      } else if (featureType === "FP") {
        featuresPending[newFeature][newFeatureFor] = true;
      } else if (featureType === "FT") {
        featuresTodo[newFeature][newFeatureFor] = true;
      }
    };


    continuation();


  });

};
