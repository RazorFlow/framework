/*jshint -W083 */
define([
  "core/rfclass",
  "data/datasource",
  "utils/media",
  "utils/modalutils",
  "utils/componentutils",
  "utils/assert",
  "utils/positionutils",
  "utils/resizewatcher",
  "utils/ajaxwrapper",
  "helpers/mediahelper",
  "utils/errorutils",
  "vendor/lodash"
], function (RFClass, DataSource, MediaUtils, ModalUtils, componentUtils, Assert, positionUtils, ResizeWatcher, AjaxWrapper, MediaHelper, errorUtils, _) {
  /**
   * Base Component Class containing functions shared across all components.
   *
   * **This is an abstract class. You cannot create instances of this.**
   * @class  Component
   */
  function Component(_id) {
    RFClass.call(this);
    var self = this,
        base = {},
        Public,
        raw = self._raw,
        Protected,
        _bp = {},
        pro = self.pro,
        id = _id || componentUtils.idGen(),
        currentWidth = null,
        componentModal = null;
        
    Public = {
      /**
       * Sets the location of the component in the dashboard
       * @access private
       * 
       * @param  {Number} x x position
       * @param  {Number} y y position
       * @param  {Number} w width
       * @param  {Number} h height
       */
      setLocation: function (x, y, w, h) {
        if (typeof x !== "number" && typeof x === 'object' && typeof y === 'undefined') {
          pro.pb.setObjectAtPath('core.location', x);
          return;
        }

        pro.pb.setObjectAtPath('core.location', {
          lg: {
            x: x || 0,
            y: y || 0,
            w: w || 0,
            h: h || 0
          }
        });
      },

      /**
       * Set the dimensions of the component. The dimensions are based on a 12-column grid
       * @method  setDimensions
       * @param  {Number} w width of the component in units
       * @param  {Number} h height of the component in units
       */
      setDimensions: function (w, h) {
        self.setLocation(0, 0, w, h);
      },

      /**
       * Set the caption of this component which is the text displayed on top of the component.
       * @method setCaption
       * @param {String} captionString caption text to be displayed on the component
       */
      setCaption: function (captionString) {
        pro.pb.setValue("core.caption", captionString);
      },

      setComponentIcon: function(id, props) {
        pro.pb.setValue("core.icon", id);
        pro.pb.setValue("core.iconprops", JSON.stringify(props || {}));
      },

      /**
      * Sets the index of the component on the dashboard. The component order on the dashboard is based on this index.
      * @method overrideDisplayOrderIndex
      * @param {Number} idx The index for this component
      */
      overrideDisplayOrderIndex: function(idx) {
        pro.pb.setValue("core.index", idx);
      },

      /**
       * Set the value to the key passed for the particular component.
       * @method setOption
       * @param {String} key variable which needs to be assigned
       * @param {Object} value value to be assigned to the key
       */
      setOption: function (key, value) {
        if(key === "breadcrumbStartString") {
          pro.pb.setValue("core.breadcrumbStartString", value);
          return true;
        }

        if(pro.cobjSetOption (key, value)) {
          return true;
        }
        return false;
      },

      /**
       * Temporarily pauses all changes to the component and displays a 'loading' spinner.
       * Use 'unlock' to resume drawing the component.
       * All functions that you call on this component will only take affect when 'unlock' is called.
       * @method lock
       */
      lock: function () {
        pro.lockedFlag = true;
        pro.showLoadingScreen();
      },

      /**
       * Continue normal behaviour of the component.
       * Any changes made during the component is locked is now applied.
       * @method unlock
       */
      unlock: function () {
        if (pro.lockedFlag  === true) {
          pro.lockedFlag = false;
          pro.hideLoadingScreen();
          if (pro.needsRedrawFlag === true) {
            pro.redraw();
          }
        }
        else {
          pro.lockedFlag = false;
          pro.handleWarning("Unlock called before locking");
          return;
        }
      },

      /**
       * Add a simple Key Performance Indicator (KPI/Metric) attached to the
       * bottom of the component.
       * 
       * @param {String} id A unique ID to identify the component KPI
       * @param {ComponentKPIProperties} options caption text to be displayed on the component
       * 
       * @method addComponentKPI
       */
      addComponentKPI: function (_id, opts) {
        opts = opts || {};
        _id = id + _id;
        pro.pb.addItemToList('kpis', _id, opts);
      },


      /**
       * Update the component KPI
       *
       * @param {String} id A unique ID to identify the component KPI. This has to be the same as the one used to add the component kpi
       * @method updateComponentKPI
       */
      updateComponentKPI: function (_id, opts) {
        opts = opts || {};
        _id = id + _id;
        var kpis = pro.pb.getObjectAtPath('kpis'),
            kpi = kpis[_id];
        opts.caption = kpis[_id].caption;
        opts = _.extend(kpi, opts);
        pro.pb.addItemToList('kpis', _id, opts);
      },

      /**
       * Update the component KPI
       *
       * @param {String} id A unique ID to identify the component KPI. This has to be the same as the one used to add the component kpi
       * @method removeComponentKPI
       */
      removeComponentKPI: function (_id) {
        var list = pro.pb.getObjectAtPath('kpis');
        _id = id + _id;
        list[_id] = undefined;
        delete list[_id];
        pro.pb.emptyList('kpis');
        pro.pb.setObjectAtPath('kpis', list);
      },

      /**
       * Check if the component is locked
       * @method isLocked
       * @returns {boolean|*}
       */
      isLocked: function () {
        return pro.lockedFlag;
      },

      /**
       * Reset the state of the component except the position/location
       * @method reset
       */
      reset: function () {

      },
      /**
       * Set the id for this component
       * @method setID
       * @param  {String} _id a unique string which represents the component in a dashboard
       */
      setID: function (_id) {
        id = _id;
      },
      /**
       * Get the id for this component
       * @method getID
       * @returns  {String} _id The id which is set
       */
      getID: function () {
        return id;
      },
      /**
       * Removes this component from the dashboard
       */
      removeFromDashboard: function() {
        pro.db.removeComponent(self);
      },

      renderTo: function ($jqDiv) {
        var dbWidth, cssObj = {}, cContainer,
            _$jqDiv = $("#" + $jqDiv);
        pro.showCaption = false;
        pro.init();
        pro.setTargetContainer(_$jqDiv);
        cContainer = pro.$container;
        pro.integratedFlag = true;
        pro.render();
        pro.resize(cContainer.width(), cContainer.height());
        currentWidth = cContainer.width();
        resizeWatcherLocal();
      },

     /**
     * Hides a component from the dashboard
     * @method hideComponent
     */
      hideComponent: function() {
        pro.pb.setValue("core.isHidden", true);
      },

     /**
     * Show a hidden component in a modal
     * @method showAsModal
     */
      showAsModal: function() {
        pro.pb.setValue("core.showModal", true);
      }
    };

    Protected = {
      /**
       * The propertybase object for this component
       */
      pb: null,

      firstRender: true,

      /**
       * The datasource for this component
       */
      ds: null,
      /**
       * The dashboard that's containing this component
       */
      db: null,
      /**
       * The container div that will be used to render the container
       */
      $container: null,

      /**
       * The core div of the component to render to
       */
      $core: null,

      /**
       * An instance of the renderer.
       */
      renderer: null,

      /**
       * A snapshot of the properties of the component for reference.
       */
      props: {},

      /**
       * A list of all of the listneres to specific propertybase
       * options.
       */
      propListeners: [],

      /**
       * Flag to indicate whether the component is locked or not.
       */
      lockedFlag: false,

      /**
       * Flag to indicate whether the component is locked or not.
       */
      needsRedrawFlag: false,

      maximized: false,

      showCaption: true,

      integratedFlag: false,

      error: {
        state: false,
        message: []
      },

      rawComponentFlag: false,

      errMsg: [],

      overriddenDimensions: {
        'sm': {
          w: 12,
          h: 7
        },
        'xs': {
          w: 12,
          h: 12
        },
        'md': {
          w: 6,
          h: 6
        },
        'lg': {
          w: 6,
          h: 6
        }
      },
      /**
       * This function is called only ONCE in the component's lifecycle
       *
       * This function can be used to set up.
       */
      init: function () {
        pro.pb.linkToComponent(self);
        pro.addListeners();
        if(!pro.rawComponentFlag) {
          pro.validate ();
        }
        pro.props = pro.pb.getRootObject ();
        self.trigger("componentOnInitialize");
      },

      showLoadingScreen: function () {
        if (pro.renderer) {
          pro.renderer.showLoadingScreen();
        }
      },

      hideLoadingScreen: function () {
        if (pro.renderer) {
          pro.renderer.hideLoadingScreen();
        }
      },

      /**
       * This simply sets the target div for the component to render to
       */
      setTargetContainer: function ($container) {
        pro.$container = $container;
      },

      applyPatches: function (patches) {
        var props = patches.props,
            data = patches.data;

        // TODO: This is a hack for drilldown functionality for server-side support
        // Needs a better solution
        if(self._raw.className === 'ChartComponent') {
          if(self.pro.isDrillDownable) {
            self.pro.configureRemoteDrilldown();
          }
        }

        for(var i = 0; i < props.length; i++) {
          pro.pb.applyPatch(props[i]);
        }
        if(pro.onApplyPatch) {
          pro.onApplyPatch();
        }
        self.ds.applyPatches(data);
        pro.requestRedraw ();
      },

      requestRedraw: function () {
        pro.needsRedrawFlag = true;
      },

      applyChange: function (type, path, newValue, oldValue, parts) {
        if (pro.lockedFlag) {
          // We cannot apply any change when it's locked.
          // So we simply ignore it and mark that it needs a redraw

          pro.needsRedrawFlag = true;

          if(!pro.pb.getValue('core.isHidden')) {
            return;
          }
        }

        var needsRedraw = true;
        // First, check if any of the paths match the subscribers
        for (var i = 0; i < pro.propListeners.length; i++) {
          var item = pro.propListeners[i];
          var regex = new RegExp(item.path),
              result = regex.exec(path);
          if(result) {
            needsRedraw = item.callback(newValue, oldValue, result);
          }
        }        
        if (needsRedraw) {
          pro.redraw();
        }
      },

      redraw: function () {
        self.trigger("beforeRedraw");
        if (!pro.rawComponentFlag) {
          pro.validate();
        }
        if(pro.renderer) {
          pro.renderer.dispose();
        }
        if(pro.$container) {
          pro.$container.empty();
          pro.render();
          pro.resize();
          self.trigger("redraw");
        }
      },

      addListeners: function () {
        pro.pushListeners([
          {
            path: 'core.showModal',
            callback: showAsModal
          }
        ]);
      },

      pushListeners: function (items) {
        for (var i = 0; i < items.length; i++) {
          pro.propListeners.push(items[i]);
        }
      },

      render: function () {
        if (pro.firstRender) {
          self.trigger("beforeFirstRender");
        }
        self.trigger("beforeRender");
        if (pro.renderer !== null) {
          pro.renderer.dispose();
        }
        var dataError = self.ds.getErrorStatus();
        if(dataError.status) {
          pro.handleError(dataError.msg);
        }
        pro.createRenderer();
        pro.renderer.init({
          shell: self,
          overriddenDimensions: pro.overriddenDimensions,
          props: pro.pb.getRootObject(),
          container: pro.$container,
          locked: pro.lockedFlag,
          error: pro.error.state,
          handleMaximize: handleMaximize,
          maximizeFlag: pro.maximized,
          showCaption: pro.showCaption,
          integratedFlag: pro.integratedFlag
        });

        pro.$core = pro.renderer.renderContainer();

        // The component is locked so set the needsRedrawFlag and return
        if(pro.lockedFlag){
          pro.needsRedrawFlag = true;
          return;
        }

        // This calls the render core function on the CHILD class of COMPONENT not
        // the renderer.
        if(pro.error.state === true) {
          pro.renderer.showErrorMessage (pro.error.message);
        }
        else {
          pro.renderer.hideErrorMessage();
          pro.renderCore();
        }
        if (pro.firstRender) {
          self.trigger("firstRender");
        }
        self.trigger("render");
        pro.firstRender = false;
      },

      validate: function () {
        // TODO validate component level stuff
        var errorCodes = pro.getErrorCodes ();

        if(errorCodes.length > 0) {
          var errorMessages = [];
          for(var i = 0; i < errorCodes.length; i++) {
            errorMessages.push({
              msg: errorUtils.getError(errorCodes[i]),
              type: 'validate'
            });
          }
          pro.showError(errorMessages);
        } else {
         pro.hideError ('validate');
       }
     },

      getErrorCodes: function () {
        return [];
      },

      handleError: function (_msg, type, source) {
        if (type === 'warn') {
          pro.handleWarning(_msg);
          return;
        }
        var errMsg = pro.error.message;
        errMsg.push({
          type: source,
          msg: _msg
        });
        pro.showError (errMsg);
      },

      showError: function (_msg) {
        pro.error.state = true;
        pro.error.message.concat (_msg);
      },

      hideError: function (type) {        
        var newArr = [];
        for(var i=-1; ++i<pro.error.message.length;) {
          if(pro.error.message[i].type != type) {
            newArr.push (pro.error.message[i]);
          }  
        }
        pro.error.message = newArr;
        pro.error.state = !!newArr.length;
      },

      resize: function (width, height) {
        self.trigger("beforeResize");
        pro.renderer.resizeContainer();
        var coreWidth = pro.$core.width(), coreHeight = pro.$core.height();
        
        // The component is locked, so return, don't resize core because core may not exist.
        pro.resizeCore(coreWidth, coreHeight);
        if(pro.lockedFlag || pro.error.state ){
          return;
        }
        pro.resizeCore(coreWidth, coreHeight);
        self.trigger("resize");
      },
      convertToObject: function (_source) {
        var source = _source ? true : false;

        if (pro.preSerialize) {
          pro.preSerialize();
        }
        return {
          props: pro.pb.getRootObject(),
          data: self.ds.getRawData(),
          type: raw.className,
          source: source
        };
      },

      buildFromObject: function (cObj) {
        var isEventSubscribed = !!_.where(cObj.props.events, {"type": "itemClick"}).length;
        if(isEventSubscribed) {
          self.isEventSubscribed = true;
        }
        pro.pb.setRootObject(cObj.props);
        self.ds.setRawData(cObj.data);

        pro.rawComponentFlag = true;
      },
      onRendererCreate: function() {
        if(self.isEventSubscribed && self._raw.className === "ChartComponent") {
          pro.renderer.itemClickSubscribed();
        }
        
        pro.renderer.linkToDashboard(pro.db);
      },
      _maximize: function (maximizeButton) {
        self.trigger("beforeMaximize");
        if(pro.lockedFlag || pro.error.state) {
          return;
        }

        oldContainer = pro.$container;
        pro.maximized = true;
        var modal = new ModalUtils({
          core: pro.db._getModalDiv(),
          title: pro.pb.getValue('core.caption'),
          fullscreen: pro.getMediaHelper().mediaSelect({"sm+xs":true}, false),
          shown: function (modalBody) {
            pro.$container = modalBody;
            pro.redraw();
          },
          hidden: function () {
            pro.$container = oldContainer;
            pro.maximized = false;
            oldContainer = null;
            pro.redraw();
          }
        });
        self.trigger("maximize");
        self.trigger("componentMaximize");
      },

      handleComponentEvent: function (name, params, index) {
        // TODO: check for local events. Inside the javascript
        var events = pro.pb.getObjectAtPath("events"),
            i=0;

        if(index !== undefined) {
          
          var noItemClickEvents = _.reject(events, function(e) { return e.type === 'itemClick'; });
          var currentItemClick = _.findWhere(events, function(e, i) { return ( e.type === 'itemClick' && index === i ); });
          noItemClickEvents.push(currentItemClick);
          events = noItemClickEvents;
        }

        for (i = 0; i < events.length; i++) {
          var ev = events[i];
          // First, pluck the "id" key from affected components to get a list of ids that are affected
          // Then, for each of the ids, pass it to db.pro.getComponentByID and return this
          // ultimately, it'll return a list of component objects
          var affectedComponents = _.map(_.pluck(ev.affectedComponents, 'id'), pro.db.pro.getComponentByID);
          _.each(affectedComponents, function (val) { 
            val.lock();
           });

          // The postback is an object describing the interesting portion of the dashboard.
          var postback = {'components': {}};
          for(i = 0; i < affectedComponents.length; i++) {
            var cobj = affectedComponents[i];
            var source = (cobj === self) ? true : false;
            postback['components'][cobj.getID()] = cobj.pro.convertToObject(source);
          }
          if(!(_.findWhere(affectedComponents, function(c) { return c === self; }))) {
            postback['components'][self.getID()] = self.pro.convertToObject(true);
          }

          var rfAjax = new AjaxWrapper();
          rfAjax.ajax({
            type: "POST",
            url: ev.url,
            renderer: pro.renderer,
            db: pro.db,
            data: {
              postback: JSON.stringify(postback),
              params: JSON.stringify(params),
              context: ev.context
            },
            success: function(data) {
              if(_.isString(data)) {
                data = JSON.parse(data);
              }
              if(data.patches) {
                for (var key in data.patches) {
                  if(data.patches.hasOwnProperty(key)) {
                    var cobj = pro.db.pro.getComponentByID(key);
                    cobj.pro.applyPatches (data.patches[key]);
                  }
                }
              }

              _.each(affectedComponents, function (val) {
                if(val.pro.lockedFlag) {
                  val.unlock();
                }
              });
            }
          });
        }
      },

      linkToDashboard: function (db) {
        pro.db = db;
      },

      dispose: function () {
        if(pro.renderer) {
          pro.renderer.dispose ();
        }
      },

      getMediaHelper: function () {
        if(pro.db) {
          return pro.db.pro.getMediaHelper();
        }
        return new MediaHelper ();
      }
    };

    var handleMaximize = function () {
      self.pro._maximize (this);
    };

    var construct = function () {
      self.ds = new DataSource();
    };

    var resizeWatcherLocal = function () {
      ResizeWatcher.register(pro.$container, currentWidth, function () {
        pro.resize(pro.$container.width(), pro.$container.height());
      });
      ResizeWatcher.checkResize();
    };

    var showAsModal = function() {

      // Don't show modal if its a mobile
      // if(Modernizr.touch && pro.getMediaHelper().getCurrentMedia() === 'xs'){
      //   return;
      // }

      pro.showCaption = false  ;
      componentModal = new ModalUtils({
        core: pro.db._getModalDiv(),
        title: pro.pb.getValue('core.caption'),
        shown: function (modalBody) {
          pro.$container = modalBody;
          pro.integratedFlag = true;
          pro.redraw();
        },
        hidden: function () {
          pro.$container = null;
          componentModal.destroy();
        }
      });
    };



    raw._registerClassName("Component");
    raw._registerPublic(base, Public);
    raw._registerProtected(_bp, Protected);

    construct();
  }

  return Component;
});
