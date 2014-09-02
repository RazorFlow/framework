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
            'max-width': 1000 + 100 + 50 + 4,
            'font-size': 12,
            'margin-top': 15,
            'color': '#666666'
        });
        evalNode.addClass("rf rfDashboardCore");
        container.append(evalNode);
        evalNode.html("Powered by RazorFlow Dashboard Framework evaluation version. <a href='http://www.razorflow.com/dashboard/buy/'>Purchase Now</a>");
        evalNode.find ("a").css ({
            'background-color': "#77ba11",
            'color': "#fffffb",
            'text-decoration': 'none',
            'padding-top': 3,
            'padding-bottom': 3,
            'padding-left': 7,
            'padding-right': 7,
            'border-radius': 4
        });
    };
    window.rf.hooks.bind ("_internalDashboardRendered", function (e) {
        makeNode(e.coreDiv);
    })
});