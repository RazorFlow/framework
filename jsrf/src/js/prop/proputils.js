define(["utils/media",
  "vendor/lodash"],
    function (mediaUtils, _) {
      return {
        error: function (message, object) {
          console.error(message, object);
        },

        isProp: function (item) {
          if (item !== null && typeof(item) !== 'undefined') {
            if (item.isPropList || item.isPropBase) {
              return true;
            }

            var selected = mediaUtils.fastMediaSelect(mediaUtils.getCurrentMedia(), item);
            if (selected === null) {
              return false;
            }
            if (selected.isPropList || selected.isPropBase) {
              return true;
            }

            return false;
          }
          return false;
        },

        isPropList: function (item) {
          if (item !== null && typeof(item) !== 'undefined') {
            if (item.isPropList) {
              return true;
            }
            var selected = mediaUtils.fastMediaSelect(mediaUtils.getCurrentMedia(), item);
            if (selected === null) {
              return false;
            }

            if (selected.isPropList) {
              return true;
            }

            return false;
          }
          return false;
        },

        isPropBase: function (item) {
          if (item !== null && typeof(item) !== 'undefined') {
            if (item.isPropBase) {
              return true;
            }

            var selected = mediaUtils.fastMediaSelect(mediaUtils.getCurrentMedia(), item);
            if (selected === null) {
              return false;
            }
            if (selected.isPropBase) {
              return true;
            }
            return false;
          }
          return false;
        },
        sanitizeHTML: function (str) {
          if (_.isString(str)) {
            return str.replace(/(<([^>]+)>)/ig,"");
          }
          return str;
        }
      };
    });