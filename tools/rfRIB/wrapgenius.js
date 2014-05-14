define(['constants/componentconstants', 'd3'], function (ComponentConstants, d3) {
  var wrapGenius = {
    strings: {},
    LINE_HEIGHT: ComponentConstants.wrapGenius.LINE_HEIGHT,
    FONT_SIZE: ComponentConstants.wrapGenius.FONT_SIZE,
    THETA: ComponentConstants.wrapGenius.THETA,
    MAX_HEIGHT_PERCENT: ComponentConstants.wrapGenius.MAX_HEIGHT_PERCENT,
    PADDING: ComponentConstants.wrapGenius.PADDING,
    add: function (label, core, db) {
      var self = this,
          words = label.split(' '),
          canary = db._makeTempDiv();

      canary.addClass('wrap-genius-canary');
      $(core).append(canary);

      for (var i = 0; i < words.length; i++) {
        var word = words[i];
        if (typeof self.strings !== 'undefined') {
          var tempP = $('<p/>').text(word).addClass('xAxisLabel').css({
            'font-size': self.FONT_SIZE,
            'line-height': self.LINE_HEIGHT
          });
          canary.append(tempP);
          self.strings[word] = tempP.width();
        }
      }

      canary.remove();
    },

    toBreakOrNotToBreak: function (labels, width, containerHeight) {
      var self = this;

      for (var i = 0; i < labels.length; i++) {
        var lengths = self.getWordLengths(labels[i]);
        if (_.max(lengths) > width) {
          return false;
        }
      }

      return true;

    },

    getWordLengths: function (label) {
      var self = this;
      var words = label.split(' ');
      var lengths = _.values(_.pick(self.strings, words));

      return lengths;
    },

    getHeight: function (labels, width, containerHeight) {
      var self = this,
          linesRequired = [],
          tiltLabels = !self.toBreakOrNotToBreak(labels, width, containerHeight),
          heights = [],
          i = 0,
          maxHeight;
      if (!tiltLabels) {
        for (i = 0; i < labels.length; i++) {
          var words = labels[i].split(' ');
          var lengths = _.values(_.pick(self.strings, words));

          linesRequired.push(self.lines(labels[i], width).numLines);
        }
        maxHeight = _.max(linesRequired);

        return maxHeight * self.LINE_HEIGHT;
      } else {
        if (tiltLabels) {
          for (i = 0; i < labels.length; i++) {
            heights.push(self.getTiltHeight(labels[i], containerHeight * self.MAX_HEIGHT_PERCENT));
          }

          maxHeight = _.max(heights);
          return maxHeight;
        }
      }
    },

    getTiltHeight: function (label, maxHeight) {
      var self = this,
          words = label.split(' '),
          lengths = _.values(_.pick(self.strings, words)),
          wordLength = _.reduce(lengths, function (mem, item) {
            return mem + item;
          }) + (words.length - 1) * self.FONT_SIZE,
          labelHeight = wordLength * Math.sin(self.THETA) + self.PADDING;

      if (labelHeight > maxHeight) {
        return maxHeight;
      } else {
        return labelHeight;
      }
      // maxHeight = Math.abs(labelHeight) > maxSectionHeight ? maxSectionHeight : labelHeight;
    },

    lines: function (label, width) {
      var self = this;

      var words = label.split(' ');

      var lengths = _.values(_.pick(self.strings, words));
      var lines = 1;
      var wordsLine = [''];
      var sum = 0;
      for (var i = 0; i < words.length; i++) {
        if (sum + lengths[i] < width) {
          sum += lengths[i];
          wordsLine[lines - 1] += (' ' + words[i]);
        } else {
          lines++;
          wordsLine[lines - 1] = ' ' + words[i];
          sum = lengths[i];
        }
      }

      return {
        numLines: lines,
        words: wordsLine
      };
    },

    breakLabels: function (labelsContainer, width, containerHeight) {
      var self = this,
          labels = labelsContainer.selectAll('text'),
          labelTexts = [];
      labels.each(function (text) {
        labelTexts.push(text);
      });

      var shouldWeBreak = self.toBreakOrNotToBreak(labelTexts, width);

      if (shouldWeBreak) {

        labels.each(function (text) {
          var labelsToUse = self.lines(text, width).words;
          var parent = d3.select($(d3.select(this)[0][0]).parent()[0]);

          d3.select(this).remove();

          var newText = parent.insert('text').attr('style', 'font-size: ' + self.FONT_SIZE + 'px');

          for (var i = 0; i < labelsToUse.length; i++) {
            newText.insert('tspan')
                .attr('style', 'text-anchor: middle')
                .attr('x', '0px')
                .attr('dy', self.LINE_HEIGHT + 'px')
                .text(labelsToUse[i]);
          }

        });
      } else {
        self.tiltLabels(labelsContainer, width, containerHeight);
      }
    },

    tiltLabels: function (labelsContainer, width, containerHeight) {
      var self = this,
          maxHeight = self.MAX_HEIGHT_PERCENT * containerHeight,
          labels = labelsContainer.selectAll('text');

      labels.each(function (text) {

        d3.select(this).attr('style', 'font-size: ' + self.FONT_SIZE + 'px; text-anchor: right;');
        d3.select(this).attr('data-tooltip', 'true');
        d3.select(this).attr('data-full-text', text);

        var labelWidth = this.getBBox().width,
            label = d3.select(this),
            p, labelHeight, numFittableChars;

        label.attr('transform', 'rotate(' + -self.THETA + ')');

        labelHeight = $(this).parent()[0].getBBox().height;

        p = Math.abs(maxHeight / labelHeight);
        text = $(label[0]).text();

        if (p < 1) {
          numFittableChars = Math.floor(p * text.length);
          text = numFittableChars > 4 ? text.slice(0, numFittableChars - 3) + '...' : text.slice(0, numFittableChars - 1);
          $(label[0]).text(text);
        }

        label.attr('dx', -this.getBBox().width - self.PADDING * 2);
        label.attr('dy', 0);

      });

    }
  };

  return wrapGenius;
});
