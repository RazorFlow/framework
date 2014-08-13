define ([], function () {
  var colorUtils = {
    getColor: function(key) {
      var $element;
      if($("body").find('.canary-' + key).get(0)) {
        $element = $("body").find('.canary-' + key);
        return $element.css('background-color');
      }
      else {
        $element = $('<div/>', { 'class': 'canary-' + key });
        $element.css({
          display: 'none'
        });
        $("body").append($element);
      }

      return $element.css('background-color');
    }
  };

  return colorUtils;
});
