define([
  "core/rfclass",
  "generated/templates",
  "utils/positionutils",
  "utils/layoutmanager",
  "utils/media",
  "helpers/mediahelper",
  "constants/componentconstants",
  "utils/browserutils",
  "utils/componentutils",
  'vendor/lodash'
  // "helpers/logginghelper",
  // "themebuilder/main"
], function (RFClass, JST, positionUtils, LayoutManager, mediaUtils, MediaHelper, ComponentConstants, browserUtils, componentUtils, _) {

  function Dashboard(_id) {
    RFClass.call(this);

    rf.globals.dbRegistry.registerDashboard('default', this);

    var self = this,
        base = {},
        Public = {},
        raw = self._raw,
        title = "",
        Protected,
        pro = self.pro,
        _bp = {},
        id = _id || componentUtils.idGen();

    var components = [],
        componentContainers = [],
        $containerDiv,
        $coreDiv,
        $hiddenDiv,
        $ninjaDiv,
        automaticLayoutManagement = true,
        currentWidth = 0,
        resizeWatchDelay = ComponentConstants.dashboard.resizeDelay,
        newLocation = [],
        forceSmallScreenMode = false,
        forceBigScreenMode = false,
        isEmbedded = false,
        disableResizeWatcher = false,
        logs = null,
        logger = null,
        MINIKPI_MAX = 6;

    // Register this dashboard as soon as it is created
    rf.globals.dbRegistry.registerDashboard(id, this);

    Public = {
      setDashboardTitle: function (dashboardTitle) {
        title = dashboardTitle;
      },
      renderTo: function ($jqDiv) {
        var newMedia;
        rf.globals.dbRegistry.setCurrentDashboard(id);
        $containerDiv = $jqDiv;
        $containerDiv.css({
          'margin': '0 auto'
        });
        if(!browserUtils.isBrowserSupported()) {
          $containerDiv.html(JST.browser_error({}));
          return;
        }
        init();
        renderShell();
        newMedia = mediaUtils.calculateMedia($coreDiv.width());
        mediaUtils.applyMediaToNode($jqDiv, newMedia);
        pro.media.setMedia(newMedia);
        renderCore();
        currentWidth = $coreDiv.width();
        resize();
        resizeWatcher();
        pro.addServerLogButtonListener();
      },
      embedTo: function(divID, opts) {
        // TODO: Extract common functionality between renderTo and embedTo
        disableResizeWatcher = false;
        var $jqDiv = $('#' + divID),
            newMedia;

        isEmbedded = true;
        rf.globals.dbRegistry.setCurrentDashboard(id);
        opts = opts || {};
        forceBigScreenMode = !!opts.forceBigScreenMode;
        forceSmallScreenMode = !!opts.forceSmallScreenMode;
        $containerDiv = $jqDiv;
        if(!browserUtils.isBrowserSupported()) {
          $containerDiv.html(JST.browser_error({}));
          return;
        }
        pro.setEmbeddedWidthHeight();
        init();
        renderShell();
        newMedia = mediaUtils.calculateMedia($coreDiv.width());
        mediaUtils.applyMediaToNode($jqDiv, newMedia);
        pro.media.setMedia(newMedia);
        renderCore();
        currentWidth = $coreDiv.width();
        resize();
        resizeWatcher();
        pro.addServerLogButtonListener();
      },
      addComponent: function (component) {
        components.push(component);
        component.pro.linkToDashboard(self);
        self.trigger("componentAdd");
      },

      // TODO: Move these functions to pro
      /**
       * Creates a temporary div, appends it to the dashboard and returns the reference. Meant to be used as canaries
       */
      _makeTempDiv: function() {
        var $tempDiv = $('<div/>');
        $hiddenDiv.append($tempDiv);
        return $tempDiv;
      },
      /**
       * Returns the dashboards ninja div
       */
      _getNinjaDiv: function() {
        return $ninjaDiv;
      },
      /**
       * Returns the dashboards Modal div
       */
      _getModalDiv: function() {
        return $containerDiv.find('.rfDashboardModals');
      },
      /**
       * Removes a component from the dashboard
       * @param  {Component} c The component which needs to be removed from the dashboard
       */
      removeComponent: function(c) {
        var id = c.getID();
        _.remove(components, function(item) {return item.getID() === id;});
        self.trigger("componentRemove");
        redraw();
      },
      setWidth: function(_width) {
        pro.embeddedWidth = _width;

        if($containerDiv){
          $containerDiv.width(pro.embeddedWidth);
        }
      },
      setInterval: function(cb, delay) {
        var interval = setInterval(function () {
          if(!disableResizeWatcher) {
            cb();
          } else {
            clearInterval(interval);
          }
        }, delay);
      },
      setHeight: function(_height) {
        pro.embeddedHeight = _height;

        if($containerDiv){
          $containerDiv.height(pro.embeddedHeight);
        }
      },
      setMaxHeight: function(_height) {
        $containerDiv.css({
          'max-height': _height
        });
      }
    };

    Protected = {
      media: new MediaHelper(),

      embeddedWidth: null,

      embeddedHeight: null,

      logger: logger,

      $serverLogButton: null,

      isTabbed: false,

      getMediaHelper: function () {
        return pro.media;
      },

      getDashboardTitle: function () {
        return title;
      },

      getID: function () {
        return id;
      },

      setResizeWatcher: function () {
        if (disableResizeWatcher) {
          disableResizeWatcher = false;
          resizeWatcher();
        }
      },

      setLogs: function(request, logs) {
        pro.logger.append(request, logs);
      },

      _serializeComponents: function () {
        var obj = {
          components: []
        };
        for (var i = -1; ++i < components.length;) {
          var component = components[i];
          obj.components.push(component.pro._serializeComponent());
        }

        return obj;
      },
      _buildFromObject: function (dbObj) {
        var components = dbObj.components;

        for (var i = -1; ++i < components.length;) {
          var component = components[i];
          var cObj = createComponentByName(component.type);
          cObj.pro._buildFromObject(component);

          self.addComponent(cObj);
        }
      },
      getComponentByID: function (id) {
        return _.find(components, function (val) { return val.getID() === id;});
      },

      setEmbeddedWidthHeight: function() {

        if(pro.embeddedWidth){
          pro.$containerDiv.width(pro.embeddedWidth);
        }

        if(pro.embeddedHeight){
          pro.$containerDiv.height(pro.embeddedHeight);
        }
      },

      addServerLogButtonListener: function() {
        pro.$serverLogButton.on('click', function() {
          pro.logger.toggle();
        });
      },

      dispose: function () {
        disableResizeWatcher = true;
        // var componentLength = components.length;
        // while(componentLength--) {
        //   self.removeComponent(components[0]);
        // }
      },

      // Locks all the components in the dashboard.
      lock: function() {
        for(var i=0; i<components.length; i++) {
          components[i].lock();
        }
      }
    };

    var init = function () {
      self.trigger("dashboardOnInitialize");
      for (var i = 0; i < components.length; i++) {
        components[i].pro.init();
      }
    };

    var applyMedia = function () {
      var newMedia = mediaUtils.calculateMedia(currentWidth);
      var dbTarget = $containerDiv;
      if(forceSmallScreenMode) {
        newMedia = 'xs';
      } else if(forceBigScreenMode) {
        newMedia = 'lg';
      }
      if (newMedia !== pro.media.getCurrentMedia()) {
        mediaUtils.applyMediaToNode(dbTarget, newMedia);
        pro.media.setMedia(newMedia);
        redraw();
        return true;
      }
      return false;
    };

    var renderShell = function() {
      if(!isEmbedded) {
        $containerDiv.html(JST.dashboard_standalone({
          title: title
        }));
      } else {
        $containerDiv.html(JST.dashboard_embedded({
          tabbed: pro.isTabbed
        }));
      }

      $coreDiv = $containerDiv.find(".rfDashboardCore");
      $hiddenDiv = $containerDiv.find(".rfDashboardHidden");
      $ninjaDiv = $containerDiv.find(".rfDashboardNinja");
      pro.$serverLogButton = $containerDiv.find(".rfServerLogButton");
    };

    var renderCore = function() {
      var layoutManager = new LayoutManager();

      componentContainers = [];

      components = _.sortBy(components, function(component) {
          return component.pro.pb.getValue('core.index');
      });
      
      // Iterate over the containers
      for (var i = 0; i < components.length; i++) {
        if(!components[i].pro.pb.getValue('core.isHidden')) {
          var component = components[i];
          var componentDiv = $("<div/>", {
                'class': 'rfComponentContainer'
              }),location = component.pro.pb.getObjectAtPath('core.location'),
              cssObj = null,
              currentMedia = pro.media.getCurrentMedia(),
              kpis = component.pro.pb.getObjectAtPath('kpis'),
              numKPIs = _.keys(kpis).length,
              className = component._raw.className;
          /**
           * When the media size is xs or sm get the overriden dimensions for that particular component and apply them
           */
          if(currentMedia === 'xs' || currentMedia === 'sm') {
            location = _.cloneDeep(component.pro.overriddenDimensions[currentMedia]);
          }
          if(className !== 'KPIComponent' && className !== 'KPIGroupComponent' && className !== 'KPITableComponent') {
            if(currentMedia === 'xs' && _.keys(kpis).length) {
                var numPossibleKPIs = numKPIs < MINIKPI_MAX ? numKPIs : MINIKPI_MAX,
                    extraHeight = (numPossibleKPIs / 2) * 3;
                location.h += extraHeight;
            }
          } else if(className === 'KPITableComponent') {
            if(currentMedia === 'xs' && _.keys(kpis).length) {
              location.h = 4 + numKPIs;   
            }
          }
          if (!(_.isNumber(location.w) && !_.isNaN(location.w)) ||
              !(_.isNumber(location.h) && !_.isNaN(location.h)) ||
              location.h === 0 ||
              location.w === 0) {
            location.w = component.pro.overriddenDimensions[currentMedia].w;
            location.h = component.pro.overriddenDimensions[currentMedia].h;
          }
          /**
           * If automaticLayoutManagement is true, use Ameen's awesome layoutmanager to create the locations
           */
          if (automaticLayoutManagement) {
            var layout = layoutManager.findEmptySpot(location.w, location.h);
            location.x = layout.col;
            location.y = layout.row;
          }

          newLocation[i] = location;

          cssObj = {
            left: positionUtils.unitsToPcString(location.x),
            width: positionUtils.unitsToPcString(location.w)
          };
          componentDiv.css(cssObj);
          $coreDiv.append(componentDiv);

          // push the component into the comoponent conatiner array so it can be used later
          componentContainers.push(componentDiv);

          // Render the component
          component.pro.setTargetContainer(componentDiv);
          component.pro.render();
        }
          rf.hooks.trigger("_internalDashboardRendered", {
              db: self,
              coreDiv: $containerDiv
          });
      }
    };

    var render = function () {
      renderShell();
      renderCore();
    };

    var resizeWatcher = function () {
      if(!disableResizeWatcher) {
        var newWidth = $coreDiv.width();
        if (newWidth !== currentWidth) {
          currentWidth = newWidth;
          resize();
          currentWidth = $coreDiv.width();
        }
        _.defer(function () {
            _.delay(resizeWatcher, resizeWatchDelay);
        });
      }
    };

    var redraw = function () {
      // TODO: This is a temporary hack implmented to cleanup till charts get a dispose function
      $('.rfTooltip').remove();
      rf.globals.dbRegistry.setCurrentDashboard(id);
      render();
      resize();
    };

    var resize = function () {
      if(disableResizeWatcher) {
        return;
      }
      var dbWidth = $coreDiv.width(), maxHeight = 0, cssObj = {};

      // Check if there has been a new media applied, if then, don't
      // bother resizing.
      if (applyMedia()) {
        return;
      }

      for (var i = 0; i < components.length; i++) {
        if(!components[i].pro.pb.getValue('core.isHidden')) {
          var cobj = components[i],
              cContainer = componentContainers[i],
              location = newLocation[i];
          cssObj = {
            top: positionUtils.unitsToPixels(location.y, dbWidth),
            height: positionUtils.unitsToPixels(location.h, dbWidth)
          };
          cContainer.css(cssObj);
          cobj.pro.resize(cContainer.width(), cContainer.height());
          maxHeight = _.max([maxHeight, cssObj.top + cssObj.height]);
          $coreDiv.height(maxHeight);
        }
      }
      // ThemeBuilder.init();
    };

    var createComponentByName = function (name) {
    
    };

    raw._registerClassName("Dashboard");
    raw._registerPublic(base, Public);
    raw._registerProtected(_bp, Protected);

    
  }

  return Dashboard;
});
