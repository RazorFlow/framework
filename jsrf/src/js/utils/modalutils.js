define(["generated/templates", "utils/iconutils", "kendo/kendo.window"], function (JST, iconUtils, kWindow) {

  var RFModal = function (_options) {
    var self = this,
        options = _options || {},
        title = options.title || '',
        $core = options.core || $('body'),
        modalID = options.id ? options.id : '',
        modal = $(JST.rfmodal({

        })),
        screenWidth, screenHeight,
        modalWidth, modalHeight,
        left, top,
        animations, initObjs, animIndex = 0,
        modalWindow, modalBody,
        modalObj;

    $core.append(modal);
    var calculateDimensions = function () {
      screenWidth = $(window).width();
      screenHeight = $(window).height();
      if (!options.fullscreen) {
        modalWidth = options.width || "60%";

        modalHeight = options.height || "60%";
      } else {
        var min = _.min([screenWidth, screenHeight]);

        modalWidth = min;
        modalHeight = min;
      }
    };
    calculateDimensions ();
    modalObj = modal.kendoWindow({
      modal: true,
      width: modalWidth,
      height: modalHeight,
      title: options.title,
      open: function () {
        modal.data("kendoWindow").center();
      },
      activate: function () {
        if (options.shown) {
          options.shown (modal);
          modal.focus();
          $(".rf-icon-maximize").hide();
        }
      },
      close: function () {
        if (options.hidden) {
          options.hidden ();
          $(".rf-icon-maximize").show();
        }
      },
      resizable: true
    }).data("kendoWindow");

    modalObj.center();

    self.destroy = function() {
        modal.data('kendoWindow').destroy();
    };

    // iconUtils.draw(modal, 16, 16);
    // self.body = modal.find('.rfModalBody');
    // self.header = modal.find('.rfModalHeader');
    // self.footer = modal.find('.rfModalFooter');


    // var redraw = function () {

    //   calculateDimensions();

    //   animations = [
    //     'drop-down',
    //     'pull-up',
    //     'peek-left',
    //     'peek-right'
    //   ];

    //   initObjs = [
    //     {
    //       left: (options.fullscreen) ? 0 : left,
    //       top: -((options.fullscreen) ? screenHeight : modalHeight),
    //       width: (options.fullscreen) ? screenWidth : modalWidth,
    //       height: (options.fullscreen) ? screenHeight : modalHeight
    //     },
    //     {
    //       left: (options.fullscreen) ? 0 : left,
    //       top: ((options.fullscreen) ? screenHeight : modalHeight),
    //       width: (options.fullscreen) ? screenWidth : modalWidth,
    //       height: (options.fullscreen) ? screenHeight : modalHeight
    //     },
    //     {
    //       left: -((options.fullscreen) ? screenWidth : modalWidth),
    //       top: (options.fullscreen) ? 0 : top,
    //       width: (options.fullscreen) ? screenWidth : modalWidth,
    //       height: (options.fullscreen) ? screenHeight : modalHeight
    //     },
    //     {
    //       left: ((options.fullscreen) ? screenWidth : modalWidth),
    //       top: (options.fullscreen) ? 0 : top,
    //       width: (options.fullscreen) ? screenWidth : modalWidth,
    //       height: (options.fullscreen) ? screenHeight : modalHeight
    //     }

    //   ];

    //   $core.append(modal);

    //   modal.show();

    //   modalWindow = modal.find('.rfModalWindow');

    //   modal.find('.cover').on('click', function () {
    //     self.close();
    //   });

    //   $('body').bind('keydown.modal', function (ev) {
    //     if (ev.which === 27) {
    //       self.close();
    //     }
    //   });

    //   modalBody = modal.find('.rfModalBody');

    //   if (options.animate) {

    //     var initPosition = initObjs[_.indexOf(animations, options.animate)];

    //     if (typeof initPosition === 'undefined') {
    //       console.error('no such animation function [ ' + options.animate + ' ]');
    //       modal.remove();
    //       return;
    //     }

    //     modalWindow.css(initPosition);

    //     modalWindow.animate({
    //       left: (options.fullscreen) ? (screenWidth / 2 - modalWidth / 2) : left,
    //       top: (options.fullscreen) ? (screenHeight / 2 - modalHeight / 2) : top,
    //       width: modalWidth,
    //       height: modalHeight
    //     }, 500);
    //   } else {

    //     modalWindow.css({
    //       left: left,
    //       top: top,
    //       width: modalWidth,
    //       height: modalHeight
    //     });

    //   }

    //   if (options.html) {
    //     self.body.html(options.html);
    //   }


    //   if (options.buttons) {
    //     for (var i = 0; i < options.buttons.length; i++) {
    //       (function (i) {
    //         var button = options.buttons[i];
    //         var caption = button.caption || 'button';
    //         var cls = button.cls || '';

    //         var $btn = $('<button/>').text(caption).addClass(cls);

    //         self.footer.append($btn);

    //         if (button.events) {
    //           var events = _.keys(button.events);
    //           for (var j = 0; j < events.length; j++) {
    //             var key = events[j];
    //             $btn.on(key, button.events[key]);
    //           }
    //         }
    //       })(i);
    //     }
    //   }

    //   modalBody.width(modalWidth);
    //   modalBody.height(modalHeight - modal.find('.rfModalHeader').height() - modal.find('.rfModalFooter').height());
    //   // debugger
    // };


    // var reposition = function () {

    //   calculateDimensions();

    //   modalWindow.css({
    //     left: left,
    //     top: top,
    //     width: modalWidth,
    //     height: modalHeight
    //   });

    //   modalWindow.hide();
    //   modalBody.width(modalWidth);
    //   modalBody.height(modalHeight - modal.find('.rfModalHeader').height() - modal.find('.rfModalFooter').height());
    //   modalWindow.show();
    // };

    // redraw();

    // if (options.shown) {
    //   options.shown(modalBody);
    // }

    // modal.find('.closeButton').on('click', function () {
    //   modal.hide();
    //   modal.remove();

    //   $(window).off('resize.modal');

    //   if (options.hidden) {
    //     options.hidden();
    //   }
    // });

    // self.close = function () {
    //   modal.hide();
    //   modal.remove();
    //   $('body').unbind('keydown.modal');

    //   $(window).off('resize.modal');

    //   if (options.hidden) {
    //     options.hidden();
    //   }
    // };

    // var redrawDebounced = _.debounce(function () {
    //   reposition();
    // }, 150);


    // $(window).on('resize.modal', function () {
    //   var h = $(window).height(), w = $(window).width();
    //   options.animate = '';
    //   if (h !== screenHeight || w !== screenWidth) {
    //     redrawDebounced();
    //   }
    // });
    // 
  };

  return RFModal;
});
