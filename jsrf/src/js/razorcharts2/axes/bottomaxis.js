define(['razorcharts2/axes/axis', 'vendor/lodash'], function (Axis, _) {
    var MAX_HEIGHT = 0.25;
    var BottomAxis = function () {
        this.init ();
        this.registerTransformer ({key: 'render', transform: BottomAxisTransformer});
        this.registerTransformer ({key: 'resize', transform: BottomAxisTransformer});
        this.registerTransformer ({key: 'update', transform: BottomAxisUpdateTransformer});
        this.registerTransformer ({key: 'render', transform: BottomAxisSmartLabelTransform});
        this.registerTransformer ({key: 'resize', transform: BottomAxisSmartLabelTransform});
    };

    BottomAxis.prototype = new Axis ();
    BottomAxis.prototype.constructor = BottomAxis;

    function BottomAxisTransformer (self) {
        var width = self.coreWidth,
            $ticks = self.$ticks,
            ticks = self.ticks,
            scale = self.scale,
            tickWidth = width / ticks.length,
            labelStep = self.options.labelStep,
            width = self.coreWidth,
            maxTickHeight;
        
        for(var i=0; i<ticks.length; ++i) {
            var x;
            if(self.options.type === 'ordinal') {
                x = scale.calc(ticks[i]) + tickWidth / 2;
            } else {
                x = scale.calc (ticks[i]);
            }
            
            $ticks[i].attr ({
                'transform': 'translate(' + x + ',14)',
                'text-anchor': 'middle'
            });

            if(labelStep && labelStep.interval) {
                if(i > labelStep.startIndex && i % labelStep.interval !== 0) {
                    $ticks[i].attr ('opacity', 0);
                }
            }
        }

        self.line.attr ({
            x1: 0,
            y1: 0,
            x2: width,
            y2: 0,
            "stroke": "#979797",
            "stroke-dasharray": "none"
        });

        if(self.options.type === 'linear') {
            self.line.attr({
                "stroke": "none"
            });
        }

        if(self.hasLabel()) {
            self.$label.text(self.label);
            self.$label.attr({
                'text-anchor': 'middle'
            });
            maxTickHeight =  self.getMaxTickHeight($ticks);
            self.$label.translate(width / 2, maxTickHeight + self.$label.getBBox().height + 8);
        }
    };

    function BottomAxisUpdateTransformer (self) {
        var $ticks = self.$ticks,
            $cachedTicks = self.$cachedTicks,
            ticks = self.ticks,
            cachedTicks = self.cachedTicks;
            scale = self.scale,
            cachedScale = self.cachedScale,
            width = self.coreWidth;
        cachedScale.range([0, width]);
        for(var i=0; i<ticks.length; ++i) {
            var x = scale.calc (ticks[i]);
            var oldX = cachedScale.calc(ticks[i]);
            if($ticks[i].__newTick) {
                $ticks[i].attr('opacity', 0);
                $ticks[i].__newTick = false;
            }
            $ticks[i].translate(oldX, 14);
            $ticks[i].attr ({
                'text-anchor': 'middle'
            });
            $ticks[i].animate({
                transform: {
                    translate: [x, 14]
                },
                opacity: 1
            });
        }

        for(var i=0; i<cachedTicks.length; i++) {
            var x =scale.calc(cachedTicks[i]);
            (function(_i) {
                $cachedTicks[_i].animate({
                    transform: {
                        translate: [x, 14]
                    },
                    opacity: 0
                }, 500, function () {
                    $cachedTicks[_i].remove();
                });
            })(i);
        }

        self.cache ();
    };

    function BottomAxisSmartLabelTransform (self) {
        if(self.options.type !== 'ordinal') return;
        var $ticks = self.$ticks,
            $tickTexts = self.$tickTexts,
            ticks = self.ticks,
            width = self.coreWidth,
            height = self.coreHeight,
            tickWidth = width / $ticks.length,
            labelWidths = self.labelWidths,
            scale = self.options.scale;
        if(shouldWeTilt(self, tickWidth)) {
            for(var i=0; i<$ticks.length; i++) {
                if(labelWidths[i] > height * MAX_HEIGHT) {
                    var diff = (labelWidths[i] - height * MAX_HEIGHT);
                    var l = labelWidths[i] / ticks[i].length;
                    var newLabel = ticks[i].slice (0, Math.floor(diff / l) - 3);
                    $tickTexts[i].text (newLabel + '...');
                }
                $ticks[i].attr('text-anchor', 'end');
                $ticks[i].rotate (-45);
            }
        } else {
            for(var i=0; i<$ticks.length; i++) {
                if(labelWidths[i] > tickWidth * 0.8) {
                    var lines = getLines (self.wordWidths, ticks[i], tickWidth * 0.8);
                    var numLines = lines.numLines;
                    var words = lines.words;
                    var $tick = self.paper.g ();
                    var x;
                    if(self.options.type === 'ordinal') {
                        x = scale.calc(ticks[i]) + tickWidth / 2;
                    } else {
                        x = scale.calc (ticks[i]);
                    }
                    $tick.attr ({
                        'transform': 'translate(' + x + ',14)',
                        'text-anchor': 'middle'
                    });
                    for(var j=0; j<words.length; j++) {
                        var $newTickText = self.paper.text (0, 18 * j, words[j]);
                        $newTickText.attr({
                            "fill": "#666",
                            "stroke": "none",
                            "font-size": "12px"
                        });
                        $tick.append ($newTickText);
                    }
                    $ticks[i].remove ();
                    $ticks[i] = $tick;
                    self.core.append ($tick);
                }
            }
        }
    };

    var getLines = function(wordWidths, label, width) {
        // TODO: Fix a bug with the line becoming one worded later
        var words = label.split(' ');

        var lengths = _.values(_.pick(wordWidths, words));
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
            words: _.compact(wordsLine)
        };
    };

    function shouldWeTilt (self, tickWidth) {
        var tilt = false;
        for(var key in self.wordWidths) {
            if(self.wordWidths[key] > tickWidth) {
                tilt = true;
                break;
            }
        }
        return tilt;
    };
    return BottomAxis;
});