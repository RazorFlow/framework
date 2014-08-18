var fs = require('fs');
var path = require('path');
var ejs = require('ejs');

module.exports = function(grunt) {

  var options,
      props;

  var isPropertyBase = function(prop) {
    if(prop['type'] === 'PropertyBase') {
      return true;
    }

    return false;
  };

  var isPropertyList = function(prop) {
    if(prop['type'] === 'PropertyList') {
      return true;
    }

    return false;
  };

  var hasDefault = function(prop) {
    if(prop['default']) {
      return true;
    }

    return false;
  };

  var genProps = function(lang) {
    var layoutTemplate = fs.readFileSync(path.join(options.templatePath, lang, 'layout.ejs'), 'utf8');
    var classTemplate = fs.readFileSync(path.join(options.templatePath, lang, 'class.ejs'), 'utf8');
    var propsTemplate = fs.readFileSync(path.join(options.templatePath, lang, 'props.ejs'), 'utf8');
    var contents = [];
    var rendererdData,
        obj,
        propValueStrings,
        value;

    for(var key in props) {
      obj = props[key];
      propValueStrings = [];
      obj['name'] = key;

      if(obj['properties']) {
        for(var key in obj['properties']) {

          value = obj['properties'][key];
          propValueStrings.push(
            buildPropsTemplate(key, value, propsTemplate)
          );
        }
      }

      obj['propValueStrings'] = propValueStrings.join(",\n");

      contents.push(
        ejs.render(classTemplate, obj)
      );
    }


    var layoutContents = buildLayoutTemplate(contents, layoutTemplate);

    fs.writeFileSync(options.outPaths[lang], layoutContents);
  };

  var buildLayoutTemplate = function(contents, template) {
    var layoutContents = ejs.render(template, 
      { contents: contents.join('\n\n')}
    );

    return layoutContents;
  };

  var buildPropsTemplate = function(key, props, template) {
    var value = props;
    value['isPropertyBase'] = isPropertyBase(value);
    value['isPropertyList'] = isPropertyList(value);
    value['hasDefault'] = hasDefault(value);
    var rendererdData = ejs.render(template, {key: key, value: value});

    return rendererdData;
  };

  /**
    * Task called by Grunt
    */
  grunt.registerTask('genProps', 'Generate properties', function() {
    options = this.options();
    props = JSON.parse(fs.readFileSync(options.configPath, 'utf8'));

    for(var key in options.outPaths) {
      genProps(key);
    }
  });

};