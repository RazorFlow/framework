define([

],
    function () {
      var layoutManager = function (_options) {
        var self = this,
            options = _options || {},
            matrix = [],
            maxX = options.maxX || 12,
            maxY = 0,
            PAGE_SIZE = 12,
            minY = 0;

        /**
         * clears the matrix which holds the layout bitmap
         */
        var clearMatrix = function () {
          matrix = [];
        };

        /**
         * Appends amount of rows specified by num
         * @param {Number} num
         */
        var addMoreRows = function (num) {
          for (var j = 0; j < num; j++) {
            var tArr = [];

            for (var i = 0; i < maxX; i++) {
              tArr.push(0);
            }

            matrix.push(tArr);
          }

          maxY += num;
        };

        /**
         * Fills the layout bitmap at the specifed position with the specified dimension
         */
        var fillSpace = function (row, col, width, height) {
          for (var j = row; j < row + height; j++) {
            for (var i = col; i < col + width; i++) {
              matrix[j][i] = 1;
            }
          }
        };

        // Add two rows initially
        addMoreRows(PAGE_SIZE);


        /**
         * Finds and returns the empty spot in grid with the specified dimensions
         */
        self.findEmptySpot = function (w, h) {
          var result;
          if(!w && !h){
            throw 'Dimensions is not provided. Cannot find empty spot.';
          }
          for (var j = minY; j < maxY; j++) {
            var tStr = matrix[j].join('');
            var r = '';

            for (var t = 0; t < w; t++) {
              r += '0';
            }

            result = tStr.indexOf(r);

            if (result >= 0) {
              var spaceFound = true;

              for (var i = j + 1, k = 1; i < maxY && k < h; i++, k++) {

                var tStr2 = matrix[i].slice(result, result + w).join('');

                if (tStr2 !== r) {
                  spaceFound = false;
                  break;
                }
              }

              if (spaceFound && k === h) {
                minY = j;
                fillSpace(j, result, w, h);

                return {
                  row: j,
                  col: result
                };

              } else {

                addMoreRows(PAGE_SIZE);
                return self.findEmptySpot(w, h);
              }
            }
          }

          addMoreRows(PAGE_SIZE);
          return self.findEmptySpot(w, h);
        };

        /**
         * Clears the layout
         */
        self.clearLayout = function () {
          clearMatrix();
        };
      };

      return layoutManager;
    });