define([
  "components/component",
  "renderers/formrenderer",
  "prop/properties",
  'vendor/lodash'
], function (Component, FormRenderer, Properties, _) {
  /**
   * Creates a form component
   * @class  FormComponent
   * @augments {Component}
   */
  function FormComponent() {
    Component.apply(this, Array.prototype.slice.call(arguments));

    var self = this,
        base = {},
        Public,
        raw = self._raw,
        Protected,
        pro = self.pro,
        _bp = {};

    var submitHandler;

    Public = {
      /**
       * Add a text field represented by a HTML Text input on the form.
       * @method addTextField
       * @param {String} id id for this field, used to retrieve the value
       * @param {String} label The label that is displayed in the form element for the user
       * @param {Object} options The options object
       */
      addTextField: function (id, label, options) {
        var opts = {
          type: 'text',
          label: label,
          options: options
        };
        pro.pb.addItemToList('form.items', id, opts);
      },

      /**
       * Add a select/dropdown field which allows the user to select one
       * option from a list of pre-defined options.
       * This is displayed as a HTML Select input on the form.
       * @method addSelectField
       * @param {String} id id for this field, used to retrieve the value
       * @param {string} label The label that is displayed in the form element for the user
       * @param {Array} list An array of strings which are the options in the select items.
       * @param {Object} options The options object
       */
      addSelectField: function (id, label, list, options) {
        var opts = {
          type: 'select',
          label: label,
          list: list,
          options: options
        };

        pro.pb.addItemToList('form.items', id, opts);
      },

      /**
       * Add a multi-select field which allows the user to select one
       * option from a list of pre-defined options. This is displayed as a HTML multi select input on the form.
       * @method addMultiSelectField
       * @param {String} id id for this field, used to retrieve the value
       * @param {string} label The label that is displayed in the form element for the user
       * @param {Array} list An array of strings which are the options in the select items.
       * @param {Object} options The options object
       */
      addMultiSelectField: function (id, label, list, options) {
        options = options || {};
        var _options = _.extend(options, {
              defaultSelectedOptions: options.defaultSelectedOptions || []
            }),
            opts = {
              type: 'multiSelect',
              label: label,
              list: list,
              options: _options
            };

        pro.pb.addItemToList('form.items', id, opts);

      },

      /**
       * Add a select/dropdown field which allows the user to select a single date. This is displayed with a date picker.
       * @method addDateField
       * @param {String} id id for this field, used to retrieve the value
       * @param {string} label The label that is displayed in the form element for the user
       * @param {Object} options The options object
       */
      addDateField: function (id, label, options) {
        var opts = {
          type: 'date',
          label: label,
          options: options
        };

        pro.pb.addItemToList('form.items', id, opts);
      },
      /**
       * Adds a Date Range field to the component. This field can be used to select a date range, a start date and an end date.
       * range, a start date and an end date.
       * @method addDateRangeField
       * @param {String} id id for this field, used to retrieve the value
       * @param {string} label The label that is displayed in the form element for the user
       * @param {Object} options The options object
       */
      addDateRangeField: function (id, label, options) {
        _.extend(options, { range: true });
        var opts = {
          type: 'dateRange',
          label: label,
          options: options
        };

        pro.pb.addItemToList('form.items', id, opts);
      },
      /**
       * Adds a Numeric Range field to the component. This field can be used to select a numeric range, a start number and an end number.
       * @method addNumericRangeField
       * @param {String} id Unique id for this field
       * @param {String} label The name displayed on the control
       * @param {Array} values The default values for the start and end numbers
       * @param {Object} options The options object
       */
      addNumericRangeField: function (id, label, values, options) {
        options = options ? options : {};
        _.extend(options, { values: values });
        var opts = {
          type: 'numericRange',
          label: label,
          options: options
        };
        pro.pb.addItemToList('form.items', id, opts);
      },

      /**
       * Add a checkbox field displayed as a HTML checkbox in the form.
       * @method addCheckboxField
       * @param {String} id id for this field, used to retrieve the value
       * @param {String} label The label that is displayed in the form element for the user
       * @param {Boolean} value If the checkbox is supposed to be checked by default
       */
      addCheckboxField: function (id, label, value) {
        var opts = {
          type: 'checkbox',
          label: label,
          options: {value: value}
        };

        pro.pb.addItemToList('form.items', id, opts);
      },
      /**
       * Sets a callback for the apply click event
       * @method onApplyClick
       * @param  {Function} cb The callback which is called when submit is clicked
       */
      onApplyClick: function (cb) {
        if(pro.renderer) {
          pro.renderer.pro.bind('submit', cb);  
        } else {
          submitHandler = cb;
        }
      },
      /**
       * Returns all the input values provided in this component
       * @method getAllInputValues
       */
      getAllInputValues: function() {
        return pro.renderer.getAllInputValues();
      },

      /**
       * Check if the field of the form component has been set.
       * 
       * @param {String} id The id of a specific field
       * @method 
       */
      isFieldSet: function(id) {
        return pro.renderer.isFieldSet(id);
      },

      /**
       * Returns an input value by id provided in this component
       * @method getInputValue
       * @param {String} id The id of a specific field
       */
      getInputValue: function(id) {
        return pro.renderer.getInputValue(id);
      }
    };

    Protected = {
      init: function () {
        _bp.init();
      },
      createRenderer: function () {
        pro.renderer = new FormRenderer();
        pro.renderer.setConfig({defaultValues: pro.defaultValues});
        pro.renderer.pro.bind('change', changeListener);
        if(submitHandler) {
          pro.renderer.pro.bind('submit', submitHandler);
          submitHandler = undefined;
        }

        pro.renderer.pro.bind("submit", function (params) {
          pro.handleComponentEvent ("submit", params);
        });
        pro.onRendererCreate();
      },
      renderCore: function () {
        pro.renderer.renderCore();
      },
      resizeCore: function (width, height) {
        pro.renderer.resizeCore(width, height);
      },
      addListeners: function () {
        _bp.addListeners();
        pro.pushListeners([

        ]);
      },
      addCurrentValuesToPropBase: function () {
        // TODO: Add all the items in defaultValues to propbase
      },
      defaultValues: {}
    };

    var changeListener = function (defaultValues) {
      pro.defaultValues = defaultValues;
      // debugger
    };

    /**
     * This is the actual constructor of the object
     */
    var construct = function () {
      pro.pb = new Properties.FormComponentProperties();
    };

    raw._registerClassName("FormComponent");
    raw._registerPublic(base, Public);
    raw._registerProtected(_bp, Protected);

    construct();
  }

  return FormComponent;
});
