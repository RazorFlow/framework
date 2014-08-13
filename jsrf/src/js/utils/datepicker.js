define(["generated/templates",
        "utils/browserutils", "kendo/kendo.datepicker", "kendo/kendo.fx"], function (JST, BrowserUtils, kDatePicker, kFX) {
  var DatePicker = function (_options){

        var self = this,
            options = _options,
            $core = options.core,
            $scrollable = _options.scrollable || $('body'),
            $picker = $(JST.date_picker({})),
            // $title = $picker.find('.title'),
            // $tbody = $picker.find('tbody'),
            $parent = rf.globals.dbRegistry.getCurrentDashboard()._getNinjaDiv(),
            // now = new Date(),
            // shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            // fullMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            // shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            visible = false,
            datePickerObj,
            range = options.range;


        self.setDate = function(start) {
          startDate = start;
        };

        self.setDateRange = function(start, end) {
          startDate = start;
          endDate = end;
        };

        self.render = function() {
          if(range) {
            renderRange();
            return;
          }

          renderNormal();
        };

        var renderRange = function() {

          var startChange = function() {
            start.max(makeDate(end.value(), true));
            end.min(makeDate(start.value(), true));

            if(start.value() > end.value()) {
              end.value(makeDate(start.value(), true));
            }
          };

          var endChange = function() {
            start.max(makeDate(end.value(), true));
          };

          var start = $core[0].kendoDatePicker({
            format: "dd MMMM yyyy",
            value: makeDate(options.defaultStartDate),
            change: startChange,
            footer: false
          }).data('kendoDatePicker');

          var end = $core[1].kendoDatePicker({
            format: "dd MMMM yyyy",
            value: makeDate(options.defaultEndDate),
            change: endChange,
            footer: false
          }).data('kendoDatePicker');

          start.max(makeDate(options.defaultEndDate));
          end.min(makeDate(options.defaultStartDate));
        };

        var renderNormal = function() {
          
          $core.kendoDatePicker({
            animation: {},
            format: "dd MMMM yyyy",
            value: makeDate(options.defaultDate),
            footer: false
          }).data('kendoDatePicker');
        };

        var makeDate = function(dateString, fullDate) {
          if(fullDate) {
            return new Date(dateString);
          }

          var parts = dateString.split("-");

          return new Date(parts[0], parts[1]-1, parts[2]);
        };

        // $parent.append($picker);
        //
        // datePickerObj = $picker.kendoDatePicker();

        // now = $core.val() ? new Date($core.val()) : now;
        //
        // // The double eq is required here to support firefox ---signed -- Dragon
        // now = (now == 'Invalid Date' ? new Date() : now);
        //
        // // $core.parent().append($picker);
        // $parent.append($picker);
        //
        // $picker.hide();
        //
        // /**
        //  * Gets the number of days in a particular month in a particular year
        //  */
        // function daysInMonth(month, year) {
        //     return new Date(year, month + 1, 0).getDate();
        // }
        //
        // var prepareDatePicker = function() {
        //     var startDay,
        //         numDays,
        //         numRows,
        //         i, $trs,
        //         row, $td,
        //         c;
        //
        //     $title.text(fullMonths[now.getMonth()] + ' ' + now.getFullYear());
        //
        //     startDay = (new Date(1 + ' ' + shortMonths[now.getMonth()] + ' ' + now.getFullYear())).getDay();
        //
        //     numDays = daysInMonth(now.getMonth(), now.getFullYear());
        //
        //     numRows = Math.ceil((numDays + startDay) / 7);
        //     $tbody.empty();
        //
        //     for(i=0; i<numRows; i++) {
        //         $tbody.append($('<tr/>'));
        //     }
        //
        //     $trs = $tbody.find('tr');
        //
        //     for(i=0; i < 7 * numRows; i++) {
        //         row = Math.floor(i / 7);
        //
        //         $td = $('<td/>');
        //         c = i - startDay + 1;
        //         if(c > 0 && c <= numDays) {
        //             $td.append(
        //                     $('<p/>').text((i - startDay + 1))
        //                 ).addClass('date');
        //         }
        //
        //         if(now.getDate() === c) {
        //             $td.addClass('selected');
        //         }
        //
        //         $($trs[row]).append($td);
        //     }
        //
        //     reposition();
        //
        //     $picker.find('td.date').on('mousedown', function(e) {
        //         var newDate = $(this).text();
        //
        //         now = new Date(newDate + ' ' + shortMonths[now.getMonth()] + ' ' + now.getFullYear());
        //
        //         $picker.find('td.date').removeClass('selected');
        //
        //         $(this).addClass('selected');
        //
        //         changeDateInTextbox();
        //     });
        //
        // };
        //
        // var reposition = function() {
        //     var height = BrowserUtils.isIE() ? $core.innerHeight() : $core.height();
        //     $picker.css({
        //         position: 'absolute',
        //         top: $core.offset().top + height + 2 + $core.scrollTop(),
        //         left: $core.offset().left
        //     });
        // };
        //
        //
        // var changeVisibility = function (_visible) {
        //     if(_visible) {
        //         reposition();
        //         $picker.show();
        //     } else {
        //         $picker.hide();
        //     }
        //
        //     visible = _visible;
        // };
        //
        // var changeDateInTextbox = function () {
        //     $core.val(formatDate(now, 'Y-m-d'));
        //     $core.trigger('keyup');
        // };
        //
        // /**
        //  * Ameen's pathetic date formatter
        //  * fomat string processes the following characters for insertion
        //  *     D => Weekday, eg: Mon
        //  *     d => Date, eg: 2
        //  *     m => Month in number, eg: 11
        //  *     M => Month in letters, eg: Nov
        //  *     y => Short year, eg: 13
        //  *     Y => Full year, eg: 2013
        //  */
        // var formatDate = function(date, formatString) {
        //     var dateString = formatString;
        //
        //     dateString = dateString.replace(/D/g, shortDays[date.getDay()]);
        //
        //     dateString = dateString.replace(/d/g, date.getDate());
        //
        //     dateString = dateString.replace(/m/g, date.getMonth() + 1);
        //
        //     dateString = dateString
        //                  .replace(/M/g, shortMonths[date.getMonth()])
        //                  .replace(/y/g, date.getYear())
        //                  .replace(/Y/g, date.getFullYear());
        //
        //     return dateString;
        // };
        //
        // prepareDatePicker();
        //
        // $picker.find('.leftArrow').on('click', function() {
        //     var newMonth = now.getMonth() - 1,
        //         newYear = now.getFullYear();
        //
        //     if(newMonth < 0) {
        //         newYear --;
        //         newMonth = 11;
        //     }
        //
        //     now = new Date(now.getDate() + ' ' + shortMonths[newMonth] + ' ' + newYear);
        //
        //     prepareDatePicker();
        // });
        //
        // $picker.find('.rightArrow').on('click', function() {
        //     var newMonth = now.getMonth() + 1,
        //         newYear = now.getFullYear();
        //
        //     if(newMonth > 11) {
        //         newYear ++;
        //         newMonth = 0;
        //     }
        //
        //     now = new Date(now.getDate() + ' ' + shortMonths[newMonth] + ' ' + newYear);
        //
        //     prepareDatePicker();
        // });
        //
        // $picker.on('mousedown', function(e) {
        //     e.preventDefault();
        // });
        //
        // $core.on('focus.datepicker', function() {
        //     changeVisibility(true);
        // });
        //
        // $scrollable.on('scroll.datepicker', function() {
        //     reposition();
        // });
        //
        // $core.on('blur.datepicker', function() {
        //     changeVisibility(false);
        // });

  };

  return DatePicker;
});
