define([
  "core/rfclass",
  "generated/templates",
  "constants/componentconstants",
  "utils/media",
  "utils/iconutils",
  "graphics/rfkpi",
  "utils/positionutils",
  "graphics/minikpi",
  "kendo/kendo.notification",
  "utils/numberformatter",
  'vendor/lodash',
  'vendor/Modernizr',
  'vendor/spin'
], function (RFClass, JST, ComponentConstants, MediaUtils, iconUtils, RFKPI, positionUtils, MiniKPI, kNotification, NumberFormatter, _, Modernizr, Spinner) {
  var xPadding = ComponentConstants.component.xPadding;
  var yPadding = ComponentConstants.component.yPadding;
  function ComponentRenderer() {
    RFClass.call(this);

    var self = this,
        base = {},
        Public,
        raw = self._raw,
        Protected,
        pro = self.pro,
        _bp = {},
        profiles = ComponentConstants;

    var props = {}, boundItems = [], createdItems = [];
    
    Public = {
      /**
       * This is a SNAPSHOT of the propertybase that is being rendered.
       */
      props: null,
      $container: null,
      $core: null,
      $caption: null,
      $wrapper: null,
      $lockDisplay: null,
      $footer: null,
      $header: null,
      $errorMessage: null,
      $errorMessageText: null,
      $loadingTextDiv: null,
      $spinnerDiv: null,
      locked: false,
      error: false,
      db: null,
      handleMaximize: false,
      maximizeFlag: false,
      showCaption: true,
      integratedFlag: false,
      kpiContainers: [],
      kpiobjs: [],
      overriddenDimensions: null,
      numKPIs: null,
      init: function (config) {
        overriddenDimensions = config.overriddenDimensions;
        self.props = config.props;
        self.$container = config.container;
        self.locked = config.locked;
        self.error = config.error;
        self.handleMaximize = config.handleMaximize;
        self.maximizeFlag = config.maximizeFlag;
        self.showCaption = config.showCaption;
        self.integratedFlag = config.integratedFlag;
      },
      renderContainer: function () {
        var formComponent = raw.className === 'FormRenderer' ? true : false,
            mobile = false;
        if(raw.className === 'KPIRenderer') {
          self.$container.html(JST.component_chromeless({
            captionText: self.props.core.caption
          }));  
          self.$caption = self.$container.find(".rfChromelessTop");
        } else {
          if (rf.globals.media === "xs" && Modernizr.touch) {
            mobile = true;
          } 
          self.$container.html(JST.component_wrapper({
            captionText: self.props.core.caption,
            showCaption: self.showCaption,
            error: self.error,
            lock: self.locked,
            formComponent: formComponent,
            mobile: mobile
          }));
          self.$caption = self.$container.find(".rfCaption");
          var icon = self.props.core.icon,
              iconProps = JSON.parse(self.props.core.iconprops);
          if(icon) {
            self.$caption.find('.rfCaptionIconContainer').append(iconUtils.getHTMLForIcon(icon, iconProps));
          }
          if (self.showCaption) {
            // iconUtils.draw(self.$container, 12, 12);
          }
        }

        self.$wrapper = self.$container.find(".rfWrapper");
        self.$footer = self.$container.find(".rfFooter");
        self.$header = self.$container.find(".rfHeader");
        if (self.maximizeFlag) {
          self.$core = self.$container;
        } else {
          self.$core = self.$container.find(".rfCore");
        }
        self.$lockDisplay = self.$container.find(".rfLock");
        self.$caption.find ('.rfMaximizeIcon').click (self.handleMaximize);

        // Find the error display
        self.$errorMessage = self.$container.find(".rfError");

        if (self.locked) {
          self.showLoadingScreen();
        }
        else {
          self.hideLoadingScreen();
        }

        if (self.props.kpis && (self.props.kpis).length !== 0) {
          self.showComponentKPI();
        }

        if(self.props.core.isHidden) {
          // self.$container.hide();
        }
        if(self.integratedFlag) {
          self.$container.find(".rfWrapper").addClass("rfIntegrated");
        }

        return self.$core;
      },
      resizeContainer: function () {
        if(_.keys(self.props.kpis).length && raw.className !== 'KPIRenderer' && raw.className !== 'KPIGroupRenderer' && raw.className !== 'KPITableRenderer') {
          var media = rf.globals.dbRegistry.getCurrentDashboard().pro.media.getCurrentMedia();
          var componentWidth = (media !== 'xs' ? self.props.core.location.w : overriddenDimensions['xs'].w),
              componentHeight = (media !== 'xs' ? self.props.core.location.h : overriddenDimensions['xs'].h),
              numPossibleKPIs = componentWidth / 2;
          var kpiContainers = self.kpiContainers,
              kpiobjs = self.kpiobjs,
              kpis = self.props.kpis,
              w = self.$container.width(),
              h = positionUtils.unitsToPixels(media === 'xs' ? 2 : 1, (self.$container.height() / componentHeight) * 12),
              numKPIs = self.numKPIs;

          var kpiW = Math.floor(w / (media === 'xs' ? 2 : numPossibleKPIs)) - 8,
              kpiH = h;
          for(var key in kpis) {
            if(kpis.hasOwnProperty(key)) {
              kpiobjs[key].resize(kpiW, kpiH);
              kpiContainers[key].css({
                  width: kpiW,
                  height: kpiH
              });
            }
          }
        }
        self.adjustHeights();
      },

      showComponentKPI: function () {
        if(raw.className === 'KPIRenderer' || raw.className === 'KPIGroupRenderer' || raw.className === 'KPITableRenderer') {
          return;
        }
        var componentWidth = self.props.core.location.w,
            numPossibleKPIs = componentWidth / 2,
            kpis = self.props.kpis,
            numKPIsNeeded = _.keys(kpis).length,
            numKPIs = numPossibleKPIs > numKPIsNeeded ? numKPIsNeeded : numPossibleKPIs,
            kpiContainers = self.kpiContainers,
            kpiobjs = self.kpiobjs;
          self.numKPIs = numKPIs;
          self.$footer.append(JST.kpigroup({
              numKPIs: numKPIs,
              keys: _.keys(kpis)
          }));

          for(var key in kpis) {
            if(kpis.hasOwnProperty(key)) {
              var kpi = kpis[key],
                  numberFormatter = new NumberFormatter();
              kpi.dataType = 'number';
              numberFormatter.setConfig(kpi);
              kpiContainers[key] = self.$footer.find('.rfMiniKPIContainer#' + key);
              kpiobjs[key] = new MiniKPI();
              kpiobjs[key].config({
                  caption: kpi.caption,
                  value: numberFormatter.formatValue(kpi.value),
                  captionColor: kpi.captioncolor,
                  valueColor: kpi.valuecolor,
                  icon: kpi.icon,
                  iconProps: JSON.parse(kpi.iconprops),
                  captionFontScale: 0.4,
                  valueFontScale: 0.72
              });
              kpiobjs[key].render(kpiContainers[key]);
            }
          }
      },

      adjustHeights: function () {
        var visibleDiv = self.$core,  
            wrapperHeight = self.$container.height() - yPadding,
            wrapperWidth = self.$container.width() - xPadding;

        if (self.locked) {
          visibleDiv = self.$lockDisplay;
        }
        else if (self.error) {
          visibleDiv = self.$errorMessage;
        }
        self.$wrapper.width(self.$container.width() - xPadding);
        self.$wrapper.height(wrapperHeight);
        self.$wrapper.css({
          'margin-left': xPadding / 2,
          'margin-top': yPadding / 2
        });
        if (Modernizr.touch) {
          self.$wrapper.css({
            'margin-left': "9px"
          });
        }
        if(!visibleDiv.parent().hasClass('rfWrapper')) {
          wrapperHeight += yPadding;
        }
        if (self.error && !self.locked) {
          wrapperHeight -= yPadding;
          visibleDiv.width(wrapperWidth - xPadding);
        }
        visibleDiv.height(wrapperHeight - self.$caption.height() -self.$footer.height() - self.$header.height());
      },
      dispose: function () {
        var i;
        self.pro.unbindAll();
        for (i = 0; i < boundItems.length; i++) {
          boundItems[i].unbind();
        }
        boundItems = [];

        for (i = 0; i < createdItems.length; i++) {
          createdItems[i].remove();
        }
        createdItems = [];
        self.$container = null;
        self.$core = null;
        self.$caption = null;
        self.$wrapper = null;
        self.$lockDisplay = null;
        self.$footer = null;
        self.$header = null;
        self.$errorMessageText = null;
        self.$errorMessage = null;
        self.$loadingTextDiv = null;
        self.$spinnerDiv = null;
      },
      managedBind: function (jqDiv, eventName, callback) {
        jqDiv.bind(eventName, callback);
        boundItems.push(jqDiv);
      },
      /**
       * Instead of:
       * $("<div/>", {id: 'foo'});
       * use self.managedCreate("<div/>", {id: 'foo'})
       *
       * @param baseHTML
       * @param params
       */
      managedCreate: function (baseHTML, params) {
        var item = $(baseHTML, params);
        createdItems.push(item);
        return item;
      },
      showLoadingScreen: function () {
        self.locked = true;
        self.$core.hide();
        self.$footer.hide();
        self.$lockDisplay.show();
        if(self.$caption) {
          self.$caption.hide();
        }
        self.adjustSpinnerWidth();
        self.adjustHeights();
      },

      adjustSpinnerWidth: function () {
        var opts = profiles.spinner.options,
            loadingText = "Loading",
            spinner = new Spinner(opts).spin(),
            media = self.db.pro.media.getCurrentMedia();

        self.$loadingTextDiv = self.$lockDisplay.find('.rfLoadingText');
        self.$spinnerDiv = self.$lockDisplay.find('.rfSpinner');
        self.$loadingTextDiv.text(loadingText);
        self.$spinnerDiv.append(spinner.el);
        self.$lockDisplay.addClass('loading');
      },

      hideLoadingScreen: function () {
        self.locked = false;
        self.$lockDisplay.hide();
        self.$lockDisplay.removeClass('loading');
        if(self.$caption) {
          self.$caption.show();
        }
        self.$core.show();
        self.$footer.show();
      },

      showErrorMessage: function (message) {
        self.$core.hide();
        self.$errorMessage.show();
        self.$errorMessageText = self.$errorMessage.find('.rfErrorMessageText');
        self.$errorMessageText.html(JST.error_list({
          "message" : message,
          media: self.db.pro.media.getCurrentMedia()
        }));
      },

      hideErrorMessage: function () {
        self.$errorMessage.hide();
        self.$core.show();
      },

      getDimensionProperties: function () {
        var location = self.props.core.location;

        var potraitMode = (location.w > location.h) ? false : true;
        return {
          w: location.w,
          h: location.h,
          portrait: potraitMode
        };
      },
      linkToDashboard: function(db) {
        self.db = db;
      },
      showErrorNotification: function(errors) {
        var $notification = $("body").find(".rfNotification");
        var errorTemplate = JST.notification_errors({
          errors: errors
        });

        $notification.append(errorTemplate);
        $notification.kendoNotification({
          allowHideAfter: 2000,
           position: {
            stacking: 'down',
            top: 30,
            right: 30
           },
          handleClick: function() {
            self.db.pro.logger.show();
          }
        }).data('kendoNotification');

        $notification.data('kendoNotification').show(errorTemplate, "error");
      }
    };

    Protected = {

    };

    raw._registerClassName("ComponentRenderer");
    raw._registerPublic(base, Public);
    raw._registerProtected(_bp, Protected);
  }

  return ComponentRenderer;
});
