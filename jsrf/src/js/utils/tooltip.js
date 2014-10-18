define(['generated/templates'], function(JST) {
    var MIN_WIDTH = 100;
    var Tooltip = function() {
        var self = this,
            options = null,
            $core = null,
            $tooltip = null;

        self.config = function(_options) {
            options = _options;
            $core = options.core || $('body');
        };

        self.renderTo = function($core) {
            options.popupType = options.popupType || 'top';
            $tooltip = $(JST.tooltip(options));
            $core.append($tooltip);
            $tooltip.hide();
        };


        self.show = function(x, y, data) {
            x = x + (options.type === 'popup' ? window.pageXOffset : 0);
            y = y + (options.type === 'popup' ? window.pageYOffset : 0);

            var mainLabel = $tooltip.find('.rfTooltipMainLabel'),
                label = $tooltip.find('.rfTooltipLabel'),
                value = $tooltip.find('.rfTooltipValue'),
                row = $tooltip.find('.rfTooltipValueRow'),
                arrow = $tooltip.find(options.popupType === 'top' ? '.downArrow' : '.leftArrow'),
                arrowBorder = $tooltip.find(options.popupType === 'top' ? '.downArrowBorder' : '.leftArrowBorder');

            if(options.type === 'popup') {
                mainLabel.text(data.label);    
            } else {
                mainLabel.hide();
                row.removeClass('rfTooltipValueRow');
                arrow.hide();
                arrowBorder.hide();
                row.css({
                    padding: '8px 0'
                });
            }
            
            label.text(data.seriesLabel);
            value.text(data.value);
            removeAllChartColorClasses(label);
            if(data.color === 'auto') {
                label.css({
                    color: 'none'
                });
                label.addClass('chart-color-' + data.seriesIndex);
            } else {
                label.css({
                    color: data.color
                });
            }
            
            label.css({
                background: 'none'
            });
            $tooltip.show();
            var mainLabelWidth = mainLabel.width(),
                labelWidth = label.width(),
                valueWidth = value.width(),
                maxWidth = mainLabelWidth > (labelWidth + valueWidth) ? mainLabelWidth : labelWidth + valueWidth,
                tooltipWidth = (maxWidth > MIN_WIDTH ? maxWidth : MIN_WIDTH) + 10,
                tooltipHeight = ( options.type === 'popup' ? mainLabel.height() : 0 ) + label.height() + (options.type === 'popup' ? 22 : 14);

            $tooltip.css({
                width: tooltipWidth,
                height: tooltipHeight
            });
            var left, top; 
            if(options.popupType === 'left') {
                left = x + 8,
                top = y - tooltipHeight / 2;
            } else if(options.popupType === 'top') {
                left = x - tooltipWidth / 2,
                top = y - tooltipHeight - 10;
            }
            
            $tooltip.css({
                left: left,
                top: top 
            });
            if(options.type === 'popup') {
                if(options.popupType === 'left') {
                    arrow.css({
                        left: -8,
                        top: Math.floor(tooltipHeight/ 2 - 8)
                    });
                    arrowBorder.css({
                        left: -8,
                        top: Math.floor(tooltipHeight / 2 - 8)
                    });
                } else {
                    arrow.css({
                        left: Math.floor(tooltipWidth / 2 - 8),
                        top: tooltipHeight
                    });
                    arrowBorder.css({
                        left: Math.floor(tooltipWidth / 2 - 8),
                        top: tooltipHeight
                    });
                }
            }
        };

        self.hide = function() {
            $tooltip.hide();
        };

        self.dispose = function() {
            if($tooltip) {
                $tooltip.remove();    
            }
        };

        var removeAllChartColorClasses = function($node) {
            for(var i=-1; ++i<9;) {
                $node.removeClass('chart-color-' + i);
            }
        };
    };

    return Tooltip;
});