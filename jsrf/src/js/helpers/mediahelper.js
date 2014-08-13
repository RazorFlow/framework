define([], function () {
  var MediaHelper = function (defaultMedia) {
    var self = this,
        currentMedia = "md",
        mediaIndex = 2;


    var getIndex = function (name) {
      switch (name) {
        case "xs":
          return 0;
        case "sm":
          return 1;
        case "md":
          return 2;
        case "lg":
          return 3;
      }
      throw "Unknown index for media" + name;
    };

    var getMediaName = function (index) {
      switch (index) {
        case 0:
          return "xs";
        case 1:
          return "sm";
        case 2:
          return "md";
        case 3:
          return "lg";
      }
      throw "Unknown media for index" + index;
    };

    var checkMediaName = function (index) {
      switch(name) {
        case "xs":
        case "sm":
        case "md":
        case "lg":
          return true;
      }
      return false;
    };

    var selectItem = function (items, defVal) {
      var i;
      // Pre-process operators
      var object = items;

      for(var key in items) {
        if(items.hasOwnProperty(key)) {
          if(key.search(/\+/) !== -1) {
            var splitItems = key.split("+");
            for(i = 0; i < splitItems.length; i++) {
              object[splitItems[i]] = items[key];
            } 
          }
        }
      }
      if (object.hasOwnProperty(currentMedia)) {
        return object[currentMedia];
      } else {
        if(defVal !== "") {
          return defVal;
        }

        for (i = mediaIndex; i >= 0; i--) {
          if (object.hasOwnProperty(getMediaName(i))) {
            return object[getMediaName(i)];
          }
        }
        for (i = mediaIndex; i <= 4; i++) {
          if (object.hasOwnProperty(getMediaName(i))) {
            return object[getMediaName(i)];
          }
        }

      }
    };

    var newSelect = function (items) {

    };

    self.setMedia = function (name) {
      currentMedia = name;
      mediaIndex = getIndex(name);
      window.rf.globals.media = name;
    };

    self.getCurrentMedia = function () {
      return currentMedia;
    };

    self.mediaSelect = function (obj, defVal) {
      return selectItem(obj, defVal);
    };

    self.mediaExec = function (obj, data) {
      var func = selectItem(obj);

      func(data);
    };

    /**
     * Smaller than or equal to specified media
     * @param  {[type]} media [description]
     * @return {[type]}       [description]
     */
    self.smeq = function (media) {
      return mediaIndex <= getIndex(media);
    };

    self.screenSelect = function (obj) {
      return self.mediaSelect({
        "sm+xs": obj.small,
        "md+lg": obj.large
      });
    };

    if (defaultMedia) {
      self.setMedia(defaultMedia);
    }
  };

  return MediaHelper;
});