define(["kendo/kendo.window", "kendo/kendo.tabstrip", 'generated/templates', 'vendor/lodash'], function(kendoWindow, kendoTabStrip ,JST, _) {
    var logs = [];
    var $window = $(JST.logs({}));
    var filter = {
        log: true,
        warn: true,
        error: true,
        server: true,
        client: true
    };
    var exceptionFormatter = function(item) {
        return $("<li/>").text(item.data.exception.stack);
    };
    var RFLogger = {
        
        debugMode: true,

        log: function(msg, data) {
            data = data || {};
            var timestamp = new Date();
            var _data = {
                type: 'log',
                source: 'client',
                timestamp: timestamp
            };
            logs.push({
                msg: msg,
                data: _.extend(_data, data)
            });
            // console.log(msg);
            return logs.length - 1;
        },

        error: function(msg, exception, data) {
            data = data || {};
            return RFLogger.log(msg, _.extend({
                type: 'error',
                extraInfo: !!exception ? true : false,
                infoFormatter: exceptionFormatter,
                exception: exception
            }, data));
        },

        init: function() {
            _.defer(function() {
                // console.log('Initializing logger');
                $window.kendoWindow({
                  width: 600,
                  height: 500,
                  title: "Razorflow Dev Tools",
                  visible: false
                }).data('kendoWindow');
                $window.find('#tabstrip').kendoTabStrip();
                $window.find('.toolbar input').on('change', function() {
                    var id = $(this).attr('id'),
                        checked = $(this).is(':checked');
                    if(id === 'all') {
                        if(checked) {
                            $window.find('.toolbar input').prop('checked', true);    
                        }
                    } else {
                        if(checked) {
                            var allChecked = true;
                            $window.find('.toolbar input:not(#all)').each(function(){allChecked = allChecked && $(this).is(':checked');});
                            if(allChecked) {
                                $window.find('.toolbar input#all').prop('checked', true);
                            }
                        } else {
                            $window.find('.toolbar input#all').prop('checked', false);
                        }
                    }
                    $window.find('.toolbar input:not(#all)').each(function() {
                        filter[$(this).attr('id')] = $(this).is(':checked');
                    });
                    RFLogger.renderLogs();
                });
            });
        },

        renderLogs: function(num) {
            var $parent = $window.find('.rfLogs ul'),
                $item;
            $parent.empty();
            var filteredLogs = _.filter(logs, function(item) {
                return filter[item.data.type] && filter[item.data.source];
            });
            for(var i=-1; ++i<filteredLogs.length;) {
                $item = $('<li/>');
                $item.append($('<span/>').text('[' + filteredLogs[i].data.source + '] ' + filteredLogs[i].msg));
                $item.addClass('rfLogItem ' + filteredLogs[i].data.type);
                $item.attr('title', filteredLogs[i].data.timestamp);
                $item.attr('id', i);
                $parent.append($item);
                if(filteredLogs[i].data.extraInfo) {
                    var $infoItem = filteredLogs[i].data.infoFormatter(filteredLogs[i]);
                    $parent.append($infoItem);
                    $infoItem.data('height', $infoItem.height());
                    $infoItem.hide();
                    $infoItem.addClass('extraInfo');
                    $item.addClass('collapsable');
                    $item.append($('<span/>').addClass('arrow right-arrow'));
                    $item.attr('data-state', 'closed');
                    $infoItem.attr('id', i + '-info');
                }
            }
            $parent.find('.collapsable').on('click', function() {
                var id = $(this).attr('id'),
                    state = $(this).attr('data-state'),
                    logContainer = $window.find('.rfLogs'),
                    currentScrollTop = logContainer.scrollTop();
                if(state === 'closed') {
                    $parent.find('#' + id + '-info').slideDown();
                    $(this).attr('data-state', 'open');
                    $(this).find('.arrow').removeClass('right-arrow').addClass('down-arrow');
                    $window.find('.rfLogs').animate({scrollTop: currentScrollTop + $parent.find('#' + id + '-info').data('height')});
                } else {
                    $parent.find('#' + id + '-info').slideUp();
                    $(this).find('.arrow').removeClass('down-arrow').addClass('right-arrow');
                    $(this).attr('data-state', 'closed');
                }
                
            });
            if(num) {
                $item = $parent.find('#' + num)[0];
                $item.scrollIntoView();
                $($item).addClass('shine').on('click.shine', function() {
                    $(this).removeClass('shine').off('click.shine');
                });

            }
                
        },

        showLogs: function(num) {
            $window.data('kendoWindow').open();
            RFLogger.renderLogs(num);
        }
    };

    return RFLogger;
});