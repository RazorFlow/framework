define([], function() {
    var IconUtils = {
        getHTMLForIcon: function(id, config) {
          config = config || {};
          var span = $('<span/>'),
              css = config.css || {};

          span.addClass('rficon rfi-' + id + ' ' + config.extraClass || '');
          span.css(_.extend(css, {
              fontSize: config.fontSize || 'inherit',
              color: config.color || '#000'
          }));

          return span;
        }
    };

    return IconUtils;
});