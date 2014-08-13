define(["utils/positionutils", 'vendor/lodash'], function (posUtils, _) {
  var InternalLayoutManager = function (layouts, values) {
    var self = this,
        core = null,
        width = null,
        height = null;

    self.manageElement = function (c) {
      core = c;
      width = core.outerWidth();
      height = core.height();


      for (var i = -1; ++i < layouts.length;) {
        var layout = layouts[i],
            el = $('<div/>'),
            value = values[layout.className],
            elementCssProps = getElementCssProperties(layout),
            elLeft = elementCssProps.elLeft,
            elTop = elementCssProps.elTop,
            elWidth = elementCssProps.elWidth,
            elHeight = elementCssProps.elHeight,
            lines = elementCssProps.lines,
            fontScale = elementCssProps.fontScale,
            maxFontSize = (elHeight * fontScale) / lines,
            minFontSize = elHeight * 0.7,
            cssObj = null;

            _.extend(elementCssProps, {fontSize: maxFontSize});
            cssObj = setCssObj(elementCssProps);

        if (value) {
          adjustCssProps(value, elementCssProps, cssObj);
        }

        el.addClass(layout.className);
        el.css(cssObj);

        el.attr('data-lines', lines);
        el.attr('data-fontScale', fontScale);
        core.append(el);
      }
    };

    self.handleResize = function(w, h){
      width = w;
      height = h;
      for (var i = -1; ++i < layouts.length;) {
        var layout = layouts[i],
          el = core.find("." + layout.className),
          value = values[layout.className],
          elementCssProps = getElementCssProperties(layout),
          elHeight = elementCssProps.elHeight,
          fontScale = elementCssProps.fontScale,
          lines = elementCssProps.lines,
          maxFontSize = (elHeight * fontScale) / lines,
          minFontSize = elHeight * 0.7,
          cssObj = null;

          _.extend(elementCssProps, {fontSize: maxFontSize});
          cssObj = setCssObj(elementCssProps);

        adjustCssProps(value, elementCssProps, cssObj);

        el.css(cssObj);

      }
    };


    self.setValues = function () {
      for (var key in values) {
        if(values.hasOwnProperty(key)){
          core.find("." + key).text(values[key]);
        }
      }
    };

    var setCssObj = function(elementCssProps){
       obj = {
        position: 'absolute',
        top: elementCssProps.elTop,
        left: elementCssProps.elLeft,
        width: elementCssProps.elWidth,
        height: elementCssProps.elHeight,
        textAlign: 'center',
        verticalAlign: 'middle',
        overflow: 'hidden'
      };
      if(!elementCssProps.isGauge) {
        obj.fontSize = elementCssProps.fontSize;
        obj.lineHeight = (elementCssProps.elHeight / elementCssProps.lines) + 'px';
      }
      return obj;
    };

    var getElementCssProperties = function(layout){
      width = core.outerWidth();
      var elWidth = posUtils.unitsToPixels(layout.w, width),
          elHeight = posUtils.unitsToPixels(layout.h, height),
          fontScale = layout.fontScale || 0.7,
          lines = layout.lines || 1;

      return {
        isGauge: layout.className === 'rfKPIGauge',
        elLeft: posUtils.unitsToPixels(layout.x, width),
        elTop: posUtils.unitsToPixels(layout.y, height),
        elWidth: elWidth,
        elHeight: elHeight,
        lines: lines,
        fontScale: fontScale,
        maxFontSize: (elHeight * fontScale) / lines,
        minFontSize: elHeight * 0.7
      };     
    };

    var adjustCssProps = function(value, elementCssProps, cssObj){
          // var tmp = $('<span/>').text(value).css({
          //   fontSize: elementCssProps.maxFontSize,
          //   'white-space': 'nowrap'
          // }), ratio = null;
          // core.append(tmp);

          // if (elementCssProps.lines > 1) {
          //   if (tmp.width() < elementCssProps.elWidth) {
          //     ratio = elementCssProps.elWidth / tmp.width();
          //     ratio = ratio > 1.2 ? 1.2 : ratio;
          //     elementCssProps.fontScale = ratio;
          //     cssObj.fontSize = Math.floor(((elementCssProps.elHeight * ratio) / elementCssProps.lines) * 0.8);
          //     tmp.css('font-size', cssObj.fontSize);
          //     if (tmp.width() < elementCssProps.elWidth) {
          //       cssObj.lineHeight = Math.floor((cssObj.fontSize * 2.4)) + 'px';
          //     } else {
          //       cssObj.lineHeight = Math.floor((cssObj.fontSize * 1.1)) + 'px';
          //     }
          //   }
          // } else {
          //   if (tmp.width() > elementCssProps.elWidth) {
          //     ratio = elementCssProps.elWidth / tmp.width();
          //     ratio = ratio < 0.5 ? 0.5 : ratio;
          //     cssObj.fontSize = Math.floor((elementCssProps.maxFontSize * ratio));
          //     cssObj.lineHeight = elementCssProps.elHeight + 'px';
          //   } else {
          //     ratio = elementCssProps.elWidth / tmp.width();
          //     ratio = ratio > 1.2 ? 1.2 : ratio;
          //     cssObj.fontSize = Math.floor((elementCssProps.maxFontSize * ratio));
          //     cssObj.lineHeight = elementCssProps.elHeight + 'px';
          //   }
          // }
          // tmp.remove();
    };

  };
  return InternalLayoutManager;
});
