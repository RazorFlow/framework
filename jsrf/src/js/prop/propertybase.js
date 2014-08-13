define([
  "utils/media",
  "prop/proputils",
  "vendor/lodash"
], function (mediaUtils, propUtils, _) {


  function PropertyBase() {
    var self = this,
        cobj = null,
        data = {},
        defaults = {},
        subscribers = {},
        parentList = null, listIndex = null,
        basePath = '',
        parentProp = null;

    self.isPropBase = true;

    /**
     * Setters
     */
    self.setValue = function (path, value, rootPath) {
      var parts = getParts(path);
      rootPath = rootPath ? rootPath : path;

      // the final setting logic only works on terminal leaves which
      // have a regular value.

      if (parts.terminal && !propUtils.isPropBase(parts.root)) {
        var oldValue = data[parts.key];
        value = propUtils.sanitizeHTML(value);
        data[parts.key] = value;

        self.trigger('setValue', rootPath, value, oldValue, parts);
      }
      else if (!parts.terminal && propUtils.isPropBase(parts.root)) {
        parts.root.setValue(parts.rest, value, rootPath);
      }
      else {
        propUtils.error("Cannot set a value to this pb", parts);
      }
    };
    /**
     * Set the root object
     *
     * @param object
     */
    self.setRootObject = function (object) {
      var key;

      object = self.flipMedia(object);

      for (key in object) {
        if (data.hasOwnProperty(key)) {
          if (propUtils.isProp(data[key])) {
            data[key].setRootObject(object[key], true);
          }
          else {
            data[key] = object[key];
          }
        }
        else {
          propUtils.error("Unknown key in object", key);
        }
      }
    };


    self.setObjectAtPath = function (path, object, rootPath) {
      var parts = getParts(path);
      rootPath = rootPath ? rootPath : path;
      // the final setting logic only works on terminal leaves which
      // have a regular value.
      if (parts.terminal && propUtils.isProp(parts.root)) {
        var oldValue = parts.root.getRootObject();
        for(var key in object) {
          object[key] = propUtils.sanitizeHTML(object[key]);
        }
        parts.root.setRootObject(object, true);

        self.trigger('setObjectAtPath', rootPath, object, oldValue, parts);
      }
      else if (!parts.terminal && propUtils.isPropBase(parts.root)) {
        parts.root.setObjectAtPath(parts.rest, object, rootPath);
      }
      else {
        propUtils.error("Cannot set an object to this pb", parts);
      }
    };

    self.addItemToList = function (path, id, item, rootPath) {
      var parts = getParts(path);
      rootPath = rootPath ? rootPath : path;
      // the final setting logic only works on terminal leaves which
      // have a regular value.
      if (parts.terminal && propUtils.isPropList(parts.root)) {
        for(var key in item) {
          item[key] = propUtils.sanitizeHTML(item[key]);
        }
        var itemObj = parts.root.addItem(id, item, true);
        self.trigger('addItemToList', rootPath, itemObj, null, parts);
      }
      else if (!parts.terminal && propUtils.isPropBase(parts.root)) {
        parts.root.addItemToList(parts.rest, id, item, rootPath);
      }
      else {
        propUtils.error("Cannot add an item to this pb", parts);
      }
    };

    self.pushItemToList = function (path, item, rootPath) {
      var parts = getParts(path);

      rootPath = rootPath ? rootPath : path;

      // the final setting logic only works on terminal leaves which
      // have a regular value.
      if (parts.terminal && propUtils.isPropList(parts.root)) {
        var itemObj = parts.root.pushItem(item, true);
        for(var key in item) {
          item[key] = propUtils.sanitizeHTML(item[key]);
        }
        self.trigger('pushItemToList', rootPath, itemObj, null, parts);
      }
      else if (!parts.terminal && propUtils.isPropBase(parts.root)) {
        parts.root.pushItemToList(parts.rest, item, rootPath);
      }
      else {
        propUtils.error("Cannot push an item to this pb", parts);
      }
    };

    self.resetValue = function (path, rootPath) {
      var parts = getParts(path);
      rootPath = rootPath ? rootPath : path;

      // the final setting logic only works on terminal leaves which
      // have a regular value.
      if (parts.terminal && !propUtils.isPropBase(parts.root)) {
        var oldValue = data[parts.key];
        var value = defaults[parts.key];
        data[parts.key] = value;

        self.trigger('resetValue', rootPath, value, oldValue, parts);
      }
      else if (!parts.terminal && propUtils.isPropBase(parts.root)) {
        parts.root.resetValue(parts.rest, rootPath);
      }
      else {
        propUtils.error("Cannot set a value to this pb", parts);
      }
    };

    self.resetKeyInAll = function (path, key) {
      var parts = getParts(path);


      // the final setting logic only works on terminal leaves which
      // have a regular value.
      if (parts.terminal && propUtils.isPropList(parts.root)) {
        parts.root.resetKeyInAll(key);
      }
      else if (!parts.terminal && propUtils.isPropBase(parts.root)) {
        parts.root.resetKeyInAll(parts.rest, key);
      }
      else {
        propUtils.error("Cannot push an item to this pb", parts);
      }
    };

    /**
     * Getters
     */
    self.getValue = function (path) {
      var parts = getParts(path);

      if (parts.terminal && !propUtils.isProp(parts.root)) {
        return self.responsiveFilter(data[parts.key]);
      }
      else if (!parts.terminal && propUtils.isPropBase(parts.root)) {
        return parts.root.getValue(parts.rest);
      }

      propUtils.error("Cannot get value for ", parts);
    };

    self.getRootObject = function () {
      var key, res = {};

      for (key in data) {
        if (propUtils.isProp(data[key])) {
          res[key] = data[key].getRootObject();
        }
        else {
          res[key] = data[key];
        }
      }

      return self.responsiveFilter(res);
    };

    self.getObjectAtPath = function (path) {
      var parts = getParts(path);

      if (parts.terminal && propUtils.isProp(parts.root)) {
        return parts.root.getRootObject();
      }
      else if (!parts.terminal && propUtils.isPropBase(parts.root)) {
        return parts.root.getObjectAtPath(parts.rest);
      }

      propUtils.error("Cannot get object for ", parts);
    };

    self.isSet = function (path) {
      var parts = getParts(path);

      if (parts.terminal && !propUtils.isProp(parts.root)) {
        return data[parts.key] !== null;
      }
      else if (!parts.terminal && propUtils.isPropBase(parts.root)) {
        return parts.root.isSet(parts.rest);
      }

      propUtils.error("Cannot get value for ", parts);
    };

    self.getListItem = function (path, index) {
      var parts = getParts(path);

      if (parts.terminal && propUtils.isPropList(parts.root)) {
        return parts.root.getListItem(index);
      }
      else if (!parts.terminal && propUtils.isPropBase(parts.root)) {
        return parts.root.getListItem(parts.rest, index);
      }
      else {
        propUtils.error("Cannot set a value to this pb", parts);
      }
    };

    self.checkHasKey = function (path, key) {
      var parts = getParts(path);

      if (parts.terminal && propUtils.isPropList(parts.root)) {
        return parts.root.checkHasKey(key);
      }
      else if (!parts.terminal && propUtils.isPropBase(parts.root)) {
        return parts.root.checkHasKey(parts.rest, key);
      }
      else {
        propUtils.error("check if this key exists", parts);
      }
    };

    self.validate= function () {
      for (var key in data) {
        if(data.hasOwnProperty(key)) {
          console.log("Validating key", key);

          if(propUtils.isPropBase(data[key])) {
            console.log("going into ", key);
            data[key].validate ();
            console.log("Came out of ", key);
          }
          else if(propUtils.isPropList(data[key])) {
            var listAsOb = data[key].getRootObject();
            console.warn ("Validating as a list", key);
            console.warn(listAsOb);
            data[key].validate();
          }
          else {
            console.warn ("Actually validating", key);
          }
        }
      }

      return [];
    };


    /**
     * Utilities
     */
    self.register = function (items) {
      var key, item;

      for (key in items) {
        if (items.hasOwnProperty(key)) {
          item = items[key];
          if (propUtils.isProp(item)) {
            item.setParentProp(self);
          }
          data[key] = item;
          defaults[key] = item;
          subscribers [key] = [];
        }

      }
    };
    self.responsiveFilter = function (obj) {
      var media = mediaUtils.getCurrentMedia(),
          result = null;

      if (obj === null) {
        return null;
      }
      else if (_.isArray(obj)) {
        result = obj;
        // for (var i = 0; i < obj.length; i++) {
        //     var selectedObj = rf.utils.fastMediaSelect(media, obj[key]);
        //     result.push(self.responsiveFilter(selectedObj));
        // }

        return result;
      }
      else if (_.isObject(obj)) {
        // If it's an object, it can be one of 2 things:
        //
        // 1. a final value which is an object like {xs: 42, sm: 43}
        // 2. A complex object

        var realObject = mediaUtils.fastMediaSelect(media, obj);

        if (realObject === Object(obj)) {
          result = {};
          for (var key in realObject) {
            if(realObject.hasOwnProperty(key)){
              var selectedObj = mediaUtils.fastMediaSelect(media, realObject[key]);
              result[key] = self.responsiveFilter(selectedObj);
            }
          }

          return result;
        }
        else {
          return realObject;
        }


      }
      else {
        return obj;
      }
    };

    self.flipMedia = function (object) {
      if (!mediaUtils.isMediaObject(object)) {
        return object;
      }

      var result = {};

      for (var mediaType in object) {
        if(object.hasOwnProperty(mediaType)){
          for (var key in object[mediaType]) {
            if(object[mediaType].hasOwnProperty(key)) {
                if(!result[key]) {
                  result[key] = {};
                }
                result[key][mediaType] = object[mediaType][key];
            }
          }
        }
      }

      return result;
    };

    self.linkToComponent = function (component) {
      var key;

      cobj = component;

      for (key in data) {
        if (propUtils.isProp(data[key])) {
          data[key].linkToComponent(component);
        }
      }
    };

    self.setBasePath = function (bp) {
      basePath = bp;

      for (var key in data) {
        if (propUtils.isProp(data[key])) {
          data[key].setBasePath(basePath + '.' + key);
        }
      }
    };

    self.setParentProp = function (pp) {
      parentProp = pp;
    };

    self.trigger = function (type, path, newValue, oldValue, parts) {
      var listChanged = false;
      if (parentList !== null) {
        listChanged = parentList.onItemUpdated(listIndex, self);
      }
      if (cobj !== null) {
        if (!listChanged) {
          cobj.pro.applyChange(type, path, newValue, oldValue, parts);
        }
      }
      if (subscribers.hasOwnProperty(parts.key)) {
        if (subscribers[parts.key].length > 0) {
          for (var i = 0; i < subscribers[parts.key].length; i++) {
            subscribers[parts.key][i](newValue, oldValue);
          }
        }
      }
    };

    self.applyPatch = function (patchObj) {
      var action = patchObj.action,
          path = patchObj.path,
          params = patchObj.params;

      switch (action) {
        case 'setValue':
          self.setValue(path, params);
          break;
        case 'setObjectAtPath':
          self.setObjectAtPath(path, params);
          break;
        case 'addItemToList':
          self.addItemToList(path, params.id, params.item);
          break;
        case 'pushItemToList':
          self.addItemToList(path, params.item);
          break;
        case 'emptyList':
          self.emptyList(path);
          break;
      }
    };

    self.subscribe = function (path, callback) {
      var parts = getParts(path);

      if (parts.terminal && !propUtils.isPropBase(parts.root)) {
        subscribers[parts.key].push(callback);
      }
      else if (!parts.terminal && propUtils.isPropBase(parts.root)) {
        parts.root.subscribe(parts.rest, callback);
      }
      else {
        propUtils.error("Cannot set a value to this pb", parts);
      }
    };

    self.listSubscribe = function (path, callback) {
      var parts = getParts(path);

      if (parts.terminal && propUtils.isPropList(parts.root)) {
        parts.root.listSubscribe(callback);
      }
      else if (!parts.terminal && propUtils.isPropBase(parts.root)) {
        parts.root.listSubscribe(parts.rest, callback);
      }
      else {
        propUtils.error("Cannot set a value to this pb", parts);
      }
    };

    self.resetListSubscribers = function (path) {
      var parts = getParts(path);

      if (parts.terminal && propUtils.isPropList(parts.root)) {
        parts.root.resetListSubscribers(callback);
      }
      else if (!parts.terminal && propUtils.isPropBase(parts.root)) {
        parts.root.resetListSubscribers(parts.rest, callback);
      }
      else {
        propUtils.error("Cannot set a value to this pb", parts);
      }
    };

    

    self.emptyList = function (path, rootPath) {
      var parts = getParts(path);

      rootPath = rootPath ? rootPath : path;

      // the final setting logic only works on terminal leaves which 
      // have a regular value.
      if (parts.terminal && propUtils.isPropList(parts.root)) {
        parts.root.emptyList();

        self.trigger('emptyList', rootPath, null , null, parts);
      }
      else if (!parts.terminal && propUtils.isPropBase(parts.root)) {
        parts.root.emptyList(parts.rest, rootPath);
      }
      else {
        error("Cannot empty this pb", parts);
      }
    };

    self.sag = function (path, callback) {
      self.subscribe(path, callback);

      callback(self.getValue(path), null);

    };

    var getParts = function (path) {
      var parts = path.split('.'),
          currentPart = parts[0],
          indexMatches = currentPart.match(/\[.+\]/),
          indexValue = null,
          rootItem = null,
          rootList = null,
          terminal = parts.length === 1;

      // index matches in case the path is structured like this:
      // foo[3].bar.test
      if (indexMatches !== null) {
        // Let's say Path is "foo[3].bar.test"
        // indexvalue is "[3]"
        indexValue = indexMatches[0];

        // Current part is "foo"
        currentPart = currentPart.substr(0, currentPart.length - indexValue.length);

        // Indexvalue is now "3"
        indexValue = indexValue.substr(1, indexValue.length - 2);

        // Root list is now data["foo"] which gives us the propertylist object
        rootList = data[currentPart];

        // Now we have to extract the rootItem. This will be equivalent to get("foo[3]")
        // because the logic to handle the remaining is common whether it's get("foo[3]") or get("foo");
        if (!isNaN(parseInt(indexValue, 10))) {
          // This means that indexValue is a number
          rootItem = rootList.getAtIndex(parseInt(indexValue, 10));
        }
        else {
          rootItem = rootList.getAtId(indexValue);
        }
      }
      else {
        rootItem = data[parts[0]];
      }

      parts.shift();

      var obj = {
        root: rootItem,
        key: currentPart,
        rest: parts.join('.'),
        terminal: terminal
      };
      return obj;
    };

    self.setParentList = function (proplist, index) {
      parentList = proplist;
      listIndex = index;
    };
  }


  return PropertyBase;
});
