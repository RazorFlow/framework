define(['constants/componentconstants'], function (ComponentConstants) {
  var profile = ComponentConstants.tooltip;
  var RFTooltip = function (_options) {
    var self = this,
        options = _options || {},
        core = options.core || $('body'),
        $tooltip,
        tooltipVisible = false;

    self.setCore = function ($core) {
      core = $core;
    };

    self.show = function (force) {
      if (!$tooltip || force) {
        tooltipVisible = true;
        $tooltip = core.append('g')
            .attr('class', 'tooltip')
            .attr('style', 'opacity: ' + profile.opacity);

        $tooltip.append('rect')
            .attr('class', 'tooltip-background')
            .attr('rx', 5)
            .attr('ry', 5);

        $tooltip.append('text')
            .attr('class', 'tooltip-value');

        $tooltip.select('text.tooltip-value')
            .append('tspan')
            .attr('class', 'label tooltipLabel');

        $tooltip.select('text.tooltip-value')
            .append('tspan')
            .attr('class', 'value tooltipValue');
      } else {
        $tooltip.attr('style', 'opacity: ' + profile.opacity);
      }
    };

    self.update = function (value, label, color, x, y) {
      if ($tooltip) {
        var cx = x + profile.tooltipOffsetX,
            cy = y + profile.tooltipOffsetY,
            tooltipWidth = 0,
            tooltipHeight = profile.tooltipHeight,
            background = profile.tooltipBackground,
            border = color,
            boxLeft = null,
            boxTop = null,
            newWidth = null;

        $tooltip.select('text.tooltip-value')
            .attr('x', cx)
            .attr('y', cy);

        $tooltip.select('tspan.label')
            .text(label)
            .attr('style', 'font-weight: bold;')
            .attr('text-anchor', 'middle');


        $tooltip.select('text.tooltip-value .value')
            .text(value)
            .attr('style', 'font-weight: bold;')
            .attr('fill', color)
            .attr('text-anchor', 'middle');

        value = $tooltip.select('text.tooltip-value').node();
        if(!value) {
          self.show(true);
        }
        
        newWidth = $tooltip.select('text.tooltip-value').node().getBBox().width + profile.tooltipPaddingX; // The 8 here is padding on both sides 4 + 4  
        

        // This assumes the width of the value will never be very long
        tooltipWidth = (tooltipWidth < newWidth) ? newWidth : tooltipWidth;

        boxLeft = cx - tooltipWidth / 2;
        boxTop = cy - tooltipHeight / 2 - 10;

        $tooltip.select('rect.tooltip-background')
            .attr('x', boxLeft)
            .attr('y', boxTop)
            .attr('width', tooltipWidth)
            .attr('height', tooltipHeight + 10)
            .attr('fill', background)
            .attr('stroke-width', 2)
            .attr('stroke', '#222');

      } else {
        // TODO: Some error shown here ?
      }
    };

    self.position = function (x, y) {
      var cx = x + profile.tooltipOffsetX,
          cy = y + profile.tooltipOffsetY,
          tooltipWidth = 0,
          tooltipHeight = profile.tooltipHeight,
          boxLeft = null,
          boxTop = null;

      newWidth = $tooltip.select('text.tooltip-value')[0][0].getBBox().width + profile.tooltipPaddingX; // The 8 here is padding on both sides 4 + 4

      // This assumes the width of the value will never be very long
      tooltipWidth = (tooltipWidth < newWidth) ? newWidth : tooltipWidth;

      boxLeft = cx - tooltipWidth / 2;
      boxTop = cy - tooltipHeight / 2 - 10;

      $tooltip.select('rect.tooltip-background')
          .attr('x', boxLeft)
          .attr('y', boxTop)
          .attr('width', tooltipWidth)
          .attr('height', tooltipHeight + 10);
    };

    self.hide = function () {
      if ($tooltip) {
        tooltipVisible = false;
        $tooltip.attr('style', 'opacity: 0');
      }
    };

    self.isVisible = function () {
      return tooltipVisible;
    };

    self.isHidden = function () {
      return !tooltipVisible;
    };
  };

  return RFTooltip;
});