define([], function () {
  var StyleFormatter = function () {

    var self = this,
        config,
        textAlign = "",
        textBoldFlag = "",
        textItalicFlag = "",
        rawHTML = null,
        RIGHT_ALIGN = 'right',
        LEFT_ALIGN = 'left',
        CENTER_ALIGN = 'center';

    var textBoldString = "rfBold",
        textItalicString = "rfItalic";

    self.setConfig = function (c) {
      config = c;

      if (typeof(config.textAlign) === 'string') {
        textAlign = config.textAlign;
      }

      if (typeof(config.textBoldFlag) === 'boolean') {
        textBoldFlag = config.textBoldFlag;
      }

      if (typeof(config.textItalicFlag) === 'boolean') {
        textItalicFlag = config.textItalicFlag;
      }

      if (typeof(config.rawHTML) === 'boolean') {
        rawHTML = config.rawHTML;
      }

    };

    self.formatColumn = function (data, key) {
      data[key]['style'] = addStyles();
      return data;
    };

    self.filterHTML = function(data, key){
      if(data && !rawHTML){
        for(var i=0; i<data.length; i++){
          data[i][key] = cleanHTML(data[i][key]);
        }
      }

      return data;
    };

    var addStyles = function(){
      var styles = [];

      if (textAlign){
        styles.push(addTextAlign());
      }

      if (textBoldFlag) {
       styles.push(textBoldString);
      }

      if (textItalicFlag) {
        styles.push(textItalicString);
      }

      return styles.join(" ");
    };

    var addTextAlign = function(){
      var align = "";

      switch(textAlign){
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
    };

    var cleanHTML = function(data){
      return htmlEntities(data);
    };

    var htmlEntities = function(str){
      return String(str).replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(/"/g, '&quot;');
    };

  };

  return StyleFormatter;
});
