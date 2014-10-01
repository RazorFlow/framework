define(['vendor/lodash', 'razorcharts2/scales/scale'], function (_, Scale) {
    var Axis = function () {
        
    };

    Axis.prototype.init = function () {
        this.transformers = [];
        this.$ticks = [];
        this.$tickTexts = [];
        this.labelWidths = [];
        this.wordWidths = {};
    };

    Axis.prototype.config = function (_options) {
        var options = this.options = _options;
        this.type = options.type;
        this.scale = options.scale;
        this.ticks = options.ticks;
        this.cache ();
    };

    Axis.prototype.cache = function () {
        this.cachedScale = new Scale[this.scale.type()]();
        this.cachedScale.domain(this.scale.domain());
        this.cachedTicks = _.cloneDeep (this.ticks);
    };

    Axis.prototype.setTicks = function (ticks) {
        this.ticks = ticks;
    }

    Axis.prototype.renderTo = function (_paper, _core, w, h) {
        this.paper = _paper;
        this.core = _core;
        this.coreWidth = w;
        this.coreHeight = h;

        this.createTicks (this);
        this.line = this.paper.line (0, 0, 0, 0);
        this.core.append (this.line);
        this.transform ('render');
    };

    Axis.prototype.height = function () {
        return this.core.getBBox().height;
    };

    Axis.prototype.width = function () {
        return this.core.getBBox().width;
    };

    Axis.prototype.resizeTo = function (w, h) {
        this.coreWidth = w;
        this.coreHeight = h;
        this.transform('resize');
    };

    Axis.prototype.update = function () {
        // console.log('New Ticks in axis : ', this.ticks);
        this.$cachedTicks = this.$ticks;
        this.$ticks = [];
        this.updateTicks ();
        this.transform('update');
    };

    Axis.prototype.transform = function (key) {
        var t = _.where (this.transformers, {key: key});
        for(var i=0; i<t.length; ++i) {
            (t[i].transform)(this);
        }
    };

    Axis.prototype.registerTransformer = function (transformer) {
        this.transformers.push (transformer);
    };

    Axis.prototype.createTicks = function() {
        var paper = this.paper;
        for(var i=0; i<this.ticks.length; ++i) {
            var $tick = paper.g ();
            $tick.attr('id', 'tick-' + (i+1));
            var $text = paper.text (0, 0, '' + this.ticks[i]);
            this.$tickTexts.push ($text);
            $tick.append ($text);
            this.$ticks.push ($tick);
            this.core.append ($tick);
        }
        if(this.options.type === 'ordinal') {
            calculateLabelWidths (this);
            findWordWidths (this);
        }
    };

    function findWordWidths (self) {
        var labelWidths = self.labelWidths,
            ticks = self.ticks;

        for(var i=0; i<ticks.length; i++) {
            var words = ticks[i].split(' ');
            for(var j=0; j<words.length; j++) {
                var word = words[j];
                self.wordWidths[word] = word.length * (labelWidths[i] / ticks[i].length);
            }
        }
    }

    function calculateLabelWidths (self) {
        var $ticks = self.$ticks;
        for(var i=0; i<$ticks.length; i++) {
            self.labelWidths[i] = $ticks[i].getBBox().width;
        }
    };

    Axis.prototype.updateTicks = function () {
        var sameTicks = [];

        for(var i=0; i<this.ticks.length; i++) {
            var idx = _.indexOf(this.cachedTicks, this.ticks[i]);
            if(idx !== -1) {
                sameTicks[i] = this.$cachedTicks[idx];
                this.cachedTicks[idx] = undefined;
                this.$cachedTicks[idx] = undefined;
            }
        }

        this.cachedTicks = _.compact(this.cachedTicks);
        this.$cachedTicks = _.compact(this.$cachedTicks);
        this.$ticks = sameTicks;
        
        for(var i=0; i<this.ticks.length; i++) {
            if(typeof this.$ticks[i] === 'undefined') {
                var $tick = this.paper.g ();
                $tick.attr('id', 'tick-' + (i+1));
                var $text = this.paper.text (0, 0, '' + this.ticks[i]);
                this.$tickTexts[i] = $text;
                $tick.append ($text);
                this.$ticks[i] = $tick;
                this.core.append ($tick);
                $tick.__newTick = true;
            }
        }
    };

    return Axis;
}); 