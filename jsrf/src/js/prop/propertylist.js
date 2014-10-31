define([
  "prop/propertybase",
  "utils/media",
  "prop/proputils"
],
    function (PropertyBase, mediaUtils, propUtils) {
      function PropertyList(ObjType) {
        var self = this,
            cobj = null,
            dataArr = [],
            dataObj = {},
            objMode = false,
            parentProp = null,
            listSubscribers = [],
            basePath;

        self.isPropList = true;

        /**
         * Setters
         */
        self.setRootObject = function (object) {
          var key,
              i;
          dataArr = [];
          dataObj = [];
          if (typeof(object[0]) === "undefined") {
            objMode = true;
          }

          if (objMode) {
            for (key in object) {
              if (object.hasOwnProperty(key)) {
                self.addItem(key, object[key]);
              }
            }
          }
          else {
            for (i = 0; i < object.length; i++) {
              self.pushItem(object[i]);
            }
          }
        };

        self.resetKeyInAll = function (keyName) {
          iterateOverItems(function (key, obj) {
            obj.resetValue(keyName);
          });
        };

        var makeObj = function (item, index) {
          var itemObj;
          if (propUtils.isPropBase(item)) {
            itemObj = item;
          }
          else {
            var newObject = new ObjType();
            newObject.setRootObject(item);
            itemObj = newObject;
          }

          if (cobj !== null) {
            itemObj.linkToComponent(cobj);
          }

          itemObj.setParentList(self, index);
          itemObj.setBasePath(basePath);

          for (var i = 0; i < listSubscribers.length; i++) {
            listSubscribers[i].init(index, itemObj.getRootObject());
          }

          return itemObj;
        };

        self.addItem = function (key, item) {
          objMode = true;

          var obj = makeObj(item, key);
          dataObj[key] = obj;
          return obj;
        };

        self.pushItem = function (item) {
          objMode = false;
          var obj = makeObj(item, dataArr.length);
          dataArr.push(obj);
          return obj;
        };

        /**
         * Getters
         */
        self.getRootObject = function () {
          var key, i, res;

          if (objMode) {
            res = {};
            for (key in dataObj) {
              if (dataObj.hasOwnProperty(key)) {
                res[key] = dataObj[key].getRootObject();
              }
            }
          }
          else {
            res = [];
            for (i = 0; i < dataArr.length; i++) {
              res.push(dataArr[i].getRootObject());
            }
          }

          return res;
        };

        self.getAtIndex = function (index) {
          return dataArr [index];
        };

        self.getAtId = function (id) {
          return dataObj [id];
        };

        self.getListItem = function (index) {
          if (dataObj) {
            return dataObj[index];
          }
          else {
            return dataArr[index];
          }
        };

        self.checkHasKey = function (key) {
          if (dataObj) {
            return dataObj.hasOwnProperty(key);
          }
          else {
            return dataArr.length < parseInt(key, 10);
          }
        };

        /**
         * Utilities
         */
        self.linkToComponent = function (component) {
          cobj = component;

          // link existing items to component
          iterateOverItems(function (key, obj) {
            obj.linkToComponent(component);
          });
        };

        self.listSubscribe = function (object) {
          listSubscribers.push(object);

          iterateOverItems(function (key, obj) {
            object.init(key, obj.getRootObject());
          });
        };

        self.resetListSubscribers = function () {
          listSubscribers = [];
        };

        self.onItemUpdated = function (key, value) {
          var i;

          if (listSubscribers.length === 0) {
            return false;
          }

          for (i = 0; i < listSubscribers.length; i++) {
            listSubscribers[i].update(key, value.getRootObject());
          }

          return true;
        };

        self.validate = function () {
          iterateOverItems(function (index, item) {
            console.log("PROPLIST!!! Validating", index);
            item.validate();
          });

          return items;
        };

        self.emptyList = function () {
            if (dataObj) {
              dataObj = {};
              return dataObj;
            }
            else {
              dataArr = [];
              return dataArr;
            }
        };

        var iterateOverItems = function (cb) {
          var key, i;
          if (objMode) {
            for (key in dataObj) {
              if (dataObj.hasOwnProperty(key)) {
                cb(key, dataObj[key]);
              }
            }
          }
          else {
            for (i = 0; i < dataArr.length; i++) {
              cb(i, dataArr[i]);
            }
          }
        };

        self.setParentProp = function (prop) {
          parentProp = prop;
        };

        self.setBasePath = function (bp) {
          basePath = bp;
        };

        self.getBasePath = function () {
          return basePath;
        };
      }

      return PropertyList;
    });