define([

],
    function () {
      var componentUtils = {
        idGen: function() {
          var _id = 'rfc';
          for(var i=-1; ++i<6;) {
            _id += Math.floor(Math.random() * 10);
          }
          return _id;
        }
      };
      return componentUtils;
    });