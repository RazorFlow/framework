define([

],
    function () {
      return {
        fastMediaSelect: function (mediaName, object) {
          if (typeof(object) === 'undefined') {
            return object;
          }
          if (object === null) {
            return object;
          }
          switch (mediaName) {
            case "xs":
              if (object.hasOwnProperty("xs")) {
                return object["xs"];
              }
              if (object.hasOwnProperty("sm")) {
                return object["sm"];
              }
              if (object.hasOwnProperty("md")) {
                return object["md"];
              }
              if (object.hasOwnProperty("lg")) {
                return object["lg"];
              }
              return object;
            case "sm":
              if (object.hasOwnProperty("sm")) {
                return object["sm"];
              }
              if (object.hasOwnProperty("xs")) {
                return object["xs"];
              }
              if (object.hasOwnProperty("md")) {
                return object["md"];
              }
              if (object.hasOwnProperty("lg")) {
                return object["lg"];
              }
              return object;
            case "md":
              if (object.hasOwnProperty("md")) {
                return object["md"];
              }
              if (object.hasOwnProperty("lg")) {
                return object["lg"];
              }
              if (object.hasOwnProperty("sm")) {
                return object["sm"];
              }
              if (object.hasOwnProperty("xs")) {
                return object["xs"];
              }
              return object;
            case "lg":
              if (object.hasOwnProperty("lg")) {
                return object["lg"];
              }
              if (object.hasOwnProperty("md")) {
                return object["md"];
              }
              if (object.hasOwnProperty("sm")) {
                return object["sm"];
              }
              if (object.hasOwnProperty("xs")) {
                return object["xs"];
              }
              return object;
          }
          return object;
        },
        isMediaObject: function (obj) {
          if (obj === null || typeof(obj) === "undefined") {
            return false;
          }

          if (obj.hasOwnProperty('xs') || obj.hasOwnProperty('sm') || obj.hasOwnProperty('md') || obj.hasOwnProperty('lg')) {
            for (var key in obj) {
              if(obj.hasOwnProperty(key)){
                if (key === "xs" || key === "sm" || key === "md" || key === "lg") {
                  continue;
                }
                return false;
              }
            }
            return true;
          }
          return false;
        },
        getCurrentMedia: function () {
          return window.rf.globals.media;
        },
        calculateMedia: function(currentWidth) {
          if (currentWidth < 480) {
            return "xs";
          } else if (currentWidth < 768) {
            return "sm";
          } else if (currentWidth < 978) {
            return "md";
          } else {
            return "lg";
          }
        },
        applyMediaToNode: function(core, media) {
          core.removeClass('rf-lg');
          core.removeClass('rf-md');
          core.removeClass('rf-sm');
          core.removeClass('rf-xs');

          core.addClass("rf-" + media);
        }
      };
    });
