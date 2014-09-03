define([
    "core/globals"
], function () {
    // This is the main entry point for evaluation version
    var evalNode = null;
    var rot13 = function (s) {
        return s.replace(/[a-zA-Z]/g, function (c) {
            return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
        });
    }

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
        // How to edit the error message? 
        // Put this into any rot13 decoder
        evalNode.html(rot13("Cbjrerq ol EnmbeSybj Qnfuobneq Senzrjbex rinyhngvba irefvba. <n uers='uggc://jjj.enmbesybj.pbz/qnfuobneq/ohl/'>Chepunfr Abj</n>"));
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