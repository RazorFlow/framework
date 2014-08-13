(function(window) {
    $(function() {
        var demoID = window.location.hash.slice(1);
        
        demo = rfDemoCode[demoID];

        demo();
        
    });
})(window);