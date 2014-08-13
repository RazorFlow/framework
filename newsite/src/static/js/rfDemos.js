(function(window) {
    var demos = {},
        demosMeta = {},
        current_demo = '',
        db = null,
        device = 'web',
        desktop = true,
        wasMobile = false;
        wasDesktop = true;

    window.__disableSimpleDashboards = true;

    // Creates a panel from a div with nested ULs
    function panellify ($node) {
        $node.find("li span.title").on("click", function() {
            var list = $(this).parent().find("ul");
            var collapsed = $(this).hasClass("collapsed");

            if(!collapsed) {
                list.slideUp();
                $(this).addClass("collapsed");
            } else {
                list.slideDown();
                $(this).removeClass("collapsed");
            }
        });
    }

    // Creates mutually exclusive option buttons from a div
    function optify ($node, cb) {
        var $marker = $node.find('.opt-marker');
        $marker.width($node.find('li:first').outerWidth() - 20);
        var left = $node.find('li:first').position().left + 10;
        $marker.css('left',  left - 4);

        $node.find('li').on('click', function() {
            var thisNode = $(this);
            $node.find('li.selected').removeClass('selected');
            $(this).addClass('selected');
            var left = $(this).position().left + 10;
            $marker.animate({'left': left - 4, 'width': $(this).outerWidth() - 20});
            if(cb) {
                cb(thisNode);
            }
        });
    }

    // Builds the panel HTML from the demos meta info
    function buildPanel ($node) {
        var $main = $('<ul/>').addClass('rf-accordian');
        if(rfDemos) {
            for(var i=-1; ++i<rfDemos.length;) {
                var items = rfDemos[i].demos;
                var $li = $('<li/>');
                $li.append($('<span>').addClass('title').text(rfDemos[i].title));
                var $sub = $('<ul/>');
                for(var j=-1; ++j<items.length;) {
                    var $subLi = $('<li/>');
                    $subLi.text(items[j].title);
                    $subLi.attr('data-id', items[j].id);
                    $sub.append($subLi);
                    $subLi.on('click', function() {
                        $node.find('li.selected').removeClass('selected');
                        $(this).addClass('selected');
                        var id = $(this).data('id');
                        loadDemo(id);
                        current_demo = id;
                        window.location.hash = id;
                    });
                }
                $li.append($sub);
                $main.append($li);
            }
            $node.append($main);
        }
        $node.find('li:first > ul > li:first').addClass('selected');
    }

    // Loads the specified demo and executes it
    function loadDemo (demo_id) {
        desktop = $('body').width() >= 992;
        if(!desktop) {
            window.open('/features/standalone/#' + demo_id);
            return;
        }
        if(db) {
            db.pro.dispose();
        }
        var canvas = $('db-canvas').remove(),
            parent = canvas.parent();

        canvas.remove();
        parent.append($('<div/>').attr('id', 'db-canvas').addClass("rf rf-lg"));
        demos[demo_id]();

        _.defer(function() {
            db = window.rf.globals.dbRegistry.getDefaultDashboard();

            if(db) {
                db.embedTo('db-canvas');
            } else {
                db = null
            }    
        });

        $('.code  > h3').text(demos[demo_id].title);
        $('.code  > p').text(demos[demo_id].desc);
        $('.code-div').empty();
        var lang = $('#lang-selector .selected').attr('id') === 'js' ? 'jsContent' : 'phpContent';
        loadCode({
            value: demosMeta[demo_id][lang],
            mode: 'javascript',
            theme: 'rftheme',
            lineNumbers: true,
            readOnly: true
        });
        var desc = _.map(demosMeta[demo_id].desc.split('\n'), function(item) {return '<p>' + item + '</p>';}).join('');
        $('#db-desc .heading').text (demosMeta[demo_id].title);
        $('#db-desc .desc').empty();
        $('#db-desc .desc').append ($(desc));
        $(".documentation-button a").attr("href", demosMeta[demo_id].doc);
    }

    // Creates a codemirror instance and renders it
    function loadCode (options) {
        var cm = CodeMirror($('.code-div')[0], options);
        cm.setSize('100%', '500px');
    }

    // Panel option selection
    function panel_select (id) {
        $('.rf-accordian li.selected').removeClass('selected');
        $('.rf-accordian li[data-id=' + id + ']').addClass('selected');
    }

    // Code for the expand/collapse button
    function standaloneButton () {
        $('.standalone-button a').on('click', function() {
            if($(this).hasClass('open')) {
                $(this).removeClass('open');
                $('#main-container').removeClass('col-md-12').addClass('col-md-9');
                $('.rf-panel').show();
                $(this).text('View full width');
            } else {
                $('#main-container').removeClass('col-md-9').addClass('col-md-12');
                $('.rf-panel').hide();
                $(this).addClass('open');
                $(this).text('View in normal mode');
            }
        });
    }

    // Handler for the device change (Web/Mobile)
    function changeDevice () {
        if(device === 'web') {
            $('#db-chrome').removeClass('mobile');
            $('#db-chrome').addClass('web');
        } else {
            $('#db-chrome').addClass('mobile');
            $('#db-chrome').removeClass('web');
        }
            
    }

    // Main function
    $(function() {
        desktop = $('body').width() >= 992;
        buildPanel($(".rf-panel .rfsidepanel"));
        panellify($(".rf-panel .rfsidepanel"));
        demos = rfDemoCode;

        for(var i=-1; ++i<rfDemos.length;) {
            for(var j=-1; ++j<rfDemos[i].demos.length;) {
                demosMeta[rfDemos[i].demos[j].id] = rfDemos[i].demos[j];
            }
        }
        current_demo = $('.rf-accordian > li:first > ul > li:first').data('id');

            
        var hash = window.location.hash.replace('#', '');
        if(hash && demos[hash]) {
            current_demo = hash;
        }

        panel_select(current_demo);

        optify($('.demo-bar .rf-optgroup'), function($node) {
            var id = $node.attr('id');

            if(id === 'web') {
                device = 'web';
            } else if(id === 'mobile') {
                device = 'mobile'
            }

            changeDevice();
        });
        optify($('.codebox .rf-optgroup'), function($node) {
            var id = $node.attr('id'),
                content, mode;
            if(id === 'js') {
                content = demosMeta[current_demo].jsContent;
                mode = 'javascript';
            } else if(id === 'php') {
                content = demosMeta[current_demo].phpContent;
                mode = 'application/x-httpd-php';
            }
            $('.code-div').empty();
            loadCode({
                value: content,
                mode: mode,
                theme: 'rftheme',
                lineNumbers: true,
                readOnly: true
            });
        });
        standaloneButton();
        if(desktop) {
            loadDemo(current_demo);
            
            // $(".rfsidepanel").affix({
            //     offset: {
            //         top: 220
            //     }
            // });
        } else {
            $('#main-container').hide();
        }
        $(window).on('resize', function() {
            if($('body').width() >= 992) {
                if(desktop === false) {
                    $('#main-container').show();
                    loadDemo(current_demo);
                    $(".rfsidepanel").affix({
                        offset: {
                            top: 220
                        }
                    });
                }
                desktop = true;
            } else {
                if(desktop === true) {
                    db.pro.dispose();
                    $(window).off('.affix');
                    $('.rfsidepanel').removeClass("affix affix-top affix-bottom")
                                    .removeData("bs.affix");
                    $('#main-container').hide();
                }
                desktop = false;
                
            }
        });
    });

})(window);