define([
    "core/globals"
], function () {
    // This is the main entry point for evaluation version
    var evalNode = null;

    var makeNode = function (container) {
        if (evalNode && evalNode.remove()) {
            evalNode.remove();
        }
        evalNode = $("<div/>");
        evalNode.css ({
            'position':'relative' ,
            'margin-right': 'auto',
            'margin-left': 'auto',
            'max-width': 1000 + 100 + 50 + 4
        });
        evalNode.addClass("rf rfDashboardCore");
        container.append(evalNode);
        evalNode.html("Powered by RazorFlow Dashboard Framework evaluation version. <a href='http://www.razorflow.com/dashboard/buy/'>Purchase Now</a>");
    };
    window.rf.hooks.bind ("_internalDashboardRendered", function (e) {
        makeNode(e.coreDiv);
    })
});