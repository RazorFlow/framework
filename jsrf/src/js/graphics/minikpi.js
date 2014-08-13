define(['utils/iconutils', 'generated/templates'], function(iconUtils, JST) {
    var MiniKPI = function() {
        var self = this,
            options = null,
            $core = null,
            $container = null,
            $caption = null,
            $value = null,
            $borderContainer;


        self.config = function(_options) {
            options = _options;
        };

        self.updateValue = function(value) {
            $value.text(value);
            if(options.icon) {
                $value.prepend(iconUtils.getHTMLForIcon(options.icon, options.iconProps));  
            }
        };

        self.render = function(_core) {
            $core = _core;
            $core.append(JST.minikpi({
                caption: options.caption,
                value: options.value
            }));
            $container = $core.find('.rfMiniKPICore');
            $caption = $core.find('.rfMiniKPICaption');
            $value = $core.find('.rfMiniKPIValue');
            $borderContainer = $core.find('.rfMiniKPIBorderContainer');

            if(options.icon) {
                $value.prepend(iconUtils.getHTMLForIcon(options.icon, options.iconProps));  
            }
        };

        self.resize = function(w, h) {
            var xPadding = w * 0.1,
                yPadding = h * 0.1,
                unitWidth = (w + h) / 2,
                fontSize = ((unitWidth/2 - xPadding) / 1.5);

            $borderContainer.css({
                top: yPadding,
                height: h - yPadding * 2
            });

            $container.css({
                width: w,
                height: h
            });
            $caption.css({
                fontSize: fontSize * (options.captionFontScale || 0.7)
            });
            $caption.css({
                width: w * 0.8,
                maxHeight: (h - yPadding * 2) / 2,
                left: w * 0.1,
                top: h/2 - $caption.height() - yPadding/2,
                position: 'absolute',
                color: options.captionColor
            });
            $value.css({
                fontSize: fontSize * (options.valueFontScale || 1)
            });
            $value.css({
                width: w * 0.8,
                maxHeight: (h - yPadding * 2) / 2,
                left: w * 0.1,
                top: (h/2) + yPadding/2,
                position: 'absolute',
                color: options.valueColor
            });
        };
    };

    return MiniKPI;
});