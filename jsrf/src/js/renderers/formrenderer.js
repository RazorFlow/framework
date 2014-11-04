define([
  "renderers/componentrenderer",
  "generated/templates",
  "graphics/rfkpi",
  "utils/datepicker",
  "utils/numberslider",
  "vendor/Modernizr"
  // "kendo/kendo.dropdownlist",
  // "kendo/kendo.multiselect"
], function (ComponentRenderer, JST, RFKPI, DatePicker, NumberSlider, Modernizr) {
  function FormRenderer() {
    ComponentRenderer.call(this);

    var self = this,
        base = {},
        Public,
        raw = self._raw,
        Protected,
        pro = self.pro,
        _bp = {};

    var kpi,
        mode,
        spark,
        sparkContainer,
        sparkLabels,
        sparkValues,
        currentVals = {},
        $itemContainer = null,
        $formContainer = null,
        $slider = null;

    Public = {
      setConfig: function (cfg) {
        currentVals = cfg.defaultValues || {};
      },

      dispose: function () {
        base.dispose();
        $itemContainer = null;
        $formContainer = null;
      },
      renderCore: function () {
        self.$core.html(JST.form_base({

        }));
        $formContainer = self.$core.find('.formContainer');
        $itemContainer = self.$core.find('.formItems');

        var items = self.props.form.items;
        for (var key in items) {
          if(items.hasOwnProperty(key)){
            var item = items[key];
            item.id = key;
            addExtraParams(item);

            var $node = $(JST.form_item(item));
            $itemContainer.append($node);
            attachEventHandlers(item, $node);
          }
        }

        var submit = self.$core.find('#submit');

        submit.on('click', function () {
          obj = self.getAllInputValues(true);
          pro.trigger('submit', obj);
        });

      },
      resizeCore: function (width, height) {

      },
      isFieldSet: function (id) {
        var item = self.props.form.items[id];
        var $itemContainer = self.$core.find('.formItems');
        if (!item) {
          return false;
        }

        if (item.type === 'text') {
          return $itemContainer.find('[data-key=' + item.id + ']').val() !== "";
        } else if (item.type === 'select') {
          var index = $itemContainer.find('[data-key=' + item.id + ']')[0].selectedIndex;
          return {
            text: item.list[index],
            index: index
          };
        } else if (item.type === 'multiSelect') {
          var options = $itemContainer.find('[data-key=' + item.id + '] option');
          var indices = [], texts = [];
          for (var i = 0; i < options.length; i++) {
            if (options[i].selected) {
              indices.push(i);
              texts.push(item.list[i]);
            }
          }
          return texts.length > 0;
        } else if (item.type === 'date') {
          // Always process since a value will be set by default
          return true;
        } else if (item.type === 'dateRange') {
          // Always process since a value will be set by default
          return true;
        } else if (item.type === 'numericRange') {
          // if(!Modernizr.touch){
          //   return item.numberSlider.getRangeValues();
          // }

          // return [+$itemContainer.find('[data-key=' + item.id + '].rangeStart').val(),
          //   +$itemContainer.find('[data-key=' + item.id + '].rangeEnd').val()];
          // Always process since a value will be set by default
          return true;
        } else if (item.type === 'checkbox') {
          // return $itemContainer.find('[data-key=' + item.id + ']').is(':checked');
          // Always process since a value will be set by default
          return true;
        }

        return false;
      },
      getInputValue: function (id) {
        var item = self.props.form.items[id];
        var $itemContainer = self.$core.find('.formItems');
        if (!item) {
          console.error('Form field with id ' + id + ' was not found!');
          return;
        }

        if (item.type === 'text') {
          return $itemContainer.find('[data-key=' + item.id + ']').val();
        } else if (item.type === 'select') {
          var index = $itemContainer.find('[data-key=' + item.id + ']')[0].selectedIndex;
          return {
            text: item.list[index],
            index: index
          };
        } else if (item.type === 'multiSelect') {
          var options = $itemContainer.find('[data-key=' + item.id + '] option');
          var indices = [], texts = [];
          for (var i = 0; i < options.length; i++) {
            if (options[i].selected) {
              indices.push(i);
              texts.push(item.list[i]);
            }
          }
          return {
            text: texts,
            index: indices
          };
        } else if (item.type === 'date') {
          return new Date($itemContainer.find('[data-key=' + item.id + ']').val());
        } else if (item.type === 'dateRange') {
          return [new Date($itemContainer.find('[data-key=' + item.id + '].rangeStart').val()),
            new Date($itemContainer.find('[data-key=' + item.id + '].rangeEnd').val())];
        } else if (item.type === 'numericRange') {
          if(!Modernizr.touch){
            return item.numberSlider.getRangeValues();
          }

          return [+$itemContainer.find('[data-key=' + item.id + '].rangeStart').val(),
            +$itemContainer.find('[data-key=' + item.id + '].rangeEnd').val()];
        } else if (item.type === 'checkbox') {
          return $itemContainer.find('[data-key=' + item.id + ']').is(':checked');
        }
      },

      getAllInputValues: function (onlySet) {
        onlySet = onlySet || false;
        var items = self.props.form.items;
        var obj = {};
        for (var key in items) {
          if(items.hasOwnProperty(key)) {
            if(!onlySet || self.isFieldSet(key)) {
              obj[key] = self.getInputValue(key);
            }
          }
        }
        return obj;
      }
    };

    Protected = {

    };

    var addExtraParams = function (item) {
      var isOptionSelected = [];
      var currentVal = currentVals[item.id];
      item.options = item.options || {};
      if (item.type === 'text') {
        item.value = currentVal || item.options.defaultText || "";
      } else if (item.type === 'select') {
        item.multiple = false;
        item.options = currentVal ? {defaultSelectedIndex: currentVal} : (item.options || {defaultSelectedIndex: 0});
      } else if (item.type === 'multiSelect') {
        item.multiple = true;

        item.options.defaultSelectedOptions = currentVal || (item.options.defaultSelectedOptions || []);

        if (item.options && item.options.defaultSelectedOptions.length > 1) {
          for (i = 0; i < item.list.length; i++) {
            isOptionSelected[i] = false;
          }

          for (i = 0; i < item.options.defaultSelectedOptions.length; i++) {
            isOptionSelected[item.options.defaultSelectedOptions[i]] = true;
          }
        }
        item.isOptionSelected = isOptionSelected;
      } else if (item.type === 'date') {
        item.touch = Modernizr.touch;
        item.options.defaultDate = currentVal || (item.options.defaultDate || getCurrentDateString());
      } else if (item.type === 'dateRange') {
        item.touch = Modernizr.touch;
        item.options.defaultStartDate = currentVal ? currentVal.defaultStartDate : (item.options.defaultStartDate || getLastMonthsDateString());
        item.options.defaultEndDate = currentVal ? currentVal.defaultEndDate : (item.options.defaultEndDate || getCurrentDateString());
      } else if (item.type === 'numericRange') {
        item.touch = Modernizr.touch;
        item.options.rangeValues = item.options.values ? item.options.values : [ 0, 100 ];
        item.options.values = currentVal ? [currentVal.start, currentVal.end] : (item.options.values || [0, 100]);
      } else if (item.type === 'checkbox') {
        item.options.value = currentVal;
      }

    };

    var attachEventHandlers = function (item, $node) {
      var datePicker;
      if (item.type === 'text') {
        $node.on('keyup', function () {
          currentVals[item.id] = $node.find('input').val();
          pro.trigger('change', currentVals);
        });
      } else if (item.type === 'select') {
        // $node.find('#' + item.id).kendoDropDownList().data('kendoDropDownList');
        $node.on('change', function () {
          currentVals[item.id] = $node.find('select')[0].selectedIndex;
          pro.trigger('change', currentVals);
        });
      } else if (item.type === 'multiSelect') {
        $node.on('change', function () {
          var options = $(this).find('option');
          var indices = [];
          for (var i = 0; i < options.length; i++) {
            if (options[i].selected) {
              indices.push(i);
            }
          }
          currentVals[item.id] = indices;
          pro.trigger('change', currentVals);
        });
        // $node.find('#' + item.id).kendoMultiSelect().data('kendoMultiSelect');
      } else if (item.type === 'date') {
        var el = $node.find('input[data-key=' + item.id + ']');
        item.options.core = el;
        if(!Modernizr.touch) {
          datePicker = new DatePicker(item.options);
          datePicker.render();
        }

        $node.on('change', function () {
          var date  = $node.find('input').data('kendoDatePicker');
          currentVals[item.id] = createDateString(date.value());
          pro.trigger('change', currentVals);
        });
      } else if (item.type === 'dateRange') {
        var el1 = $node.find('input[data-key=' + item.id + '].rangeStart');
        var el2 = $node.find('input[data-key=' + item.id + '].rangeEnd');
        item.options.core = [ el1, el2 ];
        item.options.range = true;

        if(!Modernizr.touch) {
          datePicker = new DatePicker(item.options);
          datePicker.render();
        }

        el1.on('change', function () {
          var date1  = $($node.find("input")[0]).data('kendoDatePicker');
          var date2  = $($node.find("input")[1]).data('kendoDatePicker');
          currentVals[item.id] = { 
            defaultStartDate: createDateString(date1.value()),
            defaultEndDate: createDateString(date2.value())
          };
          pro.trigger('change', currentVals);
        });

        el2.on('change', function () {
          var date1  = $($node.find("input")[0]).data('kendoDatePicker');
          var date2  = $($node.find("input")[1]).data('kendoDatePicker');
          currentVals[item.id] = { 
            defaultStartDate: createDateString(date1.value()),
            defaultEndDate: createDateString(date2.value())
          };
          pro.trigger('change', currentVals);
        });
      } else if (item.type === 'numericRange') {
        $slider = $node.find('#rfRangeSlider-' + item.id);
        item.options.slider = $slider;
        item.options.tooltipID = '.rfNumericRangeText-' + item.id;
        item.options.range = true;
        var numberSlider = new NumberSlider(item.options);
        $node.find(".rfNumericRangeText-" + item.id).text(item.options.values[0] + " - " + item.options.values[1]);
        var changeFunction = function() {
          var values = $slider.data('kendoRangeSlider').value();
          currentVals[item.id] = {
            start: values[0],
            end: values[1]
          };
          $(".rfNumericRangeText-" + item.id).text(values[0] + " - " + values[1]);
        };

        item.numberSlider = numberSlider;

        // if(!Modernizr.touch) {
          numberSlider.setRangeValues(item.options.rangeValues);
          numberSlider.setValue( item.options.values );
          numberSlider.change(changeFunction);
          numberSlider.render();
        // }

      } else if (item.type === 'checkbox') {
        $node.on('change', function () {
          currentVals[item.id] = $node.find('input').is(':checked');
          pro.trigger('change', currentVals);
        });
      }
    };

    var createDateString = function(dateString) {
      var d = new Date(dateString);
      var month = d.getMonth() + 1;

      month = ( month >= 10 ) ? month : ( '0' + month );

      return d.getFullYear() + '-' + month + '-' + ((d.getDate() < 10) ? '0' : '') + d.getDate();
    };

    var getCurrentDateString = function () {
      var d = new Date();
      var month = d.getMonth() + 1;

      month = ( month >= 10 ) ? month : ( '0' + month );

      return d.getFullYear() + '-' + month + '-' + ((d.getDate() < 10) ? '0' : '') + d.getDate();
    };

    var getLastMonthsDateString = function () {
      var d = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      var month = d.getMonth() + 1;

      month = ( month >= 10 ) ? month : ( '0' + month );

      return d.getFullYear() + '-' + month + '-' + ((d.getDate() < 10) ? '0' : '') + d.getDate();
    };

    raw._registerClassName("FormRenderer");
    raw._registerPublic(base, Public);
    raw._registerProtected(_bp, Protected);
  }

  return FormRenderer;
});
