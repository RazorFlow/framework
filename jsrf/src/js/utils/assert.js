define (['vendor/lodash'], function (_) {
  var assert = {
    isType: function (obj, typeName, name, type, errorTrap) {
      var validFlag = false;
      switch(typeName) {
        case 'string':
          validFlag = _.isString(obj);
          break;
        case 'array':
          validFlag = _.isArray(obj);
          break;
        case 'number':
          validFlag = _.isNumber(obj) && !_.isNaN(obj);
          break;
        case 'object':
          validFlag = _.isObject(obj);
          break;
        case 'identifier_string':
          validFlag = (_.isString(obj) && !!obj.match(/^[a-zA-Z_][a-zA-Z0-9_]*$/));
          break;
      }
      if(!validFlag) {
        if(typeof(errorTrap.pro) !== "undefined") {
          if(typeof(errorTrap.pro.handleError) !== "undefined") {
            errorTrap.pro.handleError("Expected parameter '" + name + "' to be '" + typeName + "'. Got '" + typeof(obj) + "' instead.", type, 'assert');
          }
        }
      }
    },

    isString: function (obj, name, type, errorTrap) {
      assert.isType (obj, 'string', name, type, errorTrap);
    },
    isArray: function (obj, name, type, errorTrap) {
      assert.isType (obj, 'array', name, type, errorTrap);
    },
    isNumber: function (obj, name, type, errorTrap) {
      assert.isType (obj, 'number', name, type, errorTrap);
    },
    isIDString: function (obj, name, type, errorTrap) {
      assert.isType (obj, 'identifier_string', name, type, errorTrap);
    }
  };

  return assert;
});
