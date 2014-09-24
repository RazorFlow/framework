define(["utils/evalexpression", "vendor/klass"], function (EvalExpression, klass) {

  var StyleFormatter = klass({
    textAlign: "",
    textBoldFlag: "",
    textItalicFlag: "",
    rawHTML: null,
    RIGHT_ALIGN: 'right',
    LEFT_ALIGN: 'left',
    CENTER_ALIGN: 'center',
    conditionExpn: {},
    format: {},
    textBoldString: "rfBold",
    textItalicString: "rfItalic",

    setConfig: function (c) {
      var config = c;
      if (typeof(config.textAlign) === 'string') {
        this.textAlign = config.textAlign;
      }

      if (typeof(config.textBoldFlag) === 'boolean') {
        this.textBoldFlag = config.textBoldFlag;
      }

      if (typeof(config.textItalicFlag) === 'boolean') {
        this.textItalicFlag = config.textItalicFlag;
      }

      if (typeof(config.rawHTML) === 'boolean') {
        this.rawHTML = config.rawHTML;
      }

      this.conditionExpn = config.conditionalExpression;
      this.format = config.format;
    },

    formatColumn: function (data, key) {
      data[key]['style'] = this.addStyles();
      return data;
    },

    formatCell: function (data, key) {
      var value = null;
      var cellStyle = [];
      for(var i=0; i<data.length; i++) {
        cellStyle[i] = {};
        if(EvalExpression(this.conditionExpn.expression, data[i][key])) {
          cellStyle[i]["cellBackgroundColor"] = this.format.cellBackgroundColor;
          cellStyle[i]["cellTextColor"] = this.format.cellTextColor;
        }
      }
      return cellStyle;
    },

    filterHTML: function(data, key){
      if(data && !this.rawHTML){
        for(var i=0; i<data.length; i++){
          data[i][key] = this.cleanHTML(data[i][key]);
        }
      }

      return data;
    },

    addStyles: function() {
      var styles = [];

      if (this.textAlign){
        styles.push(this.addTextAlign());
      }

      if (this.textBoldFlag) {
       styles.push(this.textBoldString);
      }

      if (this.textItalicFlag) {
        styles.push(this.textItalicString);
      }

      return styles.join(" ");
    },

    addTextAlign: function(){
      var align = "";

      switch(this.textAlign){
        case CENTER_ALIGN:
          align = 'rfCenter';
          break;
        case LEFT_ALIGN:
          align = 'rfLeft';
          break;
        case RIGHT_ALIGN:
          align = 'rfRight';
          break;
      }

      return align;
    },

    cleanHTML: function(data) {
      return this.htmlEntities(data);
    },

    htmlEntities: function(str) {
      return String(str).replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(/"/g, '&quot;');
    }

  });

  return StyleFormatter;
});
